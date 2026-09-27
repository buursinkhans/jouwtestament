// Unit tests for the agent's server logic (docs/13-agent.md). Run with: npm run test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deriveState, toolResult, transcript, validateHistory, type History } from './agentCore.ts';
import { requiredKeys } from '../../../src/components/agent/dossier.ts';

const toolUse = (name: string, input: unknown, id = 't1') => ({ type: 'tool_use' as const, id, name, input });
const assistant = (...content: unknown[]) => ({ role: 'assistant' as const, content }) as History[number];
const user = (content: string) => ({ role: 'user' as const, content });

const allRequired = requiredKeys.map((field) => ({ field, value: 'x' }));

test('validateHistory accepts a normal conversation and rejects bad shapes', () => {
  assert.ok(validateHistory([user('hallo')]));
  assert.equal(validateHistory([]), null);
  assert.equal(validateHistory([{ role: 'system', content: 'x' }]), null);
  assert.equal(validateHistory([user('a'), assistant({ type: 'text', text: 'b' })]), null); // must end with user
  assert.equal(validateHistory([user('x'.repeat(5000))]), null); // user message too long
});

test('deriveState replays dossier updates, ignores unknown fields and clears empty values', () => {
  const state = deriveState([
    user('start'),
    assistant(toolUse('update_dossier', { updates: [{ field: 'naam', value: 'Sam' }, { field: 'onbekend', value: 'x' }] })),
    user('...'),
    assistant(toolUse('update_dossier', { updates: [{ field: 'woonplaats', value: 'Rotterdam' }, { field: 'naam', value: '' }] })),
  ]);
  assert.deepEqual(state.dossier, { woonplaats: 'Rotterdam' });
  assert.equal(state.status, 'intake');
});

test('mark_ready only counts when all required fields are filled', () => {
  const tooEarly = deriveState([user('s'), assistant(toolUse('mark_ready', { summary: 'klaar' }))]);
  assert.equal(tooEarly.status, 'intake');

  const ready = deriveState([
    user('s'),
    assistant(toolUse('update_dossier', { updates: allRequired }, 'a'), toolUse('mark_ready', { summary: 'klaar' }, 'b')),
  ]);
  assert.equal(ready.status, 'ready');
  assert.equal(ready.summary, 'klaar');
});

test('a dossier change after ready requires confirmation again', () => {
  const state = deriveState([
    user('s'),
    assistant(toolUse('update_dossier', { updates: allRequired }, 'a'), toolUse('mark_ready', { summary: 'klaar' }, 'b')),
    user('wijzig iets'),
    assistant(toolUse('update_dossier', { updates: [{ field: 'executeur', value: 'Kim' }] }, 'c')),
  ]);
  assert.equal(state.status, 'intake');
});

test('recommend_adviser sets the status and reason', () => {
  const state = deriveState([user('s'), assistant(toolUse('recommend_adviser', { reason: 'Eigen bedrijf' }))]);
  assert.equal(state.status, 'adviser_recommended');
  assert.equal(state.adviserReason, 'Eigen bedrijf');
});

test('toolResult reports missing required fields for mark_ready as an error', () => {
  const result = toolResult('mark_ready', { dossier: {}, status: 'intake' });
  assert.equal(result.is_error, true);
  assert.match(result.content, /naam/);
});

test('transcript keeps only user and assistant text', () => {
  const text = transcript([
    user('Hallo'),
    assistant({ type: 'thinking', thinking: '' }, { type: 'text', text: 'Welkom' }, toolUse('update_dossier', { updates: [] })),
    { role: 'user', content: [{ type: 'tool_result', tool_use_id: 't1', content: 'ok' }] },
  ]);
  assert.equal(text, 'Gebruiker: Hallo\n\nAssistent: Welkom');
});
