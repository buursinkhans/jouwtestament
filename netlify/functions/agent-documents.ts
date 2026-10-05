// POST /api/agent/documents - writes one of the two documents from the conversation (docs/13-agent.md).
// Body: { history, kind: 'notaris' | 'nabestaanden' }. One document per request keeps each call
// well under the 60 s streaming limit. Streams pings while writing, then the document as JSON.
// TODO(owner): payment (€ 35, src/config/pricing.ts) must be verified here before generating; now in test mode (no payment).
import { documentSchema, documentSystem, type DocumentKind } from './lib/agentPrompt.ts';
import { addUsage, client, config as agentConfig, deriveState, emptyUsage, fallback, json, ndjsonStream, transcript, validateHistory } from './lib/agentCore.ts';
import { dossierFields } from '../../src/components/agent/dossier.ts';

export const config = {
  path: '/api/agent/documents',
  method: 'POST',
  rateLimit: { windowLimit: 6, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

export default async (req: Request): Promise<Response> => {
  if (!agentConfig.enabled) return json({ error: 'agent_disabled' }, 503);

  let body: { history?: unknown; kind?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }
  const kind = body.kind === 'notaris' || body.kind === 'nabestaanden' ? (body.kind as DocumentKind) : null;
  if (!kind) return json({ error: 'invalid_kind' }, 400);

  // The history ends with an assistant turn here; validateHistory expects a user turn last
  const raw = Array.isArray(body.history) ? body.history : [];
  const history = validateHistory([...raw, { role: 'user', content: '[documenten]' }])?.slice(0, -1);
  if (!history) return json({ error: 'invalid_history' }, 400);

  const state = deriveState(history);
  if (state.status !== 'ready') return json({ error: 'not_ready' }, 409);

  const dossierText = dossierFields
    .filter((field) => state.dossier[field.key])
    .map((field) => `- ${field.label}: ${state.dossier[field.key]}`)
    .join('\n');

  const anthropic = client();

  return ndjsonStream(async (send) => {
    const ping = setInterval(() => send({ type: 'ping' }), 5000);
    try {
      const stream = anthropic.beta.messages.stream({
        model: agentConfig.model,
        max_tokens: 16000,
        thinking: { type: 'adaptive' },
        output_config: {
          effort: agentConfig.docEffort,
          format: { type: 'json_schema', schema: documentSchema as unknown as Record<string, unknown> },
        },
        system: documentSystem(kind),
        messages: [
          {
            role: 'user',
            content: `Dossier:\n${dossierText}\n\nSamenvatting die de gebruiker heeft bevestigd:\n${state.summary ?? ''}\n\nVolledig gesprek:\n${transcript(history)}`,
          },
        ],
        ...fallback,
      });
      const message = await stream.finalMessage();
      const usage = emptyUsage();
      addUsage(usage, message.usage);
      send({ type: 'meta', model: message.model, usage, stop_reason: message.stop_reason, rounds: 1 });
      if (message.stop_reason === 'refusal' || message.stop_reason === 'max_tokens') {
        send({ type: 'error', message: 'Het document kon niet worden gemaakt. Probeer het opnieuw.' });
        return;
      }
      const text = message.content.flatMap((block) => (block.type === 'text' ? [block.text] : [])).join('');
      send({ type: 'document', document: { kind, ...JSON.parse(text) } });
    } finally {
      clearInterval(ping);
    }
  });
};
