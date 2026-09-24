import { useMemo, useState } from 'react';
import { useManualStore } from '../../store/useManualStore';
import type { Tramite } from '../../types';
import { Rich } from '../Rich';
import { Search, Chevron, Warn } from '../icons';
import { SlideShell } from './SlideShell';

function AccordionItem({ tr }: { tr: Tramite }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`mb-2.5 overflow-hidden rounded-2xl border bg-paper transition ${open ? 'border-peru shadow-soft' : 'border-line hover:border-line-2'}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3.5 px-4 py-4 text-left sm:px-[18px]"
      >
        <span className="min-w-[58px] flex-none whitespace-nowrap rounded-md bg-peru px-2 py-1.5 text-center font-mono text-[14px] font-bold tracking-[.3px] text-white">
          {tr.costo}
        </span>
        <span className="min-w-0 flex-1">
          <h3 className="text-[16px] font-bold leading-tight tracking-[-.2px]">{tr.titulo}</h3>
          <span className="mt-0.5 block text-xs font-semibold text-ink-3">{tr.categoria} · Tarifa {tr.codigo}</span>
        </span>
        <Chevron width={22} height={22} strokeWidth={2.2}
          className={`flex-none text-ink-3 transition-transform duration-300 ${open ? 'rotate-180 text-peru' : ''}`} />
      </button>

      <div className="grid transition-all duration-300" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-4 pb-5 sm:px-[18px]">
            <div className="mb-3 border-t border-line pt-4 text-xs font-bold tracking-[.5px] text-ink-3">
              REQUISITOS Y PROCEDIMIENTO
            </div>
            <ul className="flex flex-col gap-3">
              {tr.requisitos.map((r, i) => (
                <li key={i} className="flex gap-3 text-[14.5px] leading-relaxed">
                  <span className="mt-[7px] h-[7px] w-[7px] flex-none rotate-45 rounded-[2px] bg-peru" />
                  <span>
                    <Rich text={r.texto} />
                    {r.sub && (
                      <ul className="mt-2 flex flex-col gap-1.5 pl-1">
                        {r.sub.map((s, j) => (
                          <li key={j} className="flex gap-2 text-[13.5px] leading-snug text-ink-2">
                            <span className="flex-none text-ink-3">·</span>
                            <span><Rich text={s} /></span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {r.gratis && (
                      <span className="mt-2 block rounded-lg bg-ok-tint px-3 py-2 text-[13px]">
                        <Rich text={r.gratis} />
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TramitesSlide() {
  const tramites = useManualStore((s) => s.data?.tramites ?? []);
  const query = useManualStore((s) => s.tramQuery);
  const setQuery = useManualStore((s) => s.setTramQuery);
  const category = useManualStore((s) => s.tramCategory);
  const setCategory = useManualStore((s) => s.setTramCategory);

  const categories = useMemo(() => {
    const set = new Set<string>();
    tramites.forEach((t) => set.add(t.categoria));
    return ['Todos', ...set];
  }, [tramites]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tramites.filter((t) => {
      if (category !== 'Todos' && t.categoria !== category) return false;
      if (!q) return true;
      const hay = `${t.titulo} ${t.categoria} ${t.codigo} ${t.costo} ${t.requisitos.map((r) => r.texto + (r.sub?.join(' ') ?? '')).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [tramites, query, category]);

  return (
    <SlideShell eyebrow="SECCIÓN 02" title="Trámites y requisitos"
      lead="Toca cada trámite para ver sus requisitos, la acción a realizar y el costo. Filtra por categoría o escribe para encontrarlo más rápido.">
      <div className="sticky top-0 z-[5] my-4 flex flex-wrap items-center gap-2.5 bg-gradient-to-b from-surface to-transparent py-2.5">
        <label className="flex h-11 flex-1 min-w-[220px] items-center gap-2.5 rounded-xl border border-line bg-paper px-3 focus-within:border-peru focus-within:ring-2 focus-within:ring-peru-tint">
          <Search width={18} height={18} className="text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar trámite… (ej. poder, pensión, antecedentes, cremación)"
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-ink-3"
          />
        </label>
        <span className="ml-auto font-mono text-[12.5px] text-ink-3">
          {filtered.length} trámite{filtered.length === 1 ? '' : 's'}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)}
            className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${
              category === c ? 'border-peru bg-peru text-white' : 'border-line bg-paper text-ink-2 hover:border-line-2'
            }`}>
            {c}
          </button>
        ))}
      </div>

      <div className="mt-[18px] pt-1">
        {filtered.length === 0 ? (
          <div className="py-10 text-center font-mono text-sm text-ink-3">Sin resultados</div>
        ) : (
          filtered.map((tr) => <AccordionItem key={tr.titulo} tr={tr} />)
        )}
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border note-amber bg-amber-tint px-4 py-3.5">
        <Warn width={20} height={20} className="mt-0.5 flex-none text-amber" />
        <p className="text-sm leading-relaxed text-ink">
          <b>Acción común:</b> en casi todos los trámites se verifica que la firma coincida con el DNI y se toma la huella del índice derecho con tampón negro. Si la persona no puede firmar por edad avanzada, se toma solo la huella.
        </p>
      </div>
    </SlideShell>
  );
}
