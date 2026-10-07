import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Check,
  Printer,
  Sparkles,
  Smartphone,
  Car,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { IdiomaApp } from '../data/pilarProfile';

interface LiveQRCodeCardProps {
  idioma: IdiomaApp;
  urlModoReclutador: string;
  emailMostrar: string;
  telefonoMostrar: string;
  privacidadActiva: boolean;
  onCopyText: (text: string, id: string) => void;
  copiadoId: string | null;
}

export const LiveQRCodeCard: React.FC<LiveQRCodeCardProps> = ({
  idioma,
  urlModoReclutador,
  emailMostrar,
  telefonoMostrar,
  privacidadActiva,
  onCopyText,
  copiadoId,
}) => {
  const [modoQR, setModoQR] = useState<'web' | 'vcard' | 'custom'>('web');
  const [customUrl, setCustomUrl] = useState<string>(urlModoReclutador);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [colorQR, setColorQR] = useState<'navy' | 'teal' | 'black'>('navy');

  const vCardPayload = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Fernández Almaraz;Pilar;;;',
    'FN:Pilar Fernández Almaraz',
    'TITLE:Atención al Cliente · Recepción · Auxiliar Administrativo (Curso IA 120h)',
    'ORG:Candidata en Santo Domingo-Caudilla / Torrijos (Coche Propio)',
    `EMAIL;TYPE=INTERNET:${emailMostrar}`,
    privacidadActiva ? '' : `TEL;TYPE=CELL:${telefonoMostrar}`,
    'ADR;TYPE=HOME:;;Santo Domingo-Caudilla;Toledo;;45526;España',
    `URL:${urlModoReclutador}`,
    'NOTE:FP Auxiliar Administrativo | Curso IA 120h (Cámara Comercio Torrijos) | Permiso de conducir y coche propio | Experiencia en Atención al Cliente, Comercio, Caja, Recepción y Administración.',
    'END:VCARD',
  ]
    .filter(Boolean)
    .join('\n');

  const contenidoActivoQR =
    modoQR === 'web'
      ? urlModoReclutador
      : modoQR === 'vcard'
      ? vCardPayload
      : customUrl.trim() || urlModoReclutador;

  useEffect(() => {
    let active = true;
    const darkHex =
      colorQR === 'navy'
        ? '#0f172a'
        : colorQR === 'teal'
        ? '#0f766e'
        : '#000000';

    QRCode.toDataURL(contenidoActivoQR, {
      width: 340,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: darkHex,
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (active) setQrDataUrl(url);
      })
      .catch(() => {
        // Fallback silencioso
      });

    return () => {
      active = false;
    };
  }, [contenidoActivoQR, colorQR]);

  const handleDescargarPNG = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `Codigo_QR_Pilar_Fernandez_Almaraz_${modoQR}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F766E] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/30 relative overflow-hidden">
      {/* Efecto decorativo glassmorphism */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Columna izquierda: Explicación y controles del QR en vivo */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-300" />
            {idioma === 'es'
              ? 'Código QR Dinámico en Vivo · Impacto Profesional'
              : 'Live Dynamic QR Code · Executive Impact'}
          </div>

          <h3
            className="text-2xl sm:text-3xl font-bold leading-tight text-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {idioma === 'es'
              ? 'Muestra este Código QR en tus entrevistas o imprímelo en tu CV'
              : 'Show this QR Code in interviews or print it on your CV'}
          </h3>

          <p className="text-slate-200 text-base leading-relaxed">
            {idioma === 'es'
              ? 'Cuando una empresa de Santo Domingo-Caudilla, Torrijos, Alcabón o Novés escanee este código con la cámara de su móvil, verá al instante tu presentación moderna con tu FP de Auxiliar Administrativo, tu Curso de Inteligencia Artificial de 120 horas (Cámara de Comercio de Torrijos) y tu disponibilidad con coche propio.'
              : 'When a company in Santo Domingo-Caudilla, Torrijos, Alcabón or Novés scans this code with their phone camera, they will immediately see your modern presentation with your Administrative FP, your 120-hour AI Certificate, and your own car availability.'}
          </p>

          {/* Selector de modo del QR en vivo */}
          <div className="space-y-2 pt-1 print:hidden">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-200">
              {idioma === 'es'
                ? '1. Elige qué abre el Código QR al escanearlo:'
                : '1. Choose what the QR Code opens when scanned:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setModoQR('web')}
                className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition-all border cursor-pointer ${
                  modoQR === 'web'
                    ? 'bg-white text-slate-900 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="block text-base">🌐 Web Reclutador</span>
                <span
                  className={`text-xs font-normal ${
                    modoQR === 'web' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  Abre tu Tarjeta Digital
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModoQR('vcard')}
                className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition-all border cursor-pointer ${
                  modoQR === 'vcard'
                    ? 'bg-white text-slate-900 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="block text-base">📇 Guardar Contacto</span>
                <span
                  className={`text-xs font-normal ${
                    modoQR === 'vcard' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  Tarjeta vCard en agenda
                </span>
              </button>

              <button
                type="button"
                onClick={() => setModoQR('custom')}
                className={`px-4 py-3 rounded-xl text-left font-bold text-sm transition-all border cursor-pointer ${
                  modoQR === 'custom'
                    ? 'bg-white text-slate-900 border-white shadow-md'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                <span className="block text-base">🔗 Enlace a medida</span>
                <span
                  className={`text-xs font-normal ${
                    modoQR === 'custom' ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  Personalizar enlace en vivo
                </span>
              </button>
            </div>
          </div>

          {modoQR === 'custom' && (
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/20 print:hidden">
              <label className="block text-xs font-bold uppercase tracking-wider text-teal-200 mb-1.5">
                Escribe cualquier enlace o texto y el QR cambiará en vivo:
              </label>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-white/30 text-white text-sm focus:outline-none focus:border-teal-300"
              />
            </div>
          )}

          {/* Selector de estilo de color del QR */}
          <div className="flex flex-wrap items-center gap-3 pt-1 print:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
              {idioma === 'es' ? 'Color del QR:' : 'QR Color:'}
            </span>
            {[
              { id: 'navy', label: 'Azul Ejecutivo' },
              { id: 'teal', label: 'Verde Confianza' },
              { id: 'black', label: 'Negro Impresión' },
            ].map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => setColorQR(col.id as 'navy' | 'teal' | 'black')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  colorQR === col.id
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          {/* Botones de acción grandes y claros */}
          <div className="flex flex-wrap items-center gap-3 pt-2 print:hidden">
            <button
              type="button"
              onClick={handleDescargarPNG}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              {idioma === 'es'
                ? 'Descargar imagen del QR (.PNG)'
                : 'Download QR Image (.PNG)'}
            </button>

            <button
              type="button"
              onClick={() => onCopyText(urlModoReclutador, 'qr-link-copy')}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              {copiadoId === 'qr-link-copy' ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{idioma === 'es' ? '¡Enlace copiado!' : 'Link copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>
                    {idioma === 'es'
                      ? 'Copiar enlace para WhatsApp / Email'
                      : 'Copy link for WhatsApp / Email'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>
                {idioma === 'es'
                  ? 'Imprimir Tarjeta con QR'
                  : 'Print Card with QR'}
              </span>
            </button>
          </div>
        </div>

        {/* Columna derecha: Tarjeta visual con el Código QR en vivo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-teal-400/50 max-w-sm w-full text-center space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="text-left">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  TARJETA DIGITAL VERIFICADA
                </p>
                <p className="text-base font-extrabold text-slate-900">
                  Pilar Fernández Almaraz
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E]">
                <QrCode className="w-6 h-6" />
              </div>
            </div>

            {/* Imagen QR generada en vivo */}
            <div className="bg-slate-50 p-3 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Código QR en vivo de Pilar Fernández Almaraz"
                  className="w-56 h-56 object-contain rounded-xl bg-white p-1 shadow-sm"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-sm">
                  Generando QR...
                </div>
              )}
              <p className="mt-2 text-xs font-bold text-slate-600 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#0F766E]" />
                {modoQR === 'web'
                  ? 'Escanea con la cámara para abrir mi perfil web'
                  : modoQR === 'vcard'
                  ? 'Escanea para guardar mi contacto en tu móvil'
                  : 'Escanea para abrir el enlace personalizado'}
              </p>
            </div>

            {/* Sellos de confianza debajo del QR */}
            <div className="space-y-1.5 text-left bg-teal-50/70 p-3.5 rounded-xl border border-teal-200 text-xs">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#0F766E] shrink-0" />
                Curso de IA — 120 horas (Cámara de Comercio de Torrijos)
              </p>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0F766E] shrink-0" />
                FP Auxiliar Administrativo · Atención al Cliente y Comercio
              </p>
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-[#0F766E] shrink-0" />
                Santo Domingo-Caudilla · Permiso de conducir y coche propio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MiniQRBadge: React.FC<{ url: string }> = ({ url }) => {
  const [qrMiniUrl, setQrMiniUrl] = useState<string>('');

  useEffect(() => {
    let active = true;
    QRCode.toDataURL(url, {
      width: 140,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#0f172a', light: '#ffffff' },
    })
      .then((res) => {
        if (active) setQrMiniUrl(res);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [url]);

  if (!qrMiniUrl) return null;

  return (
    <div className="flex flex-col items-center bg-white p-2 rounded-xl border border-slate-200 shadow-xs shrink-0">
      <img
        src={qrMiniUrl}
        alt="QR Web Profesional Pilar"
        className="w-20 h-20 object-contain"
      />
      <span className="text-[10px] font-bold text-slate-700 mt-1 uppercase tracking-wider">
        Mi Web / QR
      </span>
    </div>
  );
};

