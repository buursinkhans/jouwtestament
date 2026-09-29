// Shared server code for the self-service agent functions (docs/13-agent.md).
// Env: ANTHROPIC_API_KEY (secret), AGENT_ENABLED=true, AGENT_MODEL, AGENT_EFFORT, AGENT_DOC_EFFORT.
// Never log personal data or conversation content.
import Anthropic from '@anthropic-ai/sdk';
import { applyUpdates, missingRequired, type AgentState, type Dossier } from '../../../src/components/agent/dossier.ts';

export const config = {
  enabled: process.env.AGENT_ENABLED === 'true' && Boolean(process.env.ANTHROPIC_API_KEY),
  model: process.env.AGENT_MODEL || 'claude-opus-5',
  effort: (process.env.AGENT_EFFORT || 'medium') as 'low' | 'medium' | 'high' | 'xhigh' | 'max',
  docEffort: (process.env.AGENT_DOC_EFFORT || 'high') as 'low' | 'medium' | 'high' | 'xhigh' | 'max',
};

// Server-side fallback: if the model declines, the API re-runs the request on a recommended model.
export const fallback = {
  betas: ['server-side-fallback-2026-07-01'] as Anthropic.Beta.AnthropicBeta[],
  fallbacks: 'default' as const,
};

export const client = () => new Anthropic({ maxRetries: 2 });

// Abuse and cost limits for one conversation
export const LIMITS = { maxMessages: 160, maxChars: 400_000, maxUserMessageChars: 4_000 };

export type History = Anthropic.Beta.BetaMessageParam[];

export function validateHistory(input: unknown): History | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > LIMITS.maxMessages) return null;
  if (JSON.stringify(input).length > LIMITS.maxChars) return null;
  for (const message of input) {
    if (typeof message !== 'object' || message === null) return null;
    const { role, content } = message as { role?: unknown; content?: unknown };
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string' && !Array.isArray(content)) return null;
  }
  const first = input[0] as { role: string };
  const last = input[input.length - 1] as { role: string; content: unknown };
  if (first.role !== 'user' || last.role !== 'user') return null;
  if (typeof last.content === 'string' && last.content.length > LIMITS.maxUserMessageChars) return null;
  return input as History;
}

type ToolInput = Record<string, unknown>;

/** Replays the agent's tool calls in the history: the history is the single source of truth. */
export function deriveState(history: History): AgentState {
  let dossier: Dossier = {};
  let status: AgentState['status'] = 'intake';
  let adviserReason: string | undefined;
  let summary: string | undefined;
  for (const message of history) {
    if (message.role !== 'assistant' || typeof message.content === 'string') continue;
    for (const block of message.content) {
      if (block.type !== 'tool_use') continue;
      const input = (block.input ?? {}) as ToolInput;
      if (block.name === 'update_dossier' && Array.isArray(input.updates)) {
        dossier = applyUpdates(
          dossier,
          (input.updates as { field?: unknown; value?: unknown }[])
            .filter((u) => typeof u.field === 'string' && typeof u.value === 'string')
            .map((u) => ({ field: u.field as string, value: u.value as string }))
        );
        // A change after "ready" means the summary must be confirmed again
        if (status === 'ready') status = 'intake';
      } else if (block.name === 'recommend_adviser' && typeof input.reason === 'string') {
        if (status !== 'ready') status = 'adviser_recommended';
        adviserReason = input.reason;
      } else if (block.name === 'mark_ready' && typeof input.summary === 'string') {
        if (missingRequired(dossier).length === 0) {
          status = 'ready';
          summary = input.summary;
        }
      }
    }
  }
  return { dossier, status, adviserReason, summary };
}

