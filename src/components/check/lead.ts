// Server-side lead handling (docs/09 sections 3, 5, 6; docs/10 "submit-lead").
// Validates a submission and builds the Lead record (flags, segment, score computed here,
// never trusted from the client). Pure functions: storage and mail live in the function.
import { getFlags } from './getFlags.ts';
import { getSegment, isReferralChild } from './getSegment.ts';
import { getScore, getPriority } from './score.ts';
import type { Answers, Lead, LeadSource, Preference, TimeBlock } from './types.ts';

export interface Submission {
  answers: Answers | null;
  preferences: Preference[];
  contact: { name: string; email?: string; phone?: string };
  consent: { given: true; text: string; at: string };
  source: LeadSource & { ref?: string };
  honeypot: boolean;
}

export type ValidationResult = { ok: true; data: Submission } | { ok: false; errors: string[] };

const options = {
  situation: ['married', 'cohabiting', 'single'],
  children: ['joint', 'blended', 'none'],
  minors: ['yes', 'no'],
  home: ['yes', 'no'],
  documents: ['both', 'will_only', 'nothing', 'unknown'],
  notary: ['network', 'own', 'unknown'],
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const TIME_BLOCKS: TimeBlock[] = ['ochtend', 'middag', 'avond'];
const MAX_PREFERENCES = 42; // two weeks x three blocks
const MAX_DAYS_AHEAD = 60;
const phonePattern = /^(\+31|0031|0)[1-9]\d{8}$/;
const MAX_TEXT = 500;

const str = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() !== '' ? value.trim().slice(0, MAX_TEXT) : undefined;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function validateSubmission(input: unknown): ValidationResult {
  const errors: string[] = [];
  if (!isObject(input)) return { ok: false, errors: ['body'] };

  const rawAnswers = isObject(input.answers) ? input.answers : {};
  const answers: Record<string, string> = {};
  for (const [key, allowed] of Object.entries(options)) {
    const value = rawAnswers[key];
    if (value === undefined || value === '') continue;
    if (typeof value !== 'string' || !(allowed as readonly string[]).includes(value)) errors.push(`answers.${key}`);
    else answers[key] = value;
  }
  // Check answers are optional (the visitor may skip the check), but if any are given they must be complete
  const hasAnswers = Object.keys(answers).length > 0 || errors.length > 0;
  if (hasAnswers) {
    for (const key of ['situation', 'children', 'home', 'documents']) {
      if (!answers[key] && !errors.includes(`answers.${key}`)) errors.push(`answers.${key}`);
    }
  }
  // Question 2b is required when there are children, and meaningless without them
  if (answers.children && answers.children !== 'none' && !answers.minors) errors.push('answers.minors');
  if (answers.children === 'none') delete answers.minors;

  const rawContact = isObject(input.contact) ? input.contact : {};
  const name = str(rawContact.name);
  const email = str(rawContact.email);
  const phone = str(rawContact.phone)?.replace(/[\s-]/g, '');
  if (!name || name.length < 2) errors.push('contact.name');
  // At least one way to reach the visitor: e-mail or phone
  if (email !== undefined && !emailPattern.test(email)) errors.push('contact.email');
  if (phone !== undefined && !phonePattern.test(phone)) errors.push('contact.phone');
  if (email === undefined && phone === undefined) errors.push('contact.email_or_phone');

  const preferences = validatePreferences(input.preferences, new Date());
  if (!preferences) errors.push('preferences');

  const rawConsent = isObject(input.consent) ? input.consent : {};
  const consentText = str(rawConsent.text);
  if (rawConsent.given !== true || !consentText) errors.push('consent');

  if (errors.length > 0) return { ok: false, errors };

  const rawSource = isObject(input.source) ? input.source : {};
  const domain = rawSource.domain === 'jouwtestament.nl' ? 'jouwtestament.nl' : 'heldernalaten.nl';

  return {
    ok: true,
    data: {
      answers: hasAnswers ? (answers as unknown as Answers) : null,
      preferences: preferences!,
      contact: { name: name!, ...(email ? { email } : {}), ...(phone ? { phone } : {}) },
      consent: { given: true, text: consentText!, at: str(rawConsent.at) ?? new Date().toISOString() },
      source: {
        landingPage: str(rawSource.landingPage) ?? '/',
        segmentPage: str(rawSource.segmentPage),
        ref: str(rawSource.ref),
        utm_source: str(rawSource.utm_source),
        utm_medium: str(rawSource.utm_medium),
        utm_campaign: str(rawSource.utm_campaign),
        referrer: str(rawSource.referrer),
        domain,
      },
      honeypot: str(input.company_website) !== undefined,
    },
  };
}

/** 1..42 unique {date, block} pairs, from today up to 60 days ahead. Returns null when invalid. */
export function validatePreferences(input: unknown, now: Date): Preference[] | null {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_PREFERENCES) return null;
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const seen = new Set<string>();
  const result: Preference[] = [];
  for (const item of input) {
    if (!isObject(item) || typeof item.date !== 'string' || typeof item.block !== 'string') return null;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !TIME_BLOCKS.includes(item.block as TimeBlock)) return null;
    const date = new Date(`${item.date}T00:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== item.date) return null;
    const days = (date.getTime() - today.getTime()) / 86_400_000;
    if (days < 0 || days > MAX_DAYS_AHEAD) return null;
    const key = `${item.date} ${item.block}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ date: item.date, block: item.block as TimeBlock });
  }
  return result.sort((a, b) => (a.date + TIME_BLOCKS.indexOf(a.block)).localeCompare(b.date + TIME_BLOCKS.indexOf(b.block)));
}

