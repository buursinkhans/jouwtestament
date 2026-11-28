import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getAgenda, getActionOverview } from './agenda.ts';

test('an owner with adult children and a will gets questions about the house and reviewing the will', () => {
  const agenda = getAgenda({ situation: 'married', children: 'joint', minors: 'no', home: 'yes', documents: 'will_only' });
  assert.match(agenda.home.join(' '), /huis willen overnemen/);
  assert.match(agenda.notary.join(' '), /bestaande testament/);
  assert.match(agenda.notary.join(' '), /familieleningen.*als die er zijn/);
});

test('an adult child can prepare a conversation without giving answers on behalf of their parents', () => {
  const agenda = getAgenda();
  assert.equal(agenda.home.length, 3);
  assert.equal(agenda.notary.length, 3);
  assert.ok([...agenda.home, ...agenda.notary].every((question) => question.endsWith('?')));
  assert.match(agenda.home[0], /jullie/);
});

test('a blended family with minors gets questions about both the family and guardianship', () => {
  const agenda = getAgenda({ situation: 'cohabiting', children: 'blended', minors: 'yes', home: 'yes', documents: 'nothing' });
  assert.match(agenda.home.join(' '), /stiefkinderen/);
  assert.match(agenda.notary.join(' '), /voogd/);
  assert.equal(agenda.home.length, 3);
  assert.equal(agenda.notary.length, 3);
});

test('practical overview for a renter without children avoids assumptions about a house or children', () => {
  const overview = getActionOverview({ situation: 'single', children: 'none', home: 'no', documents: 'nothing' }, 'documents');
  assert.equal(overview.practical[0].topic, 'Papieren en polissen');
  assert.doesNotMatch([...overview.home, ...overview.notary].join(' '), /huis|kinderen/);
});

test('withheld answers still give a usable overview and a neutral question for the notary', () => {
  const overview = getActionOverview({ documents: 'unknown' }, 'review');
  assert.ok(overview.practical.length && overview.home.length && overview.notary.length);
  assert.match(overview.notary[0], /laten nakijken/);
  assert.doesNotMatch(overview.home.join(' '), /partner|kinderen|huis/);
});

test('the parents route asks where papers are without requesting balances or a will', () => {
  const overview = getActionOverview();
  assert.match(overview.home.join(' '), /papieren.*willen delen/);
  assert.doesNotMatch(overview.home.join(' '), /bedrag|hoeveel|testament/);
});
