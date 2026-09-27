// The 12 tips (docs/08-content-tips.md). Copy verbatim.
// TODO(review-partner): all tips, especially ex-partner, hertrouwen, uitsluitingsclausule, verzekering and pensioen.

export interface Tip {
  slug: string;
  number: number;
  cardTitle: string;
  cardText: string;
  question: string; // H2 on /tips
  short: string; // "Kort antwoord"
  explanation: string;
  action: string; // "Wat kun je doen?"
  segments: string[]; // segment slugs, or ['alle']
  related: string[];
}

export const tips: Tip[] = [
  {
    slug: 'jonge-kinderen',
    number: 1,
    cardTitle: 'Jonge kinderen erven op hun 18e alles in één keer',
    cardText: 'Tenzij je in je testament regelt dat iemand het geld beheert tot ze bijvoorbeeld 25 zijn.',
    question: 'Wanneer krijgen jonge kinderen hun erfenis?',
    short:
      'Zonder testament mogen kinderen vanaf hun 18e vrij over hun erfenis beschikken. In je testament kun je regelen dat iemand het geld beheert tot een leeftijd die jij kiest, bijvoorbeeld 25 jaar.',
    explanation:
      'Dit heet een testamentair bewind. De beheerder mag het geld gebruiken voor bijvoorbeeld studie of levensonderhoud, maar je kind kan het niet in één keer uitgeven. Veel ouders vinden 18 te jong voor een bedrag dat, met een koophuis erbij, al snel flink is.',
    action: 'Bepaal tot welke leeftijd het beheer loopt en wie je daarvoor vertrouwt.',
    segments: ['jonge-kinderen', 'samenwonen'],
    related: ['voogd', 'ex-partner'],
  },
  {
    slug: 'voogd',
    number: 2,
    cardTitle: 'Kies zelf wie voor je kinderen zorgt',
    cardText: 'Anders wijst de rechter een voogd aan.',
    question: 'Wie zorgt er voor mijn kinderen als wij er niet meer zijn?',
    short:
      'Als beide ouders overlijden, wijst de rechter een voogd aan, tenzij je dat zelf hebt vastgelegd. Dat kan in je testament of via het gezagsregister.',
    explanation:
      'De voogd zorgt voor de opvoeding. Het beheer van het geld kun je bij iemand anders leggen. Soms is dat verstandig: de beste opvoeder is niet altijd de beste beheerder.',
    action: 'Bespreek het eerst met de persoon die je in gedachten hebt, en benoem ook een vervanger.',
    segments: ['jonge-kinderen'],
    related: ['jonge-kinderen', 'executeur'],
  },
  {
    slug: 'ex-partner',
    number: 3,
    cardTitle: 'Na een scheiding beheert je ex de erfenis van je kinderen',
    cardText:
      'Als je minderjarige kinderen erven, beheert de andere ouder dat geld. Met een testament kun je iemand anders aanwijzen.',
    question: 'Wie beheert de erfenis van mijn kinderen na een scheiding?',
    short:
      'Erven je minderjarige kinderen van jou, dan beheert de andere ouder dat geld in principe. Na een scheiding is dat vaak je ex. Met een testament kun je iemand anders als beheerder aanwijzen.',
    explanation:
      'Veel gescheiden ouders zijn hiervan niet op de hoogte. Het gaat niet om wantrouwen, maar om de vraag wie je het beheer het liefst toevertrouwt.',
    action: 'Wijs in je testament een beheerder aan die jij kiest.',
    segments: ['jonge-kinderen', 'samengesteld-gezin'],
    related: ['jonge-kinderen', 'voogd'],
  },
  {
    slug: 'executeur',
    number: 4,
    cardTitle: 'Een executeur voorkomt stilstand',
    cardText: 'Zonder executeur moeten alle erfgenamen samen alles regelen en tekenen.',
    question: 'Waarom is een executeur zo belangrijk?',
    short:
      'Een executeur is de persoon die je nalatenschap afwikkelt: rekeningen betalen, bank en instanties regelen en zorgen dat de aangifte erfbelasting wordt gedaan. Zonder executeur moeten alle erfgenamen samen beslissen en tekenen.',
    explanation:
      'Dat laatste gaat goed zolang iedereen het eens is en snel reageert. In de praktijk vertraagt het vaak, zeker als erfgenamen ver weg wonen of het oneens zijn. Een executeur kan een familielid zijn, maar ook een professional.',
    action: 'Kies iemand die betrouwbaar is en er tijd voor heeft, en benoem een vervanger.',
    segments: ['55-plus', 'je-ouders'],
    related: ['transparant', 'actueel'],
  },
  {
    slug: 'transparant',
    number: 5,
    cardTitle: 'Vertel wat er in je testament staat',
    cardText: 'Een testament dat als verrassing komt, leidt vaker tot onbegrip en ruzie.',
    question: 'Moet ik vertellen wat er in mijn testament staat?',
    short:
      'Dat hoeft niet, maar het helpt vaak wel. Keuzes die als verrassing komen, leiden vaker tot onbegrip en discussie dan keuzes die je vooraf hebt uitgelegd.',
    explanation:
      'Dat geldt vooral bij een ongelijke verdeling, een samengesteld gezin of een ondernemer die het bedrijf aan één kind nalaat. Je hoeft geen bedragen te noemen; de reden achter je keuzes is vaak het belangrijkst. Daarvoor is de uitleg voor je nabestaanden bedoeld.',
    action: 'Bespreek de hoofdlijnen met je naasten, en leg je motivatie op papier vast.',
    segments: ['samengesteld-gezin', 'je-ouders'],
    related: ['executeur', 'hertrouwen'],
  },
  {
    slug: 'hertrouwen',
    number: 6,
    cardTitle: 'Als je partner hertrouwt, kan je vermogen meeverhuizen',
    cardText: 'Met de juiste bepalingen bescherm je partner én kinderen.',
    question: 'Wat gebeurt er als mijn partner na mijn overlijden opnieuw trouwt?',
    short:
      'Bij de wettelijke verdeling krijgt je partner alles en hebben je kinderen een vordering die meestal pas opeisbaar is als ook je partner overlijdt. Trouwt je partner opnieuw, dan kan een deel van het vermogen uiteindelijk bij de nieuwe familie terechtkomen.',
    explanation:
      'Bovendien groeit de vordering van je kinderen vaak niet mee met bijvoorbeeld de waarde van het huis. Met de juiste bepalingen in je testament kun je je partner goed verzorgd achterlaten én je kinderen beschermen.',
    action: 'Laat je adviseren over hoe je partner en kinderen allebei beschermd blijven.',
    segments: ['samengesteld-gezin', '55-plus'],
    related: ['transparant', 'uitsluitingsclausule'],
  },
  {
    slug: 'uitsluitingsclausule',
    number: 7,
    cardTitle: 'Bescherm de erfenis bij een scheiding van je kind',
    cardText:
      'Trouwde je kind vóór 2018 in gemeenschap van goederen? Een uitsluitingsclausule houdt de erfenis erbuiten.',
    question: 'Hoe voorkom ik dat de erfenis bij de ex van mijn kind terechtkomt?',
    short:
      'Bij huwelijken vanaf 2018 valt een erfenis automatisch buiten de gemeenschap van goederen. Trouwde je kind eerder in gemeenschap van goederen, dan kan bij een scheiding de helft van de erfenis naar de ex gaan. Een uitsluitingsclausule in je testament voorkomt dat.',
    explanation:
      'Het is een kleine bepaling met groot effect. Ze is ook nuttig als je kind later nog trouwt of samenwoont met een samenlevingscontract.',
    action: 'Vraag na hoe je kinderen getrouwd zijn, en neem de clausule op waar nodig.',
    segments: ['55-plus'],
    related: ['hertrouwen', 'actueel'],
  },
  {
    slug: 'verzekering',
    number: 8,
    cardTitle: 'Je levensverzekering loopt niet via je testament',
    cardText: 'Check wie er als begunstigde in de polis staat.',
    question: 'Gaat een levensverzekering via mijn testament?',
    short:
      'Nee. De uitkering van een levens- of overlijdensrisicoverzekering gaat naar de begunstigde in de polis, niet via je testament. Staat daar nog een ex-partner in, dan krijgt die het geld.',
    explanation:
      'Voor samenwoners is er nog een punt: met een kruislings afgesloten overlijdensrisicoverzekering kun je vaak erfbelasting over de uitkering voorkomen.',
    action: 'Controleer de begunstiging van al je polissen.',
    segments: ['samenwonen'],
    related: ['pensioen', 'actueel'],
  },
  {
    slug: 'pensioen',
    number: 9,
    cardTitle: 'Samenwoner? Meld je partner aan bij je pensioenfonds',
    cardText: 'Anders loopt je partner het nabestaandenpensioen mogelijk mis.',
    question: 'Krijgt mijn partner een nabestaandenpensioen?',
    short:
      'Getrouwde partners zijn meestal automatisch aangemeld bij het pensioenfonds. Samenwoners vaak niet: dan moet je je partner zelf aanmelden, soms met een samenlevingscontract als bewijs.',
    explanation:
      'Zonder aanmelding kan je partner na je overlijden een fors inkomen mislopen. Het is een van de meest gemiste punten bij samenwonen.',
    action: 'Controleer bij je pensioenfonds of je partner is aangemeld.',
    segments: ['samenwonen'],
    related: ['verzekering', 'jonge-kinderen'],
  },
  {
    slug: 'digitaal',
    number: 10,
    cardTitle: 'Regel je digitale nalatenschap',
    cardText: 'Accounts, foto’s en abonnementen: leg vast wie wat mag afsluiten.',
    question: 'Wat gebeurt er met mijn digitale nalatenschap?',
    short:
      'Leg vast wat er moet gebeuren met je e-mail, sociale media, foto’s, abonnementen en digitale bezittingen, en wie dat mag regelen.',
    explanation:
      'Zet wachtwoorden niet in je testament: meerdere mensen kunnen dat later inzien. Een wachtwoordmanager met noodtoegang voor een vertrouwd persoon is veiliger.',
    action: 'Maak een overzicht van je accounts en wijs iemand aan die ze mag afsluiten.',
    segments: ['alle'],
    related: ['codicil', 'executeur'],
  },
  {
    slug: 'codicil',
    number: 11,
    cardTitle: 'Uitvaartwensen leg je vast in een codicil',
    cardText: 'Handgeschreven, gedateerd en ondertekend. Geen notaris nodig.',
    question: 'Hoe leg ik mijn uitvaartwensen en persoonlijke spullen vast?',
    short:
      'Uitvaartwensen en de verdeling van persoonlijke spullen, zoals sieraden of kleding, kun je vastleggen in een codicil: een handgeschreven, gedateerde en ondertekende verklaring. Daar is geen notaris voor nodig.',
    explanation:
      'Juist persoonlijke spullen met emotionele waarde leiden verrassend vaak tot discussie. Een codicil maakt je wensen duidelijk, en je kunt het zelf eenvoudig aanpassen.',
    action: 'Schrijf je wensen met de hand op en bewaar het codicil op een plek die je naasten kennen.',
    segments: ['55-plus'],
    related: ['digitaal', 'transparant'],
  },
  {
    slug: 'actueel',
    number: 12,
    cardTitle: 'Een oud testament kan verkeerd uitpakken',
    cardText: 'Laat het checken na grote veranderingen of om de paar jaar.',
    question: 'Wanneer moet ik mijn testament opnieuw bekijken?',
    short:
      'Bij grote veranderingen: trouwen, scheiden, een geboorte, een overlijden in de familie, verhuizen naar het buitenland of het verkopen van je huis of bedrijf. En verder om de paar jaar.',
    explanation:
      'Een testament dat klopte toen je het maakte, kan jaren later onbedoeld verkeerd uitpakken. Ook regels veranderen: het kabinet werkt bijvoorbeeld aan wijzigingen in de schenk- en erfbelasting.',
    action: 'Zet een herinnering om je regeling elke paar jaar te laten checken.',
    segments: ['55-plus', 'je-ouders'],
    related: ['executeur', 'uitsluitingsclausule'],
  },
];

export const tipBySlug = (slug: string): Tip => {
  const tip = tips.find((t) => t.slug === slug);
  if (!tip) throw new Error(`Unknown tip: ${slug}`);
  return tip;
};

// Tip pages per slug are phase 2; until then tips link to their anchor on /tips.
export const tipHref = (slug: string) => `/tips#${slug}`;
