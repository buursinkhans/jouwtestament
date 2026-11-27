import { getActionOverview, type AgendaGoal } from './agenda.ts';
import { prefill } from './prefill.ts';
import type { Answers } from './types.ts';
import { track } from '../../lib/analytics';

export function initCheck(root: HTMLElement) {
  const find = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
  const form = find<HTMLFormElement>('[data-check-form]');
  const route = find<HTMLFieldSetElement>('[data-check-route]');
  const questionSets = Array.from(form.querySelectorAll<HTMLFieldSetElement>('[data-question]'));
  const parentsIntro = find('[data-parents-intro]');
  const result = find('[data-check-result]');
  const progress = find('[data-check-progress]');
  const actions = find('[data-step-actions]');
  const back = find<HTMLButtonElement>('[data-step-back]');
  const next = find<HTMLButtonElement>('[data-show-result]');
  const edit = find('[data-agenda-edit]');
  const print = find('[data-agenda-output]');
  const status = find('[data-agenda-status]');
  const params = new URLSearchParams(location.search);

  const value = (name: string) => (form.elements.namedItem(name) as RadioNodeList | null)?.value ?? '';
  const parents = () => value('route') === 'parents';
  let index = 0;
  let rowId = 0;
  let previousPlan = '';
  let answers: Partial<Answers> | undefined;
  const recorded = new Set<string>();
  const once = (event: 'check_started' | 'check_completed' | 'check_submitted' | 'agenda_viewed' | 'agenda_edited') => {
    if (recorded.has(event)) return;
    recorded.add(event);
    track(event);
  };

  const select = (name: string, answer: string) => {
    const radio = Array.from(form.querySelectorAll<HTMLInputElement>('input[type=radio]'))
      .find(input => input.name === name && input.value === answer);
    if (radio) radio.checked = true;
  };
  for (const [key, answer] of Object.entries({
    ...prefill(new URLSearchParams(root.dataset.prefill ?? '')),
    ...prefill(params),
  })) select(key, answer);
  const startsWithParents = params.get('ref') === 'kind' || root.dataset.segmentPage === 'je-ouders';
  if (startsWithParents) select('route', 'parents');

  function steps() {
    if (parents()) return [route];
    return [route, ...questionSets.filter(set =>
      set.dataset.question !== 'minors' || ['joint', 'blended'].includes(value('children'))
    )];
  }

  function showStep(moveFocus = false) {
    const visible = steps();
    const current = visible[index];
    for (const set of [route, ...questionSets]) set.hidden = set !== current;
    parentsIntro.hidden = !parents();
    progress.hidden = false;
    progress.textContent = index === 0 ? 'Kies hoe je wilt beginnen' : `Vraag ${index} van ${visible.length - 1}`;
    back.hidden = index === 0;
    next.textContent = index === visible.length - 1 ? 'Bekijk mijn gespreksagenda' : 'Volgende';
    if (moveFocus) {
      const legend = current.querySelector('legend');
      legend?.setAttribute('tabindex', '-1');
      legend?.focus();
    }
  }

  function readAnswers(): Partial<Answers> {
    const situation = value('situation');
    const children = value('children');
    const home = value('home');
    const documents = value('documents');
    const minors = value('minors');
    return {
      ...(['married', 'cohabiting', 'single'].includes(situation) ? { situation: situation as Answers['situation'] } : {}),
      ...(['joint', 'blended', 'none'].includes(children) ? { children: children as Answers['children'] } : {}),
      ...(home === 'yes' || home === 'no' ? { home } : {}),
      ...(['both', 'will_only', 'nothing', 'unknown'].includes(documents) ? { documents: documents as Answers['documents'] } : {}),
      ...(['joint', 'blended'].includes(children) && (minors === 'yes' || minors === 'no') ? { minors } : {}),
    };
  }

  function list(name: string, items: string[]) {
    find(`[data-overview="${name}"]`).replaceChildren(...items.map(text =>
      Object.assign(document.createElement('li'), { textContent: text })
    ));
  }

  function edited() {
    once('agenda_edited');
    status.textContent = '';
  }

  function addRow(group: HTMLElement, text = '', moveFocus = false) {
    const row = document.createElement('div');
    row.className = 'agenda-row';
    const input = document.createElement('textarea');
    input.id = `${root.getAttribute('aria-labelledby')}-entry-${++rowId}`;
    input.className = 'agenda-input';
    input.rows = 2;
    input.value = text;
    const label = Object.assign(document.createElement('label'), { htmlFor: input.id, textContent: group.dataset.entryLabel });
    const remove = Object.assign(document.createElement('button'), { type: 'button', textContent: 'Verwijderen' });
    remove.setAttribute('aria-label', `${group.dataset.entryLabel} verwijderen`);
    remove.addEventListener('click', () => {
      const focusTarget = row.nextElementSibling?.querySelector('textarea') ?? row.previousElementSibling?.querySelector('textarea');
      row.remove();
      edited();
      (focusTarget ?? find('[data-agenda-add]')).focus();
    });
    row.append(label, input, remove);
    group.append(row);
    if (moveFocus) input.focus();
  }

  const groupLabels = [
    ['topics', 'Waar willen we het over hebben?', 'Onderwerp'],
    ['home', 'Vragen voor ons gesprek', 'Gespreksvraag'],
    ['notary', 'Wat nemen we mee naar de notaris?', 'Vraag voor de notaris'],
  ] as const;
  const groups = new Map(groupLabels.map(([key, heading, label]) => {
    const section = document.createElement('section');
    section.dataset.entryLabel = label;
    section.append(Object.assign(document.createElement('h4'), { textContent: heading }));
    edit.append(section);
    return [key, section];
  }));

  function populateAgenda(plan: ReturnType<typeof getActionOverview>) {
    const key = JSON.stringify(plan);
    if (key === previousPlan) return;
    previousPlan = key;
    const data = { topics: plan.practical.map(item => item.topic), home: plan.home, notary: plan.notary };
    for (const [group, section] of groups) {
      section.querySelectorAll('.agenda-row').forEach(row => row.remove());
      for (const item of data[group]) addRow(section, item);
    }
  }

  function agendaText() {
    const field = (name: string) => find<HTMLInputElement | HTMLTextAreaElement>(`[data-agenda-${name}]`).value.trim();
    const blank = '________________________________________________';
    const entries = (key: typeof groupLabels[number][0]) =>
      Array.from(groups.get(key)!.querySelectorAll('textarea'), input => input.value.trim()).filter(Boolean).map(line => '• ' + line);
    return [
      'Onze gespreksagenda voor later',
      'Datum: ' + (field('date') || blank),
      'Je hoeft niet alles in één keer te regelen. Begin met de onderwerpen die voor jullie belangrijk zijn. Met deze vragen kun je samen het gesprek aangaan.',
      groupLabels[0][1], ...entries('topics'), '',
      groupLabels[1][1], ...entries('home'), '',
      'Wat willen we nog uitzoeken?', ...(field('notes') ? [field('notes')] : [blank, blank]), '',
      groupLabels[2][1], ...entries('notary'), '',
      'Onze volgende stap',
      'Wat: ' + (field('step') || blank),
      'Wie: ' + (field('who') || blank),
      'Wanneer: ' + (field('when') || blank),
    ].join('\n');
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('change', event => {
    const input = event.target as HTMLInputElement;
    if (input.type !== 'radio') return;
    once('check_started');
    if (input.name === 'route') showStep();
    input.closest('fieldset')?.querySelector('[data-error-for]')?.setAttribute('hidden', '');
  });
  form.addEventListener('input', event => {
    if ((event.target as HTMLElement).closest('[data-agenda]')) edited();
  });
  back.addEventListener('click', () => { index--; showStep(true); });
  next.addEventListener('click', () => {
    once('check_started');
    const visible = steps();
    const question = visible[index];
    const name = question.dataset.question;
    if (name && name !== 'goal' && !value(name)) {
      question.querySelector('[data-error-for]')?.removeAttribute('hidden');
      question.querySelector('input')?.focus();
      return;
    }
    if (index < visible.length - 1) { index++; showStep(true); return; }

    answers = parents() ? undefined : readAnswers();
    const plan = getActionOverview(answers, parents() ? undefined : value('goal') as AgendaGoal);
    list('practical', plan.practical.map(item => item.text));
    list('home', plan.home);
    list('notary', plan.notary);
    populateAgenda(plan);
    find('[data-result-title]').textContent = parents() ? 'Hoe begin je met je ouders over later?' : 'Jouw persoonlijke actieoverzicht';
    for (const set of [route, ...questionSets]) set.hidden = true;
    parentsIntro.hidden = true;
    progress.hidden = true;
    actions.hidden = true;
    find('[data-parents-next]').hidden = !parents();
    result.hidden = false;
    result.focus();
    once('check_completed');
    once('check_submitted');
    if (!agendaObserver) once('agenda_viewed');
  });

  find('[data-agenda-add]').addEventListener('click', () => { addRow(groups.get('topics')!, '', true); edited(); });
  find('[data-agenda-copy]').addEventListener('click', async () => {
    const text = 'Helder Nalaten\n' + agendaText();
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Gespreksagenda gekopieerd.';
      track('agenda_copied');
      track('check_agenda_copied');
    } catch {
      const copy = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
      copy.setAttribute('aria-label', 'Gespreksagenda om te kopiëren');
      status.replaceChildren('Selectie klaar. Kopieer de tekst via je browser.', copy);
      copy.focus();
      copy.select();
    }
  });
  find('[data-agenda-print]').addEventListener('click', () => {
    const brand = find('.agenda-brand').cloneNode(true) as HTMLElement;
    brand.className = 'agenda-print-brand';
    print.replaceChildren(brand, document.createTextNode(agendaText()));
    print.hidden = false;
    print.classList.add('printing');
    track('agenda_printed');
    track('check_agenda_printed');
    try { window.print(); } finally {
      print.classList.remove('printing');
      print.hidden = true;
      print.replaceChildren();
    }
  });

  function handOff() {
    try {
      if (answers?.situation && answers.children && answers.home && answers.documents) {
        sessionStorage.setItem('hn_check_answers', JSON.stringify(answers));
      } else {
        sessionStorage.removeItem('hn_check_answers');
      }
    } catch {
      // Destinations also work without the convenience prefill.
    }
  }

  find('[data-option-self]').addEventListener('click', () => {
    handOff();
    track('check_to_assistant_clicked');
    track('check_option_selfservice');
  });
  find('[data-option-adviser]').addEventListener('click', () => {
    try { sessionStorage.removeItem('hn_check_answers'); } catch { /* Booking works without storage. */ }
    track('check_to_notary_clicked');
    track('check_option_adviser');
  });
  find('[data-check-notary]').addEventListener('click', () => track('check_to_notary_clicked'));
  find('[data-check-book]').addEventListener('click', () => track('check_to_book_clicked'));

  function changeAnswers() {
    result.hidden = true;
    actions.hidden = false;
    index = 0;
    showStep(true);
  }
  find('[data-check-reset]').addEventListener('click', changeAnswers);
  find('[data-check-restart]').addEventListener('click', () => {
    form.reset();
    previousPlan = '';
    recorded.clear();
    status.textContent = '';
    changeAnswers();
  });
  const agendaObserver = typeof IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) once('agenda_viewed');
  }) : undefined;
  agendaObserver?.observe(find('[data-agenda] h3'));
  showStep();
}
