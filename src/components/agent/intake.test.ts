// Unit tests for the intake form logic (owner 2026-10-01). Run with: npm run test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { intakeToDossier, prefillFromCheck, validateIntake } from './intake.ts';
import { missingRequired } from './dossier.ts';

const base = {
  name: '  Anna   de Vries ',
  birthYear: '1980',
  otherNationality: 'no',
  abroad: 'no',
  relationship: 'married',
  regime: 'limited',
  since: '2019',
  partnerName: 'Tom',
  stepchildren: 'no',
  togetherWithPartner: 'yes',
  earlierRelationship: 'no',
  hasChildren: 'yes',
  children: [{ name: 'Mila', birthYear: '2020', relation: 'joint' }],
  home: 'owner',
  homeOwner: 'together',
  business: 'no',
  documents: ['will'],
  willYear: '2019',
  notary: 'network',
};

test('validateIntake accepts a complete form and cleans the values', () => {
  const intake = validateIntake(base)!;
  assert.equal(intake.name, 'Anna de Vries');
  assert.equal(intake.birthYear, 1980);
  assert.deepEqual(intake.children, [{ name: 'Mila', birthYear: 2020, relation: 'joint' }]);
  assert.equal(intake.willYear, 2019);
});

test('validateIntake rejects missing or invalid required answers', () => {
  assert.equal(validateIntake({ ...base, name: '' }), null);
  assert.equal(validateIntake({ ...base, birthYear: '1850' }), null);
  assert.equal(validateIntake({ ...base, regime: undefined }), null);
  assert.equal(validateIntake({ ...base, children: [] }), null);
  assert.equal(validateIntake({ ...base, children: [{ name: 'Mila', birthYear: '2020', relation: 'x' }] }), null);
  assert.equal(validateIntake({ ...base, documents: [] }), null);
  assert.equal(validateIntake('nope'), null);
});

test('questions that do not apply are not required and are dropped', () => {
  const intake = validateIntake({
    ...base,
    relationship: 'single',
    regime: undefined,
    stepchildren: undefined,
    togetherWithPartner: undefined,
    homeOwner: undefined,
    hasChildren: 'no',
    children: [{ name: 'ignored', birthYear: '2000', relation: 'own' }],
  })!;
  assert.ok(intake);
  assert.equal(intake.regime, undefined);
  assert.equal(intake.partnerName, undefined);
  assert.equal(intake.homeOwner, 'me');
  assert.deepEqual(intake.children, []);
});

test('"Nog niets" wins over other document choices', () => {
  assert.deepEqual(validateIntake({ ...base, documents: ['will', 'none'] })!.documents, ['none']);
});

test('intakeToDossier fills the basic required fields, leaving wishes to the conversation', () => {
  const dossier = intakeToDossier(validateIntake(base)!);
  assert.equal(dossier.naam, 'Anna de Vries');
  assert.equal(dossier.burgerlijke_staat, 'Getrouwd sinds 2019');
  assert.match(dossier.kinderen, /Mila \(2020, samen met partner\)/);
  assert.match(dossier.woning, /beide partners/);
  assert.equal(dossier.bestaande_documenten, 'Testament (2019)');
  assert.deepEqual(missingRequired(dossier).sort(), ['erfgenamen_verdeling', 'motivatie']);
});

test('"weet ik niet" is marked so the agent explains it', () => {
  const dossier = intakeToDossier(validateIntake({ ...base, regime: 'unknown' })!);
  assert.match(dossier.huwelijksvoorwaarden_samenlevingscontract, /weet ik niet \(kort uitleggen\)/);
});

test('prefillFromCheck maps check answers onto the form', () => {
  assert.deepEqual(prefillFromCheck({ situation: 'cohabiting', children: 'blended', home: 'yes', documents: 'both' }), {
    relationship: 'cohabiting',
    hasChildren: 'yes',
    earlierRelationship: 'yes',
    home: 'owner',
    documents: ['will', 'lpa'],
  });
  assert.deepEqual(prefillFromCheck(undefined), {});
});
