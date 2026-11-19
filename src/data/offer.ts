// Shared offer content (docs/07): steps, the two documents, price rows and examples.
import { pricing, euro, euroRange, coupleSaving } from '../config/pricing';
import { devOnly } from '../config/site';

export const steps = [
  { title: 'Doe de check', text: 'Maak een agenda met vragen voor thuis en voor de notaris.' },
  {
    // Two routes since 2026-09-28 (owner): the assistant (option 1) or an adviser (option 2)
    title: 'Je wensen op een rij',
    text: `Bereid je digitaal voor voor ${euro(pricing.selfService)}, inclusief twee documenten. Of vraag een adviesgesprek aan vanaf ${euro(pricing.advice.min)}. Notariskosten zijn apart.`,
  },
  {
    title: 'Twee documenten',
    text: 'Je krijgt een overzicht van je wensen en vragen voor de notaris en een uitleg voor je nabestaanden.',
  },
  {
    title: 'Naar de notaris',
    text: 'Bij een notaris uit ons landelijke netwerk, of bij je eigen notaris. Jij kiest.',
  },
];

export const optionalStep = {
  title: 'Blijft het kloppen?',
  text: 'We herinneren je aan een check bij grote veranderingen of na een paar jaar.',
  optional: true,
};

export const documents = [
  {
    number: 1 as const,
    title: 'Je wensen en vragen voor de notaris',
    text: 'De notaris bespreekt je wensen, beoordeelt de juridische mogelijkheden en stelt de akte op.',
    bullets: [
      'Jouw situatie en wensen op een rij',
      'Je vragen en voorkeuren per onderwerp',
      'Wie erft, wie het regelt, wie beschermd wordt',
      'Aandachtspunten voor de akte',
    ],
  },
  {
    number: 2 as const,
    title: 'Heldere uitleg voor je nabestaanden',
    text: 'In gewone taal: wat je hebt geregeld en waarom. Zo hoeven je naasten niet te raden, juist op het moment dat het zwaar is.',
    bullets: [
      'Wat er geregeld is, en waarom je die keuzes maakte',
      'Wie wat doet na je overlijden',
      'Overzicht van bezittingen, pensioenen en verzekeringen',
      'Waar de belangrijke documenten liggen',
    ],
  },
];

// Compact price cards (home, /testament)
export const priceCards = [
  { title: 'Zelf regelen met de assistent', price: euro(pricing.selfService), note: 'Digitale voorbereiding en twee documenten. Notariskosten apart.' },
  { title: 'Advies', price: euroRange(pricing.advice) },
  { title: 'Testament bij netwerknotaris', price: euro(pricing.willSingle) },
  { title: 'Voor partners', price: euro(pricing.willCouple), note: 'voor 2 testamenten', highlight: true },
];

const allPriceRows = [
  {
    // Option 1 (owner 2026-09-27). TODO(owner): confirm what exactly is included
    item: 'Zelf regelen met de assistent',
    price: euro(pricing.selfService),
    included: 'Digitale voorbereiding, je wensen en vragen voor de notaris en uitleg voor nabestaanden. Notariskosten zijn apart.',
  },
  {
    item: 'Financieel advies over je nalatenschap',
    price: euroRange(pricing.advice),
    included:
      'Adviesgesprek met een professional, je wensen en vragen voor de notaris en uitleg voor nabestaanden',
  },
  {
    item: 'Testament (netwerknotaris)',
    price: euro(pricing.willSingle),
    included:
      'Opgesteld op basis van je instructie, getekend bij de notaris, ingeschreven in het Centraal Testamentenregister',
  },
  {
    item: 'Testamenten voor partners (netwerknotaris)',
    price: `${euro(pricing.willCouple)} voor 2`,
    included: `Twee afgestemde testamenten, ${euro(coupleSaving)} voordeliger dan los`,
  },
  { item: 'Eigen notaris', price: 'Tarief van je notaris', included: 'Je krijgt dezelfde instructie mee' },
  { item: 'Levenstestament', price: euro(pricing.livingWill), included: '' },
  { item: 'Samenlevingscontract', price: euro(pricing.cohabitationAgreement), included: '' },
];

// Rows without a confirmed price are only shown in development
export const priceTable = allPriceRows.filter((row) => devOnly || !row.price.includes('[PRIJS]'));

const { advice, adviceComplex, willSingle, willCouple } = pricing;
export const priceExamples = [
  {
    label: 'Alleenstaand, eenvoudig',
    sum: `advies ${euro(advice.min)} + testament ${euro(willSingle)}`,
    total: euro(advice.min + willSingle),
  },
  {
    label: 'Stel met kinderen',
    sum: `advies ${euro(advice.min)} + twee testamenten ${euro(willCouple)}`,
    total: euro(advice.min + willCouple),
  },
  {
    label: 'Samengesteld gezin',
    sum: `advies ca. € ${adviceComplex.min.toLocaleString('nl-NL')}–${adviceComplex.max.toLocaleString('nl-NL')} + twee testamenten ${euro(willCouple)}`,
    total: `€ ${(adviceComplex.min + willCouple).toLocaleString('nl-NL')}–${(adviceComplex.max + willCouple).toLocaleString('nl-NL')}`,
  },
];

// Offer schema (docs/11)
export const offerSchema = [
  {
    '@type': 'Offer',
    name: 'Financieel advies over je nalatenschap',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: advice.min,
      maxPrice: advice.max,
      priceCurrency: 'EUR',
    },
  },
  { '@type': 'Offer', name: 'Testament bij netwerknotaris', price: willSingle, priceCurrency: 'EUR' },
  { '@type': 'Offer', name: 'Twee testamenten voor partners bij netwerknotaris', price: willCouple, priceCurrency: 'EUR' },
];
