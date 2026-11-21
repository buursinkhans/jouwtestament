import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const stages = [
  { focus: 'gezin', title: 'Voor ons gezin', text: 'Bescherm kinderen, partner en woning.' },
  { focus: 'later', title: 'Voor later en mijn vermogen', text: 'Behoud regie over vermogen, zorg en nalatenschap.' },
] as const;

export function LifeStageRouter() {
  return (
    <section className="home-life" aria-labelledby="life-title">
      <div className="wrap section-space">
        <h2 id="life-title">Waar wil je mee beginnen?</h2>
        <div className="home-card-grid">
          {stages.map(({ focus, title, text }) => (
            <Link prefetch={false} className="home-life-card" key={focus} href={`/check/?focus=${focus}`}>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="home-life-action">Start mijn check <ArrowRight size={20} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

