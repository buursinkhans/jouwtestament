// /llms.txt for AI crawlers (docs/11). Generated from config so prices stay in sync.
import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { pricing, euro, euroRange } from '../config/pricing';
import { segments } from '../data/segments';

export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).toString();
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}`,
    '',
    site.entityDescription,
    '',
    '## Tarieven',
    '',
    `- Financieel advies over je nalatenschap: ${euroRange(pricing.advice)}`,
    `- Testament bij netwerknotaris: ${euro(pricing.willSingle)}`,
    `- Testamenten voor partners bij netwerknotaris: ${euro(pricing.willCouple)} voor 2 testamenten`,
    '- Eigen notaris: tarief van die notaris, met dezelfde instructie',
    '',
    '## Pagina’s',
    '',
    `- [Home](${url('/')})`,
    ...[...segments]
      .sort((a, b) => a.priority - b.priority)
      .map((segment) => `- [${segment.navLabel}](${url(`/voor-wie/${segment.slug}`)}): ${segment.description}`),
    `- [Hoe het werkt](${url('/hoe-het-werkt')})`,
    `- [Tarieven](${url('/tarieven')})`,
    `- [Testament](${url('/testament')})`,
    `- [Tips](${url('/tips')}): 12 dingen over je nalatenschap waar bijna niemand aan denkt`,
    `- [Over ons](${url('/over-ons')})`,
    `- [Gratis nalatenschapscheck](${url('/check')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
