import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { experiments, projects } from '@/lib/content';
import CaseStudy from '@/components/CaseStudy';
import {
  AboutPage,
  ExperimentPage,
  FilmsPage,
  HirePage,
  ProductPage,
  ResumePage,
  ShopPage,
  SkillsPage,
  TransformationPage,
} from '@/components/InteriorPages';

const pages: Record<string, { title: string; description: string }> = {
  about: { title: 'About', description: 'A little about the person behind the work.' },
  skills: {
    title: 'Skills',
    description: 'A broad product design practice, with a practical point of view.',
  },
  hire: {
    title: 'Hire a fractional design lead',
    description: 'A senior design partner for teams making important product decisions.',
  },
  'ai-transformation': {
    title: 'AI transformation for design teams',
    description: 'Practical help for a team learning to work thoughtfully with new tools.',
  },
  shop: {
    title: 'Milo’s Little Emporium',
    description: 'Original collectible concepts from a small independent studio. Coming soon.',
  },
  films: {
    title: 'A few small walkthroughs',
    description: 'Three silent, interactive browser prototypes of Threadspace.',
  },
  threadspace: {
    title: 'Threadspace',
    description: 'Local-first tools for the threads of a life.',
  },
  threadnote: {
    title: 'Threadnote',
    description: 'A quiet workspace for the things you mean to return to.',
  },
  threadbase: {
    title: 'Threadbase',
    description: 'A local-first graph, with explainable connections.',
  },
  morrow: {
    title: 'Morrow',
    description: 'A voice-first food journal, one ordinary day at a time.',
  },
  resume: { title: 'Resume', description: 'The path so far — making, leading, and learning.' },
};
export function generateStaticParams() {
  return [
    ...projects.map((p) => p.slug),
    ...experiments.map((e) => e.slug),
    ...Object.keys(pages),
  ].map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = projects.find((p) => p.slug === slug);
  const experiment = experiments.find((e) => e.slug === slug);
  return {
    title: item?.client || experiment?.name || pages[slug]?.title || 'Portfolio',
    description: item?.description || experiment?.description || pages[slug]?.description,
  };
}

export default async function InteriorRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (project) return <CaseStudy project={project} />;
  if (experiments.some((e) => e.slug === slug)) return <ExperimentPage slug={slug} />;
  if (['threadspace', 'threadnote', 'threadbase', 'morrow'].includes(slug))
    return <ProductPage slug={slug} />;
  switch (slug) {
    case 'about':
      return <AboutPage />;
    case 'skills':
      return <SkillsPage />;
    case 'hire':
      return <HirePage />;
    case 'ai-transformation':
      return <TransformationPage />;
    case 'shop':
      return <ShopPage />;
    case 'films':
      return <FilmsPage />;
    case 'resume':
      return <ResumePage />;
    default:
      return notFound();
  }
}
