export const live = 'https://heldernalaten.nl';
export const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://helder-nalaten-editorial.leanborage1.chatgpt.site';
export const indexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export const situations = [
  { slug: 'samengesteld-gezin', title: 'Samengesteld gezin', image: 'gezin', question: 'Hoe geeft u iedereen een plek?', intro: 'Met een partner, eigen kinderen en stiefkinderen kunnen verwachtingen uiteenlopen. Begin met wat u ieder van hen wilt meegeven.', prompts: ['Hoe wilt u dat uw partner later kan blijven wonen?', 'Welke wensen wilt u voor ieder kind uitspreken?', 'Welke afspraken wilt u met uw gezin bespreken?'] },
  { slug: 'ondernemer', title: 'Ondernemer', image: 'ondernemer', question: 'Wie kan uw bedrijf voortzetten?', intro: 'Uw bedrijf heeft zijn eigen ritme. Een gesprek over opvolging en bevoegdheden geeft uw familie en collega’s houvast.', prompts: ['Wie kan tijdelijk beslissingen nemen?', 'Welke afspraken bestaan er met mede-eigenaren?', 'Welke vragen wilt u met uw adviseur en notaris uitzoeken?'] },
  { slug: 'kinderen', title: 'Kinderen', image: 'kinderen', question: 'Wie zorgt er straks voor hen?', intro: 'Bij jonge kinderen gaat voorbereiden ook over de mensen om hen heen. Bespreek wie voor de kinderen zou kunnen zorgen en wie u vertrouwt met hun geld.', prompts: ['Aan wie zou u de zorg voor uw kinderen willen vragen?', 'Wie kan hun geld beheren?', 'Hoe bespreekt u uw wensen met deze mensen?'] },
  { slug: 'mantelzorg', title: 'Mantelzorg', image: 'mantelzorg', question: 'Hoe begint u het gesprek met uw ouders?', intro: 'Vraag wat uw ouders belangrijk vinden. Zij kiezen welke informatie ze delen en wie zij willen betrekken.', prompts: ['Wie mogen we bellen als er onverwacht iets gebeurt?', 'Waar vinden we belangrijke documenten als jullie hulp nodig hebben?', 'Wat willen jullie zelf met de notaris bespreken?'] },
  { slug: 'woningbezit', title: 'Woningbezit', image: 'woning', question: 'Wat wilt u dat er met uw huis gebeurt?', intro: 'Een huis is een bezit én een plek vol herinneringen. Vraag wat die plek voor uw familie betekent en bespreek wat u ermee wilt.', prompts: ['Wie zou in de woning willen blijven of die willen overnemen?', 'Hoe wilt u de waarde laten bepalen?', 'Welke mogelijkheden wilt u met de notaris bespreken?'] },
  { slug: 'erfenis', title: 'Erfenis', image: 'erfenis', question: 'Welke wensen wilt u doorgeven?', intro: 'Een erfenis bestaat uit geld, spullen en persoonlijke herinneringen. Maak ruimte voor de betekenis die u eraan geeft.', prompts: ['Welke spullen hebben bijzondere waarde voor iemand in uw familie?', 'Wie wilt u vragen de afwikkeling te regelen?', 'Welke keuzes wilt u kunnen uitleggen?'] },
];

export const steps = [
  { title: 'Kennismaken', text: 'U vertelt wie bij uw verhaal hoort en wat u graag helder wilt krijgen.' },
  { title: 'Inzicht creëren', text: 'Breng in kaart wat al vastligt, welke wensen u heeft en waarover u nog vragen wilt stellen.' },
  { title: 'Keuzes vastleggen', text: 'Zet uw wensen op papier. De notaris beoordeelt de mogelijkheden en stelt waar nodig de akte op.' },
  { title: 'Rust voor later', text: 'Bepaal wat u wilt delen, wie een rol krijgt en waar belangrijke documenten te vinden zijn.' },
];

export const stories = [
  { slug: 'drie-kinderen-een-verdeling', title: 'Drie kinderen, één verdeling', court: 'Gerechtshof Arnhem-Leeuwarden', intro: 'Twee zussen en een broer raakten verdeeld over de afwikkeling van de nalatenschappen van hun ouders.', question: 'Welke afspraken kent iedereen, en waar zijn die vastgelegd?', source: 'https://uitspraken.rechtspraak.nl/details?id=ECLI%3ANL%3AGHARL%3A2024%3A6116' },
  { slug: 'de-opbrengst-van-het-huis', title: 'De opbrengst van het huis', court: 'Rechtbank Zeeland-West-Brabant', intro: 'Een broer en zus erfden van hun moeder. Na verkoop van haar woning ontstond een geschil over de verdeling van de opbrengst.', question: 'Welke afspraken over de woning en eventuele leningen moeten nog worden uitgezocht?', source: 'https://uitspraken.rechtspraak.nl/details?id=ECLI%3ANL%3ARBZWB%3A2024%3A4504' },
];

