import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { patterns } from '@/lib/content';
import { PatternArticle } from '@/components/InteriorPages';
export const dynamicParams = false;
export function generateStaticParams() {
  return patterns.map((_, i) => ({ slug: `pattern-${i + 1}` }));
}
function getIndex(slug: string) {
  const match = slug.match(/^pattern-([1-9]\d*)$/);
  return match ? Number(match[1]) - 1 : -1;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = patterns[getIndex(slug)];
  return { title: p?.title, description: p?.description };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = getIndex(slug);
  if (index < 0 || index >= patterns.length) notFound();
  return <PatternArticle index={index} />;
}
