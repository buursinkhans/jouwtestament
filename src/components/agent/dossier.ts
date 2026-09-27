// The dossier the self-service agent builds during the conversation (docs/13-agent.md).
// Shared by the Netlify functions (tool schema, documents) and the page (progress panel).
// Values are short Dutch free text written by the agent; an empty value means "not asked yet".

export interface DossierField {
  key: string;
  label: string;
  hint: string; // what the agent should record (goes into the tool description)
  required?: boolean; // needed before documents can be made (unless not applicable)
}

export interface DossierGroup {
  key: string;
  title: string;
  fields: DossierField[];
}

export const dossierGroups: DossierGroup[] = [
  {
    key: 'jij',
    title: 'Over jou',
    fields: [
      { key: 'naam', label: 'Naam', hint: 'Volledige naam van de testateur (zoals in het paspoort).', required: true },
      { key: 'geboortedatum', label: 'Geboortedatum', hint: 'Geboortedatum of -jaar.', required: true },
      { key: 'woonplaats', label: 'Woonplaats', hint: 'Woonplaats in Nederland.' },
      { key: 'nationaliteit_buitenland', label: 'Nationaliteit en buitenland', hint: 'Nationaliteit(en); woont of bezit iemand iets in het buitenland?' },
    ],
  },
  {
    key: 'relatie',
    title: 'Relatie',
    fields: [
      {
        key: 'burgerlijke_staat',
        label: 'Burgerlijke staat',
        hint: 'Getrouwd / geregistreerd partner / samenwonend / alleenstaand / gescheiden / weduwe(naar), met sinds wanneer (voor of na 1-1-2018 is relevant).',
        required: true,
      },
      { key: 'partner', label: 'Partner', hint: 'Naam van de partner (indien van toepassing).' },
      {
        key: 'huwelijksvoorwaarden_samenlevingscontract',
        label: 'Huwelijksvoorwaarden / samenlevingscontract',
        hint: 'Gemeenschap van goederen, beperkte gemeenschap, huwelijksvoorwaarden, (notarieel) samenlevingscontract, of niets.',
      },
      { key: 'eerdere_relaties', label: 'Eerdere relaties', hint: 'Eerdere huwelijken/relaties, scheidingen, ex-partner met gezag over kinderen.' },
    ],
  },
  {
    key: 'kinderen',
    title: 'Kinderen',
    fields: [
      {
        key: 'kinderen',
        label: 'Kinderen',
        hint: 'Alle kinderen met naam, geboortejaar en of ze samen of uit een eerdere relatie zijn; "geen" als er geen kinderen zijn.',
        required: true,
      },
      { key: 'stiefkinderen', label: 'Stiefkinderen', hint: 'Stiefkinderen en of zij moeten erven.' },
      { key: 'bijzonderheden_kinderen', label: 'Bijzonderheden kinderen', hint: 'Kind met beperking, schulden, verslaving, onenigheid, overleden kinderen met kleinkinderen.' },
    ],
  },
  {
    key: 'bezit',
    title: 'Bezittingen',
    fields: [
      { key: 'woning', label: 'Woning', hint: 'Koop- of huurwoning, op wiens naam, globale overwaarde (alleen als de gebruiker dat wil noemen).', required: true },
      { key: 'overig_vermogen', label: 'Overig vermogen', hint: 'Globaal: spaargeld, beleggingen, pensioen, verzekeringen (begunstigden). Geen rekeningnummers.' },
      { key: 'onderneming', label: 'Onderneming', hint: 'Eigen bedrijf of aandelen in een bv; "nee" als niet van toepassing.' },
      { key: 'bestaande_documenten', label: 'Bestaande documenten', hint: 'Bestaand testament (jaar), levenstestament, codicil, schenkingen aan kinderen.', required: true },
    ],
  },
  {
    key: 'wensen',
    title: 'Wensen',
    fields: [
      { key: 'erfgenamen_verdeling', label: 'Erfgenamen en verdeling', hint: 'Wie erft en in welke verhouding; ook goede doelen en vrienden.', required: true },
      { key: 'bescherming_partner', label: 'Bescherming partner', hint: 'Wat moet de partner krijgen of mogen (in het huis blijven wonen, alles eerst naar partner, wettelijke verdeling, vruchtgebruik).' },
      { key: 'voogd', label: 'Voogd', hint: 'Voogd en vervangende voogd voor minderjarige kinderen; of het al besproken is.' },
      { key: 'bewind', label: 'Bewind', hint: 'Beheer van de erfenis voor jonge of kwetsbare erfgenamen: door wie en tot welke leeftijd.' },
      { key: 'executeur', label: 'Executeur', hint: 'Executeur en vervanger; gewone executeur of afwikkelingsbewindvoerder; beloning.' },
      { key: 'uitsluitingsclausule', label: 'Uitsluitingsclausule', hint: 'Moet de erfenis buiten een huwelijksgemeenschap van erfgenamen blijven?' },
      { key: 'legaten', label: 'Legaten', hint: 'Specifieke spullen of bedragen voor bepaalde personen of organisaties.' },
      { key: 'onterving_bijzondere_wensen', label: 'Onterving en bijzondere wensen', hint: 'Iemand onterven, voorwaarden, wilsrechten, schenkingen rechttrekken.' },
      { key: 'uitvaart_codicil', label: 'Uitvaart en persoonlijke spullen', hint: 'Uitvaartwensen en lijfgoederen (codicil).' },
      { key: 'digitaal', label: 'Digitale nalatenschap', hint: 'Accounts, foto’s, abonnementen: wie sluit wat af.' },
      { key: 'levenstestament_wens', label: 'Levenstestament', hint: 'Wensen of plannen voor een levenstestament (aandachtspunt, geen onderdeel van de documenten).' },
    ],
  },
  {
    key: 'uitleg',
    title: 'Uitleg voor nabestaanden',
    fields: [
      { key: 'motivatie', label: 'Waarom deze keuzes', hint: 'De redenen achter de keuzes, in de woorden van de gebruiker.', required: true },
      { key: 'praktisch', label: 'Praktische informatie', hint: 'Waar liggen belangrijke papieren, welke verzekeringen/pensioenen, wie moet je bellen. Geen wachtwoorden of rekeningnummers.' },
      { key: 'persoonlijke_boodschap', label: 'Persoonlijke boodschap', hint: 'Optioneel: iets wat de gebruiker de nabestaanden wil meegeven.' },
    ],
  },
  {
    key: 'notaris',
    title: 'Notaris',
    fields: [
      { key: 'notaris_keuze', label: 'Notariskeuze', hint: 'Notaris uit ons netwerk of eigen notaris (met naam/plaats indien bekend).', required: true },
      { key: 'samen_met_partner', label: 'Samen met partner', hint: 'Maakt de partner ook een (afgestemd) testament?' },
    ],
  },
];

