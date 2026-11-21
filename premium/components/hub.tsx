import Link from 'next/link';
import { Breadcrumb } from './blueprint';
import { EditorialCredit } from './editorial-credit';
import { hubs } from '../lib/blueprint-content';
import { checkedDate } from '../lib/knowledge';

export function Hub({ slug }: { slug: keyof typeof hubs }) {
  const hub = hubs[slug];
  return (
    <article className="subpage section-space article blueprint-page knowledge-page">
      <Breadcrumb title={hub.title} path={'/' + slug + '/'} />
      <header>
        <h1>{hub.heading}</h1>
        <div className="page-start-action"><Link prefetch={false} href={'/check/?focus=' + hub.focus} className="action action-check">Start De Goed Geregeld Check</Link></div>
        <p className="blueprint-lead">{hub.intro}</p>
      </header>
      <EditorialCredit updated={checkedDate} />
      <section>
        <h2 className="knowledge-section-title">Wat kun je als eerste bespreken?</h2>
        <div className="blueprint-grid">
          {hub.topics.map((topic) => (
            <section key={topic.title} className="blueprint-tile knowledge-tile">
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
              <a className="text-link" href={topic.source.href}>{topic.source.label}</a>
            </section>
          ))}
        </div>
      </section>
      <section className="knowledge-next">
        <h2>Lees verder in de kennisbank</h2>
        <Link prefetch={false} className="text-link" href={hub.article.href}>{hub.article.label}</Link>
      </section>
    </article>
  );
}

