// Intake form for the self-service agent (owner 2026-10-01): the basic questions that are always
// asked (name, birth year, relationship, children, home, documents, notary) are a form instead of
// conversation turns, to save tokens. The agent starts with these answers already in the dossier
// and only handles what needs explanation or open answers. Shared by the page and the chat function.
import type { Dossier } from './dossier';

export type YesNo = 'yes' | 'no';
export type Relationship = 'married' | 'registered' | 'cohabiting' | 'single' | 'divorced' | 'widowed';
export type MaritalRegime = 'community' | 'limited' | 'prenup' | 'unknown';
export type CohabitationContract = 'notarial' | 'private' | 'none' | 'unknown';
export type ChildRelation = 'joint' | 'earlier' | 'own';
export type Home = 'owner' | 'rent' | 'none';
export type HomeOwner = 'me' | 'together' | 'partner';
export type ExistingDocument = 'will' | 'lpa' | 'codicil' | 'none' | 'unknown';
export type Notary = 'network' | 'own' | 'unknown';

export interface IntakeChild {
  name: string;
  birthYear: number;
  relation: ChildRelation;
}

export interface Intake {
  name: string;
  birthYear: number;
  city?: string;
  otherNationality: YesNo;
  abroad: YesNo;
  relationship: Relationship;
  partnerName?: string;
  since?: number;
  regime?: MaritalRegime;
  contract?: CohabitationContract;
  earlierRelationship: YesNo;
  hasChildren: YesNo;
  children: IntakeChild[];
  stepchildren?: YesNo;
  home: Home;
  homeOwner?: HomeOwner;
  business: YesNo;
  documents: ExistingDocument[];
  willYear?: number;
  notary: Notary;
  togetherWithPartner?: YesNo | 'unknown';
}

export const MAX_CHILDREN = 12;
// The intake enters the history as 5 synthetic messages (netlify/functions/lib/agentCore.ts);
// the page hides them.
export const INTAKE_TOOL_ID = 'toolu_intake_form';
export const INTAKE_MESSAGES = 5;
const THIS_YEAR = new Date().getFullYear();

export const hasPartner = (relationship: Relationship) =>
  relationship === 'married' || relationship === 'registered' || relationship === 'cohabiting';
export const isMarried = (relationship: Relationship) => relationship === 'married' || relationship === 'registered';

// ---------- validation (server and browser) ----------

const text = (value: unknown, max: number) =>
  typeof value === 'string' && value.trim() ? value.trim().replace(/\s+/g, ' ').slice(0, max) : undefined;
const year = (value: unknown, min: number) => {
  const n = typeof value === 'string' ? Number(value) : value;
  return typeof n === 'number' && Number.isInteger(n) && n >= min && n <= THIS_YEAR ? n : undefined;
};
const oneOf = <T extends string>(value: unknown, options: readonly T[]) =>
  options.includes(value as T) ? (value as T) : undefined;

const YES_NO = ['yes', 'no'] as const;

