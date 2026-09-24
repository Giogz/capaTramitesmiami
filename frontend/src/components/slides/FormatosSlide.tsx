import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { SlideShell } from './SlideShell';
import origHuellas from '../../assets/originales/huellas.png';
import origTransferencia from '../../assets/originales/transferencia.png';
import origPoder from '../../assets/originales/poder.png';
import origSupervivencia from '../../assets/originales/supervivencia.png';
import origCompromiso from '../../assets/originales/compromiso.png';
import origJurada from '../../assets/originales/jurada.png';
import origEjDefuncion from '../../assets/originales/ej-defuncion.png';
import origEjCremacion from '../../assets/originales/ej-cremacion.png';
import origEjDniPas from '../../assets/originales/ej-dnipasaporte.png';
import origEjViaje from '../../assets/originales/ej-permiso-viaje.png';

const ORIG: Record<string, { src: string; enBlanco: boolean }> = {
  huellas: { src: origHuellas, enBlanco: true },
  transferencia: { src: origTransferencia, enBlanco: true },
  poder: { src: origPoder, enBlanco: false },
  supervivencia: { src: origSupervivencia, enBlanco: false },
  compromiso: { src: origCompromiso, enBlanco: false },
  jurada: { src: origJurada, enBlanco: false },
  'ej-defuncion': { src: origEjDefuncion, enBlanco: false },
  'ej-cremacion': { src: origEjCremacion, enBlanco: false },
  'ej-dnipasaporte': { src: origEjDniPas, enBlanco: false },
  'ej-viaje': { src: origEjViaje, enBlanco: false },
};

// -------- Estado compartido de los campos --------
type Ctx = {
  values: Record<string, string>;
  set: (id: string, v: string) => void;
  hl: boolean;
};
const FieldCtx = createContext<Ctx>({ values: {}, set: () => {}, hl: true });

// Campo rellenable en línea. w = ancho aproximado en caracteres.
function F({ id, w = 12, ph = '' }: { id: string; w?: number; ph?: string }) {
  const { values, set, hl } = useContext(FieldCtx);
  return (
    <input
      className={hl ? 'fin hl' : 'fin'}
      style={{ width: `${w}ch` }}
      value={values[id] ?? ''}
      placeholder={ph}
      onChange={(e) => set(id, e.target.value)}
      spellCheck={false}
      autoComplete="off"
    />
  );
}

// Línea de puntos para firma manuscrita.
function FirmaLinea({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 inline-block text-center">
      <div className="w-[240px] border-t border-dotted border-[#555]" />
      <div className="mt-1 text-[12px] text-[#444]">{children}</div>
    </div>
  );
}

// Huella de referencia (imagen genérica que indica dónde va).
function Huella({ w = 96, h = 118, label = 'Huella' }: { w?: number; h?: number; label?: string }) {
  return (
    <span className="fhuella" style={{ width: w, height: h }}>
      <svg viewBox="0 0 44 54" width="62%" height="62%" aria-hidden>
        <g fill="none" stroke="#123a8a" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
          <path d="M22 6c-8 0-14 7-14 16 0 6 1 10 1 14" />
          <path d="M22 6c8 0 14 7 14 16 0 6-1 11-2 15" />
          <path d="M22 11c-5.5 0-9.5 5-9.5 11.5 0 6 .8 9 .8 13" />
          <path d="M22 11c5.5 0 9.5 5 9.5 11.5 0 6-.6 10-1.4 14" />
          <path d="M22 16c-3.3 0-5.6 3-5.6 7 0 5 .5 8 .3 12" />
          <path d="M22 16c3.3 0 5.6 3 5.6 7 0 5-.4 9-1 13" />
          <path d="M22 21c-1.6 0-2.7 1.6-2.7 3.7 0 4 .3 7 .2 10" />
          <path d="M22 21c1.6 0 2.7 1.6 2.7 3.7 0 4-.2 7-.5 10" />
        </g>
      </svg>
      <span className="lbl">{label}</span>
    </span>
  );
}

