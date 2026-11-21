import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/blueprint';
import { GoedGeregeldCheck } from '../../components/GoedGeregeldCheck';

export const metadata:Metadata={title:'De Goed Geregeld Check',description:'Vijf vragen, een persoonlijk actieplan en een gratis PDF-download. Geen account nodig.',alternates:{canonical:'/check/'}};
export default function Page(){
  return <div className="subpage section-space article blueprint-page check-page">
    <Breadcrumb title="De Goed Geregeld Check" path="/check/"/>
    <h1>De Goed Geregeld Check</h1>
    <GoedGeregeldCheck />
    <noscript><p>Voor de vragen is JavaScript nodig. In de <a className="text-link" href="/kennisbank/">kennisbank</a> vind je vragen om zelf mee te beginnen.</p></noscript>
  </div>;
}

