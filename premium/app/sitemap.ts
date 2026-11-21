import type { MetadataRoute } from 'next';
import { origin, situations, stories } from '../lib/content';
import { knowledgeArticles, knowledgePath } from '../lib/knowledge';

import { agendaPath, bookletPath, familyPath, overviewPath } from '../lib/familiegesprek';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/check/', '/voor-gezinnen/', '/voor-later/', '/hoe-het-werkt/', '/kennisbank/', '/kennismaken/', familyPath, agendaPath, overviewPath, bookletPath, '/verhalen/', ...situations.map(({ slug }) => `/situaties/${slug}/`), ...stories.map(({ slug }) => `/verhalen/${slug}/`)];
  return [
    ...paths.map((path) => ({ url: new URL(path, origin).href })),
    ...knowledgeArticles.map((article) => ({
      url: new URL(knowledgePath(article.slug), origin).href,
      lastModified: article.updated,
    })),
  ];
}

