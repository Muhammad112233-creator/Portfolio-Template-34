'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AppIcon, ThreadMark } from './UI';
import Icon from './Icons';

export function ThreadGraph({ animate = true }: { animate?: boolean }) {
  const nodes = [
    ['A place to return to', 390, 235],
    ['A weekend away', 565, 100],
    ['Ideas worth keeping', 231, 110],
    ['The little house', 629, 310],
    ['Work in progress', 178, 305],
    ['People', 389, 83],
    ['Reading, slowly', 436, 390],
    ['The long way home', 119, 201],
    ['A better question', 577, 428],
    ['A walk with Milo', 688, 202],
    ['Notes from Tuesday', 323, 452],
    ['Things to make', 90, 413],
    ['October plans', 565, 205],
    ['Research notes', 296, 330],
    ['The garden', 484, 317],
    ['A good recipe', 709, 421],
    ['Small adventures', 180, 476],
    ['The book shelf', 104, 84],
    ['From the archive', 672, 58],
    ['For tomorrow', 336, 152],
    ['Learning', 752, 281],
    ['A sketch, unfinished', 463, 39],
    ['The next chapter', 749, 499],
    ['Send a letter', 43, 280],
  ] as const;
  return (
    <div className={`thread-graph ${animate ? 'graph-is-animated' : ''}`}>
      <div className="graph-sidebar">
        <span className="graph-traffic">
          <i />
          <i />
          <i />
        </span>
        <span>⌕ Search</span>
        <b>Your spaces</b>
        {['All notes', 'This week', 'Work', 'Home', 'Ideas', 'Reading', 'The garden', 'People'].map(
          (s, i) => (
            <span key={s}>
              <i style={{ background: ['#ac91d7', '#a4b98c', '#8caeb7'][i % 3] }} />
              {s}
              <small>{[128, 14, 32, 18, 26, 11, 9, 18][i]}</small>
            </span>
          ),
        )}
      </div>
      <svg
        viewBox="0 0 800 520"
        role="img"
        aria-label="An original interactive graph connecting the projects, people, and ideas in a personal workspace"
      >
        <defs>
          <radialGradient id="thread-glow">
            <stop stopColor="#7653a4" stopOpacity=".22" />
            <stop offset="1" stopColor="#15131e" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="520" fill="#11111a" />
        <ellipse cx="390" cy="235" rx="350" ry="250" fill="url(#thread-glow)" />
        {nodes.slice(1).map(([label, x, y], i) => (
          <path
            key={label}
            d={`M390 235 Q${(x + 390) / 2 + Math.sin(i) * 90} ${(y + 235) / 2 + 35} ${x} ${y}`}
            stroke={i % 3 === 0 ? '#83a38a' : '#8d75b5'}
            strokeWidth=".7"
            opacity=".25"
            fill="none"
          />
        ))}
        {nodes.map(([label, x, y], i) => (
          <g
            key={label}
            className="graph-node"
            style={{ animationDelay: `${-i * 0.7}s`, transformOrigin: `${x}px ${y}px` }}
          >
            <circle cx={x} cy={y} r={i === 0 ? 4 : 2} fill={i % 3 === 0 ? '#a7c59b' : '#ad92d6'} />
            <text
              x={x + 7}
              y={y + 3}
              fill={i === 0 ? '#e9e2f3' : '#9b91ad'}
              fontSize={i === 0 ? '12' : '8'}
              fontFamily="Arial, sans-serif"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export function ThreadspacePanel() {
  return (
    <div className="thread-layout">
      <div className="thread-family">
        <Link href="/threadspace/" className="surface-tile thread-brand">
          <ThreadMark />
          <strong>THREADSPACE</strong>
          <Icon name="arrow" className="tile-arrow" />
        </Link>
        <Link href="/threadnote/" className="surface-tile product-app">
          <Icon name="arrow" className="tile-arrow" />
          <AppIcon />
          <h3>Threadnote</h3>
          <p>
            A quiet Mac app that gathers your notes, links, and loose ends into the projects of your
            life.
          </p>
          <small>Native Mac app · A work in progress</small>
        </Link>
        <Link href="/threadbase/" className="surface-tile product-app product-app-green">
          <Icon name="arrow" className="tile-arrow" />
          <AppIcon color="green" />
          <h3>Threadbase</h3>
          <p>
            The local-first graph underneath. It connects what belongs together, and can tell you
            why.
          </p>
          <small>Graph database · Built in the open</small>
        </Link>
      </div>
      <div className="thread-preview-group">
        <Link href="/threadnote/" className="surface-tile thread-preview">
          <div className="tile-caption">
            <span>A small life, with its connections left in.</span>
            <Icon name="arrow" />
          </div>
          <ThreadGraph />
        </Link>
        <Link href="/films/" className="surface-tile films-link">
          <span className="film-play">
            <Icon name="play" size={17} />
          </span>
          <span>
            <b>See it in motion</b>
            <small>3 short walkthroughs, made in the browser</small>
          </span>
          <span className="film-thumbnails">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </span>
          <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}

export function NutritionPlate({
  small = false,
  remaining = 760,
}: {
  small?: boolean;
  remaining?: number;
}) {
  return (
    <div className={`nutrition-plate ${small ? 'plate-small' : ''}`}>
      <svg viewBox="0 0 300 300" aria-hidden="true">
        <defs>
          <radialGradient id={small ? 'plate-small' : 'plate-large'}>
            <stop stopColor="#29292a" />
            <stop offset=".82" stopColor="#202123" />
            <stop offset=".96" stopColor="#45474a" />
            <stop offset="1" stopColor="#111214" />
          </radialGradient>
          <linearGradient id="food">
            <stop stopColor="#f0ac56" />
            <stop offset=".5" stopColor="#d76d36" />
            <stop offset="1" stopColor="#a84d28" />
          </linearGradient>
          <filter id="food-shadow">
            <feDropShadow dx="1" dy="3" stdDeviation="3" floodOpacity=".55" />
          </filter>
        </defs>
        <circle
          cx="150"
          cy="150"
          r="141"
          fill={`url(#${small ? 'plate-small' : 'plate-large'})`}
          stroke="#686669"
          strokeWidth="1"
        />
        <circle
          cx="150"
          cy="150"
          r="123"
          stroke="#515053"
          fill="none"
          strokeWidth="1"
          opacity=".6"
        />
        <path
          d="M116 49C70 64 47 107 50 151C52 182 67 211 88 232"
          fill="none"
          stroke="url(#food)"
          strokeWidth="27"
          strokeLinecap="round"
          filter="url(#food-shadow)"
        />
        <path
          d="m82 74 18 14m-33 12 21 10m-29 17 23 5m-21 22 23-1m-15 26 23-7m-10 29 22-12"
          stroke="#743c26"
          strokeWidth="4"
        />
        <path d="M118 37q-10 13-7 23 22 1 28-17-12-5-21-6Z" fill="#7f9f54" />
        <path d="m114 57 17-13" stroke="#d3ce9c" strokeWidth="1.4" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle
            key={i}
            cx={153 + Math.cos(i * 1.9) * 104}
            cy={155 + Math.sin(i * 1.9) * 104}
            r={i % 2 ? 1 : 1.8}
            fill="#9a7452"
            opacity=".7"
          />
        ))}
      </svg>
      <span className="plate-numbers">
        <small>1,340 of 2,100</small>
        <strong>{remaining}</strong>
        <span>kcal left</span>
      </span>
    </div>
  );
}

export function PhoneMockup({ interactive = false }: { interactive?: boolean }) {
  const [meal, setMeal] = useState(false);
  return (
    <div className="phone-device">
      <div className="phone-buttons" />
      <div className="phone-screen">
        <div className="phone-status">
          <b>9:41</b>
          <span>● ▰</span>
        </div>
        <span className="phone-island" />
        <div className="phone-title">
          <span>Today</span>
          <small>Sat, 17 Oct</small>
        </div>
        <NutritionPlate small remaining={meal ? 620 : 760} />
        <div className="macro-bars">
          <span>84 g</span>
          <span>128 g</span>
          <span>46 g</span>
        </div>
        <p className="macro-caption">Protein · Carbs · A little balance</p>
        <div className="meal-label">
          ☼ Breakfast <span>380 kcal</span>
        </div>
        <div className="meal-card">
          <b>Greek yoghurt, berries & honey</b>
          <span>280 kcal</span>
          <small>8:10 am · A good start</small>
          <hr />
          <b>Flat white</b>
          <span>100 kcal</span>
        </div>
        <div className="meal-label">
          ◒ Lunch <span>{meal ? '960' : '820'} kcal</span>
        </div>
        <div className="meal-card">
          <b>Grilled salmon bowl</b>
          <span>620 kcal</span>
          <small>1:15 pm · Homemade</small>
        </div>
        {interactive ? (
          <button className="phone-input" onClick={() => setMeal(!meal)}>
            ＋ {meal ? 'Undo the snack' : 'Log an apple'}
            <Icon name="mic" size={17} />
          </button>
        ) : (
          <div className="phone-input">
            ＋ Log, or just ask...
            <Icon name="mic" size={17} />
          </div>
        )}
        <div className="phone-tabbar">
          {[
            ['grid', 'Today'],
            ['chat', 'Chat'],
            ['chart', 'Progress'],
            ['bookmark', 'Library'],
            ['smile', 'You'],
          ].map(([icon, label], i) => (
            <span key={label} className={i === 0 ? 'is-selected' : ''}>
              <Icon name={icon} size={18} />
              <small>{label}</small>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WatchMockup() {
  return (
    <div className="watch-device">
      <span className="watch-strap watch-strap-top" />
      <span className="watch-strap watch-strap-bottom" />
      <div className="watch-body">
        <span className="watch-crown" />
        <div className="watch-screen">
          <span className="watch-time">9:41</span>
          <NutritionPlate small />
          <div className="watch-actions">
            <Icon name="grid" size={12} />
            <span>
              <Icon name="mic" size={17} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MorrowPanel() {
  return (
    <div className="morrow-grid">
      <Link href="/morrow/" className="surface-tile morrow-icon-tile" aria-label="Meet Morrow">
        <span className="morrow-app-icon">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <defs>
              <linearGradient id="morrow-orange" x2=".8" y2="1">
                <stop stopColor="#ffbb86" />
                <stop offset="1" stopColor="#ed634e" />
              </linearGradient>
            </defs>
            <path
              d="M35 83C15 66 24 28 57 27C91 24 106 60 86 83C73 99 49 99 35 83Z"
              fill="url(#morrow-orange)"
            />
            <path d="M59 29C54 13 65 6 81 10C82 26 74 32 59 29Z" fill="#84916c" />
            <path
              d="M43 66q17 19 34 0"
              fill="none"
              stroke="#fff0d4"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="44" cy="49" r="3" fill="#fff0d4" />
            <circle cx="77" cy="49" r="3" fill="#fff0d4" />
          </svg>
        </span>
        <Icon name="arrow" className="tile-arrow" />
      </Link>
      <Link href="/morrow/" className="surface-tile morrow-cta">
        <span className="morrow-store-button">A little less logging. A little more living.</span>
        <span>Made for your wrist. Ready when you are.</span>
        <span className="morrow-wordmark">
          morrow<small>One day at a time.</small>
        </span>
        <Icon name="arrow" className="tile-arrow" />
      </Link>
      <Link href="/morrow/" className="surface-tile morrow-phone" aria-label="Morrow on iPhone">
        <PhoneMockup />
        <Icon name="arrow" className="tile-arrow" />
      </Link>
      <Link
        href="/morrow/"
        className="surface-tile morrow-voice"
        aria-label="Morrow: say what you ate"
      >
        <span>
          {' '}
          <Icon name="mic" />
          “A bowl of porridge”
        </span>
        <span>
          <Icon name="mic" />
          “My usual lunch”
        </span>
        <span>
          <Icon name="mic" />
          “One more coffee”
        </span>
        <Icon name="arrow" className="tile-arrow" />
      </Link>
      <Link
        href="/morrow/"
        className="surface-tile morrow-plate"
        aria-label="Morrow: a day, on a plate"
      >
        <NutritionPlate />
        <Icon name="arrow" className="tile-arrow" />
      </Link>
      <Link
        href="/morrow/"
        className="surface-tile morrow-watch"
        aria-label="Morrow on a smartwatch"
      >
        <WatchMockup />
        <Icon name="arrow" className="tile-arrow" />
      </Link>
    </div>
  );
}