// -------- Membrete del Consulado --------
function Membrete() {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="h-8 w-[24px] rounded-[2px] [background:linear-gradient(90deg,#c8102e_0_33%,#fff_33%_66%,#c8102e_66%_100%)] shadow-[inset_0_0_0_1px_rgba(0,0,0,.2)]" />
      <strong className="mt-1.5 text-[12px] font-bold tracking-[.4px] text-[#333]">CONSULADO GENERAL DEL PERÚ</strong>
      <span className="text-[11px] font-semibold text-[#555]">MIAMI</span>
    </div>
  );
}

// -------- Datos de ejemplo (ficticios) --------
const EX: Record<string, string> = {
  // Certificado de supervivencia
  cs_dia: '22', cs_mes: 'SEPTIEMBRE', cs_anio: '2026', cs_consul: 'ANTERO DIEGO ARBULU', cs_consuldni: '42808269',
  cs_nombre: 'JUAN PEREZ GARCIA', cs_dni: '44556677', cs_estado: 'VIUDO', cs_dom: '123 MAIN ST, TAMPA, FL 33602',
  // Poder fuera de registro
  pf_dia: '22', pf_mes: 'SEPTIEMBRE', pf_anio: '2026', pf_consul: 'ANTERO DIEGO ARBULU',
  pf_otorgante: 'JUAN PEREZ GARCIA', pf_ocupacion: 'JUBILADO', pf_dni: '44556677', pf_estado: 'VIUDO',
  pf_dom: '123 MAIN ST, TAMPA, FL 33602', pf_apoderado: 'MARIA ELENA TORRES DIAZ', pf_apodni: '33445566',
  pf_objeto: 'COBRO DE PENSION ANTE LA ONP', pf_cuenta: '000-1234567', pf_firmante: 'JUAN PEREZ GARCIA', pf_firmadni: '44556677',
  // Carta compromiso
  cc_fecha: '22 DE SEPTIEMBRE DE 2026', cc_nombre: 'JUAN PEREZ GARCIA', cc_dni: '44556677',
  // Declaración jurada
  dj_dia: '22', dj_mes: 'SEPTIEMBRE', dj_anio: '2026', dj_nombre: 'ROSA MARIA DIAZ VDA DE PEREZ',
  dj_dni: '44556677', dj_dom: '123 MAIN ST, TAMPA, FL 33602', dj_difunto: 'JUAN PEREZ GARCIA',
  // Toma de huellas
  th_nombres: 'JUAN PEREZ GARCIA', th_nac: 'PERUANA', th_lugar: 'LIMA, PERU', th_fnac: '15/06/1960',
  th_dni: '44556677', th_pas: '', th_res: '123 MAIN ST, TAMPA, FL 33602', th_motivo: 'MIGRACIONES EE. UU.',
  th_fecha: '22/09/2026', th_apoderado: 'MARIA ELENA TORRES DIAZ', th_apodni: '33445566',
  // Transferencia de fondos
  tf_fecha: 'TAMPA, 22 DE SEPTIEMBRE DE 2026', tf_nombre: 'JUAN PEREZ GARCIA', tf_docid: '44556677',
  tf_nac: 'PERUANA', tf_dom: '123 MAIN ST, TAMPA, FL 33602', tf_cuenta: '000-1234567',
  tf_banco: 'BANK OF AMERICA', tf_dirbanco: 'TAMPA, FLORIDA, EE. UU.', tf_ctaext: '9876543210',
  tf_iban: '', tf_swift: 'BOFAUS3N', tf_ruta: '063100277', tf_titular: 'JUAN PEREZ GARCIA',
  tf_direccion: '123 MAIN ST, TAMPA, FL 33602', tf_periodo: 'MENSUAL', tf_correo: 'juan@example.com', tf_tel: '8135551234',
};

const FINGERS: [string, string][] = [
  ['Meñique', 'Little finger'],
  ['Anular', 'Ring finger'],
  ['Medio', 'Middle finger'],
  ['Índice', 'Fore finger'],
  ['Pulgar', 'Thumb'],
];

