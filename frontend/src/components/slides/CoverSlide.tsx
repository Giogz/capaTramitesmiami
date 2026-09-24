import { useManualStore } from '../../store/useManualStore';
import { ArrowRight } from '../icons';

export function CoverSlide() {
  const goTo = useManualStore((s) => s.goTo);
  const meta = useManualStore((s) => s.data?.meta);

  return (
    <div className="min-h-full grid lg:grid-cols-[1.15fr_.85fr]">
      {/* Columna izquierda */}
      <div className="relative flex flex-col justify-center bg-paper px-6 py-10 sm:px-12 sm:py-16">
        <span className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-peru to-peru-deep" />
        <p className="font-mono text-[12.5px] font-bold tracking-[1.4px] text-peru">GUÍA DE CAPACITACIÓN</p>
        <p className="mt-1.5 text-[14.5px] font-semibold text-ink-2">{meta?.presenta ?? 'Consulado General del Perú en Miami'}</p>

        <h1 className="font-display font-semibold leading-none tracking-[-1px] text-[clamp(32px,5.6vw,58px)] mt-6 mb-1">
          Trámites<br />
          <em className="not-italic text-peru italic">Notariales</em>
        </h1>
        <p className="text-[clamp(16px,2.4vw,20px)] font-semibold text-ink mt-3">
          Guía de referencia para el {meta?.dirigidoA ?? 'Conper Honorario de Tampa'}
        </p>
        <p className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-2">
          Certificados, poderes fuera de registro, antecedentes, legalizaciones y documentos extranjeros: cada
          trámite con sus requisitos, la acción a realizar y su costo, en un solo lugar y fácil de consultar.
        </p>

        <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-[12.5px] text-ink-3">
          <span><b className="text-ink-2 font-semibold">Presenta:</b> Consulado de Miami</span>
          <span><b className="text-ink-2 font-semibold">Dirigido a:</b> Conper Honorario de Tampa</span>
          <span><b className="text-ink-2 font-semibold">Actualizado:</b> {meta?.actualizado ?? ''}</span>
        </div>

        <button
          onClick={() => goTo(1)}
          className="mt-8 self-start inline-flex items-center gap-2.5 rounded-xl bg-peru px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_22px_rgba(200,16,46,.4)] transition hover:-translate-y-0.5"
        >
          Comenzar <ArrowRight width={18} height={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* Columna derecha: documento legalizado con sello */}
      <div className="relative hidden lg:grid place-items-center overflow-hidden border-l border-line px-8 py-10 bg-surface [background-image:repeating-linear-gradient(135deg,var(--surface-2)_0_2px,transparent_2px_22px)]">
        <div className="relative w-[min(320px,80%)] aspect-[1/1.29] rounded-lg border border-line bg-paper p-6 shadow-lg2 -rotate-3 animate-floaty">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-6 w-[18px] rounded-[2px] [background:linear-gradient(90deg,var(--red)_0_33%,#fff_33%_66%,var(--red)_66%_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,.14)]" />
            <span className="font-display text-[13px] font-bold tracking-[.3px] text-ink-2">CONPER TAMPA</span>
          </div>
          <i className="block h-[8px] w-[70%] rounded bg-surface-2" />
          <div className="mt-3 flex flex-col gap-2.5">
            <i className="block h-[6px] w-full rounded bg-surface-2" />
            <i className="block h-[6px] w-[92%] rounded bg-surface-2" />
            <i className="block h-[6px] w-full rounded bg-surface-2" />
            <i className="block h-[6px] w-[84%] rounded bg-surface-2" />
            <i className="block h-[6px] w-[95%] rounded bg-surface-2" />
            <i className="block h-[6px] w-[60%] rounded bg-surface-2" />
          </div>
          {/* Sello circular de legalización */}
          <div className="absolute bottom-5 right-5 grid h-[92px] w-[92px] -rotate-12 place-items-center rounded-full border-[3px] border-peru text-center text-peru shadow-sm [border-style:double]">
            <div>
              <div className="font-display text-[11px] font-bold leading-tight">LEGALIZADO</div>
              <div className="mx-auto my-1 h-4 w-4 rounded-full border-2 border-peru" />
              <div className="font-mono text-[7.5px] tracking-[.5px]">CONPER · TAMPA</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 font-mono text-[11px] tracking-[.5px] text-ink-3">Legalización de firmas y poderes</div>
      </div>
    </div>
  );
}
