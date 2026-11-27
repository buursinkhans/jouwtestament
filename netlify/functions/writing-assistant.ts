import Anthropic from '@anthropic-ai/sdk';
import { toneInstructions, topicInstructions, writingPrompt } from './lib/writingPrompt.ts';

export const config = {
  path: '/api/writing-assistant',
  method: 'POST',
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

const model = 'claude-haiku-4-5-20251001';
const maxBytes = 8192;
const maxInput = 900;
const maxOutput = 1600;
type Input = { topic: keyof typeof topicInstructions; tone: keyof typeof toneInstructions; words: string };

function response(status: number, data: object) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}

export function validateWritingInput(raw: unknown): Input | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const { topic, tone, words } = raw as Record<string, unknown>;
  if (typeof topic !== 'string' || !Object.hasOwn(topicInstructions, topic) ||
      typeof tone !== 'string' || !Object.hasOwn(toneInstructions, tone) ||
      typeof words !== 'string' || words.length > maxInput || words.trim().length < 3) return null;
  return { topic: topic as Input['topic'], tone: tone as Input['tone'], words: words.trim() };
}

async function readBody(request: Request): Promise<unknown> {
  if (Number(request.headers.get('Content-Length')) > maxBytes || !request.body) throw new Error('body size');
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = '';
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error('body size');
    }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode());
}

type Generator = (input: Input) => Promise<string>;
export function writingHandler(generate?: Generator) {
  return async (request: Request) => {
    if (request.method !== 'POST') return response(405, { error: 'method' });
    if (!generate) return response(503, { error: 'unavailable' });
    if (request.headers.get('Origin') !== new URL(request.url).origin ||
        request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return response(403, { error: 'request' });
    }
    let input: Input | null;
    try { input = validateWritingInput(await readBody(request)); } catch { input = null; }
    if (!input) return response(400, { error: 'input' });
    try {
      const result = JSON.parse(await generate(input));
      if (!result || (result.kind !== 'draft' && result.kind !== 'question') ||
          typeof result.text !== 'string' || !result.text.trim() || result.text.length > maxOutput) {
        return response(502, { error: 'unavailable' });
      }
      return response(200, { kind: result.kind, text: result.text.trim() });
    } catch {
      return response(502, { error: 'unavailable' });
    }
  };
}

const enabled = process.env.WRITING_ASSISTANT_ENABLED === 'true' && Boolean(process.env.ANTHROPIC_API_KEY?.trim());
export default writingHandler(enabled ? async ({ topic, tone, words }) => {
  const client = new Anthropic({ timeout: 10_000, maxRetries: 0 });
  const result = await client.messages.create({
    model,
    max_tokens: 450,
    system: writingPrompt,
    messages: [{ role: 'user', content: JSON.stringify({ context: topicInstructions[topic], style: toneInstructions[tone], words }) }],
  });
  if (result.stop_reason !== 'end_turn') throw new Error('incomplete response');
  return result.content.flatMap(part => part.type === 'text' ? [part.text] : []).join('');
} : undefined);
