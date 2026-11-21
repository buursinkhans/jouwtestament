import type { MetadataRoute } from 'next';
import { indexable, origin } from '../lib/content';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', ...(indexable ? { allow: '/' } : { disallow: '/' }) }, ...(indexable ? { sitemap: origin + '/sitemap.xml' } : {}) };
}

