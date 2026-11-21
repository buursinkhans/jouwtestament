import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb, CheckLink, FaqJsonLd } from '../../components/blueprint';
import { questions } from '../../lib/blueprint-content';
import { knowledgeArticles, knowledgePath } from '../../lib/knowledge';
import { familyPath, overviewPath } from '../../lib/familiegesprek';

export const metadata:Metadata={title:'Kennisbank over familie, vermogen en later',description:'Mensentaal over je woning, schenkingen, de zorg voor kinderen en erfbelasting, met officiële bronnen.',alternates:{canonical:'/kennisbank/'}};
export default function Page(){return <article className="subpage section-space article blueprint-page">
  <Breadcrumb title="Kennisbank" path="/kennisbank/"/>
  <FaqJsonLd questions={questions} />
  <header><h1>Vragen die makkelijk blijven liggen.</h1><div className="page-start-action"><CheckLink /></div><p className="blueprint-lead">Soms weet je dat er iets geregeld is, maar heb je nooit nagevraagd wat dat betekent voor jouw gezin of woning. Begin met de vraag die je nu bezighoudt.</p></header>
  <section className="knowledge-index">
    <h2 className="knowledge-section-title">Lees je verder in deze onderwerpen</h2>
    <div className="blueprint-grid">
      <article className="blueprint-tile knowledge-tile"><h3><Link className="text-link" href={familyPath}>Erfenis bespreken met je kinderen</Link></h3><p>Voorbeeldzinnen en vragen voor je familiegesprek.</p></article>
      <article className="blueprint-tile knowledge-tile"><h3><Link className="text-link" href={overviewPath}>Gratis overzicht voor nabestaanden</Link></h3><p>Een werkblad voor rekeningen, polissen en de vindplaats van je papieren.</p></article>
      {knowledgeArticles.map((article) => <article key={article.slug} className="blueprint-tile knowledge-tile">
        <p className="knowledge-eyebrow">{article.category}</p>
        <h3><Link prefetch={false} className="text-link" href={knowledgePath(article.slug)}>{article.title}</Link></h3>
        <p>{article.description}</p>
      </article>)}
    </div>
  </section>
  <div className="blueprint-faq">{questions.map(item=><section id={item.id} key={item.id}>
    <h2>{item.q}</h2><p>{item.a}</p>{'source' in item && <a href={item.source} className="text-link">{item.label}</a>}
  </section>)}</div>
</article>;}

