import type { MetadataRoute } from 'next';
import { site, projects, experiments, notes, patterns } from '@/lib/content';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  // Avoid advertising the example domain as a real deployed portfolio.
  if (site.url === 'https://example.com') return [];
  const base = site.url.replace(/\/$/, '');
  const paths = [
    '',
    ...projects.map((p) => p.slug),
    ...experiments.map((e) => e.slug),
    'about',
    'skills',
    'hire',
    'ai-transformation',
    'shop',
    'films',
    'threadspace',
    'threadnote',
    'threadbase',
    'morrow',
    'resume',
    'notes',
    'aiux',
    ...notes.map((n) => `notes/${n.slug}`),
    ...patterns.map((_, i) => `aiux/pattern-${i + 1}`),
  ];
  return paths.map((path) => ({
    url: `${base}/${path}${path ? '/' : ''}`,
    changeFrequency: 'monthly',
    priority: path ? 0.6 : 1,
  }));
}
