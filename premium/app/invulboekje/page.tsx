import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/blueprint';
import { BookletViewed } from '../../components/family-actions';
import { bookletPath, familyPath, overviewPath } from '../../lib/familiegesprek';

export const metadata: Metadata = {
  title: 'Papieren invulboekje voor later',
  description: 'Lees over Als jullie iets moeten regelen, een papieren invulboekje in ontwikkeling. Gebruik intussen het gratis overzicht voor je rekeningen en polissen.',
  alternates: { canonical: bookletPath },
};

export default function Page() {
  return <article className="subpage section-space article blueprint-page family-page">
    <Breadcrumb title="Papieren invulboekje" path={bookletPath} />
    <BookletViewed />
    <header className="family-header">
      <h1>Als jullie iets moeten regelen</h1>
      <p>Een papieren invulboekje voor thuis. Je schrijft op waar je belangrijke documenten bewaart en wat je naasten over je administratie en woning moeten weten.</p>
    </header>
    <section className="article-block">
      <h2>Het boekje is in ontwikkeling</h2>
      <p>We werken aan voorbeeldpagina’s over rekeningen en polissen en over het ouderlijk huis. Zodra de pagina’s klaar zijn, kun je ze hier bekijken. Bestellen kan zodra de verkoop start.</p>
      <Link className="action action-check" href={overviewPath}>Bekijk het gratis overzicht</Link>
      <p>Wil je samen al iets bespreken? Gebruik deze vragen voor <Link className="text-link" href={familyPath}>een gesprek met je kinderen over je erfenis</Link>.</p>
    </section>
  </article>;
}

