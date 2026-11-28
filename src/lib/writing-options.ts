export const writingEnabled = import.meta.env.PUBLIC_WRITING_ASSISTANT_ENABLED === 'true';

export const writingTopics = {
  message: { title: 'Een persoonlijke boodschap', hint: 'Voor mijn partner, kinderen of andere dierbaren.', examples: ['Trots op mijn kinderen', 'Samen aan tafel', 'Tijd voor elkaar'] },
  choices: { title: 'Waarom ik bepaalde keuzes maak', hint: 'Een persoonlijke toelichting bij mijn wensen.', examples: ['Het huis in de familie', 'Niemand hoeft zich verplicht te voelen', 'Mijn keuzes rustig uitleggen'] },
  wishes: { title: 'Mijn wensen voor later', hint: 'Wat vind ik belangrijk en wat wil ik meegeven?', examples: ['Elkaar blijven opzoeken', 'Samen herinneringen ophalen', 'Zorg voor elkaar'] },
  conversation: { title: 'Een gesprek beginnen', hint: 'Een vriendelijke opening voor een gesprek met mijn familie.', examples: ['Vragen waar de papieren liggen', 'Een rustig moment kiezen', 'Luisteren naar wat mijn ouders willen'] },
} as const;
export const writingTones = {
  warm: 'Warm en betrokken',
  plain: 'Nuchter en eenvoudig',
  personal: 'Persoonlijk en gevoelig',
} as const;

export const writingPath = '/mijn-woorden-voor-later/';
