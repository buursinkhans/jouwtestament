import { knowledgePath, sources } from './knowledge';

export const hubs = {
  'voor-gezinnen': {
    title: 'Voor gezinnen',
    heading: 'Wie zorgt voor je gezin als er iets verandert?',
    intro: 'Met school, werk en de woning is er al genoeg te regelen. Toch kan een belangrijke vraag blijven liggen. Weten jullie wie er voor de kinderen zorgt of wie in het huis kan blijven als een van jullie overlijdt?',
    focus: 'gezin',
    article: { href: knowledgePath('voogdij-regelen'), label: 'Voogdij regelen voor je kinderen' },
    topics: [
      { title: 'Wie kan de zorg voor je kinderen overnemen?', text: 'Kijk eerst wie het gezag heeft. Als jullie samen het gezag hebben en één ouder overlijdt, houdt de andere ouder het gezag. Bespreek wie de zorg zou kunnen overnemen als er geen ouder met gezag meer is.', source: sources.custody },
      { title: 'Wat gebeurt er als je samenwoont en één van jullie overlijdt?', text: 'Woon je ongehuwd samen zonder geregistreerd partnerschap? Dan erft je partner zonder testament niet automatisch. Een samenlevingscontract kan wel afspraken bevatten over jullie gezamenlijke bezittingen.', source: sources.together },
      { title: 'Kan je partner in jullie koophuis blijven?', text: 'Kijk wie eigenaar is, welke afspraken er zijn en of de woonlasten betaalbaar blijven. Een afspraak over gezamenlijke spullen geldt alleen als die spullen van jullie samen zijn. Laat bij een woning nakijken welke afspraken echt nodig zijn.', source: sources.homeTogether },
    ],
  },
  'voor-later': {
    title: 'Voor later',
    heading: 'Welke keuzes wil je zelf blijven maken?',
    intro: 'Je hebt veel opgebouwd. Toch weten anderen misschien niet wat je wilt met je woning of wie praktische zaken mag regelen als je hulp nodig hebt. Breng die vragen op tijd in beeld.',
    focus: 'later',
    article: { href: knowledgePath('levenstestament-en-overwaarde'), label: 'Levenstestament en overwaarde van je woning' },
    topics: [
      { title: 'Wie mag namens jou zaken regelen?', text: 'Bespreek wie je vertrouwt met je geldzaken en praktische beslissingen. In een levenstestament kun je vastleggen wat die persoon mag doen en wanneer er overleg nodig is.', source: sources.proxy },
      { title: 'Wat betekent overwaarde als je zorg nodig hebt?', text: 'Overwaarde zit in je woning. Bij opname kunnen je woonkosten, de belasting en de eigen bijdrage veranderen. Kijk apart naar de afspraken over de woning en naar de berekening van het CAK.', source: sources.care },
      { title: 'Wat kun je schenken zonder jezelf klem te zetten?', text: 'Schrijf op wat je al hebt gegeven en wat je later zelf nodig kunt hebben. Kijk bij de Belastingdienst welke voorwaarden en vrijstellingen gelden, voordat je een bedrag kiest.', source: sources.gift },
      { title: 'Waar kun je grip krijgen op erfbelasting?', text: 'Welke regels gelden, hangt onder meer af van wie iets ontvangt en de situatie op dat moment. Voor samenwoners gelden aparte voorwaarden. Laat bij vragen over schenken, wonen of verdelen de gevolgen eerst doorrekenen.', source: sources.tax },
    ],
  },
} as const;

export const questions = [
  { id:'gesprek', q:'Hoe begin ik over later met mijn familie?', a:'Kies een rustig moment en begin met één open vraag. Bijvoorbeeld: wat zouden jullie willen dat er later met het huis gebeurt?', source:'https://www.notaris.nl/', label:'Notaris.nl' },
  { id:'kinderen', q:'Waar kan ik mijn keuze vastleggen voor wie voor mijn kinderen zorgt?', a:'Je kunt iemand aanwijzen in je testament of in het gezagsregister. Bespreek eerst met die persoon of die dit wil en kan.', source:'https://www.rijksoverheid.nl/themas/familie-zorg-en-gezondheid/jeugdbescherming/vraag-en-antwoord/ouderlijk-gezag/hoe-krijg-ik-de-voogdij-over-een-kind', label:'Rijksoverheid over voogdij' },
  { id:'erfbelasting', q:'Gelden voor samenwoners dezelfde regels voor erfbelasting?', a:'Voor samenwoners gelden aparte voorwaarden voor partnerschap voor de erfbelasting. Bekijk welke voorwaarden bij jullie situatie passen en bespreek vragen met de notaris.', source:'https://www.belastingdienst.nl/wps/wcm/connect/nl/erfbelasting/content/partners-voor-de-erfbelasting', label:'Belastingdienst over partnerschap voor de erfbelasting' },
  { id:'schenkingen', q:'Wat bespreek ik als ik eerder geld heb geschonken?', a:'Zet op een rij wat je hebt gegeven, aan wie en welke afspraken daarbij horen. Vraag daarna welke gegevens je moet bewaren en welke regels op jouw situatie van toepassing zijn.', source:'https://www.belastingdienst.nl/wps/wcm/connect/nl/schenken/schenken', label:'Belastingdienst over schenken' },
  { id:'check', q:'Wat krijg ik na De Goed Geregeld Check?', a:'Je krijgt een persoonlijk overzicht van aandachtspunten en vervolgstappen. Je kunt het actieplan als gratis PDF downloaden en zelf bepalen met wie je het deelt.' }
] as const;

