import { useEffect, useRef } from 'react';
import { useManualStore } from './store/useManualStore';
import { TopBar } from './components/TopBar';
import { Controls } from './components/Controls';
import { CoverSlide } from './components/slides/CoverSlide';
import { IndexSlide } from './components/slides/IndexSlide';
import { CodesSlide } from './components/slides/CodesSlide';
import { TramitesSlide } from './components/slides/TramitesSlide';
import { FormatosSlide } from './components/slides/FormatosSlide';
import { RemindersSlide } from './components/slides/RemindersSlide';

function DeckBody() {
  const current = useManualStore((s) => s.current);

  switch (current) {
    case 0:
      return <CoverSlide />;
    case 1:
      return <IndexSlide />;
    case 2:
      return <CodesSlide />;
    case 3:
      return <TramitesSlide />;
    case 4:
      return <FormatosSlide />;
    case 5:
      return <RemindersSlide />;
    default:
      return null;
  }
}

export default function App() {
  const current = useManualStore((s) => s.current);
  const loading = useManualStore((s) => s.loading);
  const theme = useManualStore((s) => s.theme);
  const loadManual = useManualStore((s) => s.loadManual);
  const next = useManualStore((s) => s.next);
  const prev = useManualStore((s) => s.prev);
  const goTo = useManualStore((s) => s.goTo);
  const total = useManualStore((s) => s.total);

  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadManual();
  }, [loadManual]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    deckRef.current?.scrollTo({ top: 0 });
  }, [current]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(total - 1); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goTo, total]);

  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    let x = 0, y = 0, tracking = false;
    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      x = e.touches[0].clientX; y = e.touches[0].clientY; tracking = true;
    };
    const end = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - x;
      const dy = e.changedTouches[0].clientY - y;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.6) dx < 0 ? next() : prev();
    };
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', end, { passive: true });
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchend', end);
    };
  }, [next, prev]);

  return (
    <>
      <TopBar />
      <main
        ref={deckRef}
        className="slide-scroll fixed inset-x-0 overflow-y-auto overflow-x-hidden"
        style={{ top: 'var(--top)', bottom: 'var(--bottom)' }}
      >
        {loading ? (
          <div className="grid h-full place-items-center font-mono text-sm text-ink-3">Cargando manual…</div>
        ) : (
          <div key={current} className="min-h-full animate-fadeup">
            <DeckBody />
          </div>
        )}
      </main>
      <Controls />
    </>
  );
}
