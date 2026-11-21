import type { Metadata } from 'next';
import { Action, Label, Situation, Wordmark } from '../../components/editorial';
import { Clarity, Timeline } from '../../components/chapters';
import { situations } from '../../lib/content';

export const metadata: Metadata = { title: 'Componentbibliotheek', robots: { index: false, follow: false } };

export default function DesignLibrary() {
  return <div className="subpage section-space article">
    <h1>Componentbibliotheek</h1>
    <div className="article-block">
      <Wordmark />
      <Label>Hoofdstuklabel</Label>
      <Action>Plan een vrijblijvend gesprek</Action>
    </div>
    <section className="situations" aria-label="Voorbeelden van levenssituaties">
      {situations.slice(0, 3).map((item) => <Situation key={item.slug} item={item} />)}
    </section>
    <section className="clarity p-6 sm:p-12" aria-label="Van chaos naar helderheid"><Clarity /></section>
    <Timeline />
  </div>;
}

