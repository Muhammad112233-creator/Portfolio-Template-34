'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { asset } from '@/lib/paths';
import Icon from './Icons';

export function SectionHeading({
  label,
  title,
  description,
  id,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  id?: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading" id={id}>
      <p className="eyebrow">{label}</p>
      <div className="heading-line">
        <h2>{title}</h2>
        {children && <div className="heading-actions">{children}</div>}
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < innerHeight - 20) return;
    el.classList.add('will-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function ThemeImage({
  dark,
  light,
  alt,
  className = '',
  eager = false,
}: {
  dark: string;
  light?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <span className={`theme-image ${className}`} role="img" aria-label={alt}>
      <img
        src={asset(`/images/${dark}`)}
        className={light ? 'image-dark' : ''}
        width="1440"
        height="900"
        alt=""
        aria-hidden="true"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      {light && (
        <img
          src={asset(`/images/${light}`)}
          className="image-light"
          width="1440"
          height="900"
          alt=""
          aria-hidden="true"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </span>
  );
}

export function Dialog({
  open,
  onClose,
  title,
  children,
  className = '',
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          type="button"
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <Icon name="close" size={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}

export function ThreadMark({
  className = '',
  color = 'currentColor',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 19c0 28 40 14 40 42M60 19C60 47 20 33 20 61M20 19c0-16 40-16 40 0M20 61c0 16 40 16 40 0"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M40 15v50" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function AppIcon({ color = 'purple', small = false }: { color?: string; small?: boolean }) {
  return (
    <span className={`app-icon app-icon-${color} ${small ? 'app-icon-small' : ''}`}>
      <span className="app-icon-shadow" />
      <ThreadMark />
      <span className="app-icon-shine" />
    </span>
  );
}

export function BackLink({
  href = '/',
  label = 'Back to the portfolio',
}: {
  href?: string;
  label?: string;
}) {
  return (
    <Link href={href} className="back-link">
      <Icon name="left" size={13} />
      {label}
    </Link>
  );
}

export function CarouselButtons({
  id,
  canLeft,
  canRight,
  onScroll,
}: {
  id: string;
  canLeft: boolean;
  canRight: boolean;
  onScroll: (direction: number) => void;
}) {
  return (
    <div className="carousel-buttons">
      <button
        className="circle-button"
        type="button"
        disabled={!canLeft}
        aria-label="Scroll left"
        aria-controls={id}
        onClick={() => onScroll(-1)}
      >
        <Icon name="left" />
      </button>
      <button
        className="circle-button"
        type="button"
        disabled={!canRight}
        aria-label="Scroll right"
        aria-controls={id}
        onClick={() => onScroll(1)}
      >
        <Icon name="right" />
      </button>
    </div>
  );
}
