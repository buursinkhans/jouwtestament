'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { openers, topics } from '../lib/familiegesprek';
import { track } from '../lib/funnel';

type TopicId = typeof topics[number]['id'];

export function FamilyAgenda() {
  const [choices, setChoices] = useState<TopicId[]>([]);
  const [role, setRole] = useState<keyof typeof openers>('ouder');
  const [showAgenda, setShowAgenda] = useState(false);
  const [error, setError] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstTopic = useRef<HTMLInputElement>(null);
  const focusOnEdit = useRef(false);

  useEffect(() => {
    if (showAgenda) heading.current?.focus();
    else if (focusOnEdit.current) firstTopic.current?.focus();
  }, [showAgenda]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!choices.length) {
      setError(true);
      firstTopic.current?.focus();
      return;
    }
    track('familiegesprek_check_completed');
    setShowAgenda(true);
  }

  if (showAgenda) {
    return <section className="family-print-sheet family-agenda" aria-labelledby="agenda-result">
      <h2 id="agenda-result" tabIndex={-1} ref={heading}>Jouw agenda voor het familiegesprek</h2>
      <p><strong>Een zin om mee te beginnen</strong></p>
      <blockquote>{openers[role]}</blockquote>
      {topics.filter(topic => choices.includes(topic.id)).map(topic => <section className="family-topic" key={topic.id}>
        <h3>{topic.title}</h3>
        <ul>{topic.questions.map(question => <li key={question}>{question}</li>)}</ul>
      </section>)}
      <section className="family-notes">
        <h3>Vervolgstappen</h3>
        <p>Welke vraag staat nog open, wie zoekt die uit en wanneer komen we erop terug?</p>
        <div className="family-writing-lines" aria-hidden="true"><div /><div /><div /></div>
      </section>
      <div className="family-actions">
        <button className="action action-check" type="button" onClick={() => {
          track('familiegesprek_agenda_printed');
          window.print();
        }}>Print mijn agenda</button>
        <button type="button" className="text-link family-action-link" onClick={() => {
          focusOnEdit.current = true;
          setShowAgenda(false);
        }}>Keuzes aanpassen</button>
      </div>
    </section>;
  }

  return <form className="family-form" onSubmit={submit}>
    <p>Kies waar je samen over wilt praten. Je krijgt meteen vragen en ruimte voor afspraken. Gratis, geen account nodig.</p>
    <fieldset>
      <legend>Vanuit welke rol begin je het gesprek?</legend>
      <div className="family-options">
        {([['ouder', 'Als ouder'], ['kind', 'Als volwassen kind']] as const).map(([value, label]) => <label key={value}>
          <input type="radio" name="rol" checked={role === value} onChange={() => {
            setRole(value);
            track('familiegesprek_check_started');
          }} />{label}
        </label>)}
      </div>
    </fieldset>
    <fieldset aria-describedby={error ? 'family-topic-error' : undefined}>
      <legend>Welke onderwerpen wil je bespreken?</legend>
      <p>Kies één of meer onderwerpen.</p>
      <div className="family-options">
        {topics.map((topic, index) => <label key={topic.id}>
          <input type="checkbox" ref={index === 0 ? firstTopic : undefined} checked={choices.includes(topic.id)} onChange={event => {
            const checked = event.currentTarget.checked;
            setChoices(current => checked ? [...current, topic.id] : current.filter(id => id !== topic.id));
            setError(false);
            track('familiegesprek_check_started');
          }} />{topic.title}
        </label>)}
      </div>
      {error && <p id="family-topic-error" role="alert">Kies minstens één onderwerp om verder te gaan.</p>}
    </fieldset>
    <button className="action action-check" type="submit">Toon mijn agenda</button>
  </form>;
}

