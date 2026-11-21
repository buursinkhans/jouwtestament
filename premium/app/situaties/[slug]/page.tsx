import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Action, Label, Photo } from '../../../components/editorial';
import { situations } from '../../../lib/content';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => situations.map(({ slug }) => ({ slug }));

async function getSituation(params: Props['params']) {
  const { slug } = await params;
  const item = situations.find((item) => item.slug === slug);
  if (!item) notFound();
  return item;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getSituation(params);
  return { title: item.title, description: item.intro, alternates: { canonical: `/situaties/${item.slug}/` } };
}

export default async function SituationPage({ params }: Props) {
  const item = await getSituation(params);
  return <article className="subpage section-space article">
    <div><Link prefetch={false} href="/#situaties" className="text-link">Alle levenssituaties</Link></div>
    <div><Label>{item.title}</Label><h1>{item.question}</h1><div className="page-start-action"><Action>Plan een vrijblijvend gesprek</Action></div>
      <p className="blueprint-lead">{item.intro}</p>
    </div>
    <Photo name={item.image} className="article-photo" alt="" priority />
    <div className="article-block">
      <h2>Vragen om mee te beginnen</h2>
      <ul>{item.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul>
    </div>
  </article>;
}

