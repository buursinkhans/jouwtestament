// POST /api/agent/chat - one conversation turn with the self-service agent (docs/13-agent.md).
// Stateless: the browser keeps the full history (incl. tool calls) and sends it back each turn.
// Streams NDJSON events: text deltas, the updated state, the new history, done.
import Anthropic from '@anthropic-ai/sdk';
import { systemBlocks, tools } from './lib/agentPrompt.ts';
import {
  client,
  config as agentConfig,
  deriveState,
  fallback,
  json,
  LIMITS,
  ndjsonStream,
  toolResult,
  validateHistory,
  type History,
} from './lib/agentCore.ts';
import { describeCheckAnswers } from '../../src/components/agent/dossier.ts';

export const config = {
  path: '/api/agent/chat',
  method: 'POST',
  rateLimit: { windowLimit: 30, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

const MAX_TOOL_ROUNDS = 6;

function startMessage(checkAnswers: unknown): string {
  const answers =
    checkAnswers && typeof checkAnswers === 'object' ? (checkAnswers as Record<string, string>) : undefined;
  const described = describeCheckAnswers(answers);
  return described
    ? `[Start van het gesprek] De gebruiker komt van de gratis check. Uitkomst van de check: ${described}. Begin het gesprek.`
    : '[Start van het gesprek] De gebruiker heeft de gratis check niet gedaan. Begin het gesprek.';
}

export default async (req: Request): Promise<Response> => {
  if (!agentConfig.enabled) return json({ error: 'agent_disabled' }, 503);

  let body: { history?: unknown; message?: unknown; checkAnswers?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  const previous = Array.isArray(body.history) ? body.history : [];
  const text = typeof body.message === 'string' ? body.message.trim().slice(0, LIMITS.maxUserMessageChars) : '';
  const userContent = previous.length === 0 ? startMessage(body.checkAnswers) : text;
  if (!userContent) return json({ error: 'empty_message' }, 400);

  const history = validateHistory([...previous, { role: 'user', content: userContent }]);
  if (!history) return json({ error: 'invalid_history' }, 400);

  const anthropic = client();

  return ndjsonStream(async (send) => {
    const messages: History = [...history];

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const stream = anthropic.beta.messages.stream({
        model: agentConfig.model,
        max_tokens: 16000,
        thinking: { type: 'adaptive' },
        output_config: { effort: agentConfig.effort },
        system: systemBlocks,
        tools,
        messages,
        ...fallback,
      });
      stream.on('text', (delta) => send({ type: 'text', text: delta }));
      const message = await stream.finalMessage();

      if (message.stop_reason === 'refusal') {
        send({ type: 'error', message: 'Daar kan de assistent niet mee helpen. Probeer het anders te formuleren.' });
        break;
      }

      messages.push({ role: 'assistant', content: message.content as Anthropic.Beta.BetaContentBlockParam[] });

      const toolUses = message.content.filter((block): block is Anthropic.Beta.BetaToolUseBlock => block.type === 'tool_use');
      if (message.stop_reason !== 'tool_use' || toolUses.length === 0) break;

      // State after this assistant turn (tool calls are replayed from the history)
      const state = deriveState(messages);
      const results: Anthropic.Beta.BetaToolResultBlockParam[] = toolUses.map((tool) => ({
        type: 'tool_result',
        tool_use_id: tool.id,
        ...toolResult(tool.name, state),
      }));
      messages.push({ role: 'user', content: results });
      send({ type: 'state', state });
      send({ type: 'text', text: '\n\n' }); // separates text before and after tool calls
    }

    send({ type: 'state', state: deriveState(messages) });
    send({ type: 'history', history: messages });
  });
};
