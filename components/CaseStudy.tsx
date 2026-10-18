'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { projects, site, type Project } from '@/lib/content';
import Icon from './Icons';
import { BackLink, Reveal, ThemeImage } from './UI';

function ScrollSentence({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (r)
          setProgress(
            Math.max(
              0,
              Math.min(1, (innerHeight * 0.92 - r.top) / (r.height + innerHeight * 0.35)),
            ),
          );
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    return () => {
      removeEventListener('scroll', update);
      cancelAnimationFrame(frame);
    };
  }, []);
  const words = text.split(' ');
  return (
    <p ref={ref}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            opacity: 0.3 + 0.7 * Math.max(0, Math.min(1, (progress - i / words.length) * 8)),
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}

function Journey({ project }: { project: Project }) {
  const labels =
    project.slug === 'verdant'
      ? ['Find a grower', 'Meet the plant', 'Know what to expect', 'Make it yours']
      : project.slug === 'tally'
        ? ['See the close', 'Find the exception', 'Review in context', 'Move it forward']
        : project.slug === 'margin'
          ? ['Ask the question', 'See the boundary', 'Check the source', 'Keep the useful part']
          : ['Find your place', 'See the next step', 'Act with context', 'Keep moving'];
  return (
    <div className="journey-diagram">
      {labels.map((label, i) => (
        <div key={label}>
          <span className="journey-number">0{i + 1}</span>
          <Icon name={['search', 'frame', 'shield', 'check'][i]} size={25} />
          <h3>{label}</h3>
          <p>
            {
              [
                'A clear place to begin.',
                'Enough detail to understand.',
                'An answer worth relying on.',
                'One next thing, well explained.',
              ][i]
            }
          </p>
          {i < 3 && <Icon name="right" className="journey-connector" />}
        </div>
      ))}
    </div>
  );
}

