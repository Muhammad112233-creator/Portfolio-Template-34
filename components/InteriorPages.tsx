'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { experiments, notes, patterns, shopItems, site } from '@/lib/content';
import { asset } from '@/lib/paths';
import { copyText } from '@/lib/clipboard';
import { NotesGrid, PatternCard } from './Collections';
import { MorrowPanel, PhoneMockup, ThreadGraph, ThreadspacePanel } from './ProductPanels';
import { Timeline, WorkTogether } from './Portfolio';
import { BackLink, Dialog, ThreadMark } from './UI';
import Icon from './Icons';

function InteriorHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="interior-hero">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
function ContactButton({
  subject = 'A conversation about working together',
  children = 'Start a conversation',
}: {
  subject?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      className="button button-primary"
      href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}`}
    >
      {children}
      <Icon name="arrow" size={14} />
    </a>
  );
}

export function NotesIndex() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const filtered = notes
    .filter(
      (n) =>
        (category === 'All' || n.category === category) &&
        `${n.title} ${n.excerpt}`.toLowerCase().includes(query.toLowerCase()),
    )
    .sort((a, b) => (sort === 'newest' ? b.iso.localeCompare(a.iso) : a.iso.localeCompare(b.iso)));
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="Notes"
        title="The longer conversations"
        description="Working notes on product design, the people around it, and the tools changing the way we work. Written slowly, when there is something worth saying."
      />
      <div className="index-controls">
        <input
          type="search"
          className="search-field filter-search"
          aria-label="Search notes"
          placeholder="Find a thought..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="sort-label">
          Order
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>
      <div className="filter-bar" aria-label="Filter notes by topic">
        {['All', 'Process', 'Systems', 'AI & design'].map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'is-selected' : ''}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="results-label" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'note' : 'notes'}
      </p>
      {filtered.length ? (
        <div className="notes-grid">
          {filtered.map((note) => (
            <Link href={`/notes/${note.slug}/`} key={note.slug} className="note-card">
              <div className="note-image">
                <img
                  src={asset(
                    `/images/${note.image}.${note.image === 'note-prototype' ? 'webp' : 'svg'}`,
                  )}
                  width="1200"
                  height="720"
                  alt={`Original editorial illustration for ${note.title}`}
                />
                <span className="image-open">
                  <Icon name="arrow" />
                </span>
              </div>
              <h2 style={{ fontSize: 22, lineHeight: '30px' }}>{note.title}</h2>
              <time dateTime={note.iso}>{note.date}</time>
              <p>{note.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          Nothing here for that search. Try a different word, or{' '}
          <button
            className="text-link"
            onClick={() => {
              setCategory('All');
              setQuery('');
            }}
          >
            show all notes
          </button>
          .
        </div>
      )}
    </div>
  );
}

export function NoteArticle({ slug }: { slug: string }) {
  const note = notes.find((n) => n.slug === slug)!;
  const [copied, setCopied] = useState(false);
  const [manualLink, setManualLink] = useState('');
  async function share() {
    const success = await copyText(location.href);
    setCopied(success);
    setManualLink(success ? '' : location.href);
    if (success) setTimeout(() => setCopied(false), 2000);
  }
  return (
    <article className="container inner-page">
      <div className="article-layout">
        <BackLink href="/notes/" label="All notes" />
        <InteriorHero
          label={`${note.category} · ${note.date}`}
          title={note.title}
          description={note.excerpt}
        />
        <p className="article-byline">
          By {site.name} ·{' '}
          {Math.max(
            3,
            Math.ceil(
              note.sections
                .map((s) => s[1])
                .join(' ')
                .split(' ').length / 180,
            ),
          )}{' '}
          min read
        </p>
        <img
          className="article-cover"
          src={asset(`/images/${note.image}.${note.image === 'note-prototype' ? 'webp' : 'svg'}`)}
          width="1200"
          height="720"
          alt={`Original illustration for ${note.title}`}
        />
        <div className="prose">
          {note.sections.map(([title, text]) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="article-footer">
            <p>
              Something in here match your experience — or not? I’d be glad to hear the other side
              of it.
            </p>
            <div className="button-row">
              <a
                className="button"
                href={`mailto:${site.email}?subject=${encodeURIComponent(`About your note: ${note.title}`)}`}
              >
                Send a thought
                <Icon name="mail" size={14} />
              </a>
              <button type="button" className="button" onClick={share}>
                <Icon name={copied ? 'check' : 'copy'} size={14} />
                {copied ? 'Link copied' : 'Copy article link'}
              </button>
            </div>
            {manualLink && (
              <label className="copy-fallback">
                Your browser blocked clipboard access. Select and copy this link:
                <input
                  autoFocus
                  readOnly
                  value={manualLink}
                  onFocus={(e) => e.currentTarget.select()}
                />
              </label>
            )}
          </div>
        </div>
      </div>
      <div className="case-section">
        <h2 style={{ marginBottom: 24 }}>A few more things worth a look</h2>
        <NotesGrid />
      </div>
    </article>
  );
}

export function PatternsIndex() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All patterns');
  const categories = ['All patterns', ...new Set(patterns.map((p) => p.category))];
  const results = patterns
    .map((p, index) => ({ ...p, index }))
    .filter(
      (p) =>
        (category === 'All patterns' || p.category === category) &&
        `${p.title} ${p.description} ${p.tags}`.toLowerCase().includes(query.toLowerCase()),
    );
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="AIUX · A living field guide"
        title="The small decisions around the model."
        description="Forty patterns for making intelligent products more understandable, dependable, and useful. Not universal rules — working positions, open to a better argument."
      />
      <input
        type="search"
        className="search-field filter-search"
        aria-label="Search AI design patterns"
        placeholder="Look for a problem, a pattern, a question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="filter-bar" aria-label="Pattern categories">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${category === c ? 'is-selected' : ''}`}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="results-label" aria-live="polite">
        {results.length} {results.length === 1 ? 'pattern' : 'patterns'}
      </p>
      {results.length ? (
        <div className="pattern-index">
          {results.map((p) => (
            <PatternCard key={p.index} index={p.index} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          No pattern matches that combination yet.{' '}
          <button
            className="text-link"
            onClick={() => {
              setQuery('');
              setCategory('All patterns');
            }}
          >
            Start again with the full collection.
          </button>
        </div>
      )}
    </div>
  );
}

function PatternExample({ index }: { index: number }) {
  const [selected, setSelected] = useState('');
  const [showSource, setShowSource] = useState(false);
  const [status, setStatus] = useState('error');
  const [applied, setApplied] = useState(false);
  useEffect(() => {
    if (status !== 'loading') return;
    const t = setTimeout(() => setStatus('ready'), 900);
    return () => clearTimeout(t);
  }, [status]);
  return (
    <div className="pattern-example">
      <div className="pattern-example-top">
        <span className="eyebrow">Try the interaction</span>
        <span className="mono muted">Local demo · no AI request</span>
      </div>
      {index % 4 === 0 ? (
        <>
          <h3>What would make today a little easier?</h3>
          <div className="button-row" style={{ marginTop: 20 }}>
            {['Plan a lesson', 'Compare two options', 'Find the useful part'].map((label) => (
              <button
                className={`button ${selected === label ? 'button-primary' : ''}`}
                key={label}
                onClick={() => setSelected(label)}
              >
                {label}
                <Icon name="arrow" size={13} />
              </button>
            ))}
          </div>
          <p className="example-response" aria-live="polite">
            {selected
              ? `“${selected}” gives the next step a useful shape. Now the product can ask one specific question, instead of asking you to invent the whole request.`
              : 'A small set of real tasks gives a new person a place to begin.'}
          </p>
        </>
      ) : index % 4 === 1 ? (
        <>
          <h3>A claim with somewhere to look.</h3>
          <p className="example-response">
            People returned to the product more often after their first useful result.{' '}
            <button
              className="citation-button"
              aria-expanded={showSource}
              onClick={() => setShowSource(!showSource)}
            >
              [1] Inspect source
            </button>
          </p>
          {showSource && (
            <div className="source-preview">
              <p className="eyebrow">Research note · Pilot study 04</p>
              <p>“I came back because the first thing I made was still right there.”</p>
              <small>Illustrative source excerpt. The claim and the evidence stay adjacent.</small>
            </div>
          )}
        </>
      ) : index % 4 === 2 ? (
        <>
          <h3>
            {status === 'ready'
              ? 'Back where you left off.'
              : status === 'loading'
                ? 'Trying that again...'
                : 'That part did not arrive.'}
          </h3>
          <p className="example-response" aria-live="polite">
            {status === 'ready'
              ? 'Your draft and your place in the task are still here. A recoverable error should not erase either.'
              : status === 'loading'
                ? 'The retry is in progress. Your work stays on the screen.'
                : 'The source could not be loaded. Your draft is saved; you do not need to start the task again.'}
          </p>
          <button
            className="button"
            disabled={status === 'loading'}
            onClick={() => setStatus(status === 'ready' ? 'error' : 'loading')}
          >
            {status === 'ready'
              ? 'Reset this example'
              : status === 'loading'
                ? 'Working...'
                : 'Try again'}
            <Icon name="repeat" size={14} />
          </button>
        </>
      ) : (
        <>
          <h3>{applied ? 'The change is applied.' : 'An action with a way back.'}</h3>
          <p className="example-response" aria-live="polite">
            {applied
              ? 'You can see the result immediately. The undo action stays in reach.'
              : 'The product can move quickly without making every decision feel permanent.'}
          </p>
          <div className="button-row">
            <button
              className="button button-primary"
              disabled={applied}
              onClick={() => setApplied(true)}
            >
              Archive the draft
            </button>
            {applied && (
              <button className="button" onClick={() => setApplied(false)}>
                <Icon name="undo" size={14} />
                Undo archive
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function PatternArticle({ index }: { index: number }) {
  const item = patterns[index];
  return (
    <article className="container inner-page">
      <div className="article-layout">
        <BackLink href="/aiux/" label="All patterns" />
        <InteriorHero
          label={`${String(index + 1).padStart(2, '0')} / 40 · ${item.category}`}
          title={item.title}
          description={item.description}
        />
        <div className="tag-row">
          {item.tags.split(' · ').map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <PatternExample index={index} />
        <div className="prose">
          <h2>The useful question</h2>
          <p>
            What does a person need to understand in order to make the next decision? Start there,
            rather than with what the model can produce. The capability is only one part of the
            experience; the surrounding explanation, control, and recovery are what make it
            workable.
          </p>
          <h2>A practical approach</h2>
          <p>
            {item.description} Make the distinction explicit in the prototype, then try it with
            someone who has not been involved in the design. Watch where they hesitate, what they
            assume, and what they try to do next.
          </p>
          <h2>Things to watch</h2>
          <ul>
            <li>Use language that belongs to the person’s task, not the implementation.</li>
            <li>
              Show the ordinary and the awkward states together. A good example alone is not enough
              to judge the pattern.
            </li>
            <li>
              Keep the action, its consequence, and the way back close enough to understand in one
              glance.
            </li>
          </ul>
          <h2>A working position, not a law</h2>
          <p>
            Patterns are useful when they make a trade-off easier to discuss. If this one does not
            fit the work in front of you, the reason it does not fit may be the most useful part of
            the conversation.
          </p>
          <div className="article-footer">
            <a
              className="text-link"
              href={`mailto:${site.email}?subject=${encodeURIComponent(`A thought about pattern ${index + 1}: ${item.title}`)}`}
            >
              Have a better example? I’d like to see it.
            </a>
          </div>
        </div>
        <div className="pattern-pagination">
          <Link href={`/aiux/pattern-${index === 0 ? 40 : index}/`} className="button">
            <Icon name="left" size={14} />
            Previous pattern
          </Link>
          <Link href={`/aiux/pattern-${index === 39 ? 1 : index + 2}/`} className="button">
            Next pattern
            <Icon name="right" size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function HirePage() {
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="Work together"
        title="Hire a fractional design lead"
        description="A senior partner for the moments when a team can build almost anything, but needs to decide what is worth building. A small number of engagements, with enough room to take the work seriously."
      >
        <div className="button-row">
          <ContactButton />
          <a
            className="button"
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <Icon name="arrow" size={13} />
          </a>
        </div>
      </InteriorHero>
      <div className="prose">
        <hr />
        <h2>Is a fractional lead the right fit?</h2>
        <p>
          Sometimes the team needs more capacity. Sometimes it needs someone to help make the
          difficult decisions. Those are different problems, and they call for different people. I’m
          most useful when the direction is still taking shape, the stakes are real, and there is a
          team ready to work through it together.
        </p>
        <p>
          If the question is specifically how your design team should work with AI, there is{' '}
          <Link href="/ai-transformation/">a more focused engagement for that</Link>.
        </p>
      </div>
      <section className="case-section">
        <h2>How engagements work</h2>
        <div className="pricing-grid">
          {[
            [
              'Fractional design lead',
              '$9.5k',
              'from / month',
              'Ongoing ownership of product design direction, a regular working rhythm with your team, and hands-on work where it changes the outcome.',
            ],
            [
              'Advisory',
              '$3k',
              'from / month',
              'A considered second opinion: weekly working sessions, design reviews, hiring conversations, and help making the next hard decision.',
            ],
            [
              'A focused sprint',
              '$4.5k',
              'from / fixed scope',
              'A research, product strategy, or design-system sprint. Two to three weeks, a clear question, and a practical result the team can use.',
            ],
            [
              'A useful hour',
              '$240',
              'per hour',
              'A one-off review or conversation when a longer engagement would be more ceremony than the work needs.',
            ],
          ].map(([title, price, unit, description]) => (
            <div className="pricing-card" key={title}>
              <h3>{title}</h3>
              <strong>
                {price} <small>{unit}</small>
              </strong>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <p className="demo-notice">
          Example pricing for this fictional template. Set your own rates, terms, and availability
          before publishing.
        </p>
      </section>
      <div className="prose">
        <hr />
        <h2>How it starts</h2>
        <ul>
          <li>
            A short conversation about the product, the team, and the decision that is difficult
            right now.
          </li>
          <li>
            A small, explicit first scope. Enough work to find out whether the partnership is
            useful.
          </li>
          <li>
            A running prototype or a written direction early — something concrete enough to
            challenge.
          </li>
          <li>
            A shared definition of what better would look like, before we spend time making it look
            finished.
          </li>
        </ul>
        <hr />
        <h2>When someone else is a better choice</h2>
        <p>
          If you need a large production team, an agency is a better instrument. If the backlog is
          well specified and the direction is settled, a good contractor will make more sense. If
          design is a permanent, load-bearing part of your business, it may be time for a full-time
          hire.
        </p>
        <hr />
        <h2>Tell me where the work is stuck</h2>
        <p>
          A rough description is fine. You do not need a polished brief to start a useful
          conversation.
        </p>
        <div style={{ marginTop: 24 }}>
          <ContactButton />
        </div>
      </div>
    </div>
  );
}

export function TransformationPage() {
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="AI transformation"
        title="New tools. Still your team’s judgment."
        description="A practical way to help a design team work with AI without losing the parts that made its work good. Less theater, more things the team can use on an ordinary Tuesday."
      >
        <ContactButton subject="AI transformation for our design team" />
      </InteriorHero>
      <div className="prose">
        <h2>Start with the work, not the tool</h2>
        <p>
          Most teams do not need another tour of what a model can do. They need to understand which
          parts of their own process are worth changing, where the risks are, and how to tell
          whether the new approach is helping.
        </p>
        <p>
          We look at a live product and a real working week. Then we choose a small, testable change
          and build the habits around it.
        </p>
      </div>
      <div className="pricing-grid">
        {[
          [
            '01 · Find the useful starting point',
            'A focused assessment',
            'Map the current workflow, try the tools against real artifacts, and identify two or three places where the team can get a measurable benefit.',
          ],
          [
            '02 · Make it work together',
            'A working pilot',
            'One live project, a clear quality bar, and a small group learning by doing. Prompts, components, review habits, and evaluation belong to your team afterward.',
          ],
          [
            '03 · Build the practice',
            'An embedded partnership',
            'Help for leads shaping a repeatable way of working: ownership, quality checks, shared tools, and a sensible path from experiment to ordinary practice.',
          ],
          [
            '04 · Keep it accountable',
            'A light review rhythm',
            'A small fixed set of real tasks, reviewed regularly. Keep the parts that help, change the parts that do not, and resist the temptation to measure activity instead of outcomes.',
          ],
        ].map(([label, title, description]) => (
          <div className="pricing-card" key={title}>
            <p className="eyebrow">{label}</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        ))}
      </div>
      <div className="prose">
        <h2>What the team keeps</h2>
        <ul>
          <li>A small, working toolchain matched to the team’s actual product and constraints.</li>
          <li>Reusable examples, a shared vocabulary, and a practical quality checklist.</li>
          <li>Clear boundaries for data, confidentiality, and human review.</li>
          <li>A way to evaluate the work that survives the next tool release.</li>
        </ul>
        <h2>The first step is a conversation</h2>
        <p>
          Tell me what the team makes and what it has already tried. We can work out whether there
          is a useful first scope from there.
        </p>
        <div style={{ marginTop: 24 }}>
          <ContactButton subject="A first conversation about our AI workflow" />
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="container inner-page">
      <BackLink />
      <div className="about-layout">
        <div>
          <InteriorHero
            label="About"
            title="A little about the person behind the work."
            description="I’m Elliot. A product designer, an occasional builder, and someone who is happiest when a complicated problem starts to make sense."
          />
          <div className="prose">
            <p>
              I’ve spent the last twelve years around teams making software for people with real
              work to do. Sometimes that has meant a new product and a very small room. Sometimes it
              has meant a large platform with a history nobody could afford to ignore.
            </p>
            <p>
              The thread through it is fairly simple: listen carefully, find the important question,
              and make something concrete enough to learn from. I care about systems because good
              decisions should be repeatable. I care about details because they are where a product
              keeps, or breaks, its promises.
            </p>
            <h2>A deliberately small practice</h2>
            <p>
              Fieldnotes is the name I work under independently. It is not a hidden agency or a
              sales funnel. It is a way to leave enough space for the work, the people doing it, and
              the occasional question that deserves a longer answer.
            </p>
            <h2>Away from the screen</h2>
            <p>
              Usually a notebook, a long walk, a book I am reading more slowly than intended, or
              Milo insisting it is time to go outside. He has an excellent sense of timing and very
              little respect for a calendar.
            </p>
            <p className="demo-notice">
              Elliot and Milo are fictional characters created for this portfolio template. The
              portrait is original generated artwork.
            </p>
            <div className="button-row" style={{ marginTop: 24 }}>
              <ContactButton />
              <Link href="/#resume" className="button">
                The path so far
              </Link>
            </div>
          </div>
        </div>
        <div className="about-portrait">
          <img
            src={asset('/images/portrait.webp')}
            alt="Original portrait of the template’s fictional designer, Elliot, and his dog Milo"
            width="1024"
            height="1024"
          />
        </div>
      </div>
    </div>
  );
}

export function SkillsPage() {
  const groups = [
    [
      'Product direction',
      [
        'Framing the right problem',
        'Research synthesis',
        'Product strategy & roadmaps',
        '0 → 1 product definition',
        'Clear, testable decisions',
      ],
    ],
    [
      'Interaction & craft',
      [
        'Complex enterprise workflows',
        'Native and responsive interfaces',
        'Accessible interaction patterns',
        'Information architecture',
        'Prototyping in code',
      ],
    ],
    [
      'Systems that work',
      [
        'Design tokens & primitives',
        'Practical component libraries',
        'Content and status language',
        'Design-engineering partnership',
        'A system’s useful exceptions',
      ],
    ],
    [
      'People & practice',
      [
        'Player-coach leadership',
        'Hiring & portfolio reviews',
        'Thoughtful feedback',
        'Design operations',
        'Growing confident leads',
      ],
    ],
    [
      'AI product design',
      [
        'Context & data boundaries',
        'Review and recovery',
        'Intelligent workflows',
        'Model-aware interaction',
        'Evaluation people can check',
      ],
    ],
    [
      'A builder’s tools',
      [
        'Figma & working prototypes',
        'React, TypeScript & Next.js',
        'CSS, SVG & motion',
        'Three.js experiments',
        'Documentation worth reading',
      ],
    ],
  ];
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="Skills"
        title="A broad practice. A practical point of view."
        description="The mix changes with the problem. These are the areas I return to most often — and the things I can bring into a room without a long introduction."
      />
      <div className="skill-grid">
        {groups.map(([title, list]) => (
          <section className="skill-card" key={title as string}>
            <h2>{title}</h2>
            <ul>
              {(list as string[]).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="case-section">
        <WorkTogether />
      </section>
    </div>
  );
}

function InterestForm({ product }: { product: string }) {
  const [email, setEmail] = useState('');
  const [prepared, setPrepared] = useState(false);
  return (
    <div className="waitlist-box">
      <h3>Be around when it is ready.</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8 }}>
        This demo does not collect or store your address. It prepares an email for you to send.
      </p>
      <form
        className="form-stack"
        style={{ marginTop: 20 }}
        onSubmit={(e) => {
          e.preventDefault();
          setPrepared(true);
        }}
      >
        <label htmlFor={`email-${product}`}>
          Your email
          <input
            id={`email-${product}`}
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setPrepared(false);
            }}
          />
        </label>
        <button className="button" type="submit">
          Prepare an interest email
          <Icon name="mail" size={14} />
        </button>
      </form>
      {prepared && (
        <div className="waitlist-status" role="status">
          <p>Ready to send. Nothing has been submitted yet.</p>
          <a
            className="button button-primary"
            style={{ marginTop: 12 }}
            href={`mailto:${site.email}?subject=${encodeURIComponent(`Keep me posted about ${product}`)}&body=${encodeURIComponent(`Hello Elliot,\n\nI’d like to hear when ${product} is ready. My email is ${email}.\n\nThank you!`)}`}
          >
            Open my mail app
            <Icon name="arrow" size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

export function ProductPage({ slug }: { slug: string }) {
  const isMorrow = slug === 'morrow';
  const name = isMorrow
    ? 'Morrow'
    : slug === 'threadbase'
      ? 'Threadbase'
      : slug === 'threadnote'
        ? 'Threadnote'
        : 'Threadspace';
  return (
    <div className="container inner-page">
      <BackLink href="/#building" label="Back to products" />
      <InteriorHero
        label={isMorrow ? 'A little room for the day' : 'Local-first tools for a connected life'}
        title={
          isMorrow
            ? 'A little less logging. A little more living.'
            : slug === 'threadbase'
              ? 'A useful connection should be explainable.'
              : slug === 'threadnote'
                ? 'The things you mean to come back to.'
                : 'A place for the threads of a life.'
        }
        description={
          isMorrow
            ? 'Morrow is a food journal that starts with what you say, not what you can find in a database. A watch-first way in, a thoughtful phone companion, and a little less administration around being a person.'
            : 'Notes, links, people, and projects do not live in separate parts of your head. Threadspace explores a small, private workspace that lets the connections do some of the organizing.'
        }
      >
        <div className="button-row">
          <Link href={isMorrow ? '#morrow-demo' : '/films/'} className="button">
            <Icon name="play" size={13} />
            {isMorrow ? 'Try the phone' : 'See it in motion'}
          </Link>
          <a href="#product-interest" className="button button-primary">
            Keep me posted
          </a>
        </div>
      </InteriorHero>
      {isMorrow ? (
        <>
          <div className="morrow-interior" id="morrow-demo">
            <div className="prose">
              <h2>Say it, then get on with the day.</h2>
              <p>
                “My usual breakfast.” “A coffee on the way.” The interface keeps the detail
                available without making the detail the work. Tap the small logging action in this
                local prototype to try a reversible entry.
              </p>
              <div id="product-interest">
                <InterestForm product={name} />
              </div>
            </div>
            <PhoneMockup interactive />
          </div>
          <MorrowPanel />
        </>
      ) : (
        <>
          <ThreadspacePanel />
          <div className="case-introduction">
            <div className="prose">
              <h2>Private by default. Connected by design.</h2>
              <p>
                The product starts with the things you already keep. A note can belong to a project
                and a person, a link can lead back to the conversation that made it useful, and an
                old idea can turn up in the right new context.
              </p>
              <p>
                Threadnote is the quiet front door. Threadbase is the local graph under it. Neither
                needs a person to become a database administrator before the first useful connection
                appears.
              </p>
              <div className="button-row" style={{ marginTop: 24 }}>
                <Link href="/films/" className="button">
                  Three small walkthroughs
                  <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
            <div id="product-interest">
              <InterestForm product={name} />
            </div>
          </div>
        </>
      )}
      <div className="demo-notice">
        Original product concept for the Fieldnotes template. No real app download, backend service,
        health advice, or external waitlist is implied.
      </div>
    </div>
  );
}

function FilmDemo({ index }: { index: number }) {
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!playing || index !== 2) return;
    const timer = setInterval(() => setStep((s) => (s + 1) % 5), 1600);
    return () => clearInterval(timer);
  }, [playing, index, run]);
  return (
    <section className="demo-stage">
      <div className="demo-toolbar">
        <h2>
          {
            [
              '01 · A map of the ordinary',
              '02 · A few loose ends, kept together',
              '03 · An assistant with a visible boundary',
            ][index]
          }
        </h2>
        <div className="button-row">
          <button className="button" onClick={() => setPlaying(!playing)} aria-pressed={!playing}>
            <Icon name={playing ? 'pause' : 'play'} size={12} />
            {playing ? 'Pause' : 'Play'}
          </button>
          <button
            className="button button-square"
            aria-label="Restart walkthrough"
            onClick={() => {
              setRun((r) => r + 1);
              setStep(0);
              setPlaying(true);
            }}
          >
            <Icon name="repeat" size={14} />
          </button>
        </div>
      </div>
      <div className={`demo-canvas ${playing ? '' : 'is-paused'}`} key={run}>
        {index === 0 ? (
          <ThreadGraph animate />
        ) : index === 1 ? (
          <div className="demo-notes">
            <div className="demo-note">
              <b>A weekend away</b>A little house by the coast. The address from Sam. A list of
              walks.
            </div>
            <div className="demo-note">
              <b>Things to make</b>A shelf for the plants. A better place for the notebooks.
            </div>
            <div className="demo-note">
              <b>A useful thought</b>Keep the connection close to the thing it explains.
            </div>
          </div>
        ) : (
          <div className="agent-demo">
            <ThreadMark />
            <div>
              {[
                'Looking across the local workspace',
                'Finding the related notes',
                'Checking the source passages',
                'Preparing a useful summary',
                'Ready for your review',
              ].map((s, i) => (
                <p key={s} className={i <= step ? 'agent-complete' : ''}>
                  <Icon name={i < step ? 'check' : i === step ? 'spark' : 'clock'} size={16} />
                  {s}
                </p>
              ))}
            </div>
            <span className="agent-local">
              <Icon name="lock" size={13} />
              Everything stays in this demo.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
export function FilmsPage() {
  return (
    <div className="container inner-page">
      <BackLink href="/#building" label="Back to products" />
      <InteriorHero
        label="In motion"
        title="A few small windows into the idea."
        description="Three browser-made walkthroughs of Threadspace. A map, some notes, and a visible working process. These are silent, interactive prototypes — pause them, restart them, and take your time."
      />
      {[0, 1, 2].map((i) => (
        <FilmDemo key={i} index={i} />
      ))}
    </div>
  );
}

export function ShopPage() {
  const [item, setItem] = useState<number | null>(null);
  useEffect(() => {
    const hash = location.hash.slice(1);
    const found = shopItems.findIndex((p) => p.slug === hash);
    if (found >= 0) setItem(found);
  }, []);
  function close() {
    setItem(null);
    history.replaceState(null, '', location.pathname + location.search);
  }
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="Milo’s Little Emporium · Coming soon"
        title="Small editions. Very good company."
        description="A few little objects from a small studio, supervised by a dog with no concept of deadlines. The first collection is still on the workbench; consider this a look through the window."
      />
      <div className="shop-index">
        {shopItems.map((product, i) => (
          <button
            id={product.slug}
            className="shop-product"
            key={product.slug}
            onClick={() => {
              setItem(i);
              history.replaceState(null, '', `#${product.slug}`);
            }}
          >
            <div className={`shop-image ${i === 4 ? 'shop-image-sleep' : ''}`}>
              <img
                src={asset(`/images/${product.image}.webp`)}
                width="1024"
                height="1024"
                alt={`Original dachshund collectible concept: ${product.name}`}
              />
            </div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <small>Edition of {product.edition} · In development</small>
          </button>
        ))}
      </div>
      <p className="demo-notice">
        Original generated collectible concepts. No products are currently for sale; no purchase or
        payment is taken on this website.
      </p>
      <Dialog
        open={item !== null}
        onClose={close}
        title={item === null ? 'Milo’s editions' : shopItems[item].name}
        className="product-dialog"
      >
        {item !== null && (
          <>
            <p className="eyebrow">Milo’s Little Emporium</p>
            <h2 style={{ marginTop: 8 }}>{shopItems[item].name}</h2>
            <img src={asset(`/images/${shopItems[item].image}.webp`)} alt={shopItems[item].name} />
            <p>{shopItems[item].description}</p>
            <p>
              A small, carefully made desk companion. Planned as a numbered edition of{' '}
              {shopItems[item].edition}. Materials, sizing, and pricing will be shared when the real
              thing is ready.
            </p>
            <ContactButton subject={`Keep me posted about ${shopItems[item].name}`}>
              Ask about this edition
            </ContactButton>
            <small className="demo-notice" style={{ display: 'block' }}>
              Opens your email app. This concept shop has no checkout.
            </small>
          </>
        )}
      </Dialog>
    </div>
  );
}

export function ExperimentPage({ slug }: { slug: string }) {
  const experiment = experiments.find((e) => e.slug === slug)!;
  const [view, setView] = useState('product');
  const [copied, setCopied] = useState(false);
  const example = `// ${experiment.name}: the shape of the idea\nimport { Workspace } from '@/components/workspace';\n\nexport default function Experiment() {\n  return (\n    <Workspace\n      title="${experiment.name}"\n      mode="explore"\n      dataSource="local-demo"\n    />\n  );\n}\n\n// The portfolio contains the original interface artwork.\n// This short snippet explains the concept; it is not a backend.\n`;
  const [manualCopy, setManualCopy] = useState(false);
  async function copy() {
    const success = await copyText(example);
    setCopied(success);
    setManualCopy(!success);
    if (success) setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="container inner-page">
      <BackLink href="/#code" label="All experiments" />
      <InteriorHero
        label="From the workbench"
        title={experiment.name}
        description={experiment.title}
      />
      <div className="tag-row">
        {experiment.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="demo-stage">
        <div className="demo-toolbar">
          <div className="demo-tabs" role="tablist" aria-label="Experiment view">
            {['product', 'code'].map((v) => (
              <button
                key={v}
                className={`demo-tab ${view === v ? 'is-selected' : ''}`}
                role="tab"
                id={`tab-${v}`}
                aria-selected={view === v}
                aria-controls={`panel-${v}`}
                tabIndex={view === v ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const next = v === 'product' ? 'code' : 'product';
                    setView(next);
                    document.getElementById(`tab-${next}`)?.focus();
                  }
                }}
                onClick={() => setView(v)}
              >
                {v === 'product' ? 'The product' : 'A little code'}
              </button>
            ))}
          </div>
          {view === 'code' && (
            <button className="button" onClick={copy}>
              <Icon name={copied ? 'check' : 'copy'} size={13} />
              {copied ? 'Copied' : 'Copy example'}
            </button>
          )}
        </div>
        {manualCopy && view === 'code' && (
          <p className="copy-fallback copy-code-notice" role="status">
            Your browser blocked clipboard access. Select the example below to copy it manually.
          </p>
        )}
        {view === 'product' ? (
          <div role="tabpanel" id="panel-product" aria-labelledby="tab-product">
            <img
              style={{ width: '100%', height: 'auto' }}
              src={asset(
                `/images/${experiment.image}${experiment.image === 'tally' ? '-screen' : ''}.svg`,
              )}
              alt={`Original interface artwork for ${experiment.name}`}
              width="1200"
              height="720"
            />
          </div>
        ) : (
          <pre className="source-code" role="tabpanel" id="panel-code" aria-labelledby="tab-code">
            <code>{example}</code>
          </pre>
        )}
      </div>
      <div className="prose">
        <h2>The question behind it</h2>
        <p>{experiment.description}</p>
        <p>
          These experiments are a way to make a product question tangible. The interface is
          intentionally specific, the data is illustrative, and the point is to learn something
          useful before turning a sketch into a commitment.
        </p>
        <h2>What is in this template</h2>
        <p>
          The original SVG interface, responsive presentation, theme-aware portfolio, and working
          product/code view are included. This is a portfolio case-study demo, not a deployed{' '}
          {slug === 'atlas' ? 'fleet-tracking backend' : 'external application'}.
        </p>
        <p>
          The complete portfolio source is organized around a small set of editable files. Follow
          the README to make this experiment your own, or replace it with something from your own
          workbench.
        </p>
        <div className="button-row" style={{ marginTop: 24 }}>
          <ContactButton subject={`A question about ${experiment.name}`} />
          <Link href="/#code" className="button">
            Back to experiments
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ResumePage() {
  return (
    <div className="container inner-page">
      <BackLink />
      <InteriorHero
        label="Resume"
        title="The path so far."
        description="A mix of making, leading, learning, and returning to the parts of the work that matter most."
      >
        <a className="button" download href={asset('/downloads/elliot-westbrook-resume.pdf')}>
          <Icon name="download" size={14} />
          Download resume
        </a>
      </InteriorHero>
      <Timeline all />
      <p className="demo-notice">
        Fictional example career history. Replace with your own verified experience.
      </p>
    </div>
  );
}