export const dossierFields = dossierGroups.flatMap((group) => group.fields);
export const dossierKeys = dossierFields.map((field) => field.key);
export const requiredKeys = dossierFields.filter((field) => field.required).map((field) => field.key);

export type Dossier = Record<string, string>;

export type AgentStatus = 'intake' | 'adviser_recommended' | 'ready';

export interface AgentState {
  dossier: Dossier;
  status: AgentStatus;
  adviserReason?: string;
  summary?: string;
}

/** Applies validated updates; unknown keys are ignored, empty values clear a field. */
export function applyUpdates(dossier: Dossier, updates: { field: string; value: string }[]): Dossier {
  const next = { ...dossier };
  for (const { field, value } of updates) {
    if (!dossierKeys.includes(field)) continue;
    const clean = value.trim().slice(0, 2000);
    if (clean) next[field] = clean;
    else delete next[field];
  }
  return next;
}

export function missingRequired(dossier: Dossier): string[] {
  return requiredKeys.filter((key) => !dossier[key]);
}

// Check answers (docs/09) handed over from the check, used as the agent's starting point.
export const checkAnswerLabels: Record<string, Record<string, string>> = {
  situation: { married: 'getrouwd of geregistreerd partner', cohabiting: 'samenwonend, niet getrouwd', single: 'alleenstaand' },
  children: { joint: 'kinderen samen', blended: 'ook kinderen uit een eerdere relatie', none: 'geen kinderen' },
  minors: { yes: 'een kind is jonger dan 18', no: 'geen minderjarige kinderen' },
  home: { yes: 'koopwoning', no: 'geen koopwoning' },
  documents: { both: 'heeft testament en levenstestament', will_only: 'heeft alleen een testament', nothing: 'heeft nog niets geregeld', unknown: 'weet niet wat er geregeld is' },
  notary: { network: 'wil een notaris uit het netwerk', own: 'heeft een eigen notaris', unknown: 'weet nog niet welke notaris' },
};

export function describeCheckAnswers(answers: Record<string, string> | undefined): string {
  if (!answers) return '';
  return Object.entries(answers)
    .map(([key, value]) => checkAnswerLabels[key]?.[value])
    .filter(Boolean)
    .join('; ');
}
