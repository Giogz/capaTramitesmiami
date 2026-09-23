import type { ManualData } from '../types';

const IDENT = 'DNI (o pasaporte, si no es ciudadano peruano)';
const DIRECCION = `**Requisito:** ${IDENT} y confirmar o actualizar su dirección en EE. UU.`;
const APODERADO =
  '**Apoderado:** nombres y apellidos completos y número de DNI del apoderado en el Perú (pasaporte o documento de identidad, si no es ciudadano peruano).';
const OBJETO =
  '**Objeto del poder:** lo proporciona el ciudadano: la entidad donde se presentará, el trámite a realizar en su representación y las demás indicaciones que la entidad requiera. El contenido es responsabilidad del ciudadano.';
const FIRMA_HUELLA =
  '**Acción:** verificar que la firma sea igual o muy parecida a la del DNI y tomar la huella del índice derecho con tampón negro.';
const RESPONSABILIDAD =
  '**Responsabilidad:** el contenido y los datos del documento son responsabilidad del ciudadano; así se hace constar en el sello de legalización.';
const VERIFICA_DATOS =
  '**Requisito:** traer el documento debidamente llenado y su ' +
  IDENT +
  '; se revisa que los datos de la persona coincidan con el documento presentado.';

export const MANUAL: ManualData = {
  meta: {
    actualizado: '22/09/2026',
    presenta: 'Consulado General del Perú en Miami',
    dirigidoA: 'Conper Honorario de Tampa',
  },

  tarifas: [
    { grupo: 'Certificados', codigo: '28A', descripcion: 'Certificado de supervivencia', costo: '$1' },
    { grupo: 'Poderes fuera de registro', codigo: '15B', descripcion: 'Poder para cobro de pensión', costo: '$10' },
    { grupo: 'Poderes fuera de registro', codigo: '15A', descripcion: 'Poder para trámites administrativos y antecedentes', costo: '$25' },
    { grupo: 'Antecedentes', codigo: '20B', descripcion: 'Antecedentes policiales (toma de huellas)', costo: '$25' },
    { grupo: 'Legalizaciones', codigo: '16A', descripcion: 'Carta poder', costo: '$20' },
    { grupo: 'Legalizaciones', codigo: '27', descripcion: 'Declaración jurada, carta compromiso y contratos (persona natural)', costo: '$25' },
    { grupo: 'Legalizaciones', codigo: '22C', descripcion: 'Contratos de persona jurídica', costo: '$80' },
    { grupo: 'Documentos extranjeros', codigo: '22A', descripcion: 'Certificados vitales extranjeros y acta de cremación', costo: '$30' },
  ],

  tramites: [
    {
      codigo: '28A',
      categoria: 'Certificados',
      titulo: 'Certificado de supervivencia',
      costo: '$1',
      requisitos: [
        { texto: DIRECCION },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si la persona no puede firmar por edad avanzada, solo se le toma la huella digital.' },
        { texto: '**Pago:** $1 en efectivo (tarifa 28A).' },
      ],
    },
    {
      codigo: '15B',
      categoria: 'Poderes',
      titulo: 'Poder fuera de registro (cobro de pensión)',
      costo: '$10',
      requisitos: [
        { texto: DIRECCION },
        { texto: APODERADO },
        { texto: OBJETO },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si el otorgante no puede firmar por edad avanzada, designa a un Testigo a Ruego, que se identifica y firma; a la persona pensionista solo se le toma la huella digital.' },
        { texto: '**Pago:** $10 en efectivo (tarifa 15B).' },
      ],
    },
    {
      codigo: '15A',
      categoria: 'Poderes',
      titulo: 'Poder fuera de registro (trámites administrativos)',
      costo: '$25',
      requisitos: [
        { texto: DIRECCION },
        { texto: APODERADO },
        { texto: OBJETO },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si el otorgante no puede firmar por edad avanzada, designa a un Testigo a Ruego (puede ser un familiar del poderdante), que se identifica y firma; al otorgante solo se le toma la huella digital.' },
        { texto: '**Pago:** $25 en efectivo (tarifa 15A).' },
      ],
    },
    {
      codigo: '20B + 15A',
      categoria: 'Antecedentes',
      titulo: 'Antecedentes policiales',
      costo: '$50',
      requisitos: [
        { texto: '**Contexto:** al tramitar antecedentes suelen pedirse tres certificados: policiales, penales y judiciales. Preguntar al connacional si los necesita todos.' },
        { texto: `**Requisito:** ${IDENT} y llenar el Formato de Toma de Huellas.` },
        { texto: APODERADO },
        { texto: '**Procedimiento:** se toman las huellas digitales de los dedos de ambas manos.' },
        { texto: '**Objeto:** indicar el motivo (generalmente para Migraciones en EE. UU.).' },
        { texto: '**Acción:** verificar que la firma sea igual o muy parecida a la del DNI.' },
        { texto: '**Pago:** $50 en efectivo, en dos tarifas de $25 cada una: 20B y 15A.' },
      ],
    },
    {
      codigo: '15A',
      categoria: 'Poderes',
      titulo: 'Poder fuera de registro (antecedentes penales)',
      costo: '$25',
      requisitos: [
        { texto: `**Requisito:** ${IDENT} y llenar el Formato de Toma de Huellas.` },
        { texto: APODERADO },
        { texto: '**Objeto del poder:** acercarse a las oficinas del **Ministerio Público, Poder Judicial y/o Banco de la Nación del Perú** para tramitar el Certificado Judicial de Antecedentes Penales.' },
        { texto: '**Texto del poder (modelo):** el apoderado queda facultado para efectuar los trámites necesarios y firmar los documentos pertinentes solo para los fines indicados; el poder tiene vigencia de un año a partir de la fecha y no podrá tacharse de insuficiente.' },
        { texto: '**Acción:** verificar que la firma sea igual o muy parecida a la del DNI.' },
        { texto: '**Pago:** $25 en efectivo (tarifa 15A).' },
      ],
    },
    {
      codigo: '15A',
      categoria: 'Poderes',
      titulo: 'Poder fuera de registro (antecedentes judiciales)',
      costo: '$25',
      requisitos: [
        { texto: `**Requisito:** ${IDENT} y llenar el Formato de Toma de Huellas.` },
        { texto: APODERADO },
        { texto: '**Objeto del poder:** acercarse al **Ministerio de Justicia y Derechos Humanos, Instituto Nacional Penitenciario del Perú (INPE)** para tramitar el Certificado Judicial de Antecedentes Judiciales.' },
        { texto: '**Texto del poder (modelo):** el apoderado queda facultado para efectuar los trámites necesarios y firmar los documentos pertinentes solo para los fines indicados; el poder tiene vigencia de un año a partir de la fecha y no podrá tacharse de insuficiente.' },
        { texto: '**Acción:** verificar que la firma sea igual o muy parecida a la del DNI.' },
        { texto: '**Pago:** $25 en efectivo (tarifa 15A).' },
      ],
    },
    {
      codigo: '16A',
      categoria: 'Legalizaciones',
      titulo: 'Carta poder',
      costo: '$20',
      requisitos: [
        { texto: '**Requisito:** traer la Carta Poder debidamente llenada y su ' + IDENT + '; se revisa que los datos coincidan con el documento presentado.' },
        { texto: '**Responsabilidad:** el contenido y los datos del apoderado son responsabilidad del ciudadano; así se hace constar en el sello de legalización.' },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si la persona no puede firmar por edad avanzada, solo se le toma la huella y se hace constar en el sello.' },
        { texto: '**Pago:** $20 en efectivo (tarifa 16A).' },
      ],
    },
    {
      codigo: '27',
      categoria: 'Legalizaciones',
      titulo: 'Declaración jurada',
      costo: '$25',
      requisitos: [
        { texto: '**Requisito:** traer la Declaración Jurada debidamente llenada y su ' + IDENT + '; se revisa que los datos coincidan con el documento presentado.' },
        { texto: RESPONSABILIDAD },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si la persona no puede firmar por edad avanzada, solo se le toma la huella y se hace constar en el sello.' },
        { texto: '**Pago:** $25 en efectivo (tarifa 27).' },
      ],
    },
    {
      codigo: '27',
      categoria: 'Legalizaciones',
      titulo: 'Carta compromiso o transferencia de fondos de pensión (Banco de la Nación)',
      costo: '$25',
      requisitos: [
        { texto: VERIFICA_DATOS },
        { texto: RESPONSABILIDAD },
        { texto: FIRMA_HUELLA },
        { texto: '**Nota:** si la persona no puede firmar por edad avanzada, se le toma la huella digital y se hace constar que no firma. Se recomienda tramitar el DNI sin firma.' },
        { texto: '**Pago:** $25 en efectivo (tarifa 27).' },
      ],
    },
    {
      codigo: '27 / 22C',
      categoria: 'Legalizaciones',
      titulo: 'Contratos u otros documentos que requieran legalizar firma',
      costo: '$25 / $80',
      requisitos: [
        { texto: '**Requisito:** traer el documento debidamente llenado y su ' + IDENT + ' (o el documento con el que se identifica); se revisa que los datos coincidan con el documento presentado.' },
        { texto: RESPONSABILIDAD },
        { texto: '**Acción:** verificar que la firma sea igual o muy parecida a la del DNI (o del documento con el que se identifica) y tomar la huella del índice derecho con tampón negro.' },
        { texto: '**Pago:** persona natural, $25 (tarifa 27). Persona jurídica, $80 (tarifa 22C).' },
      ],
    },
    {
      codigo: '22A',
      categoria: 'Documentos extranjeros',
      titulo: 'Certificado de nacimiento, matrimonio (o divorcio) y defunción (extranjero)',
      costo: '$30',
      requisitos: [
        { texto: '**Ámbito:** documentos del estado de Florida, Puerto Rico y las Islas Vírgenes de EE. UU.' },
        {
          texto: '**Requisito:** traer el **certificado original**. Se legaliza la firma de:',
          sub: [
            'el Registrador que firma el certificado, en el caso de nacimiento y defunción;',
            'el Deputy Clerk de la Corte, en el caso de matrimonio o divorcio, que legaliza la copia emitida por la corte.',
          ],
        },
        { texto: '**Sello:** colocar el sello de legalización donde se indica el nombre y el cargo de quien firma el certificado.' },
        { texto: '**Pago:** $30 en efectivo (tarifa 22A).' },
      ],
    },
    {
      codigo: '22A',
      categoria: 'Documentos extranjeros',
      titulo: 'Acta de cremación (extranjera)',
      costo: '$30',
      requisitos: [
        { texto: '**Ámbito:** documentos del estado de Florida, Puerto Rico y las Islas Vírgenes de EE. UU.' },
        { texto: '**Requisito:** traer el **Acta de Cremación** legalizada por un Notary Public del estado de Florida (estos documentos vienen con una firma ilegible). Se legaliza la firma del Notary Public.' },
        { texto: '**Sello:** colocar el sello de legalización donde se indica el nombre y el cargo del Notary Public.' },
        { texto: '**Pago:** $30 en efectivo (tarifa 22A).' },
      ],
    },
  ],

  recordatorios: [
    { color: 'red', icono: 'id', titulo: 'Identificación', texto: 'Siempre **DNI** (o **pasaporte**, si no es ciudadano peruano) y confirmar o actualizar la **dirección en EE. UU.**' },
    { color: 'red', icono: 'sign', titulo: 'Firma y huella', texto: 'Verificar que la firma sea **igual o muy parecida** a la del DNI y tomar la **huella del índice derecho** con tampón negro.' },
    { color: 'amber', icono: 'clock', titulo: 'Personas de edad avanzada', texto: 'Si no puede firmar, se toma **solo la huella**. En los **poderes** se designa un **Testigo a Ruego**, que puede ser un familiar del poderdante.' },
    { color: 'ok', icono: 'cash', titulo: 'Pago', texto: 'Todos los trámites se pagan **en efectivo**.' },
    { color: 'amber', icono: 'check', titulo: 'Responsabilidad del ciudadano', texto: 'El **contenido y los datos** del documento (objeto del poder, apoderado, etc.) son responsabilidad del ciudadano; así consta en el sello de legalización.' },
    { color: 'red', icono: 'stamp', titulo: 'Antecedentes', texto: 'Suelen pedirse tres certificados: **policiales**, **penales** y **judiciales**. Preguntar al connacional si los necesita todos.' },
  ],
};
