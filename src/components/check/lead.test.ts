// Unit tests for server-side lead handling (docs/09). Run with: npm run test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateSubmission, buildLead, formatLeadId } from './lead.ts';

const valid = () => ({
  answers: { situation: 'cohabiting', children: 'joint', minors: 'yes', home: 'yes', documents: 'nothing' },
  contact: { name: 'Sam de Vries', email: 'sam@example.nl', phone: '06 1234 5678' },
  consent: { given: true, text: 'Ik ga akkoord…', at: '2026-09-27T10:00:00.000Z' },
  source: { landingPage: '/voor-wie/samenwonen', segmentPage: 'samenwonen', utm_source: 'jouwtestament' },
});

test('accepts a valid submission and normalises the phone number', () => {
  const result = validateSubmission(valid());
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.contact.phone, '0612345678');
    assert.equal(result.data.honeypot, false);
  }
});

test('rejects missing answers, bad email, bad phone and missing consent', () => {
  const input = valid() as Record<string, any>;
  input.answers = { situation: 'married' };
  input.contact = { name: 'S', email: 'geen-email', phone: '123' };
  input.consent = { given: false };
  const result = validateSubmission(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    for (const field of ['answers.children', 'answers.home', 'answers.documents', 'contact.name', 'contact.email', 'contact.phone', 'consent']) {
      assert.ok(result.errors.includes(field), field);
    }
  }
});

test('rejects values outside the allowed options', () => {
  const input = valid() as Record<string, any>;
  input.answers.situation = 'divorced';
  const result = validateSubmission(input);
  assert.equal(result.ok, false);
});

test('question 2b is required with children and dropped without', () => {
  const withChildren = valid() as Record<string, any>;
  delete withChildren.answers.minors;
  assert.equal(validateSubmission(withChildren).ok, false);

  const noChildren = valid() as Record<string, any>;
  noChildren.answers.children = 'none';
  const result = validateSubmission(noChildren);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.data.answers.minors, undefined);
});

test('detects a filled honeypot', () => {
  const result = validateSubmission({ ...valid(), company_website: 'spam.example' });
  assert.equal(result.ok && result.data.honeypot, true);
});

test('builds the lead with server-side flags, segment and score', () => {
  const result = validateSubmission(valid());
  assert.ok(result.ok);
  const lead = buildLead(result.data, formatLeadId(2026, 123), new Date('2026-09-27T10:00:00Z'));
  assert.equal(lead.id, 'HN-2026-000123');
  assert.equal(lead.segment, 'cohabiting');
  assert.equal(lead.score, 3 + 2 + 2 + 2 + 1);
  assert.equal(lead.priority, 'hoog');
  assert.equal(lead.status, 'nieuw');
  assert.equal(lead.referralChild, false);
  assert.ok(lead.flags.includes('partner_unprotected'));
  assert.equal(lead.source.domain, 'heldernalaten.nl');
  assert.deepEqual(lead.statusHistory, [{ status: 'nieuw', at: '2026-09-27T10:00:00.000Z', by: 'website' }]);
});

test('marks leads via ?ref=kind as referral from a child', () => {
  const input = valid() as Record<string, any>;
  input.source = { landingPage: '/check', ref: 'kind' };
  const result = validateSubmission(input);
  assert.ok(result.ok);
  const lead = buildLead(result.data, 'HN-2026-000001', new Date());
  assert.equal(lead.referralChild, true);
  assert.equal('ref' in lead.source, false);
});
