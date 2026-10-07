import React from 'react';
import {
  Printer,
  Copy,
  Check,
  Eye,
  EyeOff,
  Award,
  Car,
  Sparkles,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { DATOS_USUARIA_PILAR, IdiomaApp } from '../data/pilarProfile';
import { LiveQRCodeCard, MiniQRBadge } from './LiveQRCodeCard';

interface CVAndRecruiterSectionProps {
  idioma: IdiomaApp;
  urlModoReclutador: string;
  fotoPilarUrl: string;
  onTriggerSubirFoto: () => void;
  privacidadActiva: boolean;
  onTogglePrivacidad: () => void;
  telefonoMostrar: string;
  direccionMostrar: string;
  dniMostrar: string;
  emailMostrar: string;
  editandoDatos: boolean;
  onToggleEditarDatos: () => void;
  telefonoReal: string;
  setTelefonoReal: (v: string) => void;
  direccionReal: string;
  setDireccionReal: (v: string) => void;
  dniReal: string;
  setDniReal: (v: string) => void;
  emailReal: string;
  setEmailReal: (v: string) => void;
  onCopyText: (texto: string, id: string) => void;
  copiadoId: string | null;
  textoCVCompletoPlano: string;
  onAbrirWebPublicaEmpresas: () => void;
}

export const CVAndRecruiterSection: React.FC<CVAndRecruiterSectionProps> = ({
  idioma,
  urlModoReclutador,
  fotoPilarUrl,
  onTriggerSubirFoto,
  privacidadActiva,
  onTogglePrivacidad,
  telefonoMostrar,
  direccionMostrar,
  dniMostrar,
  emailMostrar,
  editandoDatos,
  onToggleEditarDatos,
  telefonoReal,
  setTelefonoReal,
  direccionReal,
  setDireccionReal,
  dniReal,
  setDniReal,
  emailReal,
  setEmailReal,
  onCopyText,
  copiadoId,
  textoCVCompletoPlano,
  onAbrirWebPublicaEmpresas,
}) => {
  return (
    <div className="space-y-8">
      {/* Banner directo para abrir la Web-Currículum exclusiva que ven las empresas al escanear el QR */}
      <div className="bg-gradient-to-r from-[#0284c7] to-[#0d9488] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 print:hidden">
        <div className="space-y-1 text-center md:text-left">
          <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
            🔒 Separación Total: Tu Asistente Privado vs. Tu Web para Empresas
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold">
            ¿Quieres ver exactamente la Web-Currículum que abre tu Código QR?
          </h3>
          <p className="text-sm text-white/90">
            Cuando una empresa escanea tu QR, entra únicamente a tu Web-Currículum limpia (sin ver tu plan de 10 días, ni tus candidaturas, ni tu buscador privado).
          </p>
        </div>
        <button
          type="button"
          onClick={onAbrirWebPublicaEmpresas}
          className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm sm:text-base whitespace-nowrap shadow-xl cursor-pointer shrink-0"
        >
          🌐 Abrir Mi Web Pública para Empresas →
        </button>
      </div>

      {/* 1. Módulo de Código QR Dinámico en Vivo */}
      <LiveQRCodeCard
        idioma={idioma}
        urlModoReclutador={urlModoReclutador}
        emailMostrar={emailMostrar}
        telefonoMostrar={telefonoMostrar}
        privacidadActiva={privacidadActiva}
        onCopyText={onCopyText}
        copiadoId={copiadoId}
      />

      {/* 2. Controles de Privacidad y Edición de Datos Personales */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTogglePrivacidad}
            className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border cursor-pointer ${
              privacidadActiva
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            {privacidadActiva ? (
              <>
                <EyeOff className="w-4 h-4 text-emerald-700" />
                <span>Privacidad Activa (DNI, Teléfono y Dirección ocultos)</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 text-amber-700" />
                <span>Datos Visibles para Imprimir CV</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleEditarDatos}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 cursor-pointer"
          >
            {editandoDatos
              ? 'Cerrar edición de mis datos'
              : 'Editar mi teléfono / dirección para imprimir'}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => onCopyText(textoCVCompletoPlano, 'cv-oficial-copy')}
            className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
          >
            {copiadoId === 'cv-oficial-copy' ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡CV Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Texto del CV</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir CV Oficial con QR (A4)</span>
          </button>
        </div>
      </div>

      {editandoDatos && (
        <div className="bg-amber-50/80 rounded-3xl p-6 border border-amber-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:hidden">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Teléfono (para tu CV impreso)
            </label>
            <input
              type="text"
              value={telefonoReal}
              onChange={(e) => setTelefonoReal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Email Profesional
            </label>
            <input
              type="text"
              value={emailReal}
              onChange={(e) => setEmailReal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Dirección (Santo Domingo-Caudilla)
            </label>
            <input
              type="text"
              value={direccionReal}
              onChange={(e) => setDireccionReal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              DNI / NIF
            </label>
            <input
              type="text"
              value={dniReal}
              onChange={(e) => setDniReal(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-sm"
            />
          </div>
        </div>
      )}

      {/* 3. Hoja Oficial de Currículum Vitae + Tarjeta Modo Reclutador (Lista para enseñar o imprimir en A4) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-lg space-y-8 print:border-0 print:shadow-none print:p-0">
        {/* Cabecera Ejecutiva con Foto Circular + Datos + Mini QR en vivo */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b-2 border-slate-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative shrink-0">
              <img
                src={fotoPilarUrl}
                alt="Pilar Fernández Almaraz"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#0F766E] shadow-md"
              />
              <button
                type="button"
                onClick={onTriggerSubirFoto}
                className="mt-2 w-full px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center justify-center gap-1 border border-slate-300 cursor-pointer print:hidden"
              >
                <Camera className="w-3 h-3" />
                <span>Cambiar foto</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold">
                <Sparkles className="w-3.5 h-3.5" />
                PERFIL PROFESIONAL VERIFICADO · MODO RECLUTADOR
              </div>
              <h2
                className="text-3xl sm:text-4xl font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {DATOS_USUARIA_PILAR.nombre}
              </h2>
              <p className="text-base sm:text-lg font-bold text-[#0F766E]">
                {DATOS_USUARIA_PILAR.titularProfesional}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-700 pt-1">
                <span>📍 {direccionMostrar}</span>
                <span>📞 {telefonoMostrar}</span>
                <span>✉️ {emailMostrar}</span>
                <span>🪪 DNI: {dniMostrar}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-amber-700" />
                  Permiso de conducir y coche propio (Radio 8 km: Santo Domingo-Caudilla, Torrijos, Alcabón, Novés)
                </span>
              </div>
            </div>
          </div>

          {/* Código QR integrado en la esquina superior derecha del CV impreso */}
          <MiniQRBadge url={urlModoReclutador} />
        </div>

        {/* Destacado Especial: Curso de Inteligencia Artificial — 120 horas */}
        <div className="bg-gradient-to-r from-teal-50 via-emerald-50/70 to-amber-50/60 p-6 rounded-2xl border-2 border-teal-300/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
              <Award className="w-4 h-4" />
              FORMACIÓN TECNOLÓGICA DESTACADA
            </span>
            <h3 className="text-xl font-extrabold text-slate-900">
              Curso de Inteligencia Artificial — 120 horas
            </h3>
            <p className="text-sm font-bold text-[#0F766E]">
              Certificado expedido por la Cámara de Comercio de Torrijos
            </p>
            <p className="text-sm text-slate-700 pt-1">
              Aplicación práctica de herramientas de Inteligencia Artificial a la redacción de comunicaciones profesionales, organización administrativa, gestión documental y atención ágil al cliente.
            </p>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-white border border-teal-300 text-[#0F766E] font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-2xs">
            120 Horas Certificadas
          </div>
        </div>

        {/* Resumen de Valor Profesional */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5">
            Perfil y Objetivo Profesional
          </h3>
          <p className="text-base text-slate-800 leading-relaxed">
            {DATOS_USUARIA_PILAR.valorDiferencialTexto}
          </p>
        </div>

        {/* Grid de Experiencia Real y Formación */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5">
              Experiencia Profesional Verificada
            </h3>
            <div className="space-y-3.5">
              {DATOS_USUARIA_PILAR.experienciaReal.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-1"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-base text-slate-900">
                      {exp.puesto}
                    </h4>
                    <span className="text-xs font-bold text-[#0F766E] bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      {exp.sector}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {exp.resumen}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* Formación Reglada */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5">
                Formación Académica y Certificados
              </h3>
              <div className="space-y-3">
                {DATOS_USUARIA_PILAR.formacionReglada.map((form, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border ${
                      form.destacado
                        ? 'bg-teal-50/60 border-teal-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <p className="font-bold text-base text-slate-900">
                      {form.titulo}
                    </p>
                    <p className="text-xs font-bold text-[#0F766E] mt-0.5">
                      {form.centro}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{form.detalle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Informática, Contabilidad e Idiomas */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5">
                Conocimientos Informáticos, Contables e Idiomas
              </h3>
              <div className="flex flex-wrap gap-2">
                {DATOS_USUARIA_PILAR.otrosConocimientos.map((con, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold"
                  >
                    ✓ {con}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {DATOS_USUARIA_PILAR.idiomas.map((idItem, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="font-bold text-slate-900">
                      {idItem.idioma}:
                    </span>{' '}
                    <span className="text-[#0F766E] font-bold">
                      {idItem.nivel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aptitudes Profesionales */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1.5">
                Aptitudes y Valores Personales
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {DATOS_USUARIA_PILAR.aptitudes.map((apt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    {apt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
