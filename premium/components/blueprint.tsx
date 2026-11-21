import type { ReactNode } from 'react';
import Link from 'next/link';
import { origin } from '../lib/content';

export function CheckLink({ children = 'Start De Goed Geregeld Check' }: { children?: ReactNode }) {
  return <Link prefetch={false} href="/check/" className="action action-check">{children}</Link>;
}

export function StructuredData({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

type Crumb = { title: string; path: string };

export function Breadcrumb({ title, path, parents = [] }: Crumb & { parents?: Crumb[] }) {
  const links = [{ title: 'Home', path: '/' }, ...parents];

  return <>
    <nav aria-label="Broodkruimelpad">
      <ol className="crumb">
        {links.map((item) => <li key={item.path}><Link prefetch={false} href={item.path}>{item.title}</Link><span aria-hidden="true"> / </span></li>)}
        <li aria-current="page">{title}</li>
      </ol>
    </nav>
    <StructuredData data={{
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [...links, { title, path }].map((item, i) => ({
        '@type': 'ListItem', position: i + 1, name: item.title, item: new URL(item.path, origin).href,
      })),
    }} />
  </>;
}

export function FaqJsonLd({ questions }: { questions: readonly { q: string; a: string }[] }) {
  return <StructuredData data={{
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: questions.map(({ q, a }) => ({
      '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }} />;
}

