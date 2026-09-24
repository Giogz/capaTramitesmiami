// Tipos de dominio del manual de Trámites Notariales.
// El texto admite marcadores ligeros: **negrita** y `código`.

export interface Tarifa {
  grupo: string;
  codigo: string;
  descripcion: string;
  costo: string; // p. ej. "$25"
}

export interface Requisito {
  texto: string;
  sub?: string[];
  gratis?: string; // recuadro verde opcional
}

export interface Tramite {
  codigo: string; // tarifa(s), p. ej. "15A" o "20B + 15A"
  categoria: string; // Certificados | Poderes | Antecedentes | Legalizaciones | Documentos extranjeros
  titulo: string;
  costo: string; // p. ej. "$25"
  requisitos: Requisito[];
}

export type IconoRecordatorio =
  | 'check' | 'sign' | 'clock' | 'photo' | 'home' | 'swap' | 'id' | 'cash' | 'stamp';
export type ColorRecordatorio = 'red' | 'ok' | 'amber';

export interface Recordatorio {
  color: ColorRecordatorio;
  icono: IconoRecordatorio;
  titulo: string;
  texto: string;
}

export interface ManualData {
  meta: {
    actualizado: string;
    presenta: string;
    dirigidoA: string;
  };
  tarifas: Tarifa[];
  tramites: Tramite[];
  recordatorios: Recordatorio[];
}