/** Result text returned to the model for each tool call. */
export function toolResult(name: string, stateAfter: AgentState): { content: string; is_error?: boolean } {
  if (name === 'update_dossier') {
    const missing = missingRequired(stateAfter.dossier);
    return { content: `Opgeslagen. Nog open verplichte velden: ${missing.length ? missing.join(', ') : 'geen'}.` };
  }
  if (name === 'recommend_adviser') {
    return { content: 'Advies voor een adviseur is getoond aan de gebruiker. Leg uit waarom en laat de gebruiker kiezen.' };
  }
  if (name === 'mark_ready') {
    const missing = missingRequired(stateAfter.dossier);
    if (missing.length > 0) {
      return {
        is_error: true,
        content: `Nog niet mogelijk: deze verplichte velden ontbreken: ${missing.join(', ')}. Vraag hiernaar of vul "niet van toepassing" in waar dat klopt.`,
      };
    }
    return { content: 'Klaar. De gebruiker ziet nu de knop om de documenten te laten maken.' };
  }
  return { is_error: true, content: `Onbekende tool: ${name}` };
}

/** Plain-text transcript (user and assistant text only) for the document writer. */
export function transcript(history: History): string {
  const lines: string[] = [];
  for (const message of history) {
    const texts =
      typeof message.content === 'string'
        ? [message.content]
        : message.content.flatMap((block) => (block.type === 'text' ? [block.text] : []));
    // Quick-reply option lines ([OPTIES] / [MEERKEUZE]) are UI hints, not content
    const text = texts
      .join('\n')
      .split('\n')
      .filter((line) => !/^\s*\[(OPTIES|MEERKEUZE)\]/i.test(line))
      .join('\n')
      .trim();
    if (!text || text.startsWith('[Tool')) continue;
    lines.push(`${message.role === 'user' ? 'Gebruiker' : 'Assistent'}: ${text}`);
  }
  return lines.join('\n\n');
}

// ---------- NDJSON streaming to the browser ----------

export type StreamEvent =
  | { type: 'text'; text: string }
  | { type: 'state'; state: AgentState }
  | { type: 'history'; history: History }
  | { type: 'document'; document: unknown }
  | { type: 'ping' }
  | { type: 'meta'; model: string; usage: UsageTotals; stop_reason: string | null; rounds: number }
  | { type: 'error'; message: string }
  | { type: 'done' };

// Token usage summed over all API calls in one request (for evals and cost tracking; no content)
export interface UsageTotals {
  input_tokens: number;
  output_tokens: number;
  cache_read_input_tokens: number;
  cache_creation_input_tokens: number;
}

export const emptyUsage = (): UsageTotals => ({
  input_tokens: 0,
  output_tokens: 0,
  cache_read_input_tokens: 0,
  cache_creation_input_tokens: 0,
});

export function addUsage(total: UsageTotals, usage: Partial<Record<keyof UsageTotals, number | null>>): void {
  for (const key of Object.keys(total) as (keyof UsageTotals)[]) total[key] += usage[key] ?? 0;
}

export function ndjsonStream(run: (send: (event: StreamEvent) => void) => Promise<void>): Response {
  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      const send = (event: StreamEvent) => controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
      try {
        await run(send);
      } catch (error) {
        console.error('agent_error', errorLabel(error)); // no content
        send({ type: 'error', message: friendlyError(error) });
      }
      send({ type: 'done' });
      controller.close();
    },
  });
  return new Response(body, { headers: { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store' } });
}

function errorLabel(error: unknown): string {
  if (error instanceof Anthropic.APIError) return `api_${error.status ?? 'unknown'}`;
  return error instanceof Error ? error.name : 'unknown';
}

function friendlyError(error: unknown): string {
  if (error instanceof Anthropic.RateLimitError) return 'Het is even erg druk. Probeer het over een minuut opnieuw.';
  if (error instanceof Anthropic.APIError && (error.status ?? 0) >= 500)
    return 'De assistent is tijdelijk niet bereikbaar. Probeer het later opnieuw.';
  return 'Er ging iets mis. Probeer het opnieuw.';
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