export default function CaseStudy({ project }: { project: Project }) {
  const [unlocked, setUnlocked] = useState(!project.locked);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const screen = [
    'verdant',
    'tally',
    'margin',
    'hearth',
    'soundcheck',
    'dispatch',
    'atlas',
  ].includes(project.screen)
    ? project.screen
    : 'tally';
  if (!unlocked)
    return (
      <div className="container inner-page">
        <BackLink href="/#cases" label="All selected work" />
        <div className="access-gate">
          <Icon name="lock" size={32} />
          <p className="eyebrow">A closer look, by invitation</p>
          <h1>{project.client}</h1>
          <p>
            {project.title}. This template includes a working presentation gate so you can try the
            complete interaction.
          </p>
          <form
            className="form-stack"
            onSubmit={(e) => {
              e.preventDefault();
              if (password.trim().toLowerCase() === 'fieldnotes') {
                setUnlocked(true);
                setError(false);
              } else setError(true);
            }}
          >
            <label htmlFor="case-password">
              Access phrase
              <input
                id="case-password"
                autoComplete="off"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter the access phrase"
                required
                aria-invalid={error}
                aria-describedby={error ? 'password-error' : 'password-help'}
              />
            </label>
            {error && (
              <p className="form-error" id="password-error" role="alert">
                That is not quite it. Try “fieldnotes” for this demo.
              </p>
            )}
            <button className="button button-primary" type="submit">
              Open the case study
              <Icon name="arrow" size={14} />
            </button>
          </form>
          <small className="demo-notice" id="password-help">
            Template preview: use <b>fieldnotes</b>. This is a visual gate, not secure storage.
            Never put confidential work in a public static website.
          </small>
        </div>
      </div>
    );
  return (
    <article className="container inner-page case-study">
      <BackLink href="/#cases" label="All selected work" />
      <div className="interior-hero">
        <p className="eyebrow">
          {project.client} · {project.year}
        </p>
        <h1>{project.title}</h1>
      </div>
      <div className="case-hero-art">
        <ThemeImage
          dark={screen === 'atlas' ? 'atlas.svg' : `${screen}-cover.webp`}
          light={screen === 'atlas' ? 'atlas.svg' : `${screen}-cover-light.webp`}
          alt={`Original product mockup for ${project.client}`}
          eager
        />
      </div>
      <div className="case-introduction">
        <ScrollSentence text={project.description} />
        <dl className="case-facts">
          <div>
            <dt>Engagement</dt>
            <dd>{project.sector}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Timeline</dt>
            <dd>{project.timeline}</dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd>Research, working prototypes, and close partnership with engineering.</dd>
          </div>
        </dl>
      </div>
      <section className="case-section">
        <h2>My part in the work</h2>
        <div className="prose">
          <p>
            I partnered with the team from the early questions through the details that reached
            production. That meant spending time with the people doing the work, building a shared
            picture of the problem, and making prototypes specific enough to disagree with.
          </p>
          <p>
            The useful output was not a stack of screens. It was a set of decisions the team could
            explain, a small system they could keep using, and a product that felt more coherent the
            more closely you looked.
          </p>
        </div>
        <div className="case-outcomes">
          {project.outcomes.map(([value, label]) => (
            <div className="case-outcome" key={label}>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>
      <Reveal>
        <section className="case-section">
          <h2>The work, from one end to the other</h2>
          <div className="prose">
            <p>{project.challenge}</p>
          </div>
          <Journey project={project} />
          <div className="case-screen">
            <ThemeImage
              dark={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen.svg`}
              light={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen-light.svg`}
              alt={`${project.client}: the complete workspace, in context`}
            />
          </div>
          <p className="image-caption">
            The main workspace. Fewer places to look, a clearer place to begin.
          </p>
        </section>
      </Reveal>
      <section className="case-section">
        <h2>The decision that made the rest simpler</h2>
        <div className="prose">
          <p>{project.decision}</p>
          <p>
            We tested the direction in short, ordinary sessions rather than saving everything for
            one large validation exercise. A confusing label, an unexpected sequence, and a missing
            piece of context were all cheaper to address while the system was still small.
          </p>
        </div>
        <div className="case-screen-pair">
          <figure>
            <div className="case-screen screen-detail-left">
              <ThemeImage
                dark={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen.svg`}
                light={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen-light.svg`}
                alt={`${project.client}: a closer look at navigation and context`}
              />
            </div>
            <figcaption className="image-caption">
              The context stays close to the decision.
            </figcaption>
          </figure>
          <figure>
            <div className="case-screen screen-detail-right">
              <ThemeImage
                dark={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen.svg`}
                light={screen === 'atlas' ? 'atlas.svg' : `${screen}-screen-light.svg`}
                alt={`${project.client}: a closer look at the useful details`}
              />
            </div>
            <figcaption className="image-caption">
              Details that make the next action easier to understand.
            </figcaption>
          </figure>
        </div>
      </section>
      <blockquote className="case-quote">
        <p>“The interface should do the remembering, so the person can do the thinking.”</p>
        <cite>A working principle for the project, not a customer testimonial.</cite>
      </blockquote>
      <section className="case-section">
        <h2>A system the team could carry forward</h2>
        <div className="prose">
          <p>
            We kept the component set intentionally small. The same spacing, status language, and
            interaction patterns appear throughout the product, so a new screen feels familiar
            before someone has used it.
          </p>
          <p>
            Engineering was part of those decisions, not the last stop after them. We worked in
            running prototypes when the behavior was hard to explain, and documented the cases that
            were easy to miss: an empty account, a slow response, an unusually long name, and the
            way back from a mistake.
          </p>
        </div>
        <div className="system-swatches">
          <div style={{ background: project.accent, color: '#14201a' }}>
            01
            <br />
            <span>One useful accent</span>
          </div>
          <div>
            02
            <br />
            <span>A legible hierarchy</span>
          </div>
          <div>
            03
            <br />
            <span>Room for real content</span>
          </div>
          <div>
            04
            <br />
            <span>Behavior that repeats</span>
          </div>
        </div>
      </section>
      <section className="case-section">
        <h2>What I would carry into the next one</h2>
        <div className="prose">
          <p>
            The most durable part of this work was the shared understanding of what mattered.
            Screens change. A clear reason for the way they work makes those changes less expensive
            and the conversations around them more productive.
          </p>
          <p>
            For me, the best sign that a project has worked is a team making good decisions after
            the designer has stepped out of the room.
          </p>
        </div>
        <div className="button-row" style={{ marginTop: 24 }}>
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent(`A question about ${project.client}`)}`}
            className="button button-primary"
          >
            Talk about a similar challenge
            <Icon name="arrow" size={14} />
          </a>
          <Link href="/#cases" className="button">
            Back to selected work
          </Link>
        </div>
        <p className="demo-notice">
          Illustrative case study. Names, product interfaces, dates, and outcomes are fictional
          template content, not claims of real client work.
        </p>
      </section>
      <Link href={`/${next.slug}/`} className="next-project">
        <div>
          <p className="eyebrow">Up next · {next.client}</p>
          <strong>{next.title}</strong>
        </div>
        <Icon name="arrow" size={32} />
      </Link>
    </article>
  );
}
