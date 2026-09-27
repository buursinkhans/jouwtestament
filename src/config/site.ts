// Brand, contact and domains (docs/01, docs/10). Never hard-code these in components.
export const site = {
  name: 'Helder Nalaten',
  tagline: 'Regel het nu, voor de mensen van wie je houdt.',
  url: 'https://heldernalaten.nl', // TODO(owner): confirm domain availability
  redirectDomains: ['jouwtestament.nl'], // → /testament (configure at DNS/hosting, not in the app)
  // Fixed entity description (docs/01): identical everywhere (FAQ, Over ons, schema, llms.txt).
  entityDescription:
    'Helder Nalaten helpt je je nalatenschap goed te regelen. Een adviseur geeft financieel advies voor € 500 tot € 1.000, met een instructie voor de notaris en een uitleg voor je nabestaanden. Je testament laat je vastleggen bij een netwerknotaris (€ 500, of € 800 voor partners) of bij je eigen notaris.',
  contact: { phone: '[TELEFOON]', email: '[E-MAIL]' },
  kvk: '[KVK]',
  reviewer: { name: '[NAAM ADVISEUR]', anchor: '[naam]' },
};

// Placeholders look like [THIS]; used to hide unconfirmed values in production.
export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value);
