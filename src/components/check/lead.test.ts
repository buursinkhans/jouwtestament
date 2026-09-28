// Unit tests for server-side lead handling (docs/09). Run with: npm run test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateSubmission, validatePreferences, buildLead, formatLeadId, leadToRow, LEAD_COLUMNS } from './lead.ts';

// A date n days from today as YYYY-MM-DD (UTC, matches the validator)
const day = (n: number) => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + n)).toISOString().slice(0, 10);
};

const valid = () => ({
  answers: { situation: 'cohabiting', children: 'joint', minors: 'yes', home: 'yes', documents: 'nothing' },
  contact: { name: 'Sam de Vries', email: 'sam@example.nl', phone: '06 1234 5678' },
  consent: { given: true, text: 'Ik ga akkoord…', at: '2026-09-27T10:00:00.000Z' },
  source: { landingPage: '/voor-wie/samenwonen', segmentPage: 'samenwonen', utm_source: 'jouwtestament' },
  preferences: [{ date: day(2), block: 'avond' }, { date: day(1), block: 'ochtend' }],
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
  if (result.ok) assert.equal(result.data.answers?.minors, undefined);
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
  assert.equal(lead.source.domain, 'jouwtestament.nl');
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

test('turns a lead into a sheet row in column order', () => {
  const result = validateSubmission(valid());
  assert.ok(result.ok);
  const lead = buildLead(result.data, 'HN-2026-000007', new Date('2026-09-27T10:00:00Z'));
  const row = leadToRow(lead);
  assert.equal(row.length, LEAD_COLUMNS.length);
  const cell = (column: (typeof LEAD_COLUMNS)[number]) => row[LEAD_COLUMNS.indexOf(column)];
  assert.equal(cell('id'), 'HN-2026-000007');
  assert.equal(cell('status'), 'nieuw');
  assert.equal(cell('email'), 'sam@example.nl');
  assert.equal(cell('situation'), 'cohabiting');
  assert.equal(cell('notary'), '');
  assert.equal(cell('utm_source'), 'jouwtestament');
});

test('appointment without check answers: answers null, e-mail or phone is enough', () => {
  const input = valid() as Record<string, any>;
  delete input.answers;
  input.contact = { name: 'Sam', phone: '0612345678' };
  const result = validateSubmission(input);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.data.answers, null);
    const lead = buildLead(result.data, 'HN-2026-000002', new Date());
    assert.deepEqual(lead.flags, []);
    assert.equal(lead.segment, 'other');
    assert.equal(lead.score, 1);
  }
});

test('requires e-mail or phone, and at least one preference', () => {
  const input = valid() as Record<string, any>;
  input.contact = { name: 'Sam' };
  input.preferences = [];
  const result = validateSubmission(input);
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.includes('contact.email_or_phone'));
    assert.ok(result.errors.includes('preferences'));
  }
});

test('validatePreferences: sorts, dedupes and rejects bad input', () => {
  const now = new Date();
  assert.deepEqual(
    validatePreferences([{ date: day(3), block: 'avond' }, { date: day(1), block: 'middag' }, { date: day(3), block: 'avond' }], now),
    [{ date: day(1), block: 'middag' }, { date: day(3), block: 'avond' }]
  );
  assert.equal(validatePreferences([{ date: day(-1), block: 'ochtend' }], now), null); // in the past
  assert.equal(validatePreferences([{ date: day(90), block: 'ochtend' }], now), null); // too far ahead
  assert.equal(validatePreferences([{ date: day(1), block: 'nacht' }], now), null); // unknown block
  assert.equal(validatePreferences([{ date: '2026-02-30', block: 'ochtend' }], now), null); // impossible date
});

test('sheet row carries type and preferences', () => {
  const result = validateSubmission(valid());
  assert.ok(result.ok);
  const row = leadToRow(buildLead(result.data, 'HN-2026-000009', new Date()));
  assert.equal(row[LEAD_COLUMNS.indexOf('type')], 'afspraak');
  assert.equal(row[LEAD_COLUMNS.indexOf('voorkeuren')], `${day(1)} ochtend, ${day(2)} avond`);
});
