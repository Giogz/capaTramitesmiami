import { useManualStore } from '../../store/useManualStore';
import { INDEX_CARDS } from '../../slides';
import { ArrowRight } from '../icons';
import { SlideShell } from './SlideShell';

export function IndexSlide() {
  const goTo = useManualStore((s) => s.goTo);
  return (
    <SlideShell eyebrow="CONTENIDO" title="¿Qué encontrarás en esta guía?"
      lead="Toca cualquier sección para ir directamente a ella. También puedes avanzar con las flechas del teclado o los botones de abajo.">
      <div className="mt-7 grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
        {INDEX_CARDS.map((c) => (
          <button
            key={c.n}
            onClick={() => goTo(c.slide)}
            className="flex flex-col gap-2 rounded-2xl border border-line bg-paper p-5 text-left transition hover:-translate-y-0.5 hover:border-peru hover:shadow-soft"
          >
            <span className="font-mono text-[13px] font-bold text-peru">{c.n}</span>
            <h3 className="text-[17px] font-bold tracking-[-.2px]">{c.t}</h3>
            <p className="text-[13.5px] leading-relaxed text-ink-2">{c.d}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-peru">
              Ver sección <ArrowRight width={14} height={14} strokeWidth={2.2} />
            </span>
          </button>
        ))}
      </div>
    </SlideShell>
  );
}
