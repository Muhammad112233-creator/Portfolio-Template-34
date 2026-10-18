import type { Metadata } from 'next';
import { PatternsIndex } from '@/components/InteriorPages';
export const metadata: Metadata = {
  title: 'AIUX — A field guide',
  description:
    'Forty practical patterns for making intelligent products more understandable, dependable, and useful.',
};
export default function Page() {
  return <PatternsIndex />;
}
