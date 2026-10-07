import React, { useState } from 'react';
import {
  Plus,
  ExternalLink,
  Calendar,
  UserCheck,
  FileText,
  Sparkles,
} from 'lucide-react';
import {
  EstadoKanban,
  ESTADOS_KANBAN_LISTA,
  RegistroCandidaturaKanban,
  OfertaEmpleoCompleta,
} from '../data/pilarProfile';

interface KanbanTrackerProps {
  registros: RegistroCandidaturaKanban[];
  onUpdateRegistro: (
    id: string,
    cambios: Partial<RegistroCandidaturaKanban>
  ) => void;
  onAddRegistroManual: (nuevo: Omit<RegistroCandidaturaKanban, 'id'>) => void;
  ofertasDisponibles: OfertaEmpleoCompleta[];
  onAbrirDossierOferta: (oferta: OfertaEmpleoCompleta) => void;
}

export const KanbanTracker: React.FC<KanbanTrackerProps> = ({
  registros,
  onUpdateRegistro,
  onAddRegistroManual,
  ofertasDisponibles,
  onAbrirDossierOferta,
}) => {
  const [filtroEstadoVista, setFiltroEstadoVista] = useState<
    EstadoKanban | 'TODOS'
  >('TODOS');
  const [mostrarFormularioNuevo, setMostrarFormularioNuevo] =
    useState<boolean>(false);

  const [nuevaEmpresa, setNuevaEmpresa] = useState('');
  const [nuevoPuesto, setNuevoPuesto] = useState('');
  const [nuevaLocalidad, setNuevaLocalidad] = useState('Torrijos');
  const [nuevaFuente, setNuevaFuente] = useState('Entrega en mano / Web');
  const [nuevoEnlace, setNuevoEnlace] = useState('');
  const [nuevoContacto, setNuevoContacto] = useState('');
  const [nuevaFechaSeguimiento, setNuevaFechaSeguimiento] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState<EstadoKanban>('Me interesa');
  const [nuevasNotas, setNuevasNotas] = useState('');

  const handleCrearCandidatura = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaEmpresa.trim() || !nuevoPuesto.trim()) return;

    const hoy = new Date().toISOString().split('T')[0];
    onAddRegistroManual({
      empresa: nuevaEmpresa.trim(),
      puesto: nuevoPuesto.trim(),
      localidad: nuevaLocalidad.trim() || 'Torrijos',
      fecha: hoy,
      fuente: nuevaFuente.trim() || 'Directa',
      enlace: nuevoEnlace.trim(),
      estado: nuevoEstado,
      notas: nuevasNotas.trim(),
      fechaSeguimiento: nuevaFechaSeguimiento,
      contacto: nuevoContacto.trim(),
      resultado: 'En proceso',
    });

    setNuevaEmpresa('');
    setNuevoPuesto('');
    setNuevoEnlace('');
    setNuevoContacto('');
    setNuevasNotas('');
    setMostrarFormularioNuevo(false);
  };

  const estadosMostrar =
    filtroEstadoVista === 'TODOS'
      ? ESTADOS_KANBAN_LISTA
      : [filtroEstadoVista];

  return (
    <div className="space-y-6">
      {/* Cabecera del Gestor Kanban */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
            GESTOR VISUAL DE CANDIDATURAS (KANBAN)
          </span>
          <h2
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Mis Candidaturas y Seguimiento Completo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            NUEVA → ME INTERESA → CV PREPARADO → CV ENVIADO → CONTACTADA → ENTREVISTA → SEGUIMIENTO → CONSEGUIDO
          </p>
        </div>

        <button
          type="button"
          onClick={() => setMostrarFormularioNuevo(!mostrarFormularioNuevo)}
          className="px-5 py-3.5 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-base flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Añadir Nueva Candidatura</span>
        </button>
      </div>

      {/* Formulario desplegable para registrar una candidatura manual con los 11 campos */}
      {mostrarFormularioNuevo && (
        <form
          onSubmit={handleCrearCandidatura}
          className="bg-teal-50/70 rounded-3xl p-6 sm:p-8 border-2 border-teal-300 space-y-4"
        >
          <h3 className="text-lg font-bold text-slate-900">
            Registrar Nueva Candidatura en tu Tablero
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Empresa *
              </label>
              <input
                type="text"
                required
                value={nuevaEmpresa}
                onChange={(e) => setNuevaEmpresa(e.target.value)}
                placeholder="Ej. Clínica o Gestoría Torrijos"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Puesto *
              </label>
              <input
                type="text"
                required
                value={nuevoPuesto}
                onChange={(e) => setNuevoPuesto(e.target.value)}
                placeholder="Ej. Recepción / Auxiliar Administrativo"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Localidad
              </label>
              <select
                value={nuevaLocalidad}
                onChange={(e) => setNuevaLocalidad(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-medium"
              >
                <option value="Santo Domingo-Caudilla">Santo Domingo-Caudilla</option>
                <option value="Torrijos">Torrijos</option>
                <option value="Alcabón">Alcabón</option>
                <option value="Novés">Novés</option>
                <option value="Otras cercanas">Otras cercanas (Portillo/Fuensalida)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Estado Inicial
              </label>
              <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value as EstadoKanban)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-[#0F766E]"
              >
                {ESTADOS_KANBAN_LISTA.map((est) => (
                  <option key={est} value={est}>
                    {est}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Fuente
              </label>
              <input
                type="text"
                value={nuevaFuente}
                onChange={(e) => setNuevaFuente(e.target.value)}
                placeholder="Ej. En mano, Web, Cámara..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Persona / Teléfono de Contacto
              </label>
              <input
                type="text"
                value={nuevoContacto}
                onChange={(e) => setNuevoContacto(e.target.value)}
                placeholder="Ej. Recepción / RRHH"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Fecha de Seguimiento
              </label>
              <input
                type="date"
                value={nuevaFechaSeguimiento}
                onChange={(e) => setNuevaFechaSeguimiento(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                Enlace Web (opcional)
              </label>
              <input
                type="text"
                value={nuevoEnlace}
                onChange={(e) => setNuevoEnlace(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
              Notas personales
            </label>
            <input
              type="text"
              value={nuevasNotas}
              onChange={(e) => setNuevasNotas(e.target.value)}
              placeholder="Ej. Entregué CV con código QR en recepción por la mañana..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-sm cursor-pointer"
            >
              Guardar Candidatura
            </button>
            <button
              type="button"
              onClick={() => setMostrarFormularioNuevo(false)}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-sm cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Barra de filtro rápido por columna de estado */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setFiltroEstadoVista('TODOS')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer border transition-all ${
            filtroEstadoVista === 'TODOS'
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Ver Todos ({registros.length})
        </button>
        {ESTADOS_KANBAN_LISTA.map((estado) => {
          const cantidad = registros.filter((r) => r.estado === estado).length;
          return (
            <button
              key={estado}
              type="button"
              onClick={() => setFiltroEstadoVista(estado)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap cursor-pointer border transition-all tabular-nums ${
                filtroEstadoVista === estado
                  ? 'bg-[#0F766E] text-white border-[#0F766E]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {estado} ({cantidad})
            </button>
          );
        })}
      </div>

      {/* Columnas y tarjetas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {estadosMostrar.map((estadoCol) => {
          const itemsCol = registros.filter((r) => r.estado === estadoCol);
          return (
            <div
              key={estadoCol}
              className="bg-slate-100/90 rounded-3xl p-4 sm:p-5 border border-slate-200/90 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                  {estadoCol}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-xs font-extrabold text-[#0F766E] tabular-nums">
                  {itemsCol.length}
                </span>
              </div>

              {itemsCol.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center italic">
                  Sin candidaturas en «{estadoCol}» todavía.
                </p>
              ) : (
                <div className="space-y-3.5">
                  {itemsCol.map((reg) => {
                    const ofertaVinculada = ofertasDisponibles.find(
                      (o) => o.id === reg.ofertaId
                    );
                    return (
                      <div
                        key={reg.id}
                        className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                            <span className="font-bold text-[#0F766E]">
                              📍 {reg.localidad}
                            </span>
                            <span className="tabular-nums">Fecha: {reg.fecha}</span>
                          </div>
                          <h4 className="font-bold text-base text-slate-900 leading-snug">
                            {reg.puesto}
                          </h4>
                          <p className="text-sm font-semibold text-slate-700">
                            {reg.empresa}
                          </p>
                        </div>

                        {/* Selector directo de Estado */}
                        <div>
                          <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                            Cambiar Estado:
                          </label>
                          <select
                            value={reg.estado}
                            onChange={(e) =>
                              onUpdateRegistro(reg.id, {
                                estado: e.target.value as EstadoKanban,
                              })
                            }
                            className="w-full px-3 py-2 rounded-xl bg-teal-50/70 border border-teal-300 text-xs font-bold text-slate-900"
                          >
                            {ESTADOS_KANBAN_LISTA.map((est) => (
                              <option key={est} value={est}>
                                {est}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Campos editables de seguimiento, contacto, resultado y notas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              Fecha seguimiento:
                            </label>
                            <input
                              type="date"
                              value={reg.fechaSeguimiento}
                              onChange={(e) =>
                                onUpdateRegistro(reg.id, {
                                  fechaSeguimiento: e.target.value,
                                })
                              }
                              className="w-full mt-0.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500">
                              <UserCheck className="w-3 h-3 inline mr-1" />
                              Contacto / Fuente:
                            </label>
                            <input
                              type="text"
                              value={reg.contacto}
                              onChange={(e) =>
                                onUpdateRegistro(reg.id, {
                                  contacto: e.target.value,
                                })
                              }
                              placeholder={reg.fuente}
                              className="w-full mt-0.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500">
                              Resultado:
                            </label>
                            <input
                              type="text"
                              value={reg.resultado}
                              onChange={(e) =>
                                onUpdateRegistro(reg.id, {
                                  resultado: e.target.value,
                                })
                              }
                              placeholder="Ej. Pendiente respuesta / Citada"
                              className="w-full mt-0.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-500">
                              Fuente:
                            </label>
                            <input
                              type="text"
                              value={reg.fuente}
                              onChange={(e) =>
                                onUpdateRegistro(reg.id, {
                                  fuente: e.target.value,
                                })
                              }
                              className="w-full mt-0.5 px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-500">
                            <FileText className="w-3 h-3 inline mr-1" />
                            Notas personales:
                          </label>
                          <textarea
                            rows={2}
                            value={reg.notas}
                            onChange={(e) =>
                              onUpdateRegistro(reg.id, { notas: e.target.value })
                            }
                            placeholder="Anota aquí con quién hablaste, horario, etc."
                            className="w-full mt-0.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                          />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                          {ofertaVinculada && (
                            <button
                              type="button"
                              onClick={() => onAbrirDossierOferta(ofertaVinculada)}
                              className="px-3 py-1.5 rounded-lg bg-[#0F766E] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Ver Carta / CV</span>
                            </button>
                          )}
                          {reg.enlace && (
                            <a
                              href={reg.enlace}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-slate-600 hover:text-[#0F766E] flex items-center gap-1"
                            >
                              <span>Enlace</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
