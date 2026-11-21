import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { situations } from '../lib/content';

export function Wordmark() {
  return <Link prefetch={false} className="wordmark" href="/" aria-label="Helder Nalaten, home"><span className="seal" aria-hidden="true"><i /><i /><i /></span>Helder <span>Nalaten</span></Link>;
}

export function Action({ href = '/kennismaken/', children, light = false }: { href?: string; children: ReactNode; light?: boolean }) {
  return <Link prefetch={false} href={href} className={light ? 'action action-light' : 'action'}>{children}</Link>;
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="section-label"><span aria-hidden="true" />{children}</p>;
}

export function Photo({ name, alt, priority = false, className = '' }: { name: string; alt: string; priority?: boolean; className?: string }) {
  return <div className={`photo ${className}`}>
    {name === 'hero' ? (
      <picture>
        <source media="(max-width: 680px)" srcSet="/media/hero-mobile.webp" />
        <Image src="/media/hero.webp" alt={alt} fill loading="eager" fetchPriority="high" sizes="(max-width: 680px) 100vw, 49vw" />
      </picture>
    ) : (
      <Image src={`/media/${name}.webp`} alt={alt} fill preload={priority} sizes="(max-width: 700px) 100vw, 50vw" />
    )}
  </div>;
}

export function Situation({ item }: { item: (typeof situations)[number] }) {
  return <Link prefetch={false} className="situation" href={`/situaties/${item.slug}/`}>
    <Photo name={item.image} alt="" />
    <div className="situation-caption"><h3>{item.title}</h3><p>{item.question}</p></div>
  </Link>;
}

