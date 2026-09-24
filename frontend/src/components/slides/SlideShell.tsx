import type { ReactNode } from 'react';

export function SlideShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1080px] px-5 pb-16 pt-8 sm:px-6">
      <p className="font-mono text-xs font-bold tracking-[1px] text-peru">{eyebrow}</p>
      <h1 className="mb-2 mt-1.5 font-display text-[clamp(26px,4.4vw,42px)] font-semibold leading-[1.08] tracking-[-.4px]">
        {title}
      </h1>
      {lead && <p className="max-w-[62ch] text-[clamp(15px,2vw,17px)] leading-relaxed text-ink-2">{lead}</p>}
      {children}
    </div>
  );
}
