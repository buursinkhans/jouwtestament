'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, domAnimation, LazyMotion, m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { steps } from '../lib/content';

const scenes = [
  ['Wat ligt er op tafel?', 'Wie kan straks in het huis blijven?', 'Waar liggen de papieren?', 'Wat hebben we eerder afgesproken?'],
  ['Dit weten we nu.', 'We hebben besproken wat we met het huis willen.', 'We weten waar de stukken liggen.', 'Onze vragen voor de notaris staan op papier.'],
];

export function Clarity() {
  const [clear, setClear] = useState(false);
  const reduce = useReducedMotion();
  const [title, ...entries] = scenes[Number(clear)];
  return <LazyMotion features={domAnimation}><div className="clarity-ui">
    <div className="clarity-switch" role="group" aria-label="Toon situatie">
      <button type="button" aria-pressed={!clear} onClick={() => setClear(false)}>Chaos</button>
      <button type="button" aria-pressed={clear} onClick={() => setClear(true)}>Helderheid</button>
    </div>
    <div className={`papers ${clear ? 'papers-clear' : ''}`} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <m.div key={title} className="paper-content" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }}>
          <p>{title}</p><ul>{entries.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </m.div>
      </AnimatePresence>
    </div>
  </div></LazyMotion>;
}

export function Timeline() {
  const [active, setActive] = useState(0);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();
  function navigate(e: KeyboardEvent<HTMLButtonElement>) {
    const next = { ArrowRight: (active + 1) % steps.length, ArrowLeft: (active + steps.length - 1) % steps.length, Home: 0, End: steps.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }
  return <LazyMotion features={domAnimation}><div className="timeline">
    <div className="timeline-tabs" role="tablist" aria-label="Vier stappen">
      {steps.map((step, i) => <button ref={(node) => { refs.current[i] = node; }} key={step.title} type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={active === i} aria-controls={`${id}-panel-${i}`} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={navigate}><span aria-hidden="true">0{i + 1}</span>{step.title}</button>)}
    </div>
    {steps.map((step, i) => <div key={step.title} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} tabIndex={active === i ? 0 : -1}>
      {active === i && <m.div className="timeline-panel" initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><h3>{step.title}</h3><p>{step.text}</p></m.div>}
    </div>)}
  </div></LazyMotion>;
}

export function Drift({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  return <LazyMotion features={domAnimation}><div ref={ref} className="drift"><m.div style={reduce ? undefined : { y }}>{children}</m.div></div></LazyMotion>;
}

