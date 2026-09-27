// Content for the "Voor wie" segment pages. Copy is taken verbatim from docs/06-content-voor-wie.md.
// TODO(review-partner): all legal content on these pages needs partner approval before going live.
import { pricing, formatEuro } from '../config/pricing';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Segment {
  slug: string;
  pageKey: string;
  breadcrumb: string;
  title: string;
  description: string;
  h1: string;
  shortAnswer: string;
  // "Als je niets regelt" (je-ouders uses its own heading)
  ifNothing: { heading: string; items: string[] };
  // "Wat je wél kunt regelen"; `ordered` renders a numbered list
  canArrange: { heading: string; items: string[]; ordered?: boolean };
  figure?: { text: string; source: string };
  tips: string[]; // tip slugs from docs/08 (not available yet)
  priceExample?: string;
  checkQuery: string; // prefill for /check, see docs/03
  share?: boolean; // share buttons (je-ouders)
  faq: FaqItem[];
  // Navigation / overview tile (docs/03)
  navLabel: string;
  navSub: string;
}

const standardExample = `Advies ${formatEuro(pricing.advice)} + twee testamenten ${formatEuro(pricing.testamentCouple)} = ${formatEuro(pricing.advice + pricing.testamentCouple)}.`;

export const segments: Segment[] = [
  {
    slug: 'samenwonen',
    pageKey: 'voorWieSamenwonen',
    breadcrumb: 'Samenwonen',
    title: 'Samenwonen en je nalatenschap: je partner erft niets zonder regeling | Helder Nalaten',
    description: `Woon je samen zonder huwelijk of geregistreerd partnerschap? Dan erft je partner zonder testament niets. Zo regel je het goed, vanaf ${formatEuro(pricing.advice)}.`,
    h1: 'We wonen samen. Wat gebeurt er als een van ons overlijdt?',
    shortAnswer:
      'Als je samenwoont zonder huwelijk of geregistreerd partnerschap, erft je partner zonder testament niets. Zonder notarieel samenlevingscontract betaalt je partner bovendien vaak het hoogste tarief erfbelasting. Met een testament en samenlevingscontract regel je dat.',
    ifNothing: {
      heading: 'Als je niets regelt',
      items: [
        'Je partner is geen erfgenaam; je erfenis gaat naar je kinderen, of als je die niet hebt naar je ouders, broers en zussen.',
        'Je partner kan in de problemen komen met het huis dat jullie samen hebben.',
        'Een nabestaandenpensioen is er vaak alleen als je partner bij je pensioenfonds is aangemeld.',
      ],
    },
    canArrange: {
      heading: 'Wat je wél kunt regelen',
      items: [
        'Een testament waarin je elkaar als erfgenaam benoemt',
        'Een notarieel samenlevingscontract (ook belangrijk voor de erfbelasting)',
        'Aanmelding van je partner bij je pensioenfonds',
        'Een kruislings afgesloten overlijdensrisicoverzekering',
        'Een levenstestament, zodat je partner voor je mag handelen als jij het niet kunt',
      ],
    },
    figure: {
      text: 'Nederland telt 470.372 niet-gehuwde paren met thuiswonende kinderen, en dat aantal groeit.',
      source: 'NJi o.b.v. CBS, 2025',
    },
    tips: ['pensioen', 'verzekering', 'jonge-kinderen'],
    priceExample: `${standardExample} Samenlevingscontract: ${formatEuro(pricing.cohabitationContract)}.`,
    checkQuery: '?situatie=samenwonend',
    faq: [
      {
        question: 'Is een samenlevingscontract genoeg?',
        answer:
          'Nee. Een samenlevingscontract regelt vooral zaken bij leven en uit elkaar gaan. Om elkaar te laten erven heb je een testament nodig. Samen geven ze de beste bescherming.',
      },
      {
        question: 'Erft mijn partner als we een kind hebben?',
        answer:
          'Nee. Zonder testament erven je kinderen, niet je partner. Dat kan betekenen dat je partner het huis moet delen met jullie kind.',
      },
      {
        question: 'Moeten we dan trouwen?',
        answer:
          'Dat hoeft niet. Met een testament en samenlevingscontract kun je veel regelen. We leggen de verschillen eerlijk naast elkaar.',
      },
    ],
    navLabel: 'We wonen samen',
    navSub: 'Niet getrouwd? Je partner erft dan niets.',
  },
  {
    slug: 'jonge-kinderen',
    pageKey: 'voorWieJongeKinderen',
    breadcrumb: 'Jonge kinderen',
    title: 'Jonge kinderen: voogdij en erfenis goed regelen | Helder Nalaten',
    description:
      'Wie zorgt er voor je kinderen als jullie er niet meer zijn, en wie beheert hun geld? Zonder testament krijgen ze alles op hun 18e. Zo regel je het.',
    h1: 'We hebben jonge kinderen. Wat moeten we regelen?',
    shortAnswer:
      'Leg vast wie voogd wordt als jullie allebei overlijden, en wie het geld van je kinderen beheert. Zonder testament beslist de rechter over de voogd en mogen je kinderen vanaf hun 18e vrij over hun erfenis beschikken. In een testament kun je dat uitstellen, bijvoorbeeld tot 25.',
    ifNothing: {
      heading: 'Als je niets regelt',
      items: [
        'De rechter wijst een voogd aan.',
        'Je kinderen krijgen hun erfenis op hun 18e, in één keer.',
        'Ben je gescheiden, dan beheert de andere ouder het geld van jullie minderjarige kinderen.',
      ],
    },
    canArrange: {
      heading: 'Wat je wél kunt regelen',
      items: [
        'Een voogd (en een vervanger)',
        'Een beheerder van het geld, eventueel een ander dan de voogd',
        'Beheer tot een leeftijd die jij kiest (testamentair bewind)',
        'Een levenstestament: wie zorgt voor de kinderen en het geld als je tijdelijk niet kunt',
      ],
    },
    figure: {
      text: 'Ruim 1,8 miljoen gezinnen hebben een jongste kind onder de 18.',
      source: 'NJi o.b.v. CBS, 2025',
    },
    tips: ['jonge-kinderen', 'voogd', 'ex-partner'],
    priceExample: standardExample,
    checkQuery: '?minderjarig=ja',
    faq: [
      {
        question: 'Kunnen voogd en beheerder verschillende mensen zijn?',
        answer: 'Ja. De beste opvoeder is niet altijd de beste beheerder. Je kunt het splitsen.',
      },
      {
        question: 'Tot welke leeftijd kan ik de erfenis laten beheren?',
        answer: 'Dat kies je zelf. Veel ouders kiezen 21 of 25 jaar.',
      },
      {
        question: 'Moet de voogd daarmee akkoord zijn?',
        answer:
          'Bespreek het vooraf. Iemand kan een voogdij ook weigeren, dus benoem ook een vervanger.',
      },
    ],
    navLabel: 'We hebben jonge kinderen',
    navSub: 'Voogdij en het geld van je kinderen',
  },
  {
    slug: 'samengesteld-gezin',
    pageKey: 'voorWieSamengesteldGezin',
    breadcrumb: 'Samengesteld gezin',
    title: 'Samengesteld gezin en erfenis: bescherm partner én kinderen | Helder Nalaten',
    description:
      'Stiefkinderen erven zonder testament niets, en de volgorde van overlijden bepaalt veel. Zo regel je het goed voor je partner, je eigen kinderen en stiefkinderen.',
    h1: 'We zijn een samengesteld gezin. Hoe regelen we het eerlijk?',
    shortAnswer:
      'Stiefkinderen erven zonder testament niets. En wie het eerst overlijdt, bepaalt vaak bij welke familie het vermogen uiteindelijk terechtkomt. Met een testament bescherm je je partner én zorg je dat al je kinderen krijgen wat jij voor ogen hebt.',
    ifNothing: {
      heading: 'Als je niets regelt',
      items: [
        'Stiefkinderen erven niet van hun stiefouder.',
        'Het vermogen kan via de langstlevende bij diens familie terechtkomen.',
        'Na een scheiding beheert je ex het geld van jullie minderjarige kinderen.',
      ],
    },
    canArrange: {
      heading: 'Wat je wél kunt regelen',
      items: [
        'Wie wat krijgt, inclusief stiefkinderen',
        'Bescherming van je partner (bijvoorbeeld in het huis blijven wonen)',
        'Zorgen dat je eigen kinderen uiteindelijk hun deel krijgen',
        'Een beheerder voor minderjarige kinderen',
        'Een uitleg voor alle kinderen, zodat keuzes begrepen worden',
      ],
    },
    figure: {
      text: 'Ongeveer 16% van de minderjarigen woonde al in 2017 in een samengesteld gezin.',
      source: 'NieuweStap o.b.v. CBS',
    },
    tips: ['hertrouwen', 'ex-partner', 'transparant'],
    // TODO(owner): confirm with partner
    priceExample: `Samengestelde gezinnen zijn vaak complexer: advies meestal ${formatEuro(pricing.adviceComplex.from)} – ${pricing.adviceComplex.to.toLocaleString('nl-NL')} + twee testamenten ${formatEuro(pricing.testamentCouple)}.`,
    checkQuery: '?kinderen=eerder',
    faq: [
      {
        question: 'Kan ik mijn stiefkinderen evenveel geven als mijn eigen kinderen?',
        answer:
          'Ja, via je testament. We bekijken ook de erfbelasting, want stiefkinderen worden daarin onder voorwaarden hetzelfde behandeld als eigen kinderen.',
      },
      {
        question: 'Wat als mijn partner na mijn overlijden opnieuw trouwt?',
        answer:
          'Dan kan een deel van het vermogen bij de nieuwe familie terechtkomen. Met de juiste bepalingen voorkom je dat.',
      },
      {
        question: 'Moeten we het met de kinderen bespreken?',
        answer:
          'Dat hoeft niet, maar het voorkomt veel onbegrip. De uitleg voor je nabestaanden helpt daarbij.',
      },
    ],
    navLabel: 'We zijn een samengesteld gezin',
    navSub: 'Partner, eigen kinderen en stiefkinderen',
  },
  {
    slug: '55-plus',
    pageKey: 'voorWie55Plus',
    breadcrumb: '55-plus',
    title: '55-plus met een eigen huis: regel je nalatenschap en levenstestament | Helder Nalaten',
    description:
      'Je huis is waarschijnlijk je grootste nalatenschap. Regel wie erin mag blijven wonen, wie voor je beslist als jij het niet kunt, en of je testament nog klopt.',
    h1: 'Ik ben 55-plus en heb een huis. Is alles goed geregeld?',
    shortAnswer:
      'Je huis is waarschijnlijk het grootste deel van je nalatenschap. Controleer of je testament nog past bij je leven en de regels, en regel een levenstestament: 1 op de 5 mensen krijgt dementie, en zonder levenstestament kan niemand zomaar je zaken regelen.',
    ifNothing: {
      heading: 'Als je niets regelt',
      items: [
        'Een verouderd testament kan onbedoeld verkeerd uitpakken.',
        'Word je wilsonbekwaam, dan moet eerst de rechter iemand aanwijzen; dat kost al snel maanden.',
        'Onduidelijkheid over het huis is een veelvoorkomende bron van ruzie.',
      ],
    },
    canArrange: {
      heading: 'Wat je wél kunt regelen',
      items: [
        'Een check van je bestaande testament',
        'Een levenstestament (financieel en medisch)',
        'Wie in de woning mag blijven wonen en hoe de waarde wordt verdeeld',
        'Een executeur',
        'Een uitleg voor je kinderen',
      ],
    },
    figure: {
      text: 'Ongeveer 310.000 mensen hebben dementie; naar verwachting ruim 500.000 in 2040.',
      source: 'Kamerbrief VWS 2026 o.b.v. Alzheimer Nederland',
    },
    tips: ['actueel', 'executeur', 'codicil'],
    priceExample: `${standardExample} Levenstestament: ${formatEuro(pricing.livingWill)}.`,
    checkQuery: '?woning=ja',
    faq: [
      {
        question: 'Mijn testament is al 15 jaar oud. Moet ik iets doen?',
        answer:
          'Laat het checken. Je leven, je vermogen en de regels zijn sindsdien waarschijnlijk veranderd.',
      },
      {
        question: 'Wat is het verschil tussen een testament en een levenstestament?',
        answer:
          'Een testament regelt wat er na je overlijden gebeurt; een levenstestament regelt wie voor je beslist als je nog leeft maar het zelf niet meer kunt.',
      },
      {
        question: 'Kan mijn partner in het huis blijven wonen?',
        answer:
          'Bij de wettelijke verdeling meestal wel, maar niet in elke situatie. Dat bekijken we in het advies.',
      },
    ],
    navLabel: 'Ik ben 55-plus en heb een huis',
    navSub: 'Je woning, levenstestament en een check',
  },
  {
    slug: 'je-ouders',
    pageKey: 'voorWieJeOuders',
    breadcrumb: 'Je ouders',
    title: 'Je ouders helpen hun nalatenschap te regelen | Helder Nalaten',
    description:
      'Maak je je zorgen of je ouders het goed geregeld hebben? Zo begin je het gesprek, en zo help je ze op weg.',
    h1: 'Ik wil mijn ouders helpen het goed te regelen. Hoe begin ik?',
    shortAnswer:
      'Begin met een open vraag, niet met een oordeel: "Hebben jullie eigenlijk iets geregeld voor later?" Een gratis check of een tip die je deelt, maakt het gesprek makkelijker. Uiteindelijk beslissen je ouders zelf.',
    ifNothing: {
      heading: 'Waarom het ook voor jou belangrijk is',
      items: [
        'Zonder levenstestament kun je je ouders niet zomaar helpen met hun bankzaken als dat nodig is.',
        'Zonder executeur moeten jij en je broers en zussen alles samen regelen.',
        'Onduidelijkheid leidt vaker tot discussie tussen broers en zussen.',
      ],
    },
    canArrange: {
      heading: 'Zo begin je het gesprek',
      ordered: true,
      items: [
        'Kies een rustig moment, niet direct na slecht nieuws.',
        'Vertel waarom het jou bezighoudt: "Ik wil later niet hoeven raden wat jullie wilden."',
        'Vraag, luister, en duw niet.',
        'Deel de check of de tips, zodat ze zelf kunnen kijken.',
      ],
    },
    tips: ['transparant', 'executeur', 'actueel'],
    checkQuery: '', // no prefill; source.segmentPage = je-ouders (docs/09)
    share: true,
    faq: [
      {
        question: 'Mag ik als kind het gesprek met de adviseur bijwonen?',
        answer: 'Ja, als je ouders dat willen. Het advies is wel voor hen.',
      },
      {
        question: 'Mijn ouders willen er niet over praten. Wat nu?',
        answer: 'Forceer het niet. Een tip of artikel delen werkt vaak beter dan aandringen.',
      },
      {
        question: 'Wie betaalt het advies?',
        answer: 'Dat bepalen jullie zelf. Het advies en de documenten zijn voor je ouders.',
      },
    ],
    navLabel: 'Ik wil mijn ouders helpen',
    navSub: 'Hoe begin je het gesprek?',
  },
];