/** Lead id "HN-2026-000123". The sequence number comes from storage. */
export function formatLeadId(year: number, sequence: number): string {
  return `HN-${year}-${String(sequence).padStart(6, '0')}`;
}

export function buildLead(submission: Submission, id: string, now: Date): Lead {
  const { answers, preferences, contact, consent, source } = submission;
  const score = answers ? getScore(answers, Boolean(contact.phone)) : contact.phone ? 1 : 0;
  const { ref, ...leadSource } = source;
  const createdAt = now.toISOString();
  return {
    id,
    createdAt,
    kind: 'appointment',
    answers,
    preferences,
    flags: answers ? getFlags(answers) : [],
    segment: answers ? getSegment(answers, source.segmentPage) : 'other',
    referralChild: isReferralChild(source.segmentPage, ref),
    score,
    priority: getPriority(score),
    contact,
    consent,
    source: leadSource,
    status: 'nieuw',
    ...(answers?.notary === 'network' || answers?.notary === 'own' ? { notaryChoice: answers.notary } : {}),
    statusHistory: [{ status: 'nieuw', at: createdAt, by: 'website' }],
  };
}

// Google Sheet columns (phase 1 storage, docs/10). The partner updates "status" in the sheet.
export const LEAD_COLUMNS = [
  'id',
  'createdAt',
  'status',
  'priority',
  'score',
  'segment',
  'referralChild',
  'flags',
  'name',
  'email',
  'phone',
  'situation',
  'children',
  'minors',
  'home',
  'documents',
  'notary',
  'landingPage',
  'segmentPage',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'referrer',
  'domain',
  'consentText',
  'consentAt',
  'statusHistory',
  // added 2026-09-28 (appointment page): append these headers to row 1 of the sheet
  'type',
  'voorkeuren',
] as const;

export function leadToRow(lead: Lead): string[] {
  const values: Partial<Record<(typeof LEAD_COLUMNS)[number], unknown>> = {
    id: lead.id,
    createdAt: lead.createdAt,
    status: lead.status,
    priority: lead.priority,
    score: lead.score,
    segment: lead.segment,
    referralChild: lead.referralChild ? 'ja' : 'nee',
    flags: lead.flags.join(', '),
    name: lead.contact.name,
    email: lead.contact.email,
    phone: lead.contact.phone,
    ...(lead.answers ?? {}),
    ...lead.source,
    consentText: lead.consent.text,
    consentAt: lead.consent.at,
    statusHistory: JSON.stringify(lead.statusHistory),
    type: lead.kind === 'appointment' ? 'afspraak' : lead.kind,
    voorkeuren: lead.preferences.map((p) => `${p.date} ${p.block}`).join(', '),
  };
  return LEAD_COLUMNS.map((column) => (values[column] === undefined ? '' : String(values[column])));
}
