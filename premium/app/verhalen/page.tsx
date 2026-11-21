import type { Metadata } from 'next';
import Link from 'next/link';
import { Label, Photo } from '../../components/editorial';
import { stories } from '../../lib/content';

export const metadata: Metadata = { title: 'Verhalen', description: 'Twee families en de vragen die op tafel kwamen bij de verdeling van hun nalatenschap.', alternates: { canonical: '/verhalen/' } };

export default function Stories() {
  return <section className="subpage section-space article">
    <div><Label>Verhalen uit de praktijk</Label><h1>Wat een familie bezighoudt.</h1></div>
    <div className="article-list">
      {stories.map((item) => <article key={item.slug}><h2><Link prefetch={false} className="text-link" href={`/verhalen/${item.slug}/`}>{item.title}</Link></h2><p>{item.intro}</p></article>)}
    </div>
    <Photo name="story" alt="Een familiealbum ligt op een bank bij het raam" className="article-photo" priority />
  </section>;
}

