export const checkSteps = [
  { key: 'family', title: 'Wat is je gezinssituatie?', options: [
    ['single', 'Alleenstaand'], ['no-contract', 'Samenwonend (zonder contract)'], ['contract', 'Samenwonend (met contract)'], ['married', 'Getrouwd of geregistreerd partnerschap'],
  ] },
  { key: 'children', title: 'Heb je kinderen?', options: [
    ['none', 'Nee'], ['young', 'Ja, minderjarige kinderen samen'], ['blended', 'Ja, samengesteld gezin (kinderen uit eerdere relatie)'], ['adult', 'Ja, volwassen kinderen'],
  ] },
  { key: 'home', title: 'Hoe woon je?', options: [
    ['rent', 'Huurwoning'], ['mortgage', 'Koopwoning met hypotheek'], ['equity', 'Koopwoning met flinke overwaarde'],
  ] },
  { key: 'driver', title: 'Wat wil je vooral bereiken?', options: [
    ['protect', 'Kinderen en partner beschermen'], ['control', 'Regie houden als ik ziek word'], ['tax', 'Onnodige erfbelasting besparen'], ['harmony', 'Ruzie in de familie voorkomen'],
  ] },
  { key: 'status', title: 'Wat heb je al geregeld?', options: [
    ['nothing', 'Nog niets vastgelegd'], ['old', 'Ooit iets geregeld, maar ouder dan 5 jaar'], ['recent', 'Recent alles laten checken'],
  ] },
] as const;

type Step = (typeof checkSteps)[number];
export type Answers = { [S in Step as S['key']]: S['options'][number][0] };
type Item = { key: string; title: string; text: string; priority: number };
type Solution = { title: string; text: string; source: string };

export function parseAnswers(value: unknown): Answers | null {
  if (typeof value !== 'object' || value === null) return null;
  const input = value as Record<string, unknown>;
  const entries = checkSteps.map(({ key, options }) => {
    const picked = options.find(([option]) => option === input[key]);
    return [key, picked?.[0]] as const;
  });
  if (entries.some(([, option]) => !option)) return null;
  return Object.fromEntries(entries) as Answers;
}

