// Attention points shown as the check result (docs/09, section 4).
// Rules are evaluated in this order; at least one flag is always returned.
// all_good (owner decision 2026-09-27): shown when nothing applies, or when "review" is the only
// flag (both documents, no other risks). Its text already advises a short check of the documents.
// TODO(review-partner): all flag texts.
import type { Answers, FlagId } from './types.ts';

export interface FlagContent {
  title: string;
  text: string;
  href: string;
}

const rules: { id: Exclude<FlagId, 'all_good'>; applies: (a: Answers) => boolean }[] = [
  {
    id: 'partner_unprotected',
    applies: (a) => a.situation === 'cohabiting' && (a.documents === 'nothing' || a.documents === 'unknown'),
  },
  {
    id: 'minor_children',
    applies: (a) => a.minors === 'yes' && ['nothing', 'unknown', 'will_only'].includes(a.documents),
  },
  { id: 'blended_family', applies: (a) => a.children === 'blended' },
  { id: 'law_decides', applies: (a) => a.situation === 'single' && a.children === 'none' },
  { id: 'home_owner', applies: (a) => a.home === 'yes' },
  { id: 'no_lpa', applies: (a) => a.documents !== 'both' },
  { id: 'review', applies: (a) => ['will_only', 'both', 'unknown'].includes(a.documents) },
];

export function getFlags(answers: Answers): FlagId[] {
  const flags: FlagId[] = rules.filter((rule) => rule.applies(answers)).map((rule) => rule.id);
  const onlyReview = flags.length === 1 && flags[0] === 'review';
  return flags.length === 0 || onlyReview ? ['all_good'] : flags;
}

export const flagContent: Record<FlagId, FlagContent> = {
  partner_unprotected: {
    title: 'Je partner is financieel niet beschermd',
    text: 'Als je samenwoont zonder huwelijk of geregistreerd partnerschap, erft je partner zonder testament niets. Zonder notarieel samenlevingscontract betaalt je partner bovendien vaak het hoogste tarief erfbelasting.',
    href: '/voor-wie/samenwonen',
  },
  minor_children: {
    title: 'Regel voogdij en het geld van je kinderen',
    text: 'Zonder testament wijst de rechter een voogd aan en krijgen je kinderen hun erfenis op hun 18e. Je kunt zelf een voogd en een beheerder kiezen.',
    href: '/voor-wie/jonge-kinderen',
  },
  blended_family: {
    title: 'Samengesteld gezin: extra aandacht nodig',
    text: 'Stiefkinderen erven zonder testament niet. En de volgorde van overlijden kan grote gevolgen hebben voor wie uiteindelijk wat krijgt.',
    href: '/voor-wie/samengesteld-gezin',
  },
  law_decides: {
    title: 'De wet kiest je erfgenamen',
    text: 'Zonder testament gaat je vermogen naar familie volgens een vaste volgorde. Wil je iemand anders bedenken, zoals vrienden of een goed doel, dan moet je dat vastleggen.',
    href: '/tips#codicil',
  },
  home_owner: {
    title: 'Je woning is je grootste nalatenschap',
    text: 'Denk na over wie in de woning mag blijven wonen en hoe de waarde wordt verdeeld, zodat niemand gedwongen moet verkopen of in discussie belandt.',
    href: '/voor-wie/55-plus',
  },
  no_lpa: {
    title: 'Geen levenstestament',
    text: 'Als je zelf niet meer kunt beslissen, kan niemand zomaar bij je rekeningen of je huis verkopen. Dan moet eerst de rechter iemand aanwijzen, wat al snel maanden duurt.',
    href: '/tips#actueel',
  },
  review: {
    title: 'Klopt je regeling nog?',
    text: 'Een testament dat een paar jaar oud is, past vaak niet meer bij je leven, je vermogen of de regels. Laat het periodiek checken.',
    href: '/tips#actueel',
  },
  all_good: {
    title: 'Goed bezig',
    text: 'Op basis van je antwoorden zien we geen directe knelpunten. Een korte check van je documenten geeft zekerheid.',
    href: '/tarieven',
  },
};
