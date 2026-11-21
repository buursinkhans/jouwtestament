import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Action, Label } from '../../../components/editorial';
import { stories } from '../../../lib/content';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => stories.map(({ slug }) => ({ slug }));

async function getStory(params: Props['params']) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);
  if (!story) notFound();
  return story;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getStory(params);
  return { title: item.title, description: item.intro, alternates: { canonical: `/verhalen/${item.slug}/` } };
}

export default async function Story({ params }: Props) {
  const item = await getStory(params);
  return <article className="subpage section-space article">
    <div><Link prefetch={false} className="text-link" href="/verhalen/">Alle verhalen</Link></div>
    <div><Label>Uit een openbare uitspraak</Label><h1>{item.title}</h1></div>
    <Action>Plan een vrijblijvend gesprek</Action>
    <div className="article-block"><p className="lead">{item.intro}</p>
      <a className="text-link" href={item.source}>Lees de uitspraak van {item.court}</a>
      <h2>Een vraag voor aan tafel</h2><p>{item.question}</p>
    </div>
  </article>;
}

