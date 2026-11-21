import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '../../components/blueprint';
import { agendaPath, familyPath, openers, overviewPath, topics } from '../../lib/familiegesprek';

export const metadata: Metadata = {
  title: 'Erfenis bespreken met je kinderen',
  description: 'Begin het gesprek over je erfenis met voorbeeldzinnen en vragen over het huis, eerdere schenkingen en wie straks wat regelt. Maak een gratis gespreksagenda.',
  alternates: { canonical: familyPath },
};

export default function Page() {
  return <article className="subpage section-space article blueprint-page family-page">
    <Breadcrumb title="Erfenis bespreken met je kinderen" path={familyPath} />
    <header className="family-header">
      <h1>Hoe bespreek je je erfenis met je kinderen?</h1>
      <p>Misschien wil je vertellen wat je later met het huis wilt. Of uitleggen waarom je één van je kinderen eerder financieel hebt geholpen. Met een paar goede vragen maak je het makkelijker om daar samen over te praten.</p>
      <Link href={agendaPath} className="action action-check">Maak je gratis gespreksagenda</Link>
    </header>
    <section className="article-block">
      <h2>Zo open je het gesprek</h2>
      <p>Nodig elkaar uit op een rustig moment en begin met het onderwerp waarover je het liefst wilt praten.</p>
      <div className="blueprint-grid family-openers">
        <div className="blueprint-tile"><h3>Als ouder</h3><blockquote>{openers.ouder}</blockquote></div>
        <div className="blueprint-tile"><h3>Als volwassen kind</h3><blockquote>{openers.kind}</blockquote></div>
      </div>
    </section>
    <section className="article-block">
      <h2>Drie onderwerpen om samen te bespreken</h2>
      {topics.map(topic => <section key={topic.id} className="family-topic">
        <h3>{topic.title}</h3>
        <p>{topic.context}</p>
        <p><strong>{topic.questions[0]}</strong></p>
      </section>)}
    </section>
    <section className="article-block">
      <h2>Wat doe je na het gesprek?</h2>
      <ol className="family-numbered">
        <li>Schrijf op welke vragen nog openstaan.</li>
        <li>Spreek per vraag af wie die uitzoekt en wanneer jullie erop terugkomen.</li>
      </ol>
      <p>Neem vragen over wat er kan met het huis, hoe een eerdere gift meetelt of hoe je wensen vastlegt mee naar de notaris. Die kan met je bekijken wat in je situatie mogelijk is. <a className="text-link" href="https://www.notaris.nl/testament/testament-opstellen">Lees hoe een gesprek bij de notaris verloopt</a>.</p>
      <p>Wil je samen opzoeken waar de papieren liggen? Gebruik het <Link className="text-link" href={overviewPath}>gratis overzicht voor nabestaanden</Link>.</p>
    </section>
  </article>;
}

