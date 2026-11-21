import Link from 'next/link';
import { Wordmark } from './editorial';
import { mainLinks } from './site-navigation';

export function Navbar() {
  return (
    <header className="header">
      <div className="wrap header-inner">
        <Wordmark />
        <nav className="main-nav" aria-label="Hoofdmenu">
          <ul>
            {mainLinks.map(({ href, label }) => (
              <li key={href}><Link prefetch={false} href={href}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <Link prefetch={false} className="action action-check header-check min-h-[48px]" href="/check/">
          Start mijn check
        </Link>
      </div>
    </header>
  );
}
