import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Car,
  Award,
  CheckCircle2,
  Printer,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  Laptop,
  HeartHandshake,
} from 'lucide-react';
import { DATOS_USUARIA_PILAR, IdiomaApp } from '../data/pilarProfile';
import { MiniQRBadge } from './LiveQRCodeCard';

interface PublicCurriculumWebProps {
  idioma: IdiomaApp;
  setIdioma: (lang: IdiomaApp) => void;
  fotoPilarUrl: string;
  telefonoMostrar: string;
  direccionMostrar: string;
  emailMostrar: string;
  urlPublicaQR: string;
  esVistaDesdeQRDirecto: boolean;
  onVolverAlAsistentePrivado: () => void;
}

export const PublicCurriculumWeb: React.FC<PublicCurriculumWebProps> = ({
  idioma,
  setIdioma,
  fotoPilarUrl,
  telefonoMostrar,
  direccionMostrar,
  emailMostrar,
  urlPublicaQR,
  esVistaDesdeQRDirecto,
  onVolverAlAsistentePrivado,
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-teal-600 selection:text-white">
      {/* Barra flotante discreta SOLO para que Pilar pueda volver a su asistente privado cuando está previsualizando */}
      {!esVistaDesdeQRDirecto && (
        <div className="bg-slate-900 text-white px-4 py-2.5 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3 print:hidden border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs">
              👁️ Vista Pública para Empresas (Destino del Código QR)
            </span>
            <span className="text-slate-300 hidden md:inline">
              Así es exactamente como ven tu Web-Currículum las empresas al escanear tu QR (sin ver nada de tu asistente privado).
            </span>
          </div>
          <button
            type="button"
            onClick={onVolverAlAsistentePrivado}
            className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a mi Asistente Personal Privado</span>
          </button>
        </div>
      )}

      {/* CABECERA HERO DE LA WEB-CURRÍCULUM DE PILAR (Exclusiva para empresas) */}
      <header className="bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0d9488] text-white pt-10 pb-16 px-4 sm:px-6 relative overflow-hidden print:bg-none print:text-slate-900 print:pt-2 print:pb-6 print:border-b-2 print:border-slate-300">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none print:hidden" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-300/15 blur-3xl pointer-events-none print:hidden" />

        {/* Selector de idioma discreto arriba a la derecha */}
        <div className="max-w-4xl mx-auto flex justify-end mb-4 print:hidden">
          <div className="inline-flex items-center bg-white/15 backdrop-blur-xs p-1 rounded-xl border border-white/25">
            <button
              type="button"
              onClick={() => setIdioma('es')}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                idioma === 'es'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-white/90'
              }`}
            >
              🇪🇸 Español
            </button>
            <button
              type="button"
              onClick={() => setIdioma('en')}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer ${
                idioma === 'en'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-white/90'
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4 relative z-10">
          {/* Fotografía Circular Profesional */}
          <img
            src={fotoPilarUrl}
            alt="Pilar Fernández Almaraz"
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-[5px] border-white shadow-2xl bg-slate-200"
          />

          <div className="space-y-2">
            <h1
              className="text-3xl sm:text-5xl font-extrabold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {DATOS_USUARIA_PILAR.nombre}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-white/95 max-w-2xl mx-auto">
              {idioma === 'es'
                ? 'Atención al Cliente · Recepción · Auxiliar Administrativo · Comercio'
                : 'Customer Service · Front Desk Reception · Administrative Assistant · Retail'}
            </p>
          </div>

          {/* Badges de Ubicación y Movilidad */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <span className="px-4 py-1.5 rounded-full bg-[#f59e0b] text-[#78350f] font-extrabold text-xs sm:text-sm shadow-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Santo Domingo-Caudilla · Torrijos · Alcabón · Novés (Toledo)
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xs border border-white/30 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 print:border-slate-300 print:text-slate-800">
              <Car className="w-4 h-4 text-amber-300 print:text-teal-700" />
              {idioma === 'es'
                ? 'Permiso de conducir y coche propio · Disponibilidad inmediata'
                : 'Driver’s license & own car · Immediate availability'}
            </span>
          </div>

          {/* Botones de contacto directo para la empresa */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 print:hidden">
            <a
              href={`mailto:${DATOS_USUARIA_PILAR.emailDefault}?subject=${encodeURIComponent(
                'Contacto profesional — Proceso de Selección (Pilar Fernández Almaraz)'
              )}`}
              className="px-6 py-3.5 rounded-2xl bg-white text-[#0369a1] hover:bg-slate-50 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              <span>
                {idioma === 'es'
                  ? 'Contactar por Correo Electrónico'
                  : 'Contact via Email'}
              </span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/85 hover:bg-slate-900 text-white border border-white/25 font-extrabold text-sm sm:text-base shadow-lg flex items-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <Printer className="w-5 h-5 text-amber-300" />
              <span>
                {idioma === 'es'
                  ? 'Imprimir / Guardar Currículum en PDF'
                  : 'Print / Save CV as PDF'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* CUERPO DEL CURRÍCULUM WEB PARA EMPRESAS */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 pb-16 space-y-6 relative z-20 print:mt-4 print:space-y-4">
        {/* 1. PRESENTACIÓN PROFESIONAL ("SOBRE MÍ") */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0284c7] border-b-2 border-[#e2e8f0] pb-2 flex items-center gap-2">
              <HeartHandshake className="w-6 h-6 text-[#0d9488]" />
              <span>
                {idioma === 'es' ? 'Perfil Profesional' : 'Professional Profile'}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {idioma === 'es'
                ? 'Profesional con amplia experiencia en el trato directo con el público, atención al cliente, comercio y gestión administrativa. Me caracterizo por mi amabilidad, puntualidad, seriedad y vocación de servicio. Resido en Santo Domingo-Caudilla (Toledo) y dispongo de permiso de conducir y vehículo propio para desplazarme en pocos minutos por Torrijos, Alcabón, Novés y alrededores.'
                : 'Dedicated professional with extensive experience in customer service, front desk reception, retail, and administrative support. Known for kindness, punctuality, reliability, and strong interpersonal skills. Resident in Santo Domingo-Caudilla (Toledo) with a driver’s license and own car.'}
            </p>
          </div>
          <div className="shrink-0 self-center md:self-start">
            <MiniQRBadge url={urlPublicaQR} />
          </div>
        </section>

        {/* 2. FORMACIÓN DESTACADA: CURSO IA 120 HORAS + FP AUXILIAR ADMINISTRATIVO */}
        <section className="bg-gradient-to-r from-[#f0fdfa] via-white to-[#f0f9ff] rounded-3xl p-6 sm:p-8 shadow-md border-2 border-[#0d9488]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0d9488] text-white text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              {idioma === 'es'
                ? 'Valor Diferencial: Experiencia Tradicional + IA'
                : 'Key Advantage: Traditional Experience + AI'}
            </span>
            <span className="text-xs font-extrabold text-[#0284c7] uppercase tracking-wider">
              Cámara de Comercio de Torrijos
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-[#0d9488] shrink-0" />
            <span>Curso de Inteligencia Artificial — 120 horas</span>
          </h2>
          <p className="text-sm sm:text-base font-bold text-[#0d9488] mt-1">
            Certificado expedido por la Cámara de Comercio de Torrijos
          </p>
          <p className="text-sm sm:text-base text-slate-700 mt-2 leading-relaxed">
            {idioma === 'es'
              ? 'Formación práctica de 120 horas orientada a la productividad administrativa, redacción de comunicaciones profesionales, organización de información y agilidad en herramientas informáticas actuales, complementando mi titulación oficial de FP de Auxiliar Administrativo.'
              : '120-hour practical training focused on administrative productivity, professional correspondence, document organization, and modern digital tools, complementing my official Vocational Training (FP) in Administrative Assistance.'}
          </p>
        </section>

        {/* 3. EXPERIENCIA PROFESIONAL REAL */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 space-y-5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0284c7] border-b-2 border-[#e2e8f0] pb-2 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[#0d9488]" />
            <span>
              {idioma === 'es'
                ? 'Experiencia Profesional'
                : 'Work Experience'}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DATOS_USUARIA_PILAR.experienciaReal.map((exp, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-1.5"
              >
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-[#0d9488] text-xs font-extrabold">
                  {exp.sector}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {exp.puesto}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {exp.resumen}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FORMACIÓN REGLADA Y CONOCIMIENTOS TÉCNICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 space-y-4">
            <h2 className="text-xl font-extrabold text-[#0284c7] border-b-2 border-[#e2e8f0] pb-2 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#0d9488]" />
              <span>
                {idioma === 'es' ? 'Formación Académica' : 'Education'}
              </span>
            </h2>

            <ul className="space-y-3.5">
              {DATOS_USUARIA_PILAR.formacionReglada.map((f, i) => (
                <li
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200"
                >
                  <p className="font-extrabold text-base text-slate-900">
                    {f.titulo}
                  </p>
                  <p className="text-xs font-bold text-[#0d9488] mt-0.5">
                    {f.centro}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200/90 space-y-5">
            <h2 className="text-xl font-extrabold text-[#0284c7] border-b-2 border-[#e2e8f0] pb-2 flex items-center gap-2">
              <Laptop className="w-6 h-6 text-[#0d9488]" />
              <span>
                {idioma === 'es'
                  ? 'Conocimientos e Idiomas'
                  : 'Skills & Languages'}
              </span>
            </h2>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                Informática, Contabilidad y Gestión:
              </p>
              <div className="flex flex-wrap gap-2">
                {DATOS_USUARIA_PILAR.otrosConocimientos.map((c, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-[#e0f2fe] text-[#0369a1] font-extrabold text-xs sm:text-sm"
                  >
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                Idiomas:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {DATOS_USUARIA_PILAR.idiomas.map((idItem, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    <span className="font-bold text-slate-900">
                      {idItem.idioma}:
                    </span>{' '}
                    <span className="font-extrabold text-[#0d9488]">
                      {idItem.nivel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
                Aptitudes Personales:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {DATOS_USUARIA_PILAR.aptitudes.map((apt, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-bold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    {apt}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 5. PIE DE CONTACTO DIRECTO PARA EMPRESAS */}
        <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 print:bg-white print:text-slate-900 print:border print:border-slate-300">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-amber-300 print:text-slate-900">
              {idioma === 'es'
                ? '¿Hablamos para una entrevista personal?'
                : 'Shall we schedule a personal interview?'}
            </h3>
            <p className="text-sm text-slate-300 print:text-slate-700">
              Disponibilidad inmediata para jornada completa o parcial en Santo Domingo-Caudilla, Torrijos, Alcabón, Novés y comarca.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs sm:text-sm font-bold text-white print:text-slate-900">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-400" />
                {direccionMostrar}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-teal-400" />
                {telefonoMostrar}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-teal-400" />
                {emailMostrar}
              </span>
            </div>
          </div>

          <a
            href={`mailto:${DATOS_USUARIA_PILAR.emailDefault}?subject=${encodeURIComponent(
              'Entrevista de Trabajo — Pilar Fernández Almaraz'
            )}`}
            className="px-6 py-3.5 rounded-2xl bg-[#0d9488] hover:bg-[#0f766e] text-white font-extrabold text-sm whitespace-nowrap shadow-md print:hidden"
          >
            ✉️ Enviar Correo a Pilar
          </a>
        </section>
      </main>
    </div>
  );
};
