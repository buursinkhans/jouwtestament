import Link from 'next/link';
import { Photo } from './editorial';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="home-title">
      <link rel="preload" as="image" href="/media/hero-mobile.webp" media="(max-width: 680px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/media/hero.webp" media="(min-width: 681px)" fetchPriority="high" />
      <div className="hero-copy">
        <h1 id="home-title">Veel mensen denken dat alles goed geregeld is. Totdat er iets gebeurt.</h1>
        <p className="hero-lead">Ontdek in 2 minuten wat jij moet regelen om je gezin, partner en toekomst te beschermen.</p>
        <div className="hero-actions">
          <Link prefetch={false} href="/check/" className="action action-check min-h-[48px]">Start mijn check</Link>
          <Link prefetch={false} href="/hoe-het-werkt/" className="text-link hero-secondary">Hoe werkt het?</Link>
        </div>
        <p className="hero-note">Vijf vragen · Gratis actieplan als PDF · Geen account nodig</p>
      </div>
      <Photo name="hero" alt="Moeder en dochter in gesprek aan de eettafel bij het raam" className="hero-image" priority />
    </section>
  );
}

