// Check answers and lead model (docs/09-nalatenschapscheck.md, section 6).

export type Situation = 'married' | 'cohabiting' | 'single';
export type Children = 'joint' | 'blended' | 'none';
export type YesNo = 'yes' | 'no';
export type Documents = 'both' | 'will_only' | 'nothing' | 'unknown';
export type Notary = 'network' | 'own' | 'unknown';

export interface Answers {
  situation: Situation;
  children: Children;
  minors?: YesNo;
  home: YesNo;
  documents: Documents;
  notary?: Notary;
}

export type FlagId =
  | 'partner_unprotected'
  | 'minor_children'
  | 'blended_family'
  | 'law_decides'
  | 'home_owner'
  | 'no_lpa'
  | 'review'
  | 'all_good';

export type Segment = 'blended' | 'cohabiting' | 'young_family' | 'homeowner_55plus' | 'other';
export type Priority = 'hoog' | 'middel' | 'laag';
export type LeadStatus = 'nieuw' | 'contact' | 'gesprek' | 'gesloten' | 'geen_match' | 'niet_bereikbaar';

export interface LeadSource {
  landingPage: string;
  segmentPage?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  domain?: 'heldernalaten.nl' | 'jouwtestament.nl';
}

export type TimeBlock = 'ochtend' | 'middag' | 'avond';

/** Preferred moment for the first conversation with an adviser (docs/09, /afspraak). */
export interface Preference {
  date: string; // YYYY-MM-DD
  block: TimeBlock;
}

export interface Lead {
  id: string;
  createdAt: string;
  kind: 'appointment';
  answers: Answers | null; // null when the visitor did not do the check first
  preferences: Preference[];
  flags: FlagId[];
  segment: Segment;
  referralChild: boolean;
  score: number;
  priority: Priority;
  contact: { name: string; email?: string; phone?: string };
  consent: { given: true; text: string; at: string };
  source: LeadSource;
  status: LeadStatus;
  notaryChoice?: 'network' | 'own';
  statusHistory: { status: LeadStatus; at: string; by: string }[];
}
