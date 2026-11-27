import assert from 'node:assert/strict';
import { test } from 'node:test';
import { bookSubmission, validationHandler } from './book-validation.ts';

const book = { id: '82e3c742-49b2-4664-9fc3-618f30feca49', kind: 'book', email: 'fictief@example.test', variant: 'single', contact: true };
const business = { ...book, kind: 'business', name: 'Fictief', organization: 'Voorbeeldbedrijf', type: 'Werkgever', quantity: '50–99' };
function request(body: unknown, origin = 'https://example.test') {
  return new Request('https://example.test/api/book-validation', {
    method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
}

test('uses server prices and routes submissions to their proper sheet type', async () => {
  for (const [input, kind, tail] of [
    [{ ...book, price: '0' }, 'book', ['single', '24.95', 'contact v1']],
    [{ ...book, variant: 'duo' }, 'book', ['duo', '44.99', 'contact v1']],
    [business, 'business', ['Voorbeeldbedrijf', 'Werkgever', '50–99', '', 'contact v1']],
  ] as const) {
    const handler = validationHandler(async (receivedKind, row) => {
      assert.equal(receivedKind, kind);
      assert.equal(row[0], book.id);
      assert.equal(row[2], book.email);
      assert.deepEqual(row.slice(4), tail);
    });
    const result = await handler(request(input));
    assert.equal(result.status, 200);
    assert.equal(result.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(await result.json(), { ok: true });
  }
});

test('rejects invalid contact details, missing permission, wrong variants, and spam trap', () => {
  for (const input of [
    { ...book, contact: false }, { ...book, variant: 'other' }, { ...book, email: 'invalid' },
    { ...book, website: 'spam' }, { ...business, quantity: '1' }, { ...business, name: '' },
    { ...business, note: 'x'.repeat(401) }, { ...book, id: 'invalid' },
  ]) assert.equal(bookSubmission(input), null);
});

test('rejects cross-origin, invalid and oversized requests before storage', async () => {
  let calls = 0;
  const handler = validationHandler(async () => { calls++; });
  assert.equal((await handler(request(book, 'https://elsewhere.test'))).status, 403);
  assert.equal((await handler(request({ ...book, contact: false }))).status, 400);
  assert.equal((await handler(request({ ...book, extra: 'x'.repeat(8192) }))).status, 413);
  assert.equal(calls, 0);
});

test('missing or failing storage never returns a confirmation or service error details', async () => {
  for (const handler of [validationHandler(), validationHandler(async () => { throw new Error(book.email); })]) {
    const result = await handler(request(book));
    assert.equal(result.status, 503);
    assert.deepEqual(await result.json(), { error: 'unavailable' });
  }
});
