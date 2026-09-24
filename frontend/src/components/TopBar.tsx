import { useManualStore } from '../store/useManualStore';
import { SLIDE_LABELS } from '../slides';
import { Sun, Moon, Menu } from './icons';

export function TopBar() {
  const current = useManualStore((s) => s.current);
  const goTo = useManualStore((s) => s.goTo);
  const theme = useManualStore((s) => s.theme);
  const toggleTheme = useManualStore((s) => s.toggleTheme);
  const progress = useManualStore((s) => s.progress());

  const label = SLIDE_LABELS[current] ?? '';

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 flex items-center gap-3.5 border-b border-line bar-glass backdrop-blur-md backdrop-saturate-150"
      style={{ height: 'var(--top)', paddingTop: 'env(safe-area-inset-top,0px)', paddingLeft: 'max(18px,env(safe-area-inset-left))', paddingRight: 'max(14px,env(safe-area-inset-right))' }}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="h-[30px] w-[22px] flex-none rounded-[3px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.14)] [background:linear-gradient(90deg,var(--red)_0_33%,#fff_33%_66%,var(--red)_66%_100%)]" />
        <div className="flex min-w-0 flex-col leading-tight">
          <strong className="truncate text-[13.5px] font-bold tracking-[.2px]">Consulado General del Perú</strong>
          <span className="hidden truncate text-[11px] text-ink-3 sm:block">Miami · Conper Honorario de Tampa</span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center">
        <div className="max-w-full truncate rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold tracking-[.3px] text-ink-2">
          <b className="font-mono text-[11px] font-bold text-peru">{String(current).padStart(2, '0')}</b>
          <span className="mx-1.5">·</span>
          {label}
        </div>
      </div>

      <div className="flex flex-none items-center gap-1.5">
        <button onClick={toggleTheme} title="Cambiar tema" aria-label="Cambiar tema"
          className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-paper text-ink-2 transition hover:border-line-2 hover:text-ink">
          {theme === 'dark' ? <Moon width={19} height={19} /> : <Sun width={19} height={19} />}
        </button>
        <button onClick={() => goTo(1)} title="Ir al contenido" aria-label="Ir al contenido"
          className="grid h-[38px] w-[38px] place-items-center rounded-[10px] border border-line bg-paper text-ink-2 transition hover:border-line-2 hover:text-ink">
          <Menu width={19} height={19} />
        </button>
      </div>

      <div className="absolute inset-x-0 -bottom-px h-0.5 bg-peru transition-[width] duration-300" style={{ width: `${progress * 100}%` }} />
    </header>
  );
}
