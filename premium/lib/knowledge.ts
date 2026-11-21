type Source = { label: string; href: string };
type Question = { q: string; a: string };
type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  updated: string;
  quickAnswers: { question?: string; answer: string; source: Source }[];
  sections: { title: string; body: string; steps?: readonly string[] }[];
  faq: Question[];
  sources: Source[];
};

export const checkedDate = '2026-11-20';
export const authorship = 'Redactie Helder Nalaten';

export const sources = {
  custody: { label: 'Rijksoverheid over gezag na overlijden', href: 'https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/ouderlijk-gezag/wie-krijgt-het-gezag-over-mijn-kind-als-ik-kom-te-overlijden' },
  guardianship: { label: 'Rechtspraak over iemand aanwijzen in het gezagsregister', href: 'https://www.rechtspraak.nl/onderwerpen/voogdij/aanwijzen-voogd-formulier' },
  together: { label: 'Notaris.nl over samenwonen', href: 'https://www.notaris.nl/samen-verder/samenwonen' },
  homeTogether: { label: 'Notaris.nl over afspraken voor gezamenlijke bezittingen', href: 'https://www.notaris.nl/vertaal/verblijvingsbeding' },
  proxy: { label: 'Notaris.nl over het levenstestament', href: 'https://www.notaris.nl/levenstestament' },
  care: { label: 'Het CAK over de berekening van de eigen bijdrage', href: 'https://www.hetcak.nl/zorg-vanuit-de-wlz/uitleg-eigen-bijdrage-wlz/gegevens-berekening/' },
  careHome: { label: 'Belastingdienst over de eigen woning bij opname', href: 'https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/woning/tijdelijk_2_woningen/opgenomen_in_een_verzorgings-_of_verpleeghuis/verzorgings_of_verpleeghuis' },
  gift: { label: 'Belastingdienst over schenken', href: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/schenken/schenken' },
  tax: { label: 'Belastingdienst over partnerschap voor de erfbelasting', href: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/partners-voor-de-erfbelasting' },
} satisfies Record<string, Source>;

export const knowledgeArticles: Article[] = [
  {
    slug: 'voogdij-regelen',
    category: 'Voor gezinnen',
    title: 'Voogdij regelen voor je kinderen',
    description: 'Wie zorgt er voor je kinderen als er geen ouder met gezag meer is? Lees wat je kunt bespreken en hoe je iemand aanwijst.',
    updated: checkedDate,
    quickAnswers: [{ answer: 'Je kunt iemand aanwijzen in je testament of via het gezagsregister. Wat er na overlijden gebeurt, hangt af van wie op dat moment het gezag heeft.', source: sources.custody }],
    sections: [
      { title: 'Wie heeft nu het gezag?', body: 'Hebben jullie als ouders gezamenlijk gezag en overlijdt één van jullie? Dan krijgt de andere ouder alleen het gezag. Heeft één ouder het gezag, dan kan de uitkomst anders zijn. Kijk dus eerst hoe het gezag in jullie gezin geregeld is, zeker als er een eerdere relatie of een stiefouder in beeld is.' },
      { title: 'Wie past bij de kinderen?', body: 'Denk aan iemand die je kinderen kennen en die de zorg wil en kan dragen. Bespreek wat er voor hen belangrijk is, zoals school, familie in de buurt en contact met broers of zussen.' },
      { title: 'Zo leg je je keuze vast', body: 'Je kunt iemand aanwijzen via je testament of in het gezagsregister van de rechtbank. Via de Rechtspraak kan dat digitaal en kosteloos. De aangewezen persoon beslist later of die de rol aanvaardt.', steps: ['Bespreek wie de zorg wil overnemen.', 'Bekijk welke manier van vastleggen bij jullie situatie past.', 'Vertel betrokkenen waar ze de afspraken kunnen vinden en kijk je keuze na als er iets verandert.'] },
    ],
    faq: [
      { q: 'Moet ik hiervoor naar de notaris?', a: 'Je kunt iemand via de rechtbank laten opnemen in het gezagsregister. Wil je dit in je testament opnemen of ook andere afspraken over je bezittingen vastleggen? Dan bespreek je dat met de notaris.' },
      { q: 'Kan ik twee personen aanwijzen?', a: 'Ja, ouders kunnen één of twee personen aanwijzen. Bespreek vooraf of de mensen die je op het oog hebt die rol samen willen dragen.' },
      { q: 'Leg ik hiermee ook vast wie het geld van de kinderen beheert?', a: 'De aanwijzing gaat over wie de zorg en verantwoordelijkheid op zich neemt. Wil je aparte afspraken maken over het beheer van geld dat kinderen ontvangen? Bespreek de mogelijkheden met de notaris.' },
    ],
    sources: [sources.custody, sources.guardianship],
  },
  {
    slug: 'levenstestament-en-overwaarde',
    category: 'Voor later',
    title: 'Levenstestament en overwaarde van je woning',
    description: 'Wie mag straks je geldzaken regelen? Lees hoe een levenstestament werkt en wat je bij langdurige zorg kunt uitzoeken over je woning en overwaarde.',
    updated: checkedDate,
    quickAnswers: [
      { question: 'Wie mag namens mij handelen?', answer: 'Met een levenstestament leg je bij de notaris vast wie namens jou zaken mag regelen en welke beslissingen die persoon mag nemen.', source: sources.proxy },
      { question: 'Hoe kan mijn woning meetellen bij langdurige zorg?', answer: 'De eigen bijdrage hangt onder andere af van je inkomen en vermogen. Hoe je woning meetelt, kan veranderen bij opname. Of je partner er blijft wonen, kan daarbij van belang zijn.', source: sources.careHome },
    ],
    sections: [
      { title: 'Wie mag beslissen als je hulp nodig hebt?', body: 'Met een levenstestament kun je vastleggen wie namens jou zaken mag regelen. Denk aan rekeningen betalen, contact met de bank of beslissingen over je woning. Bepaal wat die persoon mag doen, waarover overleg nodig is en wie kan inspringen.' },
      { title: 'Waarom overwaarde om aparte vragen vraagt', body: 'Overwaarde is grofweg het verschil tussen de woningwaarde en wat je nog aan hypotheek verschuldigd bent. Zolang je de woning bezit, heb je dat verschil niet als geld op je rekening. Bij verkoop kan geld vrijkomen, maar verkopen heeft ook gevolgen voor wonen, kosten en belasting.' },
      { title: 'Wat verandert er bij langdurige zorg?', body: 'Het CAK kijkt onder meer naar inkomen, vermogen, leeftijd, je eventuele partner en de zorg die je ontvangt. Hoe je woning fiscaal meetelt, kan veranderen bij opname, bijvoorbeeld als je woning niet langer in box 1 valt. Of je partner er blijft wonen is een van de omstandigheden die ertoe kunnen doen.', steps: ['Schrijf op wie in de woning woont, wie eigenaar is en wat er aan hypotheek openstaat.', 'Bekijk bij het CAK welke gegevens voor je eigen bijdrage gelden.', 'Bespreek bij een adviseur wat aanhouden of verkopen voor wonen, belasting en geld betekent.'] },
    ],
    faq: [
      { q: 'Moet mijn huis worden verkocht als ik naar een zorginstelling ga?', a: 'Een opname betekent op zichzelf niet dat je je woning moet verkopen. Kijk eerst wie er blijft wonen, welke kosten doorlopen en hoe de woning meetelt voor belasting en de eigen bijdrage.' },
      { q: 'Wat is het verschil met een testament?', a: 'Een levenstestament gaat over wie tijdens je leven namens jou zaken mag regelen. Een testament legt vast wat er na je overlijden gebeurt met je bezittingen en wie praktische zaken regelt.' },
      { q: 'Is schenken altijd een goede manier om erfbelasting te beperken?', a: 'Dat hangt af van je situatie. Een schenking kan schenkbelasting opleveren en je houdt zelf minder geld over. Bekijk de actuele regels en laat eerst doorrekenen of een schenking past bij je toekomstige uitgaven.' },
    ],
    sources: [sources.proxy, sources.care, sources.careHome, sources.gift],
  },
];

export const knowledgePath = (slug: string) => '/kennisbank/' + slug + '/';

