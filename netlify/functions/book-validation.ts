import { appendValidationRow, sheetConfigFromEnv } from './lib/googleSheets.ts';

export const config = {
  path: '/api/book-validation',
  method: 'POST',
  rateLimit: { windowLimit: 4, windowSize: 60, aggregateBy: ['ip', 'domain'] },
};

const variants = { single: '24.95', duo: '44.99' } as const;
const orgTypes = ['Notaris', 'Hypotheekadvies', 'Uitvaart', 'Werkgever', 'Zorg of welzijn', 'Anders'];
const printRuns = ['25–49', '50–99', '100–499', '500+'];
type Kind = 'book' | 'business';
type Submission = { kind: Kind; row: string[] };
type Store = (kind: Kind, row: string[]) => Promise<void>;

export function bookSubmission(value: unknown): Submission | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const field = (key: string) => typeof input[key] === 'string' ? input[key].trim() : '';
  const email = field('email');
  const id = field('id');
  const name = field('name');
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(id) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || name.length > 80 ||
      input.contact !== true || field('website')) return null;
  const common = [id, new Date().toISOString(), email, name];
  if (input.kind === 'book') {
    const variant = field('variant');
    if (variant !== 'single' && variant !== 'duo') return null;
    return { kind: 'book', row: [...common, variant, variants[variant], 'contact v1'] };
  }
  if (input.kind === 'business') {
    const organization = field('organization');
    const type = field('type');
    const quantity = field('quantity');
    const note = field('note');
    if (!name || !organization || organization.length > 100 || !orgTypes.includes(type) ||
        !printRuns.includes(quantity) || note.length > 400) return null;
    return { kind: 'business', row: [...common, organization, type, quantity, note, 'contact v1'] };
  }
  return null;
}

function json(code: number, body: object) {
  return Response.json(body, { status: code, headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}

export function validationHandler(store?: Store) {
  return async (request: Request) => {
    if (request.method !== 'POST') return json(405, { error: 'method' });
    if (!store) return json(503, { error: 'unavailable' });
    if (request.headers.get('Origin') !== new URL(request.url).origin ||
        request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
      return json(403, { error: 'origin' });
    }
    let submission: Submission | null;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json(400, { error: 'input' });
      let size = 0;
      const decoder = new TextDecoder();
      let body = '';
      for (;;) {
        const part = await reader.read();
        if (part.done) break;
        size += part.value.byteLength;
        if (size > 8192) {
          await reader.cancel();
          return json(413, { error: 'input' });
        }
        body += decoder.decode(part.value, { stream: true });
      }
      submission = bookSubmission(JSON.parse(body + decoder.decode()));
    } catch {
      return json(400, { error: 'input' });
    }
    if (!submission) return json(400, { error: 'input' });
    try {
      await store(submission.kind, submission.row);
      return json(200, { ok: true });
    } catch {
      return json(503, { error: 'unavailable' });
    }
  };
}

const settings = process.env.BOOK_VALIDATION_ENABLED === 'true' && process.env.BOOK_VALIDATION_SHEET_ID
  ? sheetConfigFromEnv({ ...process.env, GOOGLE_SHEET_ID: process.env.BOOK_VALIDATION_SHEET_ID })
  : null;
const tabs = { book: 'Reserveringen', business: 'Zakelijk' };
export default validationHandler(settings ? (kind, row) => appendValidationRow({ ...settings, tab: tabs[kind] }, row) : undefined);
