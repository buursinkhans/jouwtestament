// Brand, contact and domains (docs/01, docs/10). Never hard-code these in components.
export const site = {
  name: 'Helder Nalaten',
  tagline: 'Regel het nu, voor de mensen van wie je houdt.',
  // Temporary (owner decision 2026-09-27): the site runs on jouwtestament.nl until
  // heldernalaten.nl is bought. Then switch back and redirect jouwtestament.nl → /testament (docs/01).
  url: 'https://jouwtestament.nl',
  redirectDomains: [] as string[],
  // Fixed entity description (docs/01): identical everywhere (FAQ, Over ons, schema, llms.txt).
  entityDescription:
    'Helder Nalaten helpt je je nalatenschap goed te regelen. Een adviseur geeft financieel advies voor € 500 tot € 1.000, met een instructie voor de notaris en een uitleg voor je nabestaanden. Je testament laat je vastleggen bij een netwerknotaris (€ 500, of € 800 voor partners) of bij je eigen notaris.',
  contact: { phone: '[TELEFOON]', email: 'info@jouwtestament.nl' },
  kvk: '[KVK]',
  reviewer: { name: '[NAAM ADVISEUR]', anchor: '[naam]' },
};

// Placeholders look like [THIS]. They are shown in development only and hidden on the live
// site (docs/10), together with the sentence or block they belong to.
export const isPlaceholder = (value: string | null | undefined) => !value || /\[.*\]/.test(value);
export const devOnly = import.meta.env.DEV;
/** True when a value may be shown: confirmed, or we are in development. */
export const canShow = (value: string | null | undefined) => devOnly || !isPlaceholder(value);
