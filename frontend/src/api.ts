import type { ManualData } from './types';
import { MANUAL as FALLBACK } from './data/manual';

// En dev, "/api" pasa por el proxy de Vite hacia el backend (:4000).
// En prod, define VITE_API_URL si el backend está en otro origen.
const BASE = import.meta.env.VITE_API_URL ?? '';

export async function fetchManual(): Promise<{ data: ManualData; source: 'api' | 'local' }> {
  try {
    const res = await fetch(`${BASE}/api/manual`, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ManualData;
    return { data, source: 'api' };
  } catch {
    // Si el backend no está disponible, usamos los datos locales incluidos.
    return { data: FALLBACK, source: 'local' };
  }
}
