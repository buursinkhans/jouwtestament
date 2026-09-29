// @ts-check
import { execFileSync } from 'node:child_process';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages with noindex (or no search value) stay out of the sitemap (docs/11).
const EXCLUDED = ['/bedankt/', '/privacy/', '/voorwaarden/'];

// Source files that make up each page, for an honest <lastmod>: the date of the last commit
// that touched the page or its data. Pages not listed use their own .astro file.
/** @type {Record<string, string[]>} */
const SOURCES = {
  '/': ['src/pages/index.astro', 'src/data/faq.ts', 'src/data/offer.ts'],
  '/voor-wie/': ['src/pages/voor-wie/index.astro', 'src/data/segments.ts'],
  '/tips/': ['src/pages/tips.astro', 'src/data/tips.ts'],
  '/veelgestelde-vragen/': ['src/pages/veelgestelde-vragen.astro', 'src/data/faq.ts'],
};

/** @param {string} path */
const sourcesFor = (path) => {
  if (SOURCES[path]) return SOURCES[path];
  if (path.startsWith('/voor-wie/')) return ['src/pages/voor-wie/[slug].astro', 'src/data/segments.ts'];
  return [`src/pages${path.replace(/\/$/, '')}.astro`];
};

/** Last commit date of the given files, or undefined when git history is unavailable. */
const lastCommitDate = (/** @type {string[]} */ files) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files], { encoding: 'utf8' }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
};

// https://astro.build/config
export default defineConfig({
  site: 'https://heldernalaten.nl',
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDED.includes(new URL(page).pathname),
      serialize(item) {
        const lastmod = lastCommitDate(sourcesFor(new URL(item.url).pathname));
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
});
