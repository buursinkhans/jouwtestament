export const familyPath = '/erfenis-bespreken-met-kinderen/';
export const agendaPath = '/check/familiegesprek/';
export const overviewPath = '/overzicht-voor-nabestaanden/';
export const bookletPath = '/invulboekje/';

export const openers = {
  ouder: 'Ik wil jullie graag vertellen wat ik voor later belangrijk vind. Zullen we daar binnenkort rustig voor gaan zitten?',
  kind: 'Zullen we een keer samen opschrijven waar jullie belangrijke papieren liggen en wat jullie voor later zouden willen?',
};

export const topics = [
  {
    id: 'huis',
    title: 'Het ouderlijk huis',
    context: 'Misschien wil iemand het huis later graag overnemen. Geef iedereen de ruimte om te vertellen wat diegene voor zich ziet.',
    questions: [
      'Wat zouden jullie willen als één van ons het huis later graag wil overnemen?',
      'Wat moeten we eerst uitzoeken voordat we daar iets over afspreken?',
    ],
  },
  {
    id: 'schenkingen',
    title: 'Eerdere schenkingen en leningen',
    context: 'Geld voor een studie of eerste woning kan heel verschillend zijn bedoeld. Bespreek samen of het om een gift of een lening ging.',
    questions: [
      'Welke financiële afspraken hebben we eerder gemaakt en weet iedereen wat daarover is vastgelegd?',
      'Welke afspraak moeten we nog op papier opzoeken of verduidelijken?',
    ],
  },
  {
    id: 'taken',
    title: 'Wie pakt straks wat op?',
    context: 'Loop samen door wat er al ligt en spreek af wie het eerste aanspreekpunt wil zijn.',
    questions: [
      'Wie weet waar de papieren liggen en wie zou als eerste contact opnemen met de notaris?',
      'Wie kan die persoon helpen en hoe houden we elkaar op de hoogte?',
    ],
  },
] as const;