/** Returns a clean Intake, or null when a required answer is missing or invalid. */
export function validateIntake(raw: unknown): Intake | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;

  const name = text(r.name, 100);
  const birthYear = year(r.birthYear, 1900);
  const otherNationality = oneOf(r.otherNationality, YES_NO);
  const abroad = oneOf(r.abroad, YES_NO);
  const relationship = oneOf(r.relationship, ['married', 'registered', 'cohabiting', 'single', 'divorced', 'widowed'] as const);
  const earlierRelationship = oneOf(r.earlierRelationship, YES_NO);
  const hasChildren = oneOf(r.hasChildren, YES_NO);
  const home = oneOf(r.home, ['owner', 'rent', 'none'] as const);
  const business = oneOf(r.business, YES_NO);
  const notary = oneOf(r.notary, ['network', 'own', 'unknown'] as const);
  if (!name || !birthYear || !otherNationality || !abroad || !relationship || !earlierRelationship) return null;
  if (!hasChildren || !home || !business || !notary) return null;

  const documents = Array.isArray(r.documents)
    ? [...new Set(r.documents.map((d) => oneOf(d, ['will', 'lpa', 'codicil', 'none', 'unknown'] as const)))].filter(
        (d): d is ExistingDocument => Boolean(d)
      )
    : [];
  if (documents.length === 0) return null;

  const children: IntakeChild[] = [];
  if (hasChildren === 'yes') {
    if (!Array.isArray(r.children)) return null;
    for (const child of r.children.slice(0, MAX_CHILDREN)) {
      const c = (child ?? {}) as Record<string, unknown>;
      const childName = text(c.name, 80);
      const childYear = year(c.birthYear, 1900);
      const relation = oneOf(c.relation, ['joint', 'earlier', 'own'] as const);
      if (!childName || !childYear || !relation) return null;
      children.push({ name: childName, birthYear: childYear, relation });
    }
    if (children.length === 0) return null;
  }

  const partner = hasPartner(relationship);
  const married = isMarried(relationship);
  const intake: Intake = {
    name,
    birthYear,
    city: text(r.city, 80),
    otherNationality,
    abroad,
    relationship,
    earlierRelationship,
    hasChildren,
    children,
    home,
    business,
    documents: documents.includes('none') ? ['none'] : documents,
    notary,
  };
  if (partner) {
    intake.partnerName = text(r.partnerName, 100);
    intake.stepchildren = oneOf(r.stepchildren, YES_NO);
    intake.togetherWithPartner = oneOf(r.togetherWithPartner, ['yes', 'no', 'unknown'] as const);
    if (!intake.stepchildren || !intake.togetherWithPartner) return null;
  }
  if (married) {
    intake.since = year(r.since, 1900);
    intake.regime = oneOf(r.regime, ['community', 'limited', 'prenup', 'unknown'] as const);
    if (!intake.regime) return null;
  }
  if (relationship === 'cohabiting') {
    intake.contract = oneOf(r.contract, ['notarial', 'private', 'none', 'unknown'] as const);
    if (!intake.contract) return null;
  }
  if (home === 'owner') {
    intake.homeOwner = oneOf(r.homeOwner, partner ? (['me', 'together', 'partner'] as const) : (['me'] as const));
    if (!intake.homeOwner) intake.homeOwner = partner ? undefined : 'me';
    if (!intake.homeOwner) return null;
  }
  if (intake.documents.includes('will')) intake.willYear = year(r.willYear, 1900);
  return intake;
}

// ---------- intake → dossier (short Dutch text, like the agent writes it) ----------

const UNKNOWN = 'weet ik niet (kort uitleggen)';

const relationshipText: Record<Relationship, string> = {
  married: 'Getrouwd',
  registered: 'Geregistreerd partnerschap',
  cohabiting: 'Samenwonend, niet getrouwd',
  single: 'Alleenstaand',
  divorced: 'Gescheiden',
  widowed: 'Weduwe of weduwnaar',
};
const regimeText: Record<MaritalRegime, string> = {
  community: 'Gemeenschap van goederen',
  limited: 'Beperkte gemeenschap van goederen (huwelijk vanaf 2018)',
  prenup: 'Huwelijksvoorwaarden',
  unknown: `Huwelijksgoederenregime: ${UNKNOWN}`,
};
const contractText: Record<CohabitationContract, string> = {
  notarial: 'Notarieel samenlevingscontract',
  private: 'Zelf opgesteld (onderhands) samenlevingscontract',
  none: 'Geen samenlevingscontract',
  unknown: `Samenlevingscontract: ${UNKNOWN}`,
};
const childRelationText: Record<ChildRelation, string> = {
  joint: 'samen met partner',
  earlier: 'uit eerdere relatie',
  own: 'eigen kind',
};
const documentText: Record<ExistingDocument, string> = {
  will: 'testament',
  lpa: 'levenstestament',
  codicil: 'codicil',
  none: 'Nog niets geregeld',
  unknown: `Bestaande documenten: ${UNKNOWN}`,
};
const notaryText: Record<Notary, string> = {
  network: 'Notaris uit het netwerk van Helder Nalaten',
  own: 'Eigen notaris',
  unknown: 'Weet nog niet welke notaris',
};

