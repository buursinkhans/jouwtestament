import { track } from './analytics';
import { writingTopics } from './writing-options';

export function initWriting(root: HTMLElement) {
  const find = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
  const form = find<HTMLFormElement>('[data-writing-form]');
  const steps = Array.from(form.querySelectorAll<HTMLElement>('[data-writing-step]'));
  const result = find('[data-writing-result]');
  const words = find<HTMLTextAreaElement>('#writing-words');
  const draft = find<HTMLTextAreaElement>('[data-draft]');
  const date = find<HTMLInputElement>('[data-date]');
  const status = find('[data-writing-status]');
  const error = find('[data-writing-error]');
  const useStatus = find('[data-use-status]');
  const next = find<HTMLButtonElement>('[data-writing-next]');
  const back = find<HTMLButtonElement>('[data-writing-back]');
  const print = find('[data-writing-print]');
  const enabled = root.dataset.enabled === 'true';
  const events = new Set<string>();
  let step = 0;
  let generated = '';
  let pending = false;

  type Event = Parameters<typeof track>[0];
  function once(event: Event) {
    if (events.has(event)) return;
    events.add(event);
    track(event);
  }

  function showStep(moveFocus = true) {
    const current = steps[step];
    for (const item of steps) item.hidden = item !== current;
    find('[data-writing-progress]').textContent = `Stap ${step + 1} van ${steps.length}`;
    next.textContent = step === 3 ? 'Maak mijn tekst' : 'Volgende';
    next.disabled = pending || (step === 3 && !enabled);
    back.hidden = step === 0;
    find<HTMLButtonElement>('[data-keep-draft]').hidden = !generated;
    back.disabled = pending;
    error.textContent = '';
    status.textContent = '';
    if (moveFocus) {
      const legend = current.querySelector('legend');
      legend?.setAttribute('tabindex', '-1');
      legend?.focus();
    }
  }
  const updateCount = () => { find('[data-count]').textContent = `${words.value.length} van 900 tekens`; };
  const selected = () => String(new FormData(form).get('topic') ?? '') as keyof typeof writingTopics;
  function showExamples() {
    const entries = writingTopics[selected()]?.examples ?? [];
    find('[data-examples]').replaceChildren(...entries.map(text =>
      Object.assign(document.createElement('li'), { textContent: text })
    ));
  }

  form.noValidate = true;
  form.hidden = false;
  showStep(false);
  once('writing_assistant_viewed');
  form.addEventListener('change', () => once('writing_assistant_started'));
  words.addEventListener('input', updateCount);
  back.addEventListener('click', () => { step--; showStep(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending) return;
    once('writing_assistant_started');
    if (step === 0 && !writingTopics[selected()]) {
      error.textContent = 'Kies wat je wilt schrijven.';
      steps[0].querySelector('input')?.focus();
      return;
    }
    if (step === 1 && (words.value.trim().length < 3 || words.value.length > 900)) {
      error.textContent = 'Vul tussen 3 en 900 tekens in.';
      words.focus();
      return;
    }
    if (step < 3) {
      step++;
      if (step === 1) showExamples();
      showStep();
      return;
    }
    if (!enabled || (generated && draft.value !== generated &&
      !window.confirm('Een nieuw voorstel kan je eigen wijzigingen vervangen. Wil je doorgaan?'))) return;

    pending = true;
    next.disabled = back.disabled = true;
    error.textContent = '';
    status.textContent = 'We maken een tekstvoorstel…';
    try {
      const tone = new FormData(form).get('tone');
      const res = await fetch('/api/writing-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: selected(), tone, words: words.value }),
        signal: AbortSignal.timeout(12_000),
      });
      if (!res.ok) {
        error.textContent = res.status === 429 ? 'Je hebt in korte tijd meerdere teksten aangevraagd. Probeer het over een minuut.' :
          res.status === 400 ? 'Controleer je steekwoorden en probeer het opnieuw.' : 'De schrijfhulp is even niet beschikbaar. Je steekwoorden staan er nog.';
        track('writing_assistant_error');
        return;
      }
      const output = await res.json();
      if (typeof output.text !== 'string' || (output.kind !== 'draft' && output.kind !== 'question')) throw new Error('response');
      if (output.kind === 'question') {
        step = 1;
        showStep(false);
        status.textContent = output.text;
        words.focus();
        return;
      }
      track(generated ? 'writing_assistant_regenerated' : 'writing_assistant_generated');
      generated = output.text;
      draft.value = generated;
      useStatus.textContent = '';
      result.hidden = false;
      form.hidden = true;
      find('[data-result-heading]').focus();
    } catch {
      error.textContent = 'De schrijfhulp reageert even niet. Je steekwoorden staan er nog.';
      track('writing_assistant_error');
    } finally {
      pending = false;
      back.disabled = false;
      next.disabled = false;
      if (step === 3) status.textContent = '';
    }
  });
  draft.addEventListener('input', () => once('writing_assistant_edited'));
  find('[data-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(draft.value);
      useStatus.textContent = 'Je tekst is gekopieerd.';
      track('writing_assistant_copied');
    } catch {
      draft.focus();
      draft.select();
      useStatus.textContent = 'Je tekst is geselecteerd. Kopieer hem via je browser.';
    }
  });
  find('[data-print]').addEventListener('click', () => {
    find('[data-print-date]').textContent = date.value.trim();
    find('[data-print-text]').textContent = draft.value;
    print.hidden = false;
    print.classList.add('printing');
    track('writing_assistant_printed');
    try { window.print(); } finally {
      print.classList.remove('printing');
      print.hidden = true;
      find('[data-print-date]').textContent = '';
      find('[data-print-text]').textContent = '';
    }
  });
  find('[data-revise]').addEventListener('click', () => {
    result.hidden = true;
    form.hidden = false;
    step = 2;
    showStep();
  });
  find('[data-keep-draft]').addEventListener('click', () => {
    if (pending) return;
    form.hidden = true;
    result.hidden = false;
    find('[data-result-heading]').focus();
  });
  find('[data-reset]').addEventListener('click', () => {
    if ((words.value || draft.value) && !window.confirm('Wil je je steekwoorden en tekst wissen en opnieuw beginnen?')) return;
    form.reset();
    draft.value = date.value = generated = '';
    useStatus.textContent = '';
    result.hidden = true;
    form.hidden = false;
    step = 0;
    updateCount();
    showStep();
  });
  find('[data-writing-book]').addEventListener('click', () => track('writing_assistant_to_book_clicked'));
}
