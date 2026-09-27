// Shared offer content (docs/07): steps, the two documents, price rows and examples.
import { pricing, euro, euroRange, coupleSaving } from '../config/pricing';
import { devOnly } from '../config/site';

export const steps = [
  { title: 'Doe de check', text: 'Vier vragen, twee minuten. Direct je belangrijkste aandachtspunten.' },
  {
    title: 'Adviesgesprek',
    // "[op locatie]" is not confirmed yet: that sentence is left out on the live site
    text: devOnly
      ? 'Een adviseur bespreekt je situatie en adviseert over de financiële keuzes. Online of [op locatie]. Je hoort vooraf de prijs.'
      : 'Een adviseur bespreekt je situatie en adviseert over de financiële keuzes. Je hoort vooraf de prijs.',
  },
  {
    title: 'Twee documenten',
    text: 'Je ontvangt de instructie voor de notaris en de uitleg voor je nabestaanden.',
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
    title: 'Heldere instructie voor de notaris',
    text: 'Precies wat er in je testament moet komen. De notaris kan direct aan de slag, zonder dat je alles opnieuw hoeft uit te leggen.',
    bullets: [
      'Jouw situatie en wensen op een rij',
      'De gekozen oplossing per onderdeel',
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

// Three compact price cards (home, /testament)
export const priceCards = [
  { title: 'Advies', price: euroRange(pricing.advice) },
  { title: 'Testament', price: euro(pricing.willSingle) },
  { title: 'Voor partners', price: euro(pricing.willCouple), note: 'voor 2 testamenten', highlight: true },
];

const allPriceRows = [
  {
    item: 'Financieel advies over je nalatenschap',
    price: euroRange(pricing.advice),
    included:
      'Adviesgesprek, advies van een professional, instructie voor de notaris, uitleg voor nabestaanden',
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
    sum: `advies ca. € ${adviceComplex.min.toLocaleString('nl-NL')}–${adviceComplex.max.toLocaleString('nl-NL')} + twee testamenten ${euro(willCouple)}`,
    total: `€ ${(adviceComplex.min + willCouple).toLocaleString('nl-NL')}–${(adviceComplex.max + willCouple).toLocaleString('nl-NL')}`,
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