export function intakeToDossier(intake: Intake): Dossier {
  const partner = hasPartner(intake.relationship);
  const married = isMarried(intake.relationship);
  const na = 'niet van toepassing';

  const nationality = intake.otherNationality === 'yes' ? 'Andere of meerdere nationaliteiten (nog navragen welke)' : 'Nederlandse nationaliteit';
  const abroad = intake.abroad === 'yes' ? 'woont of heeft bezit in het buitenland (nog bespreken)' : 'geen woonplaats of bezit in het buitenland';

  const relationship = relationshipText[intake.relationship] + (married && intake.since ? ` sinds ${intake.since}` : '');
  const regime = married ? regimeText[intake.regime!] : intake.relationship === 'cohabiting' ? contractText[intake.contract!] : na;

  const children =
    intake.hasChildren === 'no'
      ? 'Geen kinderen'
      : intake.children.map((c) => `${c.name} (${c.birthYear}, ${childRelationText[c.relation]})`).join('; ');

  const homeText =
    intake.home === 'owner'
      ? `Koopwoning, op naam van ${intake.homeOwner === 'together' ? 'beide partners' : intake.homeOwner === 'partner' ? 'de partner' : 'de gebruiker'}`
      : intake.home === 'rent'
        ? 'Huurwoning'
        : 'Geen eigen woning';

  const documents = intake.documents
    .map((d) => (d === 'will' && intake.willYear ? `testament (${intake.willYear})` : documentText[d]))
    .join(', ');

  const dossier: Dossier = {
    naam: intake.name,
    geboortedatum: `Geboortejaar ${intake.birthYear}`,
    nationaliteit_buitenland: `${nationality}; ${abroad}`,
    burgerlijke_staat: relationship,
    partner: partner ? (intake.partnerName ?? 'naam nog niet ingevuld') : na,
    huwelijksvoorwaarden_samenlevingscontract: regime,
    eerdere_relaties: intake.earlierRelationship === 'yes' ? 'Ja, eerdere relatie of huwelijk (nog bespreken)' : 'Geen eerdere relaties',
    kinderen: children,
    stiefkinderen: partner ? (intake.stepchildren === 'yes' ? 'Ja (nog bespreken of zij moeten erven)' : 'Geen stiefkinderen') : na,
    woning: homeText,
    onderneming: intake.business === 'yes' ? 'Ja, eigen onderneming of aandelen in een bv (nog bespreken)' : 'Nee',
    bestaande_documenten: documents.charAt(0).toUpperCase() + documents.slice(1),
    notaris_keuze: notaryText[intake.notary],
    samen_met_partner: partner
      ? intake.togetherWithPartner === 'yes'
        ? 'Ja, partner maakt ook een testament'
        : intake.togetherWithPartner === 'no'
          ? 'Nee'
          : 'Weet nog niet'
      : na,
  };
  if (intake.city) dossier.woonplaats = intake.city;
  return dossier;
}

// ---------- prefill from the free check (docs/09) ----------

/** Answers from the check that map onto the form; the visitor can still change them. */
export function prefillFromCheck(answers: Record<string, string> | undefined): Partial<Record<string, string | string[]>> {
  if (!answers) return {};
  const prefill: Partial<Record<string, string | string[]>> = {};
  if (answers.situation === 'married') prefill.relationship = 'married';
  if (answers.situation === 'cohabiting') prefill.relationship = 'cohabiting';
  if (answers.situation === 'single') prefill.relationship = 'single';
  if (answers.children === 'none') prefill.hasChildren = 'no';
  if (answers.children === 'joint' || answers.children === 'blended') prefill.hasChildren = 'yes';
  if (answers.children === 'blended') prefill.earlierRelationship = 'yes';
  if (answers.home === 'yes') prefill.home = 'owner';
  const documents: Record<string, string[]> = { both: ['will', 'lpa'], will_only: ['will'], nothing: ['none'], unknown: ['unknown'] };
  if (documents[answers.documents]) prefill.documents = documents[answers.documents];
  if (answers.notary === 'network' || answers.notary === 'own' || answers.notary === 'unknown') prefill.notary = answers.notary;
  return prefill;
}
