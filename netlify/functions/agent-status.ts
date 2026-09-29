// GET /api/agent/status - diagnostics for switching the assistant on (docs/13-agent.md).
// Shows whether the settings reach the function and whether Anthropic accepts the key.
// Never returns the key itself. Checking the key uses the free Models API (no tokens used).
import Anthropic from '@anthropic-ai/sdk';

// Minimal part of Netlify's Context we use (avoids an extra dependency)
type Context = { deploy?: { context?: string } };

export const config = {
  path: '/api/agent/status',
  method: 'GET',
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

export default async (_req: Request, context: Context): Promise<Response> => {
  const enabledRaw = process.env.AGENT_ENABLED;
  const key = process.env.ANTHROPIC_API_KEY ?? '';
  const model = process.env.AGENT_MODEL || 'claude-opus-5';

  const checks = {
    deployContext: context?.deploy?.context ?? 'onbekend',
    agentEnabledValue: enabledRaw === undefined ? '(niet ingesteld)' : JSON.stringify(enabledRaw),
    agentEnabledOk: enabledRaw === 'true',
    apiKeyPresent: key.length > 0,
    apiKeyStartsWithSkAnt: key.startsWith('sk-ant-'),
    apiKeyHasSpacesOrQuotes: /[\s"']/.test(key),
    model,
    apiKeyAccepted: null as boolean | null,
    anthropicError: null as string | null,
  };

  if (checks.apiKeyPresent) {
    try {
      await new Anthropic({ apiKey: key.trim(), maxRetries: 0 }).models.retrieve(model);
      checks.apiKeyAccepted = true;
    } catch (error) {
      checks.apiKeyAccepted = false;
      checks.anthropicError =
        error instanceof Anthropic.APIError ? `HTTP ${error.status ?? '?'}: ${error.message.slice(0, 200)}` : 'geen verbinding';
    }
  }

  const advice: string[] = [];
  if (!checks.agentEnabledOk) advice.push('Zet AGENT_ENABLED op precies: true (kleine letters, zonder spaties of aanhalingstekens) en publiceer opnieuw.');
  if (!checks.apiKeyPresent) advice.push(`ANTHROPIC_API_KEY komt niet aan in deze omgeving (${checks.deployContext}). Controleer Scopes (Functions) en of er een waarde is ingevuld voor deze deploy context, en publiceer opnieuw.`);
  if (checks.apiKeyPresent && !checks.apiKeyStartsWithSkAnt) advice.push('De sleutel begint niet met sk-ant-. Kopieer hem opnieuw uit de Anthropic Console.');
  if (checks.apiKeyHasSpacesOrQuotes) advice.push('De sleutel bevat een spatie of aanhalingsteken. Plak hem opnieuw zonder extra tekens.');
  if (checks.apiKeyAccepted === false) advice.push('Anthropic accepteert de sleutel niet (zie anthropicError). Maak eventueel een nieuwe sleutel aan en controleer je tegoed.');
  if (advice.length === 0) advice.push('Alles in orde: de assistent staat aan.');

  return new Response(JSON.stringify({ ...checks, advies: advice }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
};