// -------- Documentos --------
function CertSupervivencia() {
  return (
    <div className="fdoc">
      <Membrete />
      <h2 className="my-5 text-center text-[22px] font-bold tracking-[.5px]">CERTIFICADO DE SUPERVIVENCIA</h2>
      <p>
        En la ciudad de Miami, Florida, Estados Unidos de América, a los <F id="cs_dia" w={4} /> días del mes de{' '}
        <F id="cs_mes" w={10} /> del año <F id="cs_anio" w={7} />, en el Consulado General del Perú en Miami, yo,{' '}
        <F id="cs_consul" w={22} />, Cónsul, identificado con DNI <F id="cs_consuldni" w={10} />, <b>CERTIFICO</b>: que he
        verificado la supervivencia de <F id="cs_nombre" w={24} />, de nacionalidad peruana, identificado con DNI{' '}
        <F id="cs_dni" w={10} />, de estado civil <F id="cs_estado" w={10} />, domiciliado en <F id="cs_dom" w={30} />.
      </p>
      <div className="mt-12 flex items-end justify-between">
        <FirmaLinea>Firma del Cónsul</FirmaLinea>
        <Huella />
      </div>
    </div>
  );
}

function PoderFueraRegistro() {
  return (
    <div className="fdoc">
      <Membrete />
      <h2 className="my-5 text-center text-[22px] font-bold tracking-[.5px]">PODER FUERA DE REGISTRO</h2>
      <p>
        En el Consulado General del Perú en Miami, a los <F id="pf_dia" w={4} /> días del mes de <F id="pf_mes" w={10} />{' '}
        del año <F id="pf_anio" w={7} />, ante mí, <F id="pf_consul" w={22} />, Cónsul Adjunto en Miami, Estados Unidos de
        América, compareció: <F id="pf_otorgante" w={24} />, de nacionalidad peruana, de profesión u ocupación{' '}
        <F id="pf_ocupacion" w={14} />, con Documento Nacional de Identidad <F id="pf_dni" w={10} />, estado civil{' '}
        <F id="pf_estado" w={10} />, con domicilio en <F id="pf_dom" w={28} />; quien procede por propio derecho.
      </p>
      <p className="mt-3">
        El otorgante, con capacidad para contratar y pleno conocimiento del acto, me expresó su voluntad de otorgar un
        poder fuera de registro a favor de <F id="pf_apoderado" w={24} />, identificado con DNI <F id="pf_apodni" w={10} />,
        para que en su nombre y representación realice el siguiente acto: <F id="pf_objeto" w={30} />.
      </p>
      <p className="mt-3">
        <b>Primero:</b> el apoderado podrá realizar las gestiones y operaciones vinculadas al objeto de este poder,
        incluida la cuenta de ahorros N.° <F id="pf_cuenta" w={16} /> del Banco de la Nación, cuando corresponda.{' '}
        <b>Segundo:</b> el poderdante asume plena responsabilidad por las facultades otorgadas. <b>Tercero:</b> el
        presente poder tendrá una vigencia de un año a partir de la fecha y no podrá ser tachado de insuficiente.{' '}
        <b>Cuarto:</b> leído el instrumento, el otorgante se afirmó y ratificó en su contenido.
      </p>
      <div className="mt-12 flex flex-wrap items-end justify-between gap-6">
        <FirmaLinea>
          <F id="pf_firmante" w={22} />
          <div className="mt-0.5">DNI <F id="pf_firmadni" w={10} /></div>
        </FirmaLinea>
        <div className="flex items-end gap-4">
          <Huella label="Huella otorgante" />
          <FirmaLinea>Cónsul Adjunto</FirmaLinea>
        </div>
      </div>
    </div>
  );
}

