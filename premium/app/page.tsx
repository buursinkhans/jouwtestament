import type { Metadata } from 'next';
import { Hero } from '../components/Hero';
import { MythBuster } from '../components/MythBuster';
import { LifeStageRouter } from '../components/LifeStageRouter';
import { Testimonials } from '../components/Testimonials';
import { CheckLink } from '../components/blueprint';
import { Label, Photo, Situation } from '../components/editorial';
import { Clarity, Drift, Timeline } from '../components/chapters';
import { situations } from '../lib/content';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function Home() {
  return <>
    <Hero />
    <MythBuster />
    <LifeStageRouter />
    <Testimonials />

    <section className="pain wrap section-space">
      <div className="pain-photo"><Drift><Photo name="table" alt="Een notitieblok en twee glazen thee op tafel, met uitzicht op een achtertuin" /></Drift></div>
      <div className="pain-copy">
        <Label>Wat blijft onbesproken?</Label>
        <h2>Een lege stoel.<br />Een volle tafel.</h2>
        <p>Na een afscheid komt de familie bij elkaar. Het huis is er nog, de herinneringen ook. Dan komen de vragen. Wie blijft er wonen? Wie heeft de papieren? En wat had iedereen eigenlijk afgesproken?</p>
        <p>Als ieder zich iets anders herinnert, kan een gesprek over het huis of de erfbelasting spanning geven. Juist op het moment dat er al zoveel te dragen is.</p>
      </div>
    </section>

    <section className="clarity"><div className="wrap clarity-inner">
      <div><Label>Het gesprek beginnen</Label><h2>Van chaos<br />naar <em>helderheid.</em></h2>
        <p>Begin met de vragen die nu door je hoofd gaan. Zet je wensen en wat nog openstaat op papier. Zo heeft iedereen iets om op terug te vallen.</p>
        <a className="text-link" href="/check/">Doe De Goed Geregeld Check</a>
      </div>
      <Clarity />
    </div></section>

    <section className="wrap section-space" id="situaties">
      <div className="section-intro"><Label>Levenssituaties</Label><h2>Wat speelt er bij jou?</h2><p>Vaak begint het met één vraag. Kies wat je op dit moment bezighoudt.</p></div>
      <div className="situations">{situations.map((item) => <Situation key={item.slug} item={item} />)}</div>
    </section>

    <section className="method" id="werkwijze"><div className="wrap section-space">
      <div className="section-intro"><Label>Werkwijze</Label><h2>Van de eerste vraag<br />naar rust voor later.</h2></div>
      <Timeline />
    </div></section>

    <section className="closing"><div className="wrap closing-inner">
      <h2>Welke vraag wil je<br />deze week bespreken?</h2><p>Begin met vijf vragen. Neem je antwoorden mee naar een gesprek thuis.</p><CheckLink />
    </div></section>
  </>;
}

