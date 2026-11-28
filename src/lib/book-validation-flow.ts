import { track } from './analytics';

const variantEvents = { single: 'book_variant_single_selected', duo: 'book_variant_duo_selected' } as const;
const interestEvents = {
  accounts: 'book_interest_accounts', wishes: 'book_interest_wishes', conversation: 'book_interest_conversation',
  relatives: 'book_interest_relatives', other: 'book_interest_other',
} as const;

export function initBookValidation(root: HTMLElement) {
  const find = <T extends HTMLElement>(selector: string) => root.querySelector<T>(selector);
  type Event = Parameters<typeof track>[0];
  const events = new Set<Event>();
  const once = (event: Event) => {
    if (events.has(event)) return;
    events.add(event);
    track(event);
  };

  const isBook = root.dataset.bookPage === 'book';
  once(isBook ? 'book_page_viewed' : 'business_page_viewed');
  find('[data-book-cta]')?.addEventListener('click', () => once('book_reservation_clicked'));
  root.querySelectorAll<HTMLDetailsElement>('[data-book-preview]').forEach(details => {
    details.addEventListener('toggle', () => { if (details.open) once('book_preview_opened'); });
  });
  const price = find('[data-book-price]');
  if (price && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      once('book_price_viewed');
      observer.disconnect();
    });
    observer.observe(price.querySelector('h3') ?? price);
  }

  const form = find<HTMLFormElement>('[data-book-form]');
  if (!form) return;
  const error = find('[data-book-form-error]')!;
  const success = find('[data-book-success]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type=submit]')!;
  const receipt = find('[data-book-receipt]')!;
  const withdraw = find<HTMLAnchorElement>('[data-book-withdraw]')!;
  const interest = find<HTMLFieldSetElement>('[data-book-interest]');
  let pending = false;
  let submissionId = '';
  let lastPayload = '';
  form.hidden = false;
  form.addEventListener('change', event => {
    const radio = event.target as HTMLInputElement;
    if (radio.name === 'variant' && (radio.value === 'single' || radio.value === 'duo')) once(variantEvents[radio.value]);
  });
  submit.addEventListener('click', () => { if (isBook) once('book_reservation_clicked'); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    const payload = { ...Object.fromEntries(data), kind: form.dataset.kind, contact: data.has('contact') };
    const payloadKey = JSON.stringify(payload);
    if (payloadKey !== lastPayload) {
      submissionId = crypto.randomUUID();
      lastPayload = payloadKey;
    }
    pending = true;
    submit.disabled = true;
    error.textContent = '';
    try {
      const response = await fetch('/api/book-validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, id: submissionId }),
        signal: AbortSignal.timeout(24_000),
      });
      if (!response.ok) {
        error.textContent = response.status === 400 ? 'Controleer je gegevens en probeer het opnieuw.' :
          response.status === 429 ? 'Probeer het over een minuut opnieuw.' :
          'We kunnen de ontvangst nu niet bevestigen. Je gegevens staan nog in het formulier.';
        return;
      }
      if ((await response.json()).ok !== true) throw new Error('missing confirmation');
      once(isBook ? 'book_reservation_submitted' : 'business_inquiry_submitted');
      receipt.textContent = submissionId;
      withdraw.href += '?subject=' + encodeURIComponent('Intrekken ' + submissionId);
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.querySelector('h3')?.focus();
      lastPayload = '';
    } catch {
      error.textContent = 'We kunnen de ontvangst nu niet bevestigen. Je gegevens staan nog in het formulier.';
    } finally {
      pending = false;
      submit.disabled = false;
    }
  });

  interest?.addEventListener('change', event => {
    const value = (event.target as HTMLInputElement).value;
    if (!Object.hasOwn(interestEvents, value)) return;
    once(interestEvents[value as keyof typeof interestEvents]);
    interest.querySelectorAll<HTMLInputElement>('input').forEach(input => { input.disabled = true; });
    find('[data-book-interest-status]')!.textContent = 'Dank je wel voor je antwoord.';
  });
}
