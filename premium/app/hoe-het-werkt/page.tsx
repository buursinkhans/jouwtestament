import type { Metadata } from 'next';
import { Breadcrumb, CheckLink } from '../../components/blueprint';
import { CheckPlanExample } from '../../components/check-plan-example';
import { Action } from '../../components/editorial';
export const metadata:Metadata={title:'Hoe het werkt',description:'Vijf vragen, een persoonlijk actieplan en een gratis PDF. Bekijk een voorbeeld. Je hebt geen account nodig.',alternates:{canonical:'/hoe-het-werkt/'}};
export default function Page(){return <article className="subpage section-space article blueprint-page">
  <Breadcrumb title="Hoe het werkt" path="/hoe-het-werkt/"/>
  <header><h1>Begin met wat nog onbesproken is.</h1><div className="page-start-action"><CheckLink /></div><p className="blueprint-lead">Misschien heb je al van alles geregeld, maar weet je familie niet waar het staat of wat je ermee bedoelt. Een kort gesprek kan duidelijk maken wat de volgende stap is.</p></header>
  <ol className="blueprint-steps">
    <li><h2>Beantwoord vijf vragen</h2><p>Je beantwoordt vragen over je gezin, je woning en wat je al hebt geregeld. Je hebt geen account nodig.</p></li>
    <li><h2>Neem je actieplan mee</h2><p>Je kunt je persoonlijke actieplan gratis als PDF downloaden. Kies welk onderwerp je thuis wilt bespreken.</p></li>
    <li><h2>Kies wat daarna bij je past</h2><p>Je kunt thuis beginnen. Heb je vragen over mogelijkheden of vastlegging? Bespreek die met een adviseur of notaris.</p></li>
  </ol>
  <CheckPlanExample />
  <Action>Plan een vrijblijvend gesprek</Action>
</article>;}