function CartaCompromiso() {
  return (
    <div className="fdoc">
      <Membrete />
      <h2 className="my-5 text-center text-[16px] font-bold leading-snug tracking-[.3px]">
        CARTA COMPROMISO SOLO PARA CLIENTES QUE OTORGUEN PODER MEDIANTE ESCRITURA PÚBLICA
      </h2>
      <p>Miami, <F id="cc_fecha" w={26} /></p>
      <p className="mt-3">
        <b>SEÑORES</b>
        <br />
        <b>BANCO DE LA NACIÓN</b>
        <br />
        Presente.
      </p>
      <p className="mt-3">Ref.: Designación de Representante para realizar operaciones en ese Banco.</p>
      <p className="mt-3">Estimados señores:</p>
      <p className="mt-3">
        Mediante la presente cumplo con remitirles el Testimonio de la Escritura Pública que contiene el Poder que he
        otorgado a favor del Representante que he designado en dicha Escritura Pública, la misma que ha sido inscrita en
        el Registro de Mandatos y Poderes de la Oficina Registral que se indica en dicho testimonio.
      </p>
      <p className="mt-3">
        Al respecto, agradeceré mantener el presente Poder en sus libros y conferir las facilidades del caso al
        Representante designado, asumiendo por mi parte toda responsabilidad por la facultad otorgada. La presente tiene
        carácter de <b>Declaración Jurada</b>, por lo que se libera al Banco de toda responsabilidad si antes de mi aviso
        se realizara cualquier operación para la que está facultado dicho Representante.
      </p>
      <p className="mt-3">Bajo tales condiciones, pido registrar el presente Poder en sus libros.</p>
      <p className="mt-6">Atentamente,</p>
      <div className="mt-10">
        <div className="w-[280px] border-t border-[#555]" />
        <div className="mt-1 text-[13px]">
          <b>Nombre:</b> <F id="cc_nombre" w={26} />
          <br />
          <b>DNI:</b> <F id="cc_dni" w={12} />
        </div>
      </div>
    </div>
  );
}

function DeclaracionJurada() {
  return (
    <div className="fdoc">
      <Membrete />
      <h2 className="my-5 text-center text-[22px] font-bold tracking-[.5px]">DECLARACIÓN JURADA</h2>
      <p>
        En la ciudad de Miami, Florida, Estados Unidos de América, a los <F id="dj_dia" w={4} /> días del mes de{' '}
        <F id="dj_mes" w={10} /> del año <F id="dj_anio" w={7} />, yo, <F id="dj_nombre" w={28} />, ciudadana peruana,
        identificada con DNI N.° <F id="dj_dni" w={10} />, con domicilio en <F id="dj_dom" w={30} />.
      </p>
      <p className="mt-3 font-semibold">DECLARO BAJO JURAMENTO EN HONOR A LA VERDAD QUE:</p>
      <p className="mt-3">
        No he contraído matrimonio (RENIEC) y soy viuda de mi difunto esposo <F id="dj_difunto" w={28} />, y hago esta
        declaración para hacer efectiva mi pensión por viudez que me corresponde, para ser presentada ante la autoridad
        competente.
      </p>
      <p className="mt-3">
        Declaro que lo expuesto es la verdad y, de comprobarse la falsedad de mis afirmaciones, me someto a la aplicación
        de las sanciones contempladas en la legislación peruana.
      </p>
      <div className="mt-12 flex items-end justify-between">
        <FirmaLinea>
          <F id="dj_nombre" w={22} />
          <div className="mt-0.5">DNI <F id="dj_dni" w={10} /></div>
        </FirmaLinea>
        <Huella />
      </div>
    </div>
  );
}

