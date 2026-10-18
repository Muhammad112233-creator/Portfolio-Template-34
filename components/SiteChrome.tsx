'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { navItems, site } from '@/lib/content';
import Icon from './Icons';

export function Header() {
  const [theme, setTheme] = useState('dark');
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [letters, setLetters] = useState(site.initials);
  const path = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const scrambleTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark');
    return () => {
      if (scrambleTimer.current) clearInterval(scrambleTimer.current);
    };
  }, []);
  useEffect(() => {
    setMenu(false);
    setActive('');
  }, [path]);
  useEffect(() => {
    const update = () => {
      const top = window.scrollY;
      setScrolled(top > 31);
      setProgress(top / Math.max(1, document.documentElement.scrollHeight - innerHeight));
      if (path !== '/') return;
      let current = '';
      for (const [, id] of navItems) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < 170) current = id;
      }
      setActive(current);
    };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => removeEventListener('scroll', update);
  }, [path]);

  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, .site-footer'));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        menuButton.current?.focus();
      }
      if (e.key !== 'Tab') return;
      const focusable = [
        menuButton.current,
        ...Array.from(sheet.current?.querySelectorAll<HTMLElement>('a,button') || []),
      ].filter(Boolean) as HTMLElement[];
      const first = focusable[0],
        last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', key);
    const media = matchMedia('(min-width: 1024px)');
    const closeLarge = () => {
      if (media.matches) setMenu(false);
    };
    media.addEventListener('change', closeLarge);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, index) => {
        element.inert = previousInert[index];
      });
      document.removeEventListener('keydown', key);
      media.removeEventListener('change', closeLarge);
    };
  }, [menu]);

  useEffect(() => {
    if (active) scramble();
  }, [active]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('fieldnotes-theme', next);
    } catch {
      /* Private browsing is fine. */
    }
  }
  function scramble() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (scrambleTimer.current) clearInterval(scrambleTimer.current);
    let tick = 0;
    scrambleTimer.current = setInterval(() => {
      tick++;
      setLetters(
        tick > 5
          ? site.initials
          : [
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)],
              'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)],
            ],
      );
      if (tick > 5 && scrambleTimer.current) clearInterval(scrambleTimer.current);
    }, 45);
  }
  const logo = (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className="monogram"
      onMouseEnter={scramble}
      onFocus={scramble}
    >
      <span>{letters[0]}</span>
      <span className="monogram-rule" />
      <span>{letters[1]}</span>
      <span className="tooltip">Home</span>
    </Link>
  );
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="announcement" aria-label="A note from the workbench">
        <div className="announcement-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} aria-hidden={i > 0}>
              {site.seasonal ? '🎃' : '↗'} {site.announcement}
            </span>
          ))}
        </div>
      </div>
      <header
        className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menu ? 'menu-is-open' : ''}`}
      >
        <div className="header-inner">
          <div className="header-start">
            <div className="desktop-logo">{logo}</div>
            <button
              ref={menuButton}
              type="button"
              className="icon-button menu-toggle"
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu(!menu)}
            >
              <Icon name={menu ? 'close' : 'menu'} size={18} />
              <span className="tooltip">{menu ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
          <div className="mobile-logo">{logo}</div>
          <nav aria-label="Main navigation" className="desktop-nav">
            {navItems.map(([label, id]) => (
              <Link
                key={id}
                href={`/#${id}`}
                className={active === id ? 'is-active' : ''}
                aria-current={active === id ? 'location' : undefined}
              >
                {label}
                {id === 'shop' && <span className="soon-badge">Soon</span>}
              </Link>
            ))}
          </nav>
          <div className="header-end">
            <button
              type="button"
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
              <span className="tooltip">Switch to {theme === 'dark' ? 'light' : 'dark'}</span>
            </button>
            <a
              href={`mailto:${site.email}`}
              className="icon-button"
              aria-label={`Email ${site.firstName}`}
            >
              <Icon name="mail" size={18} />
              <span className="tooltip">Let’s talk</span>
            </a>
          </div>
        </div>
        <div
          className="reading-progress"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </header>
      {menu && (
        <div
          className="mobile-sheet"
          style={{ top: scrolled ? 56 : 88 }}
          id="mobile-menu"
          ref={sheet}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <Link key={id} href={`/#${id}`} onClick={() => setMenu(false)}>
                {label}
                {id === 'shop' && <span className="soon-badge">Soon</span>}
              </Link>
            ))}
          </nav>
          <div className="mobile-secondary">
            {[
              ['Fractional design lead', 'hire'],
              ['AI transformation', 'ai-transformation'],
              ['Skills', 'skills'],
              ['About', 'about'],
            ].map(([label, slug]) => (
              <Link key={slug} href={`/${slug}/`} onClick={() => setMenu(false)}>
                {label}
              </Link>
            ))}
          </div>
          <div className="mobile-sheet-footer">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>
              Copyright © {new Date().getFullYear()} {site.studio}
            </span>
          </div>
        </div>
      )}
      <div className="viewport-fade viewport-fade-top" aria-hidden="true" />
      <div className="viewport-fade viewport-fade-bottom" aria-hidden="true" />
    </>
  );
}

export function Footer() {
  const groups = [
    {
      label: 'Services',
      links: [
        ['Fractional design lead', '/hire/'],
        ['AI transformation', '/ai-transformation/'],
        ['Work together', '/#work-together'],
      ],
    },
    {
      label: 'Work',
      links: [
        ['Cases', '/#cases'],
        ['Products', '/#building'],
        ['Code', '/#code'],
        ['Misc', '/#misc'],
      ],
    },
    {
      label: 'Library',
      links: [
        ['Notes', '/notes/'],
        ['AIUX', '/aiux/'],
        ['Skills', '/skills/'],
      ],
    },
    {
      label: 'More',
      links: [
        ['About', '/about/'],
        ['Resume', '/#resume'],
        ['Shop', '/shop/'],
      ],
    },
    {
      label: 'Social',
      links: [
        ['LinkedIn', site.socials.linkedin],
        ['X', site.socials.x],
        ['Bluesky', site.socials.bluesky],
        ['Mastodon', site.socials.mastodon],
        ['Substack', site.socials.newsletter],
        ['YouTube', site.socials.youtube],
      ],
    },
  ];
  return (
    <footer className="site-footer container">
      <div className="footer-grid">
        <div className="footer-credit">
          <p>
            Copyright © {new Date().getFullYear()} {site.studio}
          </p>
          <div className="maker-stamps" aria-label="Independent, considered, human-centered design">
            {['Made with care', 'Independent', 'Always curious', 'Built to last'].map((s, i) => (
              <span key={s} className={`maker-stamp stamp-${i}`} title={s}>
                <span>{s}</span>
                <b>{['✦', 'EW', '↗', '✳'][i]}</b>
                <small>FIELDNOTES</small>
              </span>
            ))}
          </div>
        </div>
        {groups.map((group) => (
          <div className="footer-group" key={group.label}>
            <h2>{group.label}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={label}>
                  {href.startsWith('http') ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <Link href={href}>{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
