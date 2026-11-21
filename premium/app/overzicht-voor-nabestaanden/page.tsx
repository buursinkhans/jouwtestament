import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/blueprint';
import { PrintButton } from '../../components/family-actions';
import { bookletPath, familyPath, overviewPath } from '../../lib/familiegesprek';

export const metadata: Metadata = {
  title: 'Gratis overzicht voor nabestaanden',
  description: 'Print een gratis overzicht voor nabestaanden. Noteer per rekening of polis de bank of verzekeraar en waar de papieren te vinden zijn.',
  alternates: { canonical: overviewPath },
};

export default function Page() {
  return <article className="subpage section-space article blueprint-page family-page">
    <Breadcrumb title="Overzicht voor nabestaanden" path={overviewPath} />
    <header className="family-header">
      <h1>Gratis overzicht voor nabestaanden</h1>
      <p>Op dit blad zet je bij welke bank of verzekeraar je iets hebt lopen en waar de bijbehorende papieren liggen. Zo weten je naasten waar ze kunnen beginnen met zoeken.</p>
      <PrintButton />
    </header>
    <section className="family-print-sheet" aria-labelledby="overzicht">
      <h2 id="overzicht">Mijn rekeningen en polissen</h2>
      <p>Vul op papier in. Bewaar het blad op een veilige plek en vertel een naaste waar die het kan vinden. Laat wachtwoorden en pincodes weg.</p>
      <table className="family-overview">
        <thead><tr><th scope="col">Bank of verzekeraar</th><th scope="col">Type rekening of polis</th><th scope="col">Waar liggen de papieren?</th></tr></thead>
        <tbody>
          <tr><td>Voorbeeldbank</td><td>Spaarrekening</td><td>Blauwe map bij de administratie</td></tr>
          {[1, 2, 3, 4].map(row => <tr key={row}><td /><td /><td /></tr>)}
        </tbody>
      </table>
    </section>
    <div className="article-block">
      <p>Wil je samen bespreken wie de papieren kan vinden? Bekijk <Link className="text-link" href={familyPath}>hoe je het familiegesprek begint</Link>.</p>
      <p>Lees ook over het <Link className="text-link" href={bookletPath}>papieren invulboekje</Link> dat in ontwikkeling is.</p>
    </div>
  </article>;
}

