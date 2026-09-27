// FAQs from home (docs/05) and /testament (docs/07), plus grouping for /veelgestelde-vragen.
// Segment FAQs live in data/segments.ts.
import { site } from '../config/site';
import { pricing, euro, euroRange } from '../config/pricing';
import { segments, type FaqItem } from './segments';

export const homeFaq: FaqItem[] = [
  { question: 'Wat is Helder Nalaten?', answer: site.entityDescription },
  {
    question: 'Ben ik niet te jong om dit te regelen?',
    answer:
      'Nee. Woon je samen, heb je kinderen of een koophuis, dan is het juist nu belangrijk. De wet regelt dan vaak niet wat jij zou willen.',
  },
  {
    question: 'Is dit alleen voor mensen met veel vermogen?',
    answer:
      'Nee. Juist met een gewoon huis, spaargeld en pensioen is het belangrijk dat duidelijk is wie wat krijgt. Daarom houden we het betaalbaar.',
  },
  {
    question: 'Wat krijg ik voor het advies?',
    answer:
      'Een adviesgesprek met een professional, een heldere instructie voor de notaris en een duidelijke uitleg voor je nabestaanden.',
  },
  {
    question: 'Moet ik jullie notaris gebruiken?',
    answer: `Nee. Je kiest een notaris uit ons landelijke netwerk (${euro(pricing.willSingle)} per testament, ${euro(pricing.willCouple)} voor partners) of je eigen notaris. Die krijgt dezelfde instructie.`,
  },
  {
    question: 'Heb ik wel een testament nodig?',
    answer:
      'Niet altijd. Soms past de wettelijke regeling prima. Juist daarom kijken we eerst naar jouw situatie, en zeggen we het ook als je niets hoeft te regelen.',
  },
];

export const testamentFaq: FaqItem[] = [
  {
    question: 'Wat kost een testament?',
    answer: `${euro(pricing.willSingle)} bij een netwerknotaris, ${euro(pricing.willCouple)} voor twee testamenten voor partners. Het advies vooraf kost ${euroRange(pricing.advice)}.`,
  },
  {
    question: 'Kan ik een testament laten maken zonder advies?',
    answer:
      'Ons aanbod bestaat uit advies én testament, omdat een goed testament begint met de juiste keuzes. Heb je al advies gehad? Neem dan contact op.',
  },
  {
    question: 'Kan ik mijn bestaande testament laten checken?',
    answer: 'Ja. Een testament dat een paar jaar oud is, past vaak niet meer bij je leven of de regels.',
  },
];

// Grouping for /veelgestelde-vragen (docs/07). Questions are referenced by their exact text.
const groupOrder: { title: string; questions: string[] }[] = [
  {
    title: 'Algemeen',
    questions: [
      'Wat is Helder Nalaten?',
      'Ben ik niet te jong om dit te regelen?',
      'Is dit alleen voor mensen met veel vermogen?',
      'Mag ik als kind het gesprek met de adviseur bijwonen?',
      'Mijn ouders willen er niet over praten. Wat nu?',
    ],
  },
  {
    title: 'Kosten',
    questions: ['Wat krijg ik voor het advies?', 'Wat kost een testament?', 'Wie betaalt het advies?'],
  },
  { title: 'Notaris', questions: ['Moet ik jullie notaris gebruiken?'] },
  {
    title: 'Testament',
    questions: [
      'Heb ik wel een testament nodig?',
      'Kan ik een testament laten maken zonder advies?',
      'Kan ik mijn bestaande testament laten checken?',
      'Mijn testament is al 15 jaar oud. Moet ik iets doen?',
      'Kan ik mijn stiefkinderen evenveel geven als mijn eigen kinderen?',
      'Wat als mijn partner na mijn overlijden opnieuw trouwt?',
      'Moeten we het met de kinderen bespreken?',
    ],
  },
  { title: 'Levenstestament', questions: ['Wat is het verschil tussen een testament en een levenstestament?'] },
  {
    title: 'Samenwonen',
    questions: [
      'Is een samenlevingscontract genoeg?',
      'Erft mijn partner als we een kind hebben?',
      'Moeten we dan trouwen?',
      'Kan mijn partner in het huis blijven wonen?',
    ],
  },
  {
    title: 'Kinderen',
    questions: [
      'Kunnen voogd en beheerder verschillende mensen zijn?',
      'Tot welke leeftijd kan ik de erfenis laten beheren?',
      'Moet de voogd daarmee akkoord zijn?',
    ],
  },
];

const allFaq = [...homeFaq, ...testamentFaq, ...segments.flatMap((segment) => segment.faq)];

const anchor = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const faqGroups = groupOrder.map((group) => ({
  title: group.title,
  id: anchor(group.title),
  items: group.questions.map((question) => {
    const item = allFaq.find((faq) => faq.question === question);
    if (!item) throw new Error(`FAQ not found: ${question}`);
    return { ...item, id: anchor(question) };
  }),
}));

// Every FAQ must be in exactly one group (checked at build time).
const grouped = new Set(groupOrder.flatMap((group) => group.questions));
const missing = allFaq.filter((faq) => !grouped.has(faq.question));
if (missing.length > 0) throw new Error(`FAQ without group: ${missing.map((faq) => faq.question).join(', ')}`);
