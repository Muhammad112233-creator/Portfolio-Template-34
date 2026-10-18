import type { CSSProperties } from 'react';

// Small, original line icons. No external font or icon CDN is required.
const paths: Record<string, React.ReactNode> = {
  arrow: (
    <>
      <path d="M7 17 17 7M7 7h10v10" />
    </>
  ),
  right: <path d="m9 5 7 7-7 7" />,
  left: <path d="m15 5-7 7 7 7" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  moon: <path d="M20.5 14.1A8.8 8.8 0 0 1 9.9 3.5 8.9 8.9 0 1 0 20.5 14.1Z" />,
  menu: (
    <>
      <rect x="4" y="4" width="16" height="3" rx="1.5" />
      <rect x="4" y="10.5" width="16" height="3" rx="1.5" />
      <rect x="4" y="17" width="16" height="3" rx="1.5" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,
  download: (
    <>
      <path d="M12 3v13m-5-5 5 5 5-5M5 20h14" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="1.5" fill="currentColor" stroke="none" />
      <path
        d="M7 10v7m0-10v.1m4 9.9v-7m0 3.5c0-4.5 6-4.5 6 0V17"
        stroke="var(--surface)"
        strokeWidth="1.8"
      />
    </>
  ),
  check: <path d="m4 12 5 5L20 5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" />
    </>
  ),
  chat: (
    <>
      <path d="M20 11a8 8 0 0 1-8 8H5l-3 2 1-6a8 8 0 1 1 17-4Z" />
      <path d="m14 19 5 2-1-5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3-1 8c-1 3-4 5-7 7-3-2-6-4-7-7L4 6Z" />
      <path d="m8 11 3 3 5-6" />
    </>
  ),
  alert: (
    <>
      <path d="m12 3 10 18H2Z" />
      <path d="M12 9v5m0 3v.1" />
    </>
  ),
  undo: (
    <>
      <path d="M4 5v6h6" />
      <path d="M4 11a8 8 0 1 1 1 7" />
    </>
  ),
  chart: (
    <>
      <path d="M4 3v17h17M8 15l4-5 4 2 5-7" />
    </>
  ),
  spark: (
    <>
      <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9h.1M16 9h.1M7 14q5 6 10 0" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2" width="6" height="13" rx="3" />
      <path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2 10 6-10 6L2 8Zm-9 11 9 5 9-5m-18 5 9 5 9-5" />
    </>
  ),
  frame: (
    <>
      <path d="M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </>
  ),
  bell: (
    <>
      <path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5Zm5 3h4M12 2v2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  link: (
    <>
      <path d="m10 8 3-3a4 4 0 0 1 6 6l-3 3m-2 2-3 3a4 4 0 0 1-6-6l3-3m0 6 8-8" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H5v20h14V7Zm0 0v6h5M8 12h8m-8 4h6" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="m15 15 6 6" />
    </>
  ),
  pause: (
    <>
      <path d="M8 5v14M16 5v14" strokeWidth="4" />
    </>
  ),
  play: <path d="m8 4 13 8-13 8Z" fill="currentColor" stroke="none" />,
  bookmark: <path d="M6 3h12v19l-6-5-6 5Z" />,
  tag: (
    <>
      <path d="M3 3h9l10 10-9 9L3 12Z" />
      <circle cx="8" cy="8" r="1" />
    </>
  ),
  sliders: (
    <>
      <path d="M3 6h18M3 12h18M3 18h18" />
      <path d="M8 3v6m8 0v6m-6 0v6" strokeWidth="3" />
    </>
  ),
  type: (
    <>
      <path d="M4 5h16M12 5v15m-5 0h10M4 3v4m16-4v4" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 8h18m-12 0v13" />
    </>
  ),
  anchor: (
    <>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v14M3 12v3a9 6 0 0 0 18 0v-3M1 14l2-2 2 2m14 0 2-2 2 2" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 8h14l-4-4m4 12H4l4 4M20 8v4M4 16v-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-3a7 7 0 0 1 14 0v3m0-18a4 4 0 0 1 0 8m3 10v-3a6 6 0 0 0-3-5" />
    </>
  ),
  code: (
    <>
      <path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="13" height="13" rx="2" />
      <path d="M16 8V3H3v13h5" />
    </>
  ),
  zoom: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 6 6M10 6v8m-4-4h8" />
    </>
  ),
};
export default function Icon({
  name,
  size = 16,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name] || paths.spark}
    </svg>
  );
}
