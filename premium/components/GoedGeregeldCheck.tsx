'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { agendaPath } from '../lib/familiegesprek';
import { Download, Mail } from 'lucide-react';
import { actionPlan, checkSteps, parseAnswers, type Answers } from '../lib/check-guide';
import { live } from '../lib/content';
import { track } from '../lib/funnel';

const emailEndpoint = process.env.NEXT_PUBLIC_ACTION_PLAN_EMAIL_ENDPOINT;

function PlanDelivery({ answers }: { answers: Answers }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function download() {
    setError('');
    setMessage('');
    setBusy(true);
    try {
      const { createCheckPlanPdf } = await import('../lib/check-plan-pdf');
      const bytes = await (await createCheckPlanPdf(answers)).save();
      const url = URL.createObjectURL(new Blob([Uint8Array.from(bytes)], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'helder-nalaten-actieplan.pdf';
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage('Je actieplan is gedownload.');
    } catch {
      setError('Downloaden lukte niet. Probeer het nog eens.');
    } finally {
      setBusy(false);
    }
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailEndpoint || busy) return;
    const form = event.currentTarget;
    const email = new FormData(form).get('email');
    setError('');
    setMessage('');
    setBusy(true);
    try {
      const res = await fetch(emailEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, answers }),
        signal: AbortSignal.timeout(12000),
      });
      if (!res.ok) throw new Error('send failed');
      form.reset();
      setMessage('Je actieplan is verzonden. Kijk ook in je map met ongewenste e-mail.');
    } catch {
      setError('Versturen lukte niet. Je kunt je actieplan hieronder downloaden.');
    } finally {
      setBusy(false);
    }
  }

  return <section className="check-delivery" aria-labelledby="delivery-heading">
    <h3 id="delivery-heading">Bewaar je persoonlijke actieplan</h3>
    {emailEndpoint ? (
      <form className="plan-email-form" onSubmit={send}>
        <label htmlFor="plan-email">Je e-mailadres</label>
        <input id="plan-email" type="email" name="email" autoComplete="email" maxLength={254} required aria-describedby="plan-email-help" />
        <p id="plan-email-help">We gebruiken je antwoorden om de PDF te maken. Onze e-maildienst Resend ontvangt je e-mailadres en de PDF om die één keer te versturen.</p>
        <button type="submit" className="action action-check" disabled={busy}><Mail size={20} aria-hidden="true" />Stuur mij de gratis PDF</button>
      </form>
    ) : null}
    <div className="delivery-choices">
      <div>
        <button type="button" className="action action-check" disabled={busy} onClick={download}><Download size={20} aria-hidden="true" />Download mijn gratis actieplan</button>
        <p>Als PDF, direct beschikbaar. Geen account nodig.</p>
      </div>
      <div>
        <a href={live + '/afspraak/'} className="text-link check-intro-link">Vraag een kennismakingsgesprek aan</a>
        <p>Geef je voorkeuren door. Je afspraak wordt daarna bevestigd.</p>
      </div>
    </div>
    <p role="status">{message}</p>
    {error && <p className="check-error" role="alert">{error}</p>}
  </section>;
}

export function GoedGeregeldCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [focus, setFocus] = useState('');
  const title = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const active = checkSteps[step];

  useEffect(() => {
    setFocus(new URLSearchParams(window.location.search).get('focus') ?? '');
    track('goed_geregeld_check_viewed');
  }, []);
  useEffect(() => { if (moved.current) title.current?.focus(); }, [step]);

  function goTo(nextStep: number) {
    moved.current = true;
    setStep(nextStep);
  }

  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!active || !answers[active.key]) return;
    if (step + 1 === checkSteps.length) track('goed_geregeld_check_completed');
    goTo(step + 1);
  }

  const focusNote = focus === 'gezin' ? 'Voor je gezin' : focus === 'later' ? 'Voor later en je vermogen' : '';

  if (active) return <section className="check-panel check-wizard" aria-labelledby="check-question">
    <div className="check-progress-row">
      <p className="check-progress">Stap {step + 1} van {checkSteps.length}</p>
      <p>Minder dan 2 minuten</p>
    </div>
    <progress aria-label="Voortgang" value={step + 1} max={checkSteps.length} />
    <h2 id="check-question" ref={title} tabIndex={-1}>{active.title}</h2>
    <form onSubmit={next}>
      <fieldset className="check-options">
        <legend className="sr-only">{active.title}</legend>
        {active.options.map(([value, label]) => <label key={value}>
          <input type="radio" name={active.key} value={value} checked={answers[active.key] === value}
            onChange={() => {
              if (step === 0) track('goed_geregeld_check_started');
              setAnswers(current => ({ ...current, [active.key]: value }));
            }} />
          <span>{label}</span>
        </label>)}
      </fieldset>
      <div className="check-actions">
        {step > 0 && <button type="button" className="check-back" onClick={() => goTo(step - 1)}>Terug</button>}
        <button type="submit" className="action action-check" disabled={!answers[active.key]}>{step + 1 === checkSteps.length ? 'Bekijk mijn actieplan' : 'Volgende'}</button>
      </div>
    </form>
    {step === 0 && <p className="check-account-note">
      {focusNote && <>{focusNote} · </>}Gratis · Geen account nodig
    </p>}
  </section>;

  const complete = parseAnswers(answers);
  if (!complete) return null;
  const { items, solutions, statusNote } = actionPlan(complete);
  return <section className="check-panel check-result">
    <h2 ref={title} tabIndex={-1}>Op basis van jouw situatie adviseren we aandacht voor deze onderwerpen:</h2>
    <ol className="check-priorities">
      {items.map((item) => <li key={item.key}><h3>{item.title}</h3><p>{item.text}</p></li>)}
    </ol>
    <p>{statusNote}</p>
    <h3 className="check-solutions-title">Met deze stappen regel je dat concreet</h3>
    <ul className="check-solutions">
      {solutions.map((item) => <li key={item.title}><h4>{item.title}</h4><p>{item.text}</p><a className="text-link" href={item.source}>Lees meer<span className="sr-only"> over {item.title}</span></a></li>)}
    </ul>
    <PlanDelivery answers={complete} />
    <p className="check-family-link">Wil je een familiegesprek voorbereiden? <Link className="text-link" href={agendaPath}>Maak een gespreksagenda</Link>.</p>
    <button type="button" className="text-link check-reset" onClick={() => { setAnswers({}); goTo(0); }}>Opnieuw invullen</button>
  </section>;
}

