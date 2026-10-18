import Link from 'next/link';
import Icon from '@/components/Icons';

export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 · A small detour</p>
      <h1>Not quite here.</h1>
      <p className="muted">That page has moved, or it hasn’t made it off the workbench yet.</p>
      <Link href="/" className="button button-primary">
        Back to the portfolio
        <Icon name="arrow" />
      </Link>
    </div>
  );
}
