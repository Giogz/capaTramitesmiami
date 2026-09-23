import { create } from 'zustand';
import type { ManualData } from '../types';
import { fetchManual } from '../api';

export const TOTAL_SLIDES = 6;
export type Theme = 'light' | 'dark';

interface Stats {
  visited: number[]; // índices de diapositivas ya vistas
  furthest: number; // diapositiva más avanzada alcanzada
}

interface ManualStore {
  // ---- datos ----
  data: ManualData | null;
  source: 'api' | 'local' | null;
  loading: boolean;
  loadManual: () => Promise<void>;

  // ---- navegación ----
  current: number;
  total: number;
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;

  // ---- estadísticas (stats) ----
  stats: Stats;
  progress: () => number; // 0..1 según la diapositiva actual

  // ---- filtros ----
  codeQuery: string;
  setCodeQuery: (q: string) => void;
  tramQuery: string;
  setTramQuery: (q: string) => void;
  tramCategory: string;
  setTramCategory: (c: string) => void;

  // ---- tema ----
  theme: Theme;
  toggleTheme: () => void;
}

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('dni_theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage no disponible */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useManualStore = create<ManualStore>((set, get) => ({
  data: null,
  source: null,
  loading: true,
  async loadManual() {
    set({ loading: true });
    const { data, source } = await fetchManual();
    set({ data, source, loading: false });
  },

  current: 0,
  total: TOTAL_SLIDES,
  goTo(i) {
    const total = get().total;
    const next = Math.max(0, Math.min(total - 1, i));
    const { visited, furthest } = get().stats;
    set({
      current: next,
      stats: {
        visited: visited.includes(next) ? visited : [...visited, next],
        furthest: Math.max(furthest, next),
      },
    });
  },
  next() {
    const { current, total, goTo } = get();
    goTo(current === total - 1 ? 0 : current + 1);
  },
  prev() {
    get().goTo(get().current - 1);
  },

  stats: { visited: [0], furthest: 0 },
  progress() {
    const { current, total } = get();
    return total <= 1 ? 0 : current / (total - 1);
  },

  codeQuery: '',
  setCodeQuery: (q) => set({ codeQuery: q }),
  tramQuery: '',
  setTramQuery: (q) => set({ tramQuery: q }),
  tramCategory: 'Todos',
  setTramCategory: (c) => set({ tramCategory: c }),

  theme: initialTheme(),
  toggleTheme() {
    const next: Theme = get().theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('dni_theme', next);
    } catch {
      /* ignore */
    }
    set({ theme: next });
  },
}));
