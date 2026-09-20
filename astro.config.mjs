// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jouwtestament.nl',
  integrations: [sitemap()],
  i18n: {
    // Nederlands is de standaardtaal: geen prefix, dus "/" en "/waarom-een-testament-belangrijk-is".
    // Nieuwe talen voeg je later toe door ze aan deze lijst toe te voegen (bv. "de", "fr").
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
