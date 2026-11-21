import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb, CheckLink, FaqJsonLd, StructuredData } from '../../../components/blueprint';
import { EditorialCredit } from '../../../components/editorial-credit';
import { origin } from '../../../lib/content';
import { authorship, knowledgeArticles, knowledgePath } from '../../../lib/knowledge';

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => knowledgeArticles.map(({ slug }) => ({ slug }));

async function getArticle(params: Props['params']) {
  const { slug } = await params;
  const article = knowledgeArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle(params);
  return { title: article.title, description: article.description, alternates: { canonical: knowledgePath(article.slug) } };
}

export default async function Page({ params }: Props) {
  const article = await getArticle(params);
  const path = knowledgePath(article.slug);

  return (
    <article className="subpage section-space article blueprint-page knowledge-page">
      <Breadcrumb title={article.title} path={path} parents={[{ title: 'Kennisbank', path: '/kennisbank/' }]} />
      <header>
        <h1>{article.title}</h1>
        <div className="page-start-action"><CheckLink>Start mijn check</CheckLink></div>

      </header>
      <section className="knowledge-next quick-answers" aria-label="Kort antwoord">
        {article.quickAnswers.map(({ question, answer, source }) => <div key={answer}>
          {question && <h2>{question}</h2>}
          <p>{answer}</p>
          <a className="text-link" href={source.href}>{source.label}</a>
        </div>)}
      </section>
      <EditorialCredit updated={article.updated} />
      <div className="knowledge-reader">
        {article.sections.map((section) => <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.steps && <ol>{section.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
        </section>)}
        <section aria-label="Officiële bronnen">
          <h2>Bronnen</h2>
          <ul>{article.sources.map(({ label, href }) => <li key={href}><a className="text-link" href={href}>{label}</a></li>)}</ul>
        </section>
        <section className="knowledge-faq" aria-labelledby="article-faq">
          <h2 id="article-faq">Veelgestelde vragen</h2>
          {article.faq.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </section>
      </div>
      <section className="knowledge-next">
        <h2>Twijfel je of dit voor jou relevant is? Doe de gratis Goed Geregeld Check.</h2>
        <CheckLink>Start mijn check</CheckLink>
      </section>
      <FaqJsonLd questions={article.faq} />
      <StructuredData data={{
        '@context': 'https://schema.org', '@type': 'Article',
        headline: article.title, description: article.description, dateModified: article.updated,
        mainEntityOfPage: new URL(path, origin).href, inLanguage: 'nl-NL',
        author: { '@type': 'Organization', name: authorship },
        publisher: { '@type': 'Organization', name: 'Helder Nalaten', url: origin },
      }} />
    </article>
  );
}

