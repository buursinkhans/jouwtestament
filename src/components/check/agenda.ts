import type { Answers } from './types.ts';

export function getAgenda(answers?: Partial<Answers>) {
  if (!answers) {
    return {
      home: [
        'Wat vinden jullie belangrijk voor later, en wat willen jullie met ons delen?',
        'Waar bewaren jullie belangrijke papieren, als jullie dat willen delen?',
        'Wie zouden jullie willen bellen of om hulp vragen als er iets gebeurt?',
      ],
      notary: [
        'Welke vragen willen jullie zelf met de notaris bespreken?',
        'Welke papieren willen jullie zelf meenemen naar een gesprek met de notaris?',
        'Hoe kunnen jullie vastleggen wie namens jullie mag handelen als dat nodig wordt?',
      ],
    };
  }

  const home = [];
  const notary = [];
  if (answers.home === 'yes') {
    home.push('Wat wil ik dat er later met mijn huis gebeurt?');
    notary.push('Welke mogelijkheden zijn er als iemand in mijn huis wil blijven wonen of het wil overnemen?');
  }
  if (answers.children === 'blended') {
    home.push('Wat vind ik belangrijk voor mijn eigen kinderen, eventuele stiefkinderen en mijn partner?');
    notary.push('Hoe kan ik mijn wensen voor mijn kinderen, eventuele stiefkinderen en mijn partner vastleggen?');
  }
  if (answers.minors === 'yes') {
    home.push('Wie zou voor mijn minderjarige kinderen kunnen zorgen en wie zou hun geld kunnen beheren?');
    notary.push('Hoe wijs ik een voogd aan en hoe kan ik het beheer van de erfenis voor mijn kinderen regelen?');
  } else if (answers.children && answers.children !== 'none') {
    home.push(answers.home === 'yes'
      ? 'Zou iemand het huis willen overnemen, en hoe willen we dan de waarde bepalen?'
      : 'Welke wensen wil ik nu al met mijn kinderen bespreken?');
    notary.push('Hoe kan ik vastleggen of eerdere schenkingen of familieleningen meetellen, als die er zijn?');
  }
  if (answers.situation === 'cohabiting' && home.length < 2) {
    home.push('Welke afspraken willen mijn partner en ik maken voor als een van ons overlijdt?');
    notary.push('Hoe kan ik regelen dat mijn partner erft als ik dat wil?');
  }
  home.push('Wie wil ik vragen om later zaken te regelen, en waar bewaar ik mijn documenten?');
  notary.push(answers.documents === 'both' || answers.documents === 'will_only'
    ? 'Past mijn bestaande testament nog bij mijn situatie en wensen?'
    : 'Welke afspraken kan ik vastleggen en welke documenten passen daarbij?');
  return { home: home.slice(0, 3), notary: notary.slice(0, 3) };
}

export type AgendaGoal = 'documents' | 'conversation' | 'wishes' | 'review' | 'help';

export function getActionOverview(answers?: Partial<Answers>, goal?: AgendaGoal) {
  const { home, notary } = getAgenda(answers);
  const practical = [
    { topic: 'Papieren en polissen', text: 'Noteer bij welke banken en verzekeraars je zaken hebt lopen en waar de papieren liggen.' },
    { topic: 'Contactpersonen', text: 'Schrijf op wie je naasten kunnen bellen als er iets gebeurt.' },
    { topic: 'Persoonlijke wensen', text: 'Maak een korte lijst van de wensen die je met je naasten wilt bespreken.' },
  ];
  const first = goal === 'wishes' || goal === 'conversation' ? 2 : goal === 'help' ? 1 : 0;
  return {
    practical: answers ? [practical[first], ...practical.filter((_, index) => index !== first)] : [
      { topic: 'Vindplaats van papieren', text: 'Vraag waar belangrijke papieren liggen, als je ouders dat willen delen.' },
      { topic: 'Contactpersonen', text: 'Vraag wie je ouders zelf om hulp zouden willen vragen.' },
    ],
    home,
    notary: goal === 'review' && answers?.documents !== 'both' && answers?.documents !== 'will_only'
      ? ['Welke afspraken heb ik al vastgelegd en welke wil ik laten nakijken?', ...notary].slice(0, 3)
      : notary,
  };
}
