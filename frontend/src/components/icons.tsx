import type { SVGProps } from 'react';
import type { IconoRecordatorio } from '../types';

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...p,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowLeft = (p: P) => (
  <svg {...base(p)}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
);
export const Search = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
);
export const Chevron = (p: P) => (
  <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const Sun = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Moon = (p: P) => (
  <svg {...base(p)}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
);
export const Send = (p: P) => (
  <svg {...base(p)}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
);
export const Inbox = (p: P) => (
  <svg {...base(p)}><path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" /></svg>
);
export const Warn = (p: P) => (
  <svg {...base(p)}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
);
export const Card = (p: P) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M13 9h5M13 13h5M6 16h12" /></svg>
);

const REM: Record<IconoRecordatorio, (p: P) => JSX.Element> = {
  check: (p) => <svg {...base(p)}><path d="M20 6 9 17l-5-5" /></svg>,
  sign: (p) => <svg {...base(p)}><path d="M12 19h8M4 15l9-9 3 3-9 9-4 1z" /></svg>,
  clock: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l3 2" /></svg>,
  photo: (p) => <svg {...base(p)}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 9h6M9 13h6" /></svg>,
  home: (p) => <svg {...base(p)}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></svg>,
  swap: (p) => <svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M8 12h8M12 8v8" /></svg>,
  id: (p) => <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M13 10h5M13 14h5" /></svg>,
  cash: (p) => <svg {...base(p)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></svg>,
  stamp: (p) => <svg {...base(p)}><path d="M4 21h16" /><path d="M9 21v-3h6v3" /><path d="M12 3a3 3 0 0 0-3 3c0 2 1.5 2.6 1.5 5h3C13.5 8.6 15 8 15 6a3 3 0 0 0-3-3Z" /></svg>,
};

export function RemIcon({ name, ...rest }: { name: IconoRecordatorio } & P) {
  const C = REM[name];
  return <C {...rest} />;
}
