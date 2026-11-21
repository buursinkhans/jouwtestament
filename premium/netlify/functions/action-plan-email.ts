import { createCheckPlanPdf } from '../../lib/check-plan-pdf';
import { parseAnswers } from '../../lib/check-guide';

export const config = {
  path: '/api/action-plan-email',
  rateLimit: { windowLimit: 3, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BYTES = 2048;

export default async function handler(req: Request) {
  const origin = req.headers.get('origin');
  const allowed = (process.env.ACTION_PLAN_ALLOWED_ORIGINS ?? '').split(',').map((value) => value.trim());
  if (!origin || !allowed.includes(origin)) return new Response(null, { status: 403 });
  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    Vary: 'Origin',
  };
  const reply = (status: number) => new Response(null, { status, headers });
  if (req.method === 'OPTIONS') return reply(204);
  if (req.method !== 'POST') return reply(405);
  if (!req.headers.get('content-type')?.startsWith('application/json')) return reply(415);
  if (Number(req.headers.get('content-length')) > MAX_BYTES) return reply(413);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.ACTION_PLAN_FROM;
  if (!key || !from) return reply(503);

  let input: unknown;
  try {
    const raw = await req.text();
    if (new TextEncoder().encode(raw).length > MAX_BYTES) return reply(413);
    input = JSON.parse(raw);
  } catch {
    return reply(400);
  }

  if (typeof input !== 'object' || input === null) return reply(400);
  const { email, answers } = input as Record<string, unknown>;
  const address = typeof email === 'string' ? email.trim() : '';
  const validated = parseAnswers(answers);
  if (!address || address.length > 254 || !EMAIL.test(address) || !validated) return reply(400);

  try {
    const doc = await createCheckPlanPdf(validated);
    const attachment = await doc.saveAsBase64();
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(8500),
      body: JSON.stringify({
        from,
        to: [address],
        subject: 'Jouw Goed Geregeld actieplan',
        text: 'Je persoonlijke actieplan staat in de bijlage. Je kunt het bewaren of met je naasten bespreken.',
        attachments: [{ filename: 'helder-nalaten-actieplan.pdf', content: attachment, content_type: 'application/pdf' }],
      }),
    });
    return reply(result.ok ? 204 : 502);
  } catch {
    return reply(502);
  }
}

