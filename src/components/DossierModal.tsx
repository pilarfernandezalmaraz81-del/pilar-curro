import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  Download,
  Mail,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import {
  OfertaEmpleoCompleta,
  EstadoKanban,
  ESTADOS_KANBAN_LISTA,
} from '../data/pilarProfile';

export type TabDossier7 =
  | 'cv'
  | 'carta'
  | 'email'
  | 'linkedin'
  | 'presentacion'
  | 'entrevista'
  | 'puntos';

interface DossierModalProps {
  oferta: OfertaEmpleoCompleta;
  onClose: () => void;
  estadoActual: EstadoKanban;
  onChangeEstado: (nuevoEstado: EstadoKanban) => void;
  onCopyText: (texto: string, id: string) => void;
  copiadoId: string | null;
  onDownloadTxt: (nombreArchivo: string, contenido: string) => void;
  datosContactoPie: string;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  oferta,
  onClose,
  estadoActual,
  onChangeEstado,
  onCopyText,
  copiadoId,
  onDownloadTxt,
  datosContactoPie,
}) => {
  const [tab, setTab] = useState<TabDossier7>('cv');

  const tabs: { id: TabDossier7; label: string }[] = [
    { id: 'cv', label: '1. CV Adaptado' },
    { id: 'carta', label: '2. Carta Presentación' },
    { id: 'email', label: '3. Email' },
    { id: 'linkedin', label: '4. Mensaje LinkedIn' },
    { id: 'presentacion', label: '5. Presentación Corta' },
    { id: 'entrevista', label: '6. Preguntas Entrevista' },
    { id: 'puntos', label: '7. Puntos Fuertes y Requisitos' },
  ];

  const cvCompletoConFirma = `${oferta.dossierCandidatura.resumenCVAdaptado}\n\n${datosContactoPie}`;
  const cartaCompletaConFirma = `${oferta.dossierCandidatura.cartaPresentacionNatural}\n${datosContactoPie}`;
  const emailCompletoConFirma = `${oferta.dossierCandidatura.emailCuerpo}\n\n${datosContactoPie}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:static print:bg-white print:p-0"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto print:border-0 print:shadow-none">
        {/* Cabecera del Dossier */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F766E] text-white px-6 py-5 flex items-start justify-between gap-4 print:hidden">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-0.5 rounded-md bg-teal-400/20 border border-teal-300/30 text-teal-200 text-xs font-bold uppercase tracking-wider">
                Dossier Completo · 7 Materiales Basados en tu CV Real
              </span>
              <span className="px-3 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-300/30 text-emerald-200 text-xs font-bold tabular-nums">
                COMPATIBILIDAD CON PILAR: {oferta.compatibilidadPorcentaje}%
              </span>
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {oferta.tituloPuesto}
            </h3>
            <p className="text-sm text-slate-300 mt-0.5">
              {oferta.empresa} · {oferta.municipioExacto} (a {oferta.distanciaKm} km en coche propio)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Cerrar ventana"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Pestañas de los 7 materiales */}
        <div className="bg-slate-100 px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center gap-2 overflow-x-auto print:hidden">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                tab === item.id
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Contenido activo */}
        <div className="p-6 sm:p-8 max-h-[68vh] overflow-y-auto space-y-6 print:max-h-none print:p-0">
          {tab === 'cv' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    1. Currículum Vitae Adaptado a esta Oferta
                  </h4>
                  <p className="text-sm text-slate-600">
                    100 % fiel a tu experiencia real + FP Auxiliar Administrativo + Curso IA 120h (Cámara de Comercio de Torrijos).
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onCopyText(cvCompletoConFirma, 'dossier-cv')}
                    className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    {copiadoId === 'dossier-cv' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡CV Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar CV Adaptado</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir / PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onDownloadTxt(
                        `CV_Pilar_Fernandez_${oferta.id}.txt`,
                        cvCompletoConFirma
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center gap-2 border border-slate-300 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar (.txt)</span>
                  </button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-base text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-200 leading-relaxed">
                {cvCompletoConFirma}
              </pre>
            </div>
          )}

          {tab === 'carta' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    2. Carta de Presentación Natural y Humana
                  </h4>
                  <p className="text-sm text-slate-600">
                    Cercana, respetuosa y destacando tu coche propio en Santo Domingo-Caudilla y tu Curso de 120h de IA.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(cartaCompletaConFirma, 'dossier-carta')
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    {copiadoId === 'dossier-carta' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Carta Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Carta</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onDownloadTxt(
                        `Carta_Pilar_Fernandez_${oferta.id}.txt`,
                        cartaCompletaConFirma
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm flex items-center gap-2 border border-slate-300 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar (.txt)</span>
                  </button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-base text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-200 leading-relaxed">
                {cartaCompletaConFirma}
              </pre>
            </div>
          )}

          {tab === 'email' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    3. Email Profesional Listo para Enviar
                  </h4>
                  <p className="text-sm text-slate-600">
                    Copia el asunto y el cuerpo o ábrelo directamente en tu correo electrónico.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(
                        `ASUNTO: ${oferta.dossierCandidatura.emailAsunto}\n\n${emailCompletoConFirma}`,
                        'dossier-email'
                      )
                    }
                    className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    {copiadoId === 'dossier-email' ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>¡Email Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Email Completo</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      oferta.dossierCandidatura.emailAsunto
                    )}&body=${encodeURIComponent(emailCompletoConFirma)}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Abrir en mi Correo</span>
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Asunto del correo:
                </p>
                <p className="text-base font-bold text-slate-900 mt-1">
                  {oferta.dossierCandidatura.emailAsunto}
                </p>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-base text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-200 leading-relaxed">
                {emailCompletoConFirma}
              </pre>
            </div>
          )}

          {tab === 'linkedin' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">
                    4. Mensaje para LinkedIn, InfoJobs o WhatsApp de Empresa
                  </h4>
                  <p className="text-sm text-slate-600">
                    Directo, educado y con tus datos clave en pocas líneas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onCopyText(
                      oferta.dossierCandidatura.mensajeLinkedInBreve,
                      'dossier-linkedin'
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
                >
                  {copiadoId === 'dossier-linkedin' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>¡Mensaje Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Mensaje</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-base text-slate-800 leading-relaxed">
                {oferta.dossierCandidatura.mensajeLinkedInBreve}
              </div>
            </div>
          )}

          {tab === 'presentacion' && (
            <div className="space-y-5">
              <div className="bg-teal-50/80 p-6 rounded-2xl border border-teal-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    5. Presentación Corta en Persona (al entregar tu CV con QR en mano)
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(
                        oferta.dossierCandidatura.presentacionCorta,
                        'dossier-pres-corta'
                      )
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-white text-[#0F766E] border border-teal-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiadoId === 'dossier-pres-corta' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar presentación</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-lg font-medium text-slate-900 leading-relaxed">
                  {oferta.dossierCandidatura.presentacionCorta}
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4 text-[#0F766E]" />
                    Guion para Llamar por Teléfono a la Empresa
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(oferta.guionLlamadaDirecta, 'dossier-guion-tel')
                    }
                    className="px-3.5 py-1.5 rounded-lg bg-white text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiadoId === 'dossier-guion-tel' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>¡Guion copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar guion telefónico</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-base text-slate-800 italic leading-relaxed">
                  {oferta.guionLlamadaDirecta}
                </p>
              </div>
            </div>
          )}

          {tab === 'entrevista' && (
            <div className="space-y-4">
              <div className="bg-amber-50/90 p-5 rounded-2xl border border-amber-200">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  6. Pregunta Más Probable en la Entrevista para este Puesto:
                </p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {oferta.dossierCandidatura.preguntaProbableEntrevista}
                </p>
              </div>

              <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Respuesta Recomendada para Pilar (100 % basada en tu experiencia real):
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      onCopyText(
                        oferta.dossierCandidatura.respuestaRecomendadaPilar,
                        'dossier-resp-ent'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-white text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiadoId === 'dossier-resp-ent' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Respuesta copiada!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar respuesta</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-base text-slate-900 leading-relaxed font-medium">
                  {oferta.dossierCandidatura.respuestaRecomendadaPilar}
                </p>
              </div>
            </div>
          )}

          {tab === 'puntos' && (
            <div className="space-y-5">
              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200">
                <h4 className="text-base font-bold text-emerald-950 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  7. Puntos Fuertes a Destacar y Requisitos a Explicar
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-slate-800">
                  {(
                    oferta.dossierCandidatura.puntosFuertesYRequisitosExplicar ||
                    oferta.puntosFuertesEncaje
                  ).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-bold text-emerald-700 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-2">
                <p className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  ⚠️ Requisito a tener en cuenta (sin descartar la oferta):
                </p>
                <p className="text-sm text-amber-900">
                  {oferta.requisitoNoCumplidoOAlerta}
                </p>
                <p className="text-sm font-semibold text-emerald-900 pt-1">
                  💡 Cómo defenderlo: {oferta.comoDefenderSinDescartar}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pie del modal: cambiar estado en el Kanban rápidamente */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Guardar estado en Mis Candidaturas:
            </span>
            <select
              value={estadoActual}
              onChange={(e) => onChangeEstado(e.target.value as EstadoKanban)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#0F766E]"
            >
              {ESTADOS_KANBAN_LISTA.map((est) => (
                <option key={est} value={est}>
                  {est}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm cursor-pointer"
          >
            Cerrar y volver
          </button>
        </div>
      </div>
    </div>
  );
};
