// Main menu, "Voor wie" dropdown and footer (docs/03).
// The "Voor wie" items are generated from the segment data (ordered by priority).
import { segments } from '../data/segments';

export const voorWieItems = [...segments]
  .sort((a, b) => a.priority - b.priority)
  .map((segment) => ({
    label: segment.navLabel,
    sub: segment.navSub,
    href: `/voor-wie/${segment.slug}`,
  }));

export const mainNav = [
  { label: 'Zelf regelen', href: '/regel-het-zelf' },
  { label: 'Hoe het werkt', href: '/hoe-het-werkt' },
  { label: 'Tarieven', href: '/tarieven' },
  { label: 'Tips', href: '/tips' },
];

export const cta = { label: 'Doe de gratis check', labelLong: 'Doe de gratis check (2 min)', href: '/check' };

export const footerMore = [
  { label: 'Zelf regelen met de assistent', href: '/regel-het-zelf' },
  { label: 'Afspraak met een adviseur', href: '/afspraak' },
  { label: 'Hoe het werkt', href: '/hoe-het-werkt' },
  { label: 'Tarieven', href: '/tarieven' },
  { label: 'Testament', href: '/testament' },
  { label: 'Tips', href: '/tips' },
  { label: 'Veelgestelde vragen', href: '/veelgestelde-vragen' },
  { label: 'Over ons', href: '/over-ons' },
];

export const footerLegal = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Voorwaarden', href: '/voorwaarden' },
];
