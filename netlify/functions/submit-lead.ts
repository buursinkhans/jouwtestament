// POST /api/submit-lead (docs/10 "Formulier"). Netlify Functions (v2, standard Request/Response).
// Steps: POST only → validate → honeypot → compute flags/segment/score → store → { id, flags }.
// Not done yet (owner decisions pending):
// TODO(owner): storage (Airtable / Google Sheet / Supabase) incl. lead id sequence and rate limit 5/hour per IP.
// TODO(owner): partner and confirmation mail (owner: "werk nog even zonder mail").
// Never log personal data.
import { validateSubmission, buildLead, formatLeadId } from '../../src/components/check/lead.ts';
import type { Lead } from '../../src/components/check/types.ts';

export const config = { path: '/api/submit-lead' };

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

// No-JS fallback: the form posts url-encoded fields; map them to the JSON shape.
function fromForm(form: URLSearchParams) {
  const get = (key: string) => form.get(key) ?? undefined;
  return {
    answers: Object.fromEntries(
      ['situation', 'children', 'minors', 'home', 'documents', 'notary'].map((key) => [key, get(key)])
    ),
    contact: { name: get('name'), email: get('email'), phone: get('phone') },
    consent: { given: get('consent') === 'yes', text: get('consentText'), at: new Date().toISOString() },
    source: { landingPage: get('landingPage'), segmentPage: get('segmentPage') },
    company_website: get('company_website'),
  };
}

/** Stores the lead and returns its sequence number, or null when no storage is configured. */
async function saveLead(_lead: Omit<Lead, 'id'>): Promise<number | null> {
  return null; // TODO(owner): connect storage
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const isForm = (req.headers.get('content-type') ?? '').includes('application/x-www-form-urlencoded');
  let input: unknown;
  try {
    input = isForm ? fromForm(new URLSearchParams(await req.text())) : await req.json();
  } catch {
    return json({ error: 'invalid_body' }, 400);
  }

  const result = validateSubmission(input);
  if (!result.ok) {
    return isForm ? Response.redirect(new URL('/check?fout=1', req.url), 303) : json({ errors: result.errors }, 422);
  }

  const now = new Date();
  const draft = buildLead(result.data, '', now);

  // Honeypot filled: answer as if all went well, store nothing (docs/10)
  if (result.data.honeypot) {
    return isForm ? Response.redirect(new URL('/bedankt', req.url), 303) : json({ id: null, flags: draft.flags });
  }

  const sequence = await saveLead(draft);
  if (sequence === null) return json({ error: 'storage_not_configured' }, 503);

  const id = formatLeadId(now.getFullYear(), sequence);
  return isForm
    ? Response.redirect(new URL(`/bedankt?id=${encodeURIComponent(id)}`, req.url), 303)
    : json({ id, flags: draft.flags });
};
