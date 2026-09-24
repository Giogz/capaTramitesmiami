import { useManualStore } from '../store/useManualStore';
import { SLIDE_LABELS } from '../slides';
import { ArrowLeft, ArrowRight } from './icons';

export function Controls() {
  const current = useManualStore((s) => s.current);
  const total = useManualStore((s) => s.total);
  const goTo = useManualStore((s) => s.goTo);
  const next = useManualStore((s) => s.next);
  const prev = useManualStore((s) => s.prev);

  const isLast = current === total - 1;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bar-glass backdrop-blur-md"
      style={{ height: 'var(--bottom)', paddingBottom: 'env(safe-area-inset-bottom,0px)', paddingLeft: 'max(18px,env(safe-area-inset-left))', paddingRight: 'max(18px,env(safe-area-inset-right))' }}
    >
      <button onClick={prev} disabled={current === 0}
        className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm font-semibold transition enabled:hover:border-peru enabled:hover:text-peru disabled:opacity-40">
        <ArrowLeft width={17} height={17} strokeWidth={2.2} />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={`Ir a ${SLIDE_LABELS[i] ?? `Sección ${i}`}`}
            className={`h-2.5 rounded-full transition-all ${i === current ? 'w-[26px] bg-peru' : 'w-2.5 bg-line-2 hover:bg-ink-3'}`} />
        ))}
      </div>

      <button onClick={next}
        className="inline-flex items-center gap-2 rounded-xl border border-peru bg-peru px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px">
        <span>{isLast ? 'Volver al inicio' : 'Siguiente'}</span>
        <ArrowRight width={17} height={17} strokeWidth={2.2} />
      </button>
    </nav>
  );
}
