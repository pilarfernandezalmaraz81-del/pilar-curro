import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  Cloud,
  FileText,
  Calendar,
  Mail,
  FolderOpen,
  CheckCircle2,
  ExternalLink,
  LogOut,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  logout,
  syncCandidaturasToFirestore,
  loadCandidaturasFromFirestore,
  createGoogleDocWithContent,
  listRecentDriveFiles,
  createCalendarFollowUpEvent,
  listUpcomingCalendarEvents,
  createOrSendGmailCandidatura,
} from '../services/firebaseAndWorkspace';
import {
  RegistroCandidaturaKanban,
  OfertaEmpleoCompleta,
} from '../data/pilarProfile';

interface GoogleWorkspacePanelProps {
  registrosKanban: RegistroCandidaturaKanban[];
  onReplaceRegistrosKanban: (nuevos: RegistroCandidaturaKanban[]) => void;
  textoCVCompletoPlano: string;
  ofertaDestacada: OfertaEmpleoCompleta;
}

interface ConfirmDialogState {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => Promise<void>;
}

export const GoogleWorkspacePanel: React.FC<GoogleWorkspacePanelProps> = ({
  registrosKanban,
  onReplaceRegistrosKanban,
  textoCVCompletoPlano,
  ofertaDestacada,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<boolean>(false);

  // Drive & Calendar lists
  const [driveFiles, setDriveFiles] = useState<
    { id: string; name: string; mimeType: string; webViewLink?: string }[]
  >([]);
  const [calendarEvents, setCalendarEvents] = useState<
    { id: string; summary: string; start: string; htmlLink?: string }[]
  >([]);

  // Form states for Calendar & Gmail
  const [calTitulo, setCalTitulo] = useState<string>(
    'Seguimiento Candidatura — Clínica / Recepción Torrijos'
  );
  const [calFecha, setCalFecha] = useState<string>(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [gmailDestinatario, setGmailDestinatario] = useState<string>(
    'pilarfernandezalmaraz81@gmail.com'
  );
  const [gmailAsunto, setGmailAsunto] = useState<string>(
    ofertaDestacada.dossierCandidatura.emailAsunto
  );
  const [gmailCuerpo, setGmailCuerpo] = useState<string>(
    ofertaDestacada.dossierCandidatura.emailCuerpo
  );

  // Mandatory Confirmation Dialog for Mutating Operations
  const [confirmDialog, setConfirmDialog] =
    useState<ConfirmDialogState | null>(null);

  useEffect(() => {
    const unsub = initAuth(
      (u) => {
        setUser(u);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setStatusMsg(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        setStatusMsg(
          '¡Conectada con éxito a tu cuenta de Google (Drive, Docs, Gmail, Calendar y Firebase)!'
        );
      }
    } catch {
      setStatusMsg(
        'No se completó el inicio de sesión con Google. Puedes intentarlo de nuevo cuando quieras.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setDriveFiles([]);
    setCalendarEvents([]);
    setStatusMsg('Sesión de Google cerrada correctamente.');
  };

  const cargarDatosDriveYCalendar = async () => {
    setLoadingAction(true);
    setStatusMsg(null);
    try {
      const [files, events] = await Promise.all([
        listRecentDriveFiles(),
        listUpcomingCalendarEvents(),
      ]);
      setDriveFiles(files);
      setCalendarEvents(events);
      setStatusMsg(
        'Archivos de Google Drive y eventos de Google Calendar actualizados.'
      );
    } catch {
      setNeedsAuth(true);
      setStatusMsg(
        'Vuelve a pulsar "Conectar con Google" para refrescar el permiso de acceso.'
      );
    } finally {
      setLoadingAction(false);
    }
  };

  const handleCargarDesdeFirestore = async () => {
    setLoadingAction(true);
    setStatusMsg(null);
    try {
      const remotos = await loadCandidaturasFromFirestore();
      if (remotos && remotos.length > 0) {
        onReplaceRegistrosKanban(remotos);
        setStatusMsg(
          `Se han recuperado ${remotos.length} candidaturas guardadas en tu nube Firebase.`
        );
      } else {
        setStatusMsg(
          'Aún no tenías candidaturas guardadas en Firebase. Pulsa "Guardar mis candidaturas en Firebase" para hacer tu primera copia.'
        );
      }
    } catch {
      setStatusMsg('Inicia sesión con Google para sincronizar con Firebase.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-300/80 shadow-sm space-y-6 print:hidden">
      {/* Cabecera de Google Workspace + Firebase Cloud */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold uppercase tracking-wider">
            <Cloud className="w-3.5 h-3.5" />
            Conectado con tu Cuenta de Google y Nube Firebase (Uso Privado de Pilar)
          </span>
          <h3
            className="text-xl sm:text-2xl font-bold text-slate-900 mt-1.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ☁️ Mi Nube Google: Drive · Docs · Gmail · Calendar · Firebase
          </h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Guarda tu CV en Google Docs/Drive, agenda entrevistas en tu Google Calendar, prepara borradores en tu Gmail y haz copia de seguridad de tus candidaturas en Firebase.
          </p>
        </div>

        {/* Botón Oficial Sign in with Google o Estado Conectado */}
        {needsAuth || !user ? (
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-extrabold text-sm shadow-sm flex items-center gap-3 cursor-pointer shrink-0 transition-all"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5 block shrink-0"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span>
              {isLoggingIn
                ? 'Conectando con Google...'
                : 'Sign in with Google (Conectar mi cuenta)'}
            </span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Conectada: {user.email}
            </span>
            <button
              type="button"
              onClick={cargarDatosDriveYCalendar}
              disabled={loadingAction}
              className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Ver mi Drive y Calendar</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        )}
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-teal-50 border border-teal-300 text-sm font-bold text-[#0F766E] flex items-center justify-between gap-2">
          <span>{statusMsg}</span>
          <button
            type="button"
            onClick={() => setStatusMsg(null)}
            className="text-xs underline cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Las 4 herramientas integradas cuando Pilar inicia sesión */}
      {!needsAuth && user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. GOOGLE DOCS + GOOGLE DRIVE */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>1. Google Docs y Google Drive</span>
              </h4>
              <FolderOpen className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-xs text-slate-600">
              Crea automáticamente un documento de Google Docs en tu Google Drive con tu Currículum Oficial o tu Carta de Presentación.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={loadingAction}
                onClick={() =>
                  setConfirmDialog({
                    title: '¿Crear CV Oficial en tu Google Docs / Drive?',
                    description:
                      'Se creará un documento nuevo llamado "CV Oficial — Pilar Fernández Almaraz" dentro de tu Google Drive con todos tus datos reales y tu Curso de 120h de IA.',
                    confirmLabel: 'Sí, crear documento en Google Docs',
                    onConfirm: async () => {
                      setLoadingAction(true);
                      try {
                        const docCreado = await createGoogleDocWithContent(
                          'CV Oficial — Pilar Fernández Almaraz (Santo Domingo-Caudilla)',
                          textoCVCompletoPlano
                        );
                        setStatusMsg(
                          `¡Documento creado en tu Google Docs! ID: ${docCreado.documentId}`
                        );
                        await cargarDatosDriveYCalendar();
                      } finally {
                        setLoadingAction(false);
                      }
                    },
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
              >
                📄 Guardar mi CV Oficial en Google Docs
              </button>

              <button
                type="button"
                disabled={loadingAction}
                onClick={handleCargarDesdeFirestore}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold text-xs cursor-pointer"
              >
                ☁️ Cargar candidaturas desde Firebase
              </button>

              <button
                type="button"
                disabled={loadingAction}
                onClick={() =>
                  setConfirmDialog({
                    title:
                      '¿Guardar copia de seguridad de tus candidaturas en Firebase?',
                    description: `Se actualizarán tus ${registrosKanban.length} candidaturas del tablero Kanban en tu base de datos privada de Firebase Firestore.`,
                    confirmLabel: 'Sí, guardar en Firebase',
                    onConfirm: async () => {
                      setLoadingAction(true);
                      try {
                        await syncCandidaturasToFirestore(registrosKanban);
                        setStatusMsg(
                          `¡Tus ${registrosKanban.length} candidaturas se han guardado en Firebase Firestore!`
                        );
                      } finally {
                        setLoadingAction(false);
                      }
                    },
                  })
                }
                className="px-3.5 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs cursor-pointer"
              >
                💾 Guardar mis candidaturas en Firebase
              </button>
            </div>

            {driveFiles.length > 0 && (
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <p className="text-[11px] font-extrabold uppercase text-slate-500">
                  Tus archivos recientes en Google Drive:
                </p>
                <ul className="space-y-1 text-xs">
                  {driveFiles.slice(0, 4).map((f) => (
                    <li
                      key={f.id}
                      className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <span className="truncate font-medium text-slate-800">
                        {f.name}
                      </span>
                      {f.webViewLink && (
                        <a
                          href={f.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-bold flex items-center gap-1 shrink-0 ml-2"
                        >
                          <span>Abrir</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 2. GOOGLE CALENDAR */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span>2. Google Calendar (Agendar Entrevista o Seguimiento)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <input
                type="text"
                value={calTitulo}
                onChange={(e) => setCalTitulo(e.target.value)}
                placeholder="Título del recordatorio..."
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
              />
              <input
                type="date"
                value={calFecha}
                onChange={(e) => setCalFecha(e.target.value)}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
              />
            </div>
            <button
              type="button"
              disabled={loadingAction}
              onClick={() =>
                setConfirmDialog({
                  title: '¿Añadir este recordatorio a tu Google Calendar?',
                  description: `Se creará el evento "${calTitulo}" el día ${calFecha} a las 10:00 h en tu calendario principal de Google.`,
                  confirmLabel: 'Sí, agendar en Google Calendar',
                  onConfirm: async () => {
                    setLoadingAction(true);
                    try {
                      await createCalendarFollowUpEvent({
                        summary: calTitulo,
                        description:
                          'Recordatorio creado desde Pilar Empleo IA (Santo Domingo-Caudilla / Torrijos).',
                        location: 'Torrijos / Santo Domingo-Caudilla',
                        dateYYYYMMDD: calFecha,
                      });
                      setStatusMsg(
                        `¡Evento "${calTitulo}" agendado en tu Google Calendar para el ${calFecha}!`
                      );
                      await cargarDatosDriveYCalendar();
                    } finally {
                      setLoadingAction(false);
                    }
                  },
                })
              }
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
            >
              📅 Añadir recordatorio a mi Google Calendar
            </button>

            {calendarEvents.length > 0 && (
              <div className="pt-2 border-t border-slate-200 space-y-1">
                <p className="text-[11px] font-extrabold uppercase text-slate-500">
                  Próximas citas en tu Google Calendar:
                </p>
                {calendarEvents.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                  >
                    <span className="truncate font-semibold text-slate-800">
                      {ev.summary}
                    </span>
                    <span className="text-slate-500 text-[11px] ml-2 shrink-0">
                      {ev.start.slice(0, 10)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. GMAIL (Borradores y Envío directo con confirmación) */}
          <div className="md:col-span-2 bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-red-600" />
              <span>
                3. Gmail Directo (Guardar Borrador o Enviar Candidatura desde tu Gmail)
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Correo de destino (empresa o tu propio correo de prueba):
                </label>
                <input
                  type="email"
                  value={gmailDestinatario}
                  onChange={(e) => setGmailDestinatario(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">
                  Asunto:
                </label>
                <input
                  type="text"
                  value={gmailAsunto}
                  onChange={(e) => setGmailAsunto(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
                />
              </div>
            </div>
            <textarea
              rows={3}
              value={gmailCuerpo}
              onChange={(e) => setGmailCuerpo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs"
            />
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={loadingAction}
                onClick={() =>
                  setConfirmDialog({
                    title: '¿Guardar este correo en tus Borradores de Gmail?',
                    description: `Se guardará un borrador en tu cuenta de Gmail dirigido a "${gmailDestinatario}" con el asunto "${gmailAsunto}".`,
                    confirmLabel: 'Sí, guardar en Borradores de Gmail',
                    onConfirm: async () => {
                      setLoadingAction(true);
                      try {
                        await createOrSendGmailCandidatura({
                          toEmail: gmailDestinatario,
                          subject: gmailAsunto,
                          bodyText: gmailCuerpo,
                          mode: 'draft',
                        });
                        setStatusMsg(
                          '¡Borrador guardado en tu cuenta de Gmail! Puedes abrir Gmail para adjuntar tu PDF y enviarlo.'
                        );
                      } finally {
                        setLoadingAction(false);
                      }
                    },
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
              >
                📥 Guardar en Borradores de mi Gmail
              </button>

              <button
                type="button"
                disabled={loadingAction}
                onClick={() =>
                  setConfirmDialog({
                    title: '¿Enviar este correo ahora desde tu cuenta de Gmail?',
                    description: `Se enviará un correo electrónico real desde tu Gmail a "${gmailDestinatario}" con el asunto "${gmailAsunto}".`,
                    confirmLabel: 'Sí, enviar correo ahora',
                    onConfirm: async () => {
                      setLoadingAction(true);
                      try {
                        await createOrSendGmailCandidatura({
                          toEmail: gmailDestinatario,
                          subject: gmailAsunto,
                          bodyText: gmailCuerpo,
                          mode: 'send',
                        });
                        setStatusMsg(
                          `¡Correo enviado con éxito a ${gmailDestinatario} a través de Gmail!`
                        );
                      } finally {
                        setLoadingAction(false);
                      }
                    },
                  })
                }
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
              >
                ✉️ Enviar Correo ahora con Gmail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal obligatorio de confirmación antes de crear/modificar/enviar en Google Workspace o Firebase */}
      {confirmDialog && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  {confirmDialog.title}
                </h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {confirmDialog.description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={async () => {
                  const fn = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  await fn();
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-xs cursor-pointer"
              >
                {confirmDialog.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
