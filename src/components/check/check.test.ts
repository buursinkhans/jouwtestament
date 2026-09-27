// Unit tests for the check logic (docs/09). Run with: npm run test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getFlags } from './getFlags.ts';
import { getSegment, isReferralChild } from './getSegment.ts';
import { getScore, getPriority } from './score.ts';
import { prefill } from './prefill.ts';
import type { Answers } from './types.ts';

const base: Answers = { situation: 'married', children: 'none', home: 'no', documents: 'both' };
const a = (overrides: Partial<Answers>): Answers => ({ ...base, ...overrides });

// getFlags: one test per rule
test('partner_unprotected: cohabiting without documents', () => {
  assert.ok(getFlags(a({ situation: 'cohabiting', documents: 'nothing' })).includes('partner_unprotected'));
  assert.ok(getFlags(a({ situation: 'cohabiting', documents: 'unknown' })).includes('partner_unprotected'));
  assert.ok(!getFlags(a({ situation: 'cohabiting', documents: 'will_only' })).includes('partner_unprotected'));
  assert.ok(!getFlags(a({ situation: 'married', documents: 'nothing' })).includes('partner_unprotected'));
});

test('minor_children: minors without full documents', () => {
  for (const documents of ['nothing', 'unknown', 'will_only'] as const) {
    assert.ok(getFlags(a({ children: 'joint', minors: 'yes', documents })).includes('minor_children'));
  }
  assert.ok(!getFlags(a({ children: 'joint', minors: 'yes', documents: 'both' })).includes('minor_children'));
  assert.ok(!getFlags(a({ children: 'joint', minors: 'no', documents: 'nothing' })).includes('minor_children'));
});

test('blended_family: children from earlier relationship', () => {
  assert.ok(getFlags(a({ children: 'blended' })).includes('blended_family'));
  assert.ok(!getFlags(a({ children: 'joint' })).includes('blended_family'));
});

test('law_decides: single without children', () => {
  assert.ok(getFlags(a({ situation: 'single', children: 'none' })).includes('law_decides'));
  assert.ok(!getFlags(a({ situation: 'single', children: 'joint' })).includes('law_decides'));
});

test('home_owner: owns a home', () => {
  assert.ok(getFlags(a({ home: 'yes' })).includes('home_owner'));
  assert.ok(!getFlags(a({ home: 'no' })).includes('home_owner'));
});

test('no_lpa: anything but both documents', () => {
  assert.ok(getFlags(a({ documents: 'will_only' })).includes('no_lpa'));
  assert.ok(!getFlags(a({ documents: 'both' })).includes('no_lpa'));
});

test('review: has or might have documents', () => {
  for (const documents of ['will_only', 'unknown'] as const) {
    assert.ok(getFlags(a({ documents })).includes('review'));
  }
  assert.ok(getFlags(a({ documents: 'both', home: 'yes' })).includes('review'));
  assert.ok(!getFlags(a({ documents: 'nothing' })).includes('review'));
});

test('every answer set yields at least one flag', () => {
  for (const situation of ['married', 'cohabiting', 'single'] as const)
    for (const children of ['joint', 'blended', 'none'] as const)
      for (const minors of [undefined, 'yes', 'no'] as const)
        for (const home of ['yes', 'no'] as const)
          for (const documents of ['both', 'will_only', 'nothing', 'unknown'] as const) {
            assert.ok(getFlags({ situation, children, minors, home, documents }).length >= 1);
          }
});

test('all_good: both documents and no other risks', () => {
  assert.deepEqual(getFlags(a({ documents: 'both' })), ['all_good']);
  assert.deepEqual(getFlags(a({ children: 'joint', minors: 'no', documents: 'both' })), ['all_good']);
});

test('all_good is not shown when there is another risk', () => {
  assert.deepEqual(getFlags(a({ documents: 'both', home: 'yes' })), ['home_owner', 'review']);
  assert.ok(!getFlags(a({ documents: 'will_only' })).includes('all_good'));
});

test('flags keep the documented order', () => {
  const flags = getFlags({ situation: 'cohabiting', children: 'blended', minors: 'yes', home: 'yes', documents: 'unknown' });
  assert.deepEqual(flags, ['partner_unprotected', 'minor_children', 'blended_family', 'home_owner', 'no_lpa', 'review']);
});

// getSegment
test('segment: first match wins', () => {
  assert.equal(getSegment(a({ situation: 'cohabiting', children: 'blended' })), 'blended');
  assert.equal(getSegment(a({ situation: 'cohabiting', minors: 'yes' })), 'cohabiting');
  assert.equal(getSegment(a({ children: 'joint', minors: 'yes' })), 'young_family');
  assert.equal(getSegment(a({ home: 'yes', documents: 'will_only' })), 'homeowner_55plus');
  assert.equal(getSegment(a({ home: 'yes', documents: 'nothing' }), '55-plus'), 'homeowner_55plus');
  assert.equal(getSegment(a({ home: 'yes', documents: 'nothing' })), 'other');
  assert.equal(getSegment(a({})), 'other');
});

test('referral child via je-ouders page or ?ref=kind', () => {
  assert.equal(isReferralChild('je-ouders'), true);
  assert.equal(isReferralChild(undefined, 'kind'), true);
  assert.equal(isReferralChild('samenwonen'), false);
});

// score
test('score adds up and maps to priority', () => {
  const max = getScore({ situation: 'cohabiting', children: 'blended', minors: 'yes', home: 'yes', documents: 'nothing' }, true);
  assert.equal(max, 13);
  assert.equal(getScore(a({}), false), 0);
  assert.equal(getScore(a({ documents: 'unknown' }), true), 3);
  assert.equal(getPriority(6), 'hoog');
  assert.equal(getPriority(5), 'middel');
  assert.equal(getPriority(3), 'middel');
  assert.equal(getPriority(2), 'laag');
});

// prefill
test('prefill maps Dutch URL parameters', () => {
  assert.deepEqual(prefill(new URLSearchParams('situatie=samenwonend')), { situation: 'cohabiting' });
  assert.deepEqual(prefill(new URLSearchParams('kinderen=eerder&minderjarig=ja&woning=nee')), {
    children: 'blended',
    minors: 'yes',
    home: 'no',
  });
});

test('prefill ignores unknown values', () => {
  assert.deepEqual(prefill(new URLSearchParams('situatie=onbekend&foo=bar')), {});
});