function TomaHuellas() {
  return (
    <div className="fdoc">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Filiación */}
        <div>
          <h3 className="text-[15px] font-bold leading-tight">
            FILIACIÓN DE LA PERSONA QUE SOLICITA CERTIFICADO
            <span className="block text-[12px] font-semibold italic text-[#666]">Applicant&apos;s Information</span>
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-[13.5px]">
            <label>Nombres / <i>Names</i>:<br /><F id="th_nombres" w={30} /></label>
            <label>Nacionalidad / <i>Nationality</i>:<br /><F id="th_nac" w={20} /></label>
            <label>Lugar de nacimiento / <i>Born at</i>:<br /><F id="th_lugar" w={24} /></label>
            <label>Fecha de nacimiento / <i>Date of birth</i>:<br /><F id="th_fnac" w={14} /></label>
            <label>D.N.I. N.°:<br /><F id="th_dni" w={14} /></label>
            <label>Pasaporte N.° / <i>Passport</i>:<br /><F id="th_pas" w={14} /></label>
            <label>Residencia actual / <i>Actual residence</i>:<br /><F id="th_res" w={30} /></label>
            <label>Motivo del certificado / <i>Certificate given for</i>:<br /><F id="th_motivo" w={24} /></label>
            <label>Fecha de atención / <i>Date filled</i>:<br /><F id="th_fecha" w={14} /></label>
          </div>
          <FirmaLinea>Nombre y firma del identificado</FirmaLinea>
        </div>

        {/* Impresiones digitales */}
        <div>
          <h3 className="text-center text-[14px] font-bold leading-tight text-[#0a3]">
            <span className="text-[#c8102e]">POLICÍA NACIONAL DEL PERÚ</span>
            <span className="block text-[11px] font-semibold text-[#444]">Toma de impresiones digitales</span>
            <span className="block text-[11px] font-semibold italic text-[#666]">Applicant&apos;s fingerprints</span>
          </h3>
          <table className="fgrid mt-3">
            <thead>
              <tr>
                <th>Mano izquierda<br /><i>Left hand</i></th>
                <th>Dedo</th>
                <th>Mano derecha<br /><i>Right hand</i></th>
              </tr>
            </thead>
            <tbody>
              {FINGERS.map(([es, en]) => (
                <tr key={es}>
                  <td><Huella w={78} h={62} label="" /></td>
                  <td className="finger">{es}<br /><span className="text-[10px] italic text-[#777]">{en}</span></td>
                  <td><Huella w={78} h={62} label="" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-[13.5px]">
        <b>NOTA:</b> el recurrente autoriza a Don/Doña <F id="th_apoderado" w={26} /> con DNI N.° <F id="th_apodni" w={12} />{' '}
        para que en su nombre tramite y recepcione el certificado correspondiente.
      </p>
      <FirmaLinea>Nombre completo y firma del operador</FirmaLinea>
    </div>
  );
}

function Transferencia() {
  return (
    <div className="fdoc">
      <h2 className="mb-1 text-center text-[20px] font-bold">Carta de Autorización</h2>
      <p className="mb-4 text-center text-[12px] italic text-[#666]">
        (Transferencia de fondos solo para clientes pensionistas residentes en el exterior)
      </p>
      <p>Lugar y fecha: <F id="tf_fecha" w={30} /></p>
      <p className="mt-3">
        <b>Señores</b>
        <br />
        <b>BANCO DE LA NACIÓN</b>, Sección Administración de Cuentas
        <br />
        Presente.
      </p>
      <p className="mt-3">Asunto: Autorización de transferencia de fondos al exterior.</p>
      <p className="mt-3">Estimados señores:</p>
      <p className="mt-3">
        Por medio de la presente, <F id="tf_nombre" w={28} /> (nombres y apellidos completos), con Documento de identidad
        N.° <F id="tf_docid" w={12} />, nacionalidad <F id="tf_nac" w={12} />, domicilio (en el exterior){' '}
        <F id="tf_dom" w={28} />, autorizo al Banco de la Nación, por el plazo de un año contado a partir de la recepción
        del presente, la transferencia de los fondos depositados en mi cuenta de ahorros N.° <F id="tf_cuenta" w={16} />{' '}
        al:
      </p>
      <div className="mt-3 flex flex-col gap-2 text-[13.5px]">
        <div>Banco: <F id="tf_banco" w={26} /></div>
        <div>Dirección del banco (ciudad, estado, país): <F id="tf_dirbanco" w={28} /></div>
        <div>Cuenta N.°: <F id="tf_ctaext" w={20} /></div>
        <div>IBAN: <F id="tf_iban" w={24} /></div>
        <div>Swift o BIC: <F id="tf_swift" w={16} /></div>
        <div>Ruta electrónica: <F id="tf_ruta" w={18} /></div>
        <div>Titular de cuenta en el exterior: <F id="tf_titular" w={26} /></div>
        <div>Dirección: <F id="tf_direccion" w={28} /></div>
        <div>Periodicidad (única vez / mensual / bimensual / trimestral / semestral / anual): <F id="tf_periodo" w={14} /></div>
      </div>
      <p className="mt-3">
        Asimismo, asumo la obligación de comunicar por escrito cualquier modificación o revocatoria de la presente
        autorización, liberando al Banco de toda responsabilidad si antes de mi aviso realizara transferencias según
        esta autorización.
      </p>
      <div className="mt-10 flex items-end justify-between">
        <div>
          <FirmaLinea>Firma del titular de la cuenta</FirmaLinea>
          <div className="mt-4 text-[13px]">Correo electrónico: <F id="tf_correo" w={22} /></div>
          <div className="mt-1 text-[13px]">Teléfono: <F id="tf_tel" w={16} /></div>
        </div>
        <Huella label="Huella digital" />
      </div>
    </div>
  );
}

// Documento de ejemplo (solo referencia, no rellenable): la imagen va debajo.
function Ejemplo({ titulo, desc, tarifa, items }: { titulo: string; desc: string; tarifa: string; items?: string[] }) {
  return (
    <div className="mx-auto max-w-[760px] rounded-2xl border border-line bg-paper p-5">
      <h3 className="text-[17px] font-bold leading-tight">{titulo}</h3>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{desc}</p>
      {items && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {items.map((it, i) => (
            <li key={i} className="flex gap-2 text-[14px] leading-snug text-ink">
              <span className="mt-[7px] h-[6px] w-[6px] flex-none rotate-45 rounded-[2px] bg-peru" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
      <span className="mt-3 inline-block rounded-full bg-peru-tint px-3 py-1 font-mono text-[13px] font-bold text-peru">
        {tarifa}
      </span>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
        Ejemplo con datos de muestra. El documento completo se muestra abajo.
      </p>
    </div>
  );
}

const DOCS: { id: string; label: string; el: ReactNode }[] = [
  { id: 'huellas', label: 'Toma de huellas (PNP)', el: <TomaHuellas /> },
  { id: 'transferencia', label: 'Transferencia de fondos (BN)', el: <Transferencia /> },
  { id: 'poder', label: 'Poder fuera de registro', el: <PoderFueraRegistro /> },
  { id: 'supervivencia', label: 'Certificado de supervivencia', el: <CertSupervivencia /> },
  { id: 'compromiso', label: 'Carta compromiso (BN)', el: <CartaCompromiso /> },
  { id: 'jurada', label: 'Declaración jurada', el: <DeclaracionJurada /> },
  {
    id: 'ej-defuncion',
    label: 'Ej.: Certificado de defunción',
    el: (
      <Ejemplo
        titulo="Certificado de defunción legalizado (extranjero)"
        desc="Ejemplo de un certificado de defunción del estado de Florida legalizado por el Consulado. Se legaliza la firma del Registrador del Estado. El mismo trámite y tarifa aplican a certificados de nacimiento, matrimonio o divorcio."
        tarifa="Tarifa 22A · $30"
      />
    ),
  },
  {
    id: 'ej-cremacion',
    label: 'Ej.: Acta de cremación',
    el: (
      <Ejemplo
        titulo="Acta de cremación legalizada (extranjera)"
        desc="Ejemplo de un acta de cremación legalizada. El acta viene con la firma de un Notary Public de Florida; el Consulado legaliza la firma de ese Notary Public."
        tarifa="Tarifa 22A · $30"
      />
    ),
  },
  {
    id: 'ej-dnipasaporte',
    label: 'Ej.: Legalización de DNI y pasaporte',
    el: (
      <Ejemplo
        titulo="Legalización de DNI y pasaporte"
        desc="Ejemplo de certificación de pasaporte y DNI: se certifica que la copia es fiel al documento tenido a la vista, con la certificación de firma al dorso."
        tarifa="Tarifa 20B · $25 por documento"
      />
    ),
  },
  {
    id: 'ej-viaje',
    label: 'Ej.: Permiso de viaje',
    el: (
      <Ejemplo
        titulo="Documentos para un permiso de viaje de menor"
        desc="Ejemplo de la documentación que se necesita para tramitar un permiso de viaje de un menor:"
        items={[
          'Documento de identidad de ambos padres (DNI o consulta RENIEC).',
          'DNI del menor.',
          'Acta de nacimiento del menor.',
          'Reserva o itinerario del vuelo del menor.',
        ]}
        tarifa="Documentación requerida"
      />
    ),
  },
];

export function FormatosSlide() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [hl, setHl] = useState(true);
  const [doc, setDoc] = useState(0);

  const set = (id: string, v: string) => setValues((s) => ({ ...s, [id]: v }));
  const llenar = () => setValues({ ...EX });
  const limpiar = () => setValues({});

  const stop = (e: React.TouchEvent) => e.stopPropagation();
  const esEjemplo = DOCS[doc].id.startsWith('ej-');

  return (
    <SlideShell
      eyebrow="SECCIÓN 03"
      title="Formatos y modelos"
      lead="Cada documento recreado como una hoja rellenable. Elige un formato, escribe en los campos para ver dónde va cada dato y usa «Llenar ejemplo» para ver un caso completo. La huella se muestra como referencia de dónde colocarla."
    >
      {/* Selector de documento */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {DOCS.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setDoc(i)}
            className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${
              doc === i ? 'border-peru bg-peru text-white' : 'border-line bg-paper text-ink-2 hover:border-line-2'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Controles (solo para hojas rellenables) */}
      {!esEjemplo && (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <button onClick={llenar} className="rounded-full bg-peru px-4 py-2 text-sm font-semibold text-white transition hover:bg-peru-deep">
              Llenar ejemplo
            </button>
            <button onClick={limpiar} className="rounded-full border border-line-2 px-4 py-2 text-sm font-semibold text-ink-2 transition hover:border-peru hover:text-peru">
              Limpiar
            </button>
            <label className="ml-1 inline-flex cursor-pointer items-center gap-2 text-sm text-ink-2">
              <input type="checkbox" checked={hl} onChange={(e) => setHl(e.target.checked)} className="h-4 w-4 accent-[color:var(--red)]" />
              Resaltar campos
            </label>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
            Datos de ejemplo ficticios. Reemplázalos por los reales solo en el trámite físico.
          </p>
        </>
      )}

      {/* Hoja rellenable */}
      <div className="mt-4 pb-3" onTouchStart={stop} onTouchMove={stop} onTouchEnd={stop}>
        <FieldCtx.Provider value={{ values, set, hl }}>{DOCS[doc].el}</FieldCtx.Provider>

        {/* Documento original (referencia) */}
        <div className="mx-auto mt-6 max-w-[760px]">
          <details open className="overflow-hidden rounded-xl border border-line bg-paper">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-ink-2">
              Documento original (referencia)
            </summary>
            <div className="border-t border-line px-4 pb-4 pt-3">
              <img
                src={ORIG[DOCS[doc].id].src}
                alt={`Documento original: ${DOCS[doc].label}`}
                className="mx-auto w-full rounded-md border border-line shadow-soft"
                loading="lazy"
              />
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-3">
                {ORIG[DOCS[doc].id].enBlanco
                  ? 'Formulario oficial en blanco, tal como se entrega para completar.'
                  : 'Documento oficial de referencia, con datos de ejemplo.'}
              </p>
            </div>
          </details>
        </div>
      </div>
    </SlideShell>
  );
}
