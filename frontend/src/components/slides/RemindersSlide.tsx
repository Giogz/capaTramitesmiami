import { useManualStore } from '../../store/useManualStore';
import type { ColorRecordatorio } from '../../types';
import { Rich } from '../Rich';
import { RemIcon } from '../icons';
import { SlideShell } from './SlideShell';

const COLOR: Record<ColorRecordatorio, string> = {
  red: 'bg-peru-tint text-peru',
  ok: 'bg-ok-tint text-ok',
  amber: 'bg-amber-tint text-amber',
};

export function RemindersSlide() {
  const recordatorios = useManualStore((s) => s.data?.recordatorios ?? []);
  const meta = useManualStore((s) => s.data?.meta);

  return (
    <SlideShell eyebrow="SECCIÓN 04" title="Recordatorios clave"
      lead="Los detalles que evitan rechazos y reprocesos. Ténlos siempre presentes.">
      <div className="mt-6 grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
        {recordatorios.map((r, i) => (
          <div key={i} className="flex gap-3.5 rounded-2xl border border-line bg-paper p-[18px] shadow-soft">
            <div className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${COLOR[r.color]}`}>
              <RemIcon name={r.icono} width={21} height={21} />
            </div>
            <div>
              <h4 className="mb-1 text-[15px] font-bold tracking-[-.1px]">{r.titulo}</h4>
              <p className="text-[13.5px] leading-relaxed text-ink-2"><Rich text={r.texto} /></p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-9 border-t border-line px-5 pt-7 text-center">
        <div className="mx-auto mb-3.5 h-10 w-[30px] rounded [background:linear-gradient(90deg,var(--red)_0_33%,#fff_33%_66%,var(--red)_66%_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,.14)]" />
        <strong className="font-display text-[19px] font-semibold text-ink">{meta?.presenta ?? 'Consulado General del Perú en Miami'}</strong>
        <p className="mt-1 text-sm text-ink-2">{meta?.dirigidoA ?? 'Conper Honorario de Tampa'} · Trámites Notariales</p>
        <p className="mt-1 font-mono text-[12.5px] text-ink-3">Actualizado {meta?.actualizado ?? '—'}</p>
      </div>
    </SlideShell>
  );
}
