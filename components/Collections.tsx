'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { galleryItems, notes, patterns, shopItems, site } from '@/lib/content';
import { asset } from '@/lib/paths';
import Icon from './Icons';
import { CarouselButtons, Dialog, SectionHeading } from './UI';

function useRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setEdges({
        left: el.scrollLeft > 3,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 3,
      });
    update();
    el.addEventListener('scroll', update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    let dragging = false,
      moved = false,
      startX = 0,
      startScroll = 0;
    let resetTimer: ReturnType<typeof setTimeout>;
    const down = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startScroll = el.scrollLeft;
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 5) moved = true;
      if (!moved) return;
      event.preventDefault();
      el.classList.add('is-dragging');
      el.scrollLeft = startScroll - distance;
    };
    const up = () => {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('is-dragging');
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        moved = false;
      }, 0);
    };
    const click = (event: MouseEvent) => {
      if (moved) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const preventDrag = (event: DragEvent) => event.preventDefault();
    el.addEventListener('pointerdown', down);
    el.addEventListener('click', click, true);
    el.addEventListener('dragstart', preventDrag);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('scroll', update);
      observer.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('click', click, true);
      el.removeEventListener('dragstart', preventDrag);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      clearTimeout(resetTimer);
    };
  }, []);
  return {
    ref,
    edges,
    scroll: (direction: number) => {
      const el = ref.current;
      if (el)
        el.scrollBy({
          left:
            direction * ((el.querySelector<HTMLElement>(':scope > *')?.offsetWidth || 360) + 20),
          behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
    },
  };
}

export function PatternCard({ index }: { index: number }) {
  const pattern = patterns[index];
  return (
    <Link href={`/aiux/pattern-${index + 1}/`} className="pattern-card">
      <div className="pattern-meta">
        <Icon name={pattern.icon} size={18} />
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="pattern-category">{pattern.category}</p>
      <h3>{pattern.title}</h3>
      <p className="pattern-description">{pattern.description}</p>
      <p className="pattern-tags">{pattern.tags}</p>
    </Link>
  );
}

export function PatternRail() {
  const { ref, edges, scroll } = useRail();
  return (
    <section className="rail-section">
      <div className="container">
        <SectionHeading
          label="AIUX"
          title="Patterns for thoughtful AI products"
          id="aiux"
          description="Notes on the recurring problems, and the small decisions that make the difference."
        >
          <CarouselButtons
            id="pattern-rail"
            canLeft={edges.left}
            canRight={edges.right}
            onScroll={scroll}
          />
          <Link className="button" href="/aiux/">
            All patterns
          </Link>
        </SectionHeading>
      </div>
      <div ref={ref} className="horizontal-rail" id="pattern-rail" aria-label="AI design patterns">
        {patterns.map((_, i) => (
          <PatternCard key={i} index={i} />
        ))}
      </div>
    </section>
  );
}

export function NotesGrid({ all = false }: { all?: boolean }) {
  return (
    <div className={`notes-grid ${all ? 'notes-grid-full' : ''}`}>
      {notes.map((note) => (
        <Link key={note.slug} href={`/notes/${note.slug}/`} className="note-card">
          <div className="note-image">
            <img
              src={asset(
                `/images/${note.image}.${note.image === 'note-prototype' ? 'webp' : 'svg'}`,
              )}
              width="1200"
              height="720"
              loading="lazy"
              alt={`Original editorial illustration for ${note.title}`}
            />
            <span className="image-open">
              <Icon name="arrow" size={20} />
            </span>
          </div>
          <h3>{note.title}</h3>
          <time dateTime={note.iso}>{note.date}</time>
          <p>{note.excerpt}</p>
        </Link>
      ))}
    </div>
  );
}

export function StudioGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIndex((i) => ((i ?? 0) + 1) % galleryItems.length);
        setZoom(false);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIndex((i) => ((i ?? 0) - 1 + galleryItems.length) % galleryItems.length);
        setZoom(false);
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [index]);
  const move = (d: number) => {
    setIndex((i) => ((i ?? 0) + d + galleryItems.length) % galleryItems.length);
    setZoom(false);
  };
  return (
    <section className="studio-section" id="misc">
      <div className="container">
        <SectionHeading label="Misc" title="A few more things from the studio" />
      </div>
      <div className="studio-wall" aria-label="Moving gallery of original work">
        {[0, 1, 2].map((row) => (
          <div className={`studio-row studio-row-${row}`} key={row}>
            <div className="studio-track">
              {[0, 1].map((copy) => (
                <div className="studio-group" key={copy} aria-hidden={copy === 1}>
                  {galleryItems.slice(row * 6, row * 6 + 6).map((item, i) => {
                    const idx = row * 6 + i;
                    return (
                      <button
                        key={`${copy}-${idx}`}
                        type="button"
                        className={`studio-shot shot-size-${(i + row) % 3}`}
                        onClick={() => {
                          setIndex(idx);
                          setZoom(false);
                        }}
                        tabIndex={copy === 1 ? -1 : 0}
                        aria-label={`View artwork ${String(idx + 1).padStart(2, '0')}: ${item.title}`}
                      >
                        <img
                          src={asset(`/images/${item.image}.svg`)}
                          alt=""
                          width="1200"
                          height="720"
                          loading="lazy"
                        />
                        <span className="shot-open">
                          <Icon name="zoom" size={20} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Dialog
        open={index !== null}
        onClose={() => {
          setIndex(null);
          setZoom(false);
        }}
        title={index === null ? 'Studio artwork' : galleryItems[index].title}
        className="lightbox-dialog"
      >
        {index !== null && (
          <>
            <div className="lightbox-heading">
              <span className="eyebrow">{galleryItems[index].kind}</span>
              <span className="mono muted">
                {String(index + 1).padStart(2, '0')} / {galleryItems.length}
              </span>
            </div>
            <div className={`lightbox-image ${zoom ? 'is-zoomed' : ''}`}>
              <img
                src={asset(`/images/${galleryItems[index].image}.svg`)}
                onClick={() => setZoom(!zoom)}
                alt={galleryItems[index].title}
              />
            </div>
            <div className="lightbox-caption">
              <div>
                <h2>{galleryItems[index].title}</h2>
                <small>Use ← → to browse. Click the artwork to {zoom ? 'fit' : 'zoom'}.</small>
              </div>
              <div className="button-row">
                <button
                  className="circle-button"
                  onClick={() => move(-1)}
                  aria-label="Previous artwork"
                >
                  <Icon name="left" />
                </button>
                <button className="circle-button" onClick={() => move(1)} aria-label="Next artwork">
                  <Icon name="right" />
                </button>
                <a
                  className="button"
                  href={asset(`/images/${galleryItems[index].image}.svg`)}
                  download
                >
                  Save artwork
                  <Icon name="download" size={13} />
                </a>
              </div>
            </div>
          </>
        )}
      </Dialog>
    </section>
  );
}

export function ShopRail() {
  const { ref, edges, scroll } = useRail();
  return (
    <section className="rail-section">
      <div className="container">
        <SectionHeading
          label="Shop"
          title="Take a little good company home"
          description="Milo has excellent taste in snacks and no clear career plan. These little editions help keep him in the lifestyle he has become accustomed to."
        >
          <CarouselButtons
            id="shop-rail"
            canLeft={edges.left}
            canRight={edges.right}
            onScroll={scroll}
          />
          <Link href="/shop/" className="button">
            See the shop
          </Link>
        </SectionHeading>
      </div>
      <div
        className="horizontal-rail shop-rail"
        id="shop-rail"
        ref={ref}
        aria-label="Milo’s collectible editions"
      >
        {shopItems.map((item, i) => (
          <Link key={item.slug} href={`/shop/#${item.slug}`} className="shop-card">
            <div className={`shop-image ${i === 4 ? 'shop-image-sleep' : ''}`}>
              <img
                src={asset(`/images/${item.image}.webp`)}
                width="1024"
                height="1024"
                alt={`Original handmade-style dachshund figurine: ${item.name}`}
                loading="lazy"
              />
              <span className="image-open">
                <Icon name="arrow" size={20} />
              </span>
            </div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <small>Edition of {item.edition}</small>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ContributionGraph() {
  const entries = Array.from({ length: 658 }, (_, i) => {
    const seed = Math.sin(i * 12.9898 + 7) * 43758.5453;
    const random = seed - Math.floor(seed);
    const week = Math.floor(i / 7);
    const quiet = week > 42 && week < 65;
    const count =
      i < 3
        ? 0
        : random > (quiet ? 0.92 : week > 76 ? 0.16 : 0.36)
          ? Math.floor(random * (week > 76 ? 14 : 8))
          : 0;
    const level = count === 0 ? 0 : count < 3 ? 1 : count < 5 ? 2 : count < 8 ? 3 : 4;
    const date = new Date(Date.UTC(2024, 11, 29 + i));
    return { count, level, date, quiet };
  });
  const total = entries.reduce((sum, e) => sum + e.count, 0);
  const months = [
    'Jan ’25',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan ’26',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
  ];
  return (
    <div className="contribution-graph">
      <div className="contribution-summary">
        <p>
          <strong>{total.toLocaleString('en-US')} contributions</strong>
          <span> since January 2025</span>
        </p>
        <a href={site.socials.github} target="_blank" rel="noopener noreferrer">
          The workbench <Icon name="arrow" size={12} />
        </a>
      </div>
      <div
        className="calendar-scroll"
        tabIndex={0}
        role="region"
        aria-label="Example contribution calendar. Scroll horizontally on smaller screens."
      >
        <div className="calendar-inner">
          <div className="calendar-day-labels">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className="calendar-main">
            <div className="calendar-months">
              {months.map((m, i) => (
                <span key={i}>{m}</span>
              ))}
            </div>
            <div
              className="calendar-grid"
              role="img"
              aria-label={`${total} example contributions between January 2025 and October 2026. This is illustrative, not connected to a real GitHub account.`}
            >
              {entries.map((e, i) => (
                <span
                  key={i}
                  className={`calendar-cell cell-level-${e.level} ${e.quiet ? 'cell-quiet' : ''}`}
                  title={`${e.count} contributions on ${e.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="calendar-legend">
        <span className="legend-note">
          <i />
          Exploration time
        </span>
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className={`calendar-cell cell-level-${i}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