export function actionPlan(answers: Answers) {
  const { family, children, home, driver, status } = answers;
  const items: Item[] = [];
  if (children !== 'none') {
    items.push({
      key: 'children', title: children === 'adult' ? 'Duidelijkheid voor je kinderen' : 'Kinderen beschermen',
      text: children === 'blended'
        ? 'In een samengesteld gezin kunnen verwachtingen verschillen tussen je partner en kinderen uit een eerdere relatie. Zet op een rij wat je ieder wilt meegeven. Zijn er minderjarige kinderen? Bespreek ook wie voor hen kan zorgen.'
        : children === 'young'
          ? 'Bespreek wie voor je kinderen kan zorgen als er geen ouder met gezag meer is. Vraag ook wie kan helpen hun geld te beheren.'
          : 'Je volwassen kinderen hoeven jouw keuzes minder snel te raden als je tijdig vertelt wat je wilt en waar zij belangrijke afspraken vinden.',
      priority: (children === 'adult' ? 35 : 65) + (driver === 'protect' ? 40 : 0),
    });
  }
  if (family !== 'single') {
    items.push({
      key: 'partner', title: 'Partner beschermen',
      text: family === 'no-contract'
        ? 'Je woont samen zonder contract. Als je een partner iets wilt nalaten, is samenwonen op zichzelf niet genoeg. Bespreek ook hoe je partner kan blijven wonen als jij overlijdt.'
        : family === 'contract'
          ? 'Bekijk welke gezamenlijke spullen onder jullie contract vallen. Wil je ook persoonlijke bezittingen nalaten aan je partner? Bespreek welke afspraken daarvoor nodig zijn.'
          : 'Een huwelijk of geregistreerd partnerschap geeft een wettelijke basis. Kijk samen of die past bij jullie wensen over wonen, kinderen en geld.',
      priority: (family === 'married' ? 45 : 60) + (driver === 'protect' ? 34 : 0),
    });
  }
  items.push({
    key: 'care', title: 'Regie bij ziekte',
    text: 'Kies wie praktische zaken en geldzaken mag regelen als je dat zelf minder goed kunt. Bespreek welke keuzes je aan die persoon wilt overlaten, en wie kan inspringen.',
    priority: driver === 'control' ? 120 : 50,
  });
  items.push({
    key: 'wealth', title: driver === 'tax' ? 'Erfbelasting in beeld brengen' : 'Vermogen behouden',
    text: home === 'equity'
      ? 'Een groot deel van je vermogen zit mogelijk in je huis. Onderzoek hoe je geld beschikbaar houdt zonder nu al over verkoop of schenken te beslissen. Laat de gevolgen voor erfbelasting of de eigen bijdrage bij langdurige zorg apart bekijken.'
      : home === 'mortgage'
        ? 'Kijk welke woonlasten en afspraken doorlopen als er iets verandert. Bespreek wat voor de mensen om je heen betaalbaar kan blijven.'
        : 'Ook met een huurwoning kun je bezittingen, spaargeld en afspraken hebben. Zet op een rij wat er is en welke vragen je hebt over de kosten of erfbelasting.',
    priority: driver === 'tax' ? 120 : home === 'equity' ? 62 : 30,
  });
  if (driver === 'harmony' || children === 'blended' || (children === 'none' && family === 'single' && driver === 'protect')) {
    items.push({
      key: 'talk', title: 'Duidelijkheid voor je naasten',
      text: 'Bespreek wat voor jou belangrijk is en wie welke rol wil nemen. Spreek ook af waar belangrijke afspraken te vinden zijn. Zo hoeven anderen later minder te raden.',
      priority: driver === 'harmony' ? 120 : 53,
    });
  }

  const solutions: Solution[] = [
    { title: status === 'nothing' ? 'Testament bespreken' : 'Testament nalopen', text: 'Bij de notaris leg je vast wat er na je overlijden met je bezittingen gebeurt en wie praktische zaken regelt.', source: 'https://www.notaris.nl/testament/testament-opstellen' },
    { title: 'Levenstestament', text: 'Leg vast wie namens jou praktische en financiële beslissingen mag nemen als je daar tijdens je leven hulp bij nodig hebt.', source: 'https://www.notaris.nl/levenstestament' },
  ];
  if (children === 'young' || children === 'blended') solutions.push({
    title: 'Zorg voor minderjarige kinderen', text: 'Als dit voor jou speelt, bespreek wie die zorg kan overnemen. Je kunt iemand aanwijzen in je testament of via het gezagsregister.',
    source: 'https://www.rijksoverheid.nl/documenten/vraag-en-antwoord/ouderlijk-gezag/wie-krijgt-het-gezag-over-mijn-kind-als-ik-kom-te-overlijden',
  });
  if (family === 'no-contract' || family === 'contract') solutions.push({
    title: family === 'contract' ? 'Samenlevingscontract nalopen' : 'Samenlevingscontract bespreken',
    text: 'Bespreek wat jullie delen en welke afspraken nodig zijn over de woning en gezamenlijke spullen.', source: 'https://www.notaris.nl/samen-verder/samenwonen',
  });
  if (home === 'equity' || driver === 'tax') solutions.push({
    title: 'Schenkingsplan verkennen', text: 'Breng in kaart óf je iets wilt geven tijdens je leven en hoeveel je zelf nodig kunt hebben. Laat de belastinggevolgen eerst bekijken.',
    source: 'https://www.belastingdienst.nl/wps/wcm/connect/nl/schenken/schenken',
  });

  const statusNote = {
    nothing: 'Kies één onderwerp om mee te beginnen. Je hoeft vandaag niet alles vast te leggen.',
    old: 'Pak wat je eerder hebt vastgelegd erbij en kijk wat er intussen is veranderd.',
    recent: 'Gebruik dit overzicht om te controleren of je omgeving de recente afspraken kent. Als je situatie gelijk is gebleven, hoeft er niet meteen iets te veranderen.',
  }[status];

  return { items: items.sort((a, b) => b.priority - a.priority), solutions, statusNote };
}

