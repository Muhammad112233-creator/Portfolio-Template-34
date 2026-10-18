'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { experiments, projects, roles, site, statistics, type Project } from '@/lib/content';
import { asset } from '@/lib/paths';
import Icon from './Icons';
import { ContributionGraph, NotesGrid, PatternRail, ShopRail, StudioGallery } from './Collections';
import { MorrowPanel, ThreadspacePanel } from './ProductPanels';
import { Reveal, SectionHeading, ThemeImage, ThreadMark } from './UI';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

function CornerFrame() {
  return (
    <span className="corner-frame" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function SeasonalScene() {
  return (
    <svg className="seasonal-scene" viewBox="0 0 640 580" aria-hidden="true">
      <defs>
        <radialGradient id="season-moon">
          <stop stopColor="#b8bab3" stopOpacity=".26" />
          <stop offset="1" stopColor="#888c85" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="season-hill" x2="0" y2="1">
          <stop stopColor="#3c4540" stopOpacity=".45" />
          <stop offset="1" stopColor="#1d2520" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="373" cy="147" r="118" fill="url(#season-moon)" />
      <circle cx="373" cy="147" r="65" fill="#b6b9ad" opacity=".07" />
      <path
        d="M120 470 206 311 242 340 295 221 344 262 377 214 433 324 480 308 558 474Z"
        fill="url(#season-hill)"
      />
      <path
        d="M259 293v-91h22v-36l13-35 12 35v36h22v-64h8V91l13-50 13 50v47h8v64h35v-34l13-24 12 24v71h17v54Z"
        fill="#101c18"
        opacity=".75"
      />
      <path d="M289 131v-26m60-64V16m69 128v-25" stroke="#3b4740" strokeWidth="1" />
      <path d="M300 242v-13m49-63v-16m70 103v-12" stroke="#a88a4d" strokeWidth="3" opacity=".5" />
      <path
        d="m458 142 6 2 6-3m-37-26 5 2 5-2m60 75 6 2 5-3"
        fill="none"
        stroke="#8d9990"
        strokeWidth="1"
        opacity=".6"
      />
    </svg>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="container hero-section">
      <div className="hero-shell">
        <CornerFrame />
        {site.seasonal && <SeasonalScene />}
        <div
          ref={ref}
          className="hero-visual"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            ref.current?.style.setProperty(
              '--pointer-x',
              `${((e.clientX - r.left) / r.width - 0.5) * 8}px`,
            );
            ref.current?.style.setProperty(
              '--pointer-y',
              `${((e.clientY - r.top) / r.height - 0.5) * 5}px`,
            );
          }}
          onPointerLeave={() => {
            ref.current?.style.setProperty('--pointer-x', '0px');
            ref.current?.style.setProperty('--pointer-y', '0px');
          }}
        >
          <HeroScene />
          <img
            className="portrait-cutout"
            src={asset('/images/portrait.webp')}
            width="1024"
            height="1024"
            alt="Original editorial portrait of the fictional designer Elliot, with his little dog Milo"
            fetchPriority="high"
          />
          <span className="portrait-floor" aria-hidden="true" />
        </div>
        <div className="hero-copy">
          <div className="hero-title">
            <p className="eyebrow">{site.role}</p>
            <h1>{site.name}</h1>
          </div>
          <p className="hero-description">
            Product design leader with 12+ years across enterprise platforms, B2B SaaS, and ideas
            finding their first users. Currently leading design at{' '}
            <Link href="/#resume">Northstar Software</Link>, helping a family of specialist software
            businesses make clearer, more useful products. Most recently, led the redesign of{' '}
            <Link href="/tally/">Tally’s financial close workspace</Link> — keeping the business
            moving while changing the tools underneath it. Before that, built the design practice at{' '}
            <Link href="/#resume">Parallel</Link>, grew a team from eight to twenty-two, and helped
            a growing studio find its own way of working. I like the part where a complicated
            problem becomes a simple decision. Open to select fractional and advisory work with
            teams ready to build something worth using.
          </p>
          <div className="button-row">
            <a className="button button-primary" href={`mailto:${site.email}`}>
              Get in touch
            </a>
            <a className="button" href={asset('/downloads/elliot-westbrook-resume.pdf')} download>
              Download resume
            </a>
            <a
              className="button button-square"
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn"
            >
              <Icon name="linkedin" size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statistic({ label, value, index }: { label: string; value: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setNumber(value);
          observer.disconnect();
          return;
        }
        let start: number | undefined;
        const tick = (time: number) => {
          if (!start) start = time;
          const progress = Math.min((time - start) / (1500 + index * 80), 1);
          setNumber(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, index]);
  return (
    <div className="statistic" ref={ref}>
      <CornerFrame />
      <p>{label}</p>
      <div className="statistic-number" aria-label={`${value} plus`}>
        <span aria-hidden="true">{number}</span>
        <sup aria-hidden="true">+</sup>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const hasCover = ['verdant', 'tally', 'margin', 'hearth', 'soundcheck'].includes(project.screen);
  return (
    <Link href={`/${project.slug}/`} className="project-card">
      <div className={`project-cover ${project.locked ? 'project-cover-locked' : ''}`}>
        {project.locked ? (
          <div className="dispatch-brand">
            <span className="dispatch-symbol">↗</span>
            <strong>dispatch</strong>
            <span>A little more connected.</span>
          </div>
        ) : hasCover ? (
          <ThemeImage
            dark={`${project.screen}-cover.webp`}
            light={`${project.screen}-cover-light.webp`}
            alt={project.title}
          />
        ) : (
          <ThemeImage dark={`${project.screen}.svg`} alt={project.title} />
        )}
        {project.locked ? (
          <span className="locked-badge">
            <Icon name="lock" size={12} />
            Locked
          </span>
        ) : (
          <>
            <span className="case-hover-label">
              View case study <Icon name="arrow" size={14} />
            </span>
            <span className="cover-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </>
        )}
      </div>
      <div className="project-caption">
        <p className="eyebrow">{project.client}</p>
        <h3>{project.title}</h3>
      </div>
    </Link>
  );
}

function CaseStudies() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="container section-stack">
      <SectionHeading
        label="Cases"
        title="Selected work"
        id="cases"
        description="A few things I’ve helped shape, from the first question to the work out in the world."
      />
      <div className="projects-grid" id="case-grid">
        {projects.slice(0, expanded ? 8 : 6).map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 60}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
      <button
        type="button"
        className="button button-full"
        aria-expanded={expanded}
        aria-controls="case-grid"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show fewer projects' : 'Load 2 more'}
      </button>
    </section>
  );
}

function Experiments() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section className="container section-stack">
      <SectionHeading
        label="Code"
        title="Experiments"
        id="code"
        description="Small things I build to think through a question about design, software, or the space between them."
      />
      <ContributionGraph />
      <div className="experiments-grid" id="experiment-grid">
        {experiments.slice(0, expanded ? 5 : 4).map((item, i) => (
          <Reveal key={item.slug} delay={(i % 2) * 60}>
            <Link href={`/${item.slug}/`} className="experiment-card">
              <div className="experiment-art">
                <img
                  className="experiment-code"
                  src={asset('/images/code.svg')}
                  width="1200"
                  height="720"
                  loading="lazy"
                  alt=""
                />
                <img
                  className="experiment-product"
                  src={asset(`/images/${item.image}${item.image === 'tally' ? '-screen' : ''}.svg`)}
                  width="1200"
                  height="720"
                  loading="lazy"
                  alt={`Original working interface concept for ${item.name}`}
                />
                <span className="experiment-hover">
                  <Icon name="code" size={14} /> A look under the hood{' '}
                  <Icon name="arrow" size={14} />
                </span>
              </div>
              <div className="project-caption">
                <p className="eyebrow">{item.name}</p>
                <h3>{item.title}</h3>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <button
        className="button button-full"
        type="button"
        aria-expanded={expanded}
        aria-controls="experiment-grid"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show fewer experiments' : 'Load 1 more'}
      </button>
    </section>
  );
}

export function Timeline({ all = false }: { all?: boolean }) {
  const [expanded, setExpanded] = useState(all);
  return (
    <div className="timeline-wrap">
      <ol className="timeline" id="role-timeline">
        {roles.slice(0, expanded ? 9 : 3).map((item, i) => (
          <li key={item.company} className={`timeline-item timeline-item-${i}`}>
            <span className={`timeline-dot ${i === 0 ? 'is-current' : ''}`} aria-hidden="true" />
            <div className="timeline-card">
              <span className="role-logo" aria-hidden="true">
                {item.logo === 'thread' ? (
                  <ThreadMark />
                ) : item.logo === 'initials' ? (
                  <span>E — W</span>
                ) : item.logo === 'north' ? (
                  <span>✳</span>
                ) : (
                  <span>
                    {item.company
                      .split(' ')
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                )}
              </span>
              <h3>{item.company}</h3>
              <div className="role-title">
                <p>{item.role}</p>
                <span>{item.date}</span>
              </div>
              <p className="role-description">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
      {!all && (
        <button
          className="button button-full"
          type="button"
          aria-expanded={expanded}
          aria-controls="role-timeline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show fewer roles' : 'Show 6 more roles'}
        </button>
      )}
    </div>
  );
}

export function WorkTogether() {
  const modes = [
    {
      title: 'Fractional (1–3 days/wk)',
      open: true,
      description:
        'Growing teams that need an experienced design partner, without another full-time role.',
      points: [
        'A player-coach for your design team',
        'Closer design and engineering handoffs',
        'Hands-on work on the parts that matter',
      ],
    },
    {
      title: 'Full-time Director',
      open: false,
      description:
        'Teams looking for a long-term leader to grow the people, the practice, and the work.',
      points: [
        'Team shape, hiring, and thoughtful coaching',
        'A design practice that works on busy days',
        'Practical direction, with sleeves rolled up',
      ],
    },
    {
      title: 'Full-time Principal',
      open: false,
      description:
        'Complex products that need an experienced individual contributor to lead by doing.',
      points: [
        'Ownership of the difficult product questions',
        'Deep research, design, and working prototypes',
        'Close partnership with engineering and PM',
      ],
    },
  ];
  return (
    <section className="container section-stack">
      <SectionHeading
        label="Work together"
        title="Find the mode that fits"
        id="work-together"
        description="Three ways of working, depending on what your team needs. Currently open to fractional engagements."
      >
        <Link href="/ai-transformation/" className="button">
          AI transformation for design teams
        </Link>
      </SectionHeading>
      <div className="engagement-grid">
        {modes.map((mode) => (
          <div
            key={mode.title}
            className={`engagement-card ${mode.open ? 'engagement-open' : 'engagement-unavailable'}`}
          >
            <div className="engagement-title">
              <h3>{mode.title}</h3>
              <span className={`status-badge ${mode.open ? 'status-open' : ''}`}>
                {mode.open ? 'Open' : 'Not available'}
              </span>
            </div>
            <p className="engagement-description">
              <span>Best for: </span>
              {mode.description}
            </p>
            <ul>
              {mode.points.map((point) => (
                <li key={point}>
                  <Icon name="check" size={18} />
                  {point}
                </li>
              ))}
            </ul>
            {mode.open && (
              <div className="button-row">
                <a
                  className="button button-primary button-small"
                  href={`mailto:${site.email}?subject=Let%E2%80%99s%20work%20together`}
                >
                  Start a conversation
                </a>
                <Link className="button button-small" href="/hire/">
                  Rates and how it works
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ClientMarquee() {
  const clients = [
    ['◈', 'VERDANT'],
    ['✳', 'northstar'],
    ['Ⅱ', 'Parallel'],
    ['⌂', 'hearth'],
    ['↗', 'dispatch'],
    ['◉', 'Soundcheck'],
    ['∿', 'margin'],
    ['▰', 'TALLY'],
  ];
  return (
    <section
      className="container client-section"
      aria-label="Fictional project brands featured in this template"
    >
      <div className="client-mask">
        <div className="client-track">
          {[0, 1].map((copy) => (
            <div className="client-group" key={copy} aria-hidden={copy === 1}>
              {clients.map(([symbol, name]) => (
                <span key={name} className={`client-logo client-logo-${name.toLowerCase()}`}>
                  <b>{symbol}</b>
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ShopSign() {
  return (
    <section className="container shop-sign-section" id="shop">
      <Link
        href="/shop/"
        className="shop-sign"
        aria-label="Milo’s Little Emporium. Opening soon. Visit the shop."
      >
        <ThemeImage
          dark="shop-scene.webp"
          light="shop-scene-light.webp"
          alt="An original illustrated coastal road and the illuminated sign for Milo’s Little Emporium"
        />
        <span className="sign-twinkle" aria-hidden="true" />
      </Link>
    </section>
  );
}

export default function Portfolio() {
  return (
    <div className="page-stack portfolio-home">
      <Hero />
      <section className="container" aria-label="Experience at a glance">
        <div className="statistics-grid">
          {statistics.map((stat, i) => (
            <Statistic key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </section>
      <CaseStudies />
      <section className="container section-stack">
        <SectionHeading
          label="Products"
          title="Threadspace"
          id="building"
          description="An idea I kept coming back to. Years ago I helped build a workspace with a graph hidden under the surface. The project ended; the question stayed. Now I’m exploring it as a small family of local-first tools, with the connections out in the open."
        />
        <Reveal>
          <ThreadspacePanel />
        </Reveal>
      </section>
      <section className="container section-stack">
        <SectionHeading
          label="Products"
          title="Morrow"
          id="morrow"
          description="A voice-first food journal, for the days when you have better things to do than count. The watch is the way in; the phone is there for the bigger picture, your usuals, a recipe, and a little perspective."
        />
        <Reveal>
          <MorrowPanel />
        </Reveal>
      </section>
      <Experiments />
      <StudioGallery />
      <section className="container section-stack">
        <SectionHeading
          label="Notes"
          title="The longer conversations"
          id="notes"
          description="A few considered opinions about making products, leading people, and working with new tools."
        >
          <Link className="button" href="/notes/">
            All notes
          </Link>
        </SectionHeading>
        <NotesGrid />
      </section>
      <PatternRail />
      <section className="container section-stack">
        <SectionHeading label="Resume" title="The path so far" id="resume">
          <a className="button" href={asset('/downloads/elliot-westbrook-resume.pdf')} download>
            <Icon name="download" size={14} />
            Download resume
          </a>
        </SectionHeading>
        <Timeline />
      </section>
      <WorkTogether />
      <ClientMarquee />
      <ShopSign />
      <ShopRail />
    </div>
  );
}
