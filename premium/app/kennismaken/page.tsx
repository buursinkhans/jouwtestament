import type { Metadata } from 'next';
import { Action, Label } from '../../components/editorial';
import { live } from '../../lib/content';

export const metadata: Metadata = { title: 'Kennismaken', description: 'Bereid een vrijblijvend gesprek over uw nalatenschap voor of begin met de gratis check.', alternates: { canonical: '/kennismaken/' } };

export default function Meet() {
  return <section className="subpage section-space article">
    <div><Label>Kennismaken</Label><h1>Wat wilt u helder krijgen?</h1></div>
    <div className="article-block">
      <Action href={live + '/afspraak/'}>Ga naar het afspraakformulier</Action>
      <p className="lead">Begin met de vraag die u bezighoudt. Via het afspraakformulier kiest u een moment waarop u bereikbaar bent.</p>

      <p>Wilt u eerst zelf verkennen wat bij uw situatie past? <a href="/check/" className="text-link">Doe De Goed Geregeld Check</a>.</p>
      <p>Wie na de gratis check digitaal verder wil, betaalt € 35 voor de voorbereiding en twee documenten zodra die betaalroute beschikbaar is. Een eventueel adviesgesprek of notariële afspraak wordt apart betaald.</p>
    </div>
  </section>;
}

