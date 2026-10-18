import type { Metadata } from 'next';
import { NotesIndex } from '@/components/InteriorPages';
export const metadata: Metadata = {
  title: 'Notes',
  description:
    'Considered opinions about product design, leading people, and working with new tools.',
};
export default function Page() {
  return <NotesIndex />;
}
