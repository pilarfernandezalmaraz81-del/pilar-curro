import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  Sparkles,
  Car,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  DIRECTORIO_EMPRESAS_COMARCA,
  LocalidadPrioritaria,
  OfertaEmpleoCompleta,
} from '../data/pilarProfile';

interface CompaniesDirectoryProps {
  ofertas: OfertaEmpleoCompleta[];
  onPrepararCandidaturaEmpresa: (ofertaAsociada: OfertaEmpleoCompleta) => void;
}

export const CompaniesDirectory: React.FC<CompaniesDirectoryProps> = ({
  ofertas,
  onPrepararCandidaturaEmpresa,
}) => {
  const [filtroLocalidad, setFiltroLocalidad] = useState<
    LocalidadPrioritaria | 'TODAS'
  >('TODAS');
  const [busquedaTexto, setBusquedaTexto] = useState<string>('');

  const empresasFiltradas = DIRECTORIO_EMPRESAS_COMARCA.filter((emp) => {
    const pasaLoc =
      filtroLocalidad === 'TODAS' || emp.localidad === filtroLocalidad;
    const pasaTexto =
      !busquedaTexto.trim() ||
      `${emp.nombre} ${emp.sector} ${emp.puestoQuePodriaEncajar} ${emp.municipioExacto}`
        .toLowerCase()
        .includes(busquedaTexto.toLowerCase());
    return pasaLoc && pasaTexto;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
              DIRECTORIO LOCAL · RADIO PRIORITARIO 8 KM DESDE SANTO DOMINGO-CAUDILLA
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              🏢 Empresas que Podrían Contratarme
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Comercios, clínicas, gestorías, concesionarios, inmobiliarias, seguros, logística, centros educativos y grandes superficies en Torrijos, Santo Domingo-Caudilla, Alcabón y Novés.
            </p>
          </div>
        </div>

        {/* Filtros por municipio y sector */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          <div className="md:col-span-7 flex flex-wrap items-center gap-2">
            {(
              [
                'TODAS',
                'Santo Domingo-Caudilla',
                'Torrijos',
                'Alcabón',
                'Novés',
                'Otras localidades cercanas',
              ] as const
            ).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setFiltroLocalidad(loc)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  filtroLocalidad === loc
                    ? 'bg-[#0F766E] text-white border-[#0F766E]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {loc === 'TODAS' ? 'Todas las localidades' : loc}
              </button>
            ))}
          </div>

          <div className="md:col-span-5">
            <input
              type="text"
              value={busquedaTexto}
              onChange={(e) => setBusquedaTexto(e.target.value)}
              placeholder="Buscar por sector: clínica, gestoría, comercio, concesionario..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-[#0F766E]"
            />
          </div>
        </div>
      </div>

      {/* Listado de tarjetas de empresas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {empresasFiltradas.map((emp) => {
          const ofertaAsociada =
            ofertas.find((o) => o.id === emp.ofertaAsociadaId) || ofertas[0];

          return (
            <div
              key={emp.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold">
                    📍 {emp.municipioExacto} · a {emp.distanciaDesdeSantoDomingoKm} km
                  </span>
                  {emp.tieneOfertaActivaVerificada ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Canal de empleo / Bolsa activa
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      Sin anuncio público hoy · Ideal Autocandidatura
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0F766E]" />
                    Sector: {emp.sector}
                  </p>
                  <h3
                    className="text-xl font-bold text-slate-900 mt-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {emp.nombre}
                  </h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-sm">
                  <p className="text-slate-900">
                    <span className="font-bold text-[#0F766E]">
                      🎯 Puesto que podría encajar:
                    </span>{' '}
                    <span className="font-semibold">{emp.puestoQuePodriaEncajar}</span>
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900">
                      💡 Motivo por el que Pilar encaja:
                    </span>{' '}
                    {emp.motivoEncajePilar}
                  </p>
                  <p className="text-slate-700 flex items-center gap-1.5 pt-1 text-xs font-semibold">
                    <Car className="w-4 h-4 text-[#0F766E] shrink-0" />
                    {emp.ventajaCochePropio}
                  </p>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/70">
                  <p className="font-bold text-slate-800">
                    📋 Estado de oferta / contratación actual:
                  </p>
                  <p>{emp.estadoContratacionVerificado}</p>
                  <p className="font-semibold text-slate-800 pt-1">
                    📞 Cómo presentar candidatura: {emp.canalEmpleoDirecto}
                  </p>
                </div>
              </div>

              {/* Botones: "Ver empresa", "Página de empleo" y "Preparar candidatura" */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onPrepararCandidaturaEmpresa(ofertaAsociada)}
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Preparar candidatura</span>
                </button>

                <a
                  href={emp.webOficial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-sm flex items-center gap-1.5"
                >
                  <span>Ver empresa</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {emp.paginaEmpleo && (
                  <a
                    href={emp.paginaEmpleo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 font-bold text-xs flex items-center gap-1"
                  >
                    <span>Web Empleo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
