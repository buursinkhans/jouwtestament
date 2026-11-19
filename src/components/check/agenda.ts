import type { Answers } from './types.ts';

export function getAgenda(answers?: Answers) {
  if (!answers) {
    return {
      home: [
        'Wat vinden jullie belangrijk voor later, en wat willen jullie met ons delen?',
        'Wat zouden jullie willen dat er later met jullie woning en dierbare spullen gebeurt?',
        'Wie mogen we bellen als er iets gebeurt, en waar bewaren jullie belangrijke stukken?',
      ],
      notary: [
        'Welke vragen willen jullie zelf met de notaris bespreken?',
        'Hoe kunnen jullie laten beoordelen of eerdere schenkingen of familieleningen moeten meetellen, als die er zijn?',
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
  } else if (answers.children !== 'none') {
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
