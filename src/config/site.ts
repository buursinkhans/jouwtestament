// Brand, contact and domains (docs/01, docs/10). Never hard-code these in components.
export const site = {
  name: 'Helder Nalaten',
  tagline: 'Regel het nu, voor de mensen van wie je houdt.',
  // heldernalaten.nl bought 2026-09-29 (owner). jouwtestament.nl redirects to /testament with
  // utm_source=jouwtestament (docs/01); the redirect lives in netlify.toml.
  url: 'https://heldernalaten.nl',
  redirectDomains: ['jouwtestament.nl'],
  // Fixed entity description (docs/01): identical everywhere (FAQ, Over ons, schema, llms.txt).
  entityDescription:
    'Helder Nalaten helpt je je nalatenschap goed te regelen. Een adviseur geeft financieel advies voor € 500 tot € 1.000, met een instructie voor de notaris en een uitleg voor je nabestaanden. Je testament laat je vastleggen bij een netwerknotaris (€ 500, of € 800 voor partners) of bij je eigen notaris.',
  // No phone number: visitors cannot call us (owner 2026-09-29). Contact by e-mail only.
  contact: { email: 'info@heldernalaten.nl' },
  kvk: '[KVK]',
  reviewer: { name: '[NAAM ADVISEUR]', anchor: '[naam]' },
};

// Placeholders look like [THIS]. They are shown in development only and hidden on the live
// site (docs/10), together with the sentence or block they belong to.
export const isPlaceholder = (value: string | null | undefined) => !value || /\[.*\]/.test(value);
export const devOnly = import.meta.env.DEV;
/** True when a value may be shown: confirmed, or we are in development. */
export const canShow = (value: string | null | undefined) => devOnly || !isPlaceholder(value);
