// Server-side lead handling (docs/09 sections 3, 5, 6; docs/10 "submit-lead").
// Validates a submission and builds the Lead record (flags, segment, score computed here,
// never trusted from the client). Pure functions: storage and mail live in the function.
import { getFlags } from './getFlags.ts';
import { getSegment, isReferralChild } from './getSegment.ts';
import { getScore, getPriority } from './score.ts';
import type { Answers, Lead, LeadSource } from './types.ts';

export interface Submission {
  answers: Answers;
  contact: { name: string; email: string; phone?: string };
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
  for (const key of ['situation', 'children', 'home', 'documents']) {
    if (!answers[key] && !errors.includes(`answers.${key}`)) errors.push(`answers.${key}`);
  }
  // Question 2b is required when there are children, and meaningless without them
  if (answers.children && answers.children !== 'none' && !answers.minors) errors.push('answers.minors');
  if (answers.children === 'none') delete answers.minors;

  const rawContact = isObject(input.contact) ? input.contact : {};
  const name = str(rawContact.name);
  const email = str(rawContact.email);
  const phone = str(rawContact.phone)?.replace(/[\s-]/g, '');
  if (!name || name.length < 2) errors.push('contact.name');
  if (!email || !emailPattern.test(email)) errors.push('contact.email');
  if (phone !== undefined && !phonePattern.test(phone)) errors.push('contact.phone');

  const rawConsent = isObject(input.consent) ? input.consent : {};
  const consentText = str(rawConsent.text);
  if (rawConsent.given !== true || !consentText) errors.push('consent');

  if (errors.length > 0) return { ok: false, errors };

  const rawSource = isObject(input.source) ? input.source : {};
  const domain = rawSource.domain === 'heldernalaten.nl' ? 'heldernalaten.nl' : 'jouwtestament.nl';

  return {
    ok: true,
    data: {
      answers: answers as unknown as Answers,
      contact: { name: name!, email: email!, ...(phone ? { phone } : {}) },
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

/** Lead id "HN-2026-000123". The sequence number comes from storage. */
export function formatLeadId(year: number, sequence: number): string {
  return `HN-${year}-${String(sequence).padStart(6, '0')}`;
}

export function buildLead(submission: Submission, id: string, now: Date): Lead {
  const { answers, contact, consent, source } = submission;
  const score = getScore(answers, Boolean(contact.phone));
  const { ref, ...leadSource } = source;
  const createdAt = now.toISOString();
  return {
    id,
    createdAt,
    answers,
    flags: getFlags(answers),
    segment: getSegment(answers, source.segmentPage),
    referralChild: isReferralChild(source.segmentPage, ref),
    score,
    priority: getPriority(score),
    contact,
    consent,
    source: leadSource,
    status: 'nieuw',
    ...(answers.notary === 'network' || answers.notary === 'own' ? { notaryChoice: answers.notary } : {}),
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
    ...lead.answers,
    ...lead.source,
    consentText: lead.consent.text,
    consentAt: lead.consent.at,
    statusHistory: JSON.stringify(lead.statusHistory),
  };
  return LEAD_COLUMNS.map((column) => (values[column] === undefined ? '' : String(values[column])));
}
