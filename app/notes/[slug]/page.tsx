import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { notes } from '@/lib/content';
import { NoteArticle } from '@/components/InteriorPages';
export const dynamicParams = false;
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = notes.find((n) => n.slug === slug);
  return { title: note?.title, description: note?.excerpt };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!notes.some((n) => n.slug === slug)) notFound();
  return <NoteArticle slug={slug} />;
}
