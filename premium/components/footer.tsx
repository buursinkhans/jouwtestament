import Link from 'next/link';
import { live } from '../lib/content';
import { Wordmark } from './editorial';
import { mainLinks } from './site-navigation';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Wordmark />
        <section className="footer-trust" aria-labelledby="footer-trust-title">
          <h2 id="footer-trust-title">Waar je op kunt rekenen</h2>
          <dl>
            <div>
              <dt>Onafhankelijke uitleg</dt>
              <dd>Gebruik de gratis check om je eigen vragen voor te bereiden. Jij kiest zelf of en met wie je verdergaat.</dd>
            </div>
            <div>
              <dt>Juridische bronnen</dt>
              <dd>In de <Link prefetch={false} href="/kennisbank/">kennisbank</Link> vind je verwijzingen naar officiële bronnen.</dd>
            </div>
            <div>
              <dt>Privacy van je antwoorden</dt>
              <dd>Doe je alleen de check, dan blijven je antwoorden in je browser. Lees hoe de bestaande dienst met gegevens omgaat in de <a href={live + '/privacy/'}>privacyverklaring</a>.</dd>
            </div>
          </dl>
        </section>
        <nav aria-label="Voetmenu">
          <ul>
            {mainLinks.map(({ href, label }) => (
              <li key={href}><Link prefetch={false} href={href}>{label}</Link></li>
            ))}
            <li><Link prefetch={false} href="/check/">De Goed Geregeld Check</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
