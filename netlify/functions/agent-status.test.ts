import assert from 'node:assert/strict';
import { test } from 'node:test';
import status from './agent-status.ts';

test('public readiness only exposes a boolean, regardless of configuration', async () => {
  const result = status(new Request('https://example.test/api/agent/status'));
  const body = await result.json();
  assert.deepEqual(Object.keys(body), ['available']);
  assert.equal(typeof body.available, 'boolean');
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.equal(result.headers.get('X-Robots-Tag'), 'noindex');
  const rejected = status(new Request('https://example.test/api/agent/status', { method: 'POST' }));
  assert.equal(rejected.status, 405);
  assert.deepEqual(await rejected.json(), { available: false });
});
