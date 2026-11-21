import type { Metadata } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/lora';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { origin, indexable } from '../lib/content';
import { CheckAnalytics } from '../components/check-analytics';
import './styles.css';

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: 'Helder Nalaten · De Goed Geregeld Check', template: '%s | Helder Nalaten' },
  description: 'De digitale gezondheidscheck voor jouw gezin, vermogen en toekomst. Begin gratis met vijf vragen.',
  robots: { index: indexable, follow: indexable },
  openGraph: { siteName: 'Helder Nalaten', locale: 'nl_NL', type: 'website', images: ['/media/hero.webp'] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="nl"><body>
    <a className="skip" href="#inhoud">Direct naar de inhoud</a>
    <Navbar />
    <CheckAnalytics />
    <main id="inhoud">{children}</main>
    <Footer />
  </body></html>;
}

