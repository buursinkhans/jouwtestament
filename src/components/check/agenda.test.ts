import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getAgenda } from './agenda.ts';

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
