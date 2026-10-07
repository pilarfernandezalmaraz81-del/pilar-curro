import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Send,
  ExternalLink,
  AlertCircle,
  PhoneCall,
  Camera,
  Eye,
  EyeOff,
  Car,
  Award,
  Sparkles,
  CheckCircle2,
  QrCode,
} from 'lucide-react';
import {
  IdiomaApp,
  EstadoKanban,
  ESTADOS_KANBAN_LISTA,
  LocalidadPrioritaria,
  FiltroPuestoBuscador,
  FILTROS_PUESTO_LISTA,
  RegistroCandidaturaKanban,
  DATOS_USUARIA_PILAR,
  OFERTAS_INTELIGENTES,
  PLAN_10_DIAS_COMPLETO,
  PREGUNTAS_PREPARADOR_ENTREVISTAS,
  TEXTOS_UI_BILINGUE,
  OfertaEmpleoCompleta,
} from './data/pilarProfile';
import { DossierModal } from './components/DossierModal';
import { KanbanTracker } from './components/KanbanTracker';
import { CompaniesDirectory } from './components/CompaniesDirectory';
import { CVAndRecruiterSection } from './components/CVAndRecruiterSection';
import { PublicCurriculumWeb } from './components/PublicCurriculumWeb';
import { GoogleWorkspacePanel } from './components/GoogleWorkspacePanel';
import fotoPerfilPilarDefault from './assets/images/foto_perfil_pilar_1791355873289.jpg';
import avatarPilarIa from './assets/images/avatar_pilar_empleo_ia_1791288587100.jpg';

type SeccionActiva =
  | 'dashboard-bienvenida'
  | 'buscador-inteligente'
  | 'directorio-empresas'
  | 'plan-10-dias'
  | 'gestor-kanban'
  | 'entrevistas-pilar-ia'
  | 'web-presentacion';

interface MensajeChat {
  id: string;
  emisor: 'pilar-ia' | 'usuaria';
  texto: string;
  hora: string;
}

export default function App() {
  const [esAccesoDirectoQR] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('vista');
    return v === 'curriculum' || v === 'reclutador' || v === 'presentacion';
  });

  const [viendoSoloWebEmpresas, setViendoSoloWebEmpresas] = useState<boolean>(
    () => {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('vista');
      return v === 'curriculum' || v === 'reclutador' || v === 'presentacion';
    }
  );

  const [seccionActiva, setSeccionActiva] = useState<SeccionActiva>(
    'dashboard-bienvenida'
  );

  // Idioma: Español de España (predeterminado) o English
  const [idioma, setIdioma] = useState<IdiomaApp>('es');
  const t = TEXTOS_UI_BILINGUE[idioma];

  // Privacidad de datos sensibles (DNI, dirección completa, teléfono, email)
  const [privacidadActiva, setPrivacidadActiva] = useState<boolean>(true);
  const [telefonoReal, setTelefonoReal] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('pilar_tel_real') ||
        DATOS_USUARIA_PILAR.telefonoDefault
      );
    } catch {
      return DATOS_USUARIA_PILAR.telefonoDefault;
    }
  });
  const [direccionReal, setDireccionReal] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('pilar_dir_real') ||
        DATOS_USUARIA_PILAR.direccionDefault
      );
    } catch {
      return DATOS_USUARIA_PILAR.direccionDefault;
    }
  });
  const [dniReal, setDniReal] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('pilar_dni_real') || DATOS_USUARIA_PILAR.dniDefault
      );
    } catch {
      return DATOS_USUARIA_PILAR.dniDefault;
    }
  });
  const [emailReal, setEmailReal] = useState<string>(() => {
    try {
      return (
        localStorage.getItem('pilar_email_real') ||
        DATOS_USUARIA_PILAR.emailDefault
      );
    } catch {
      return DATOS_USUARIA_PILAR.emailDefault;
    }
  });
  const [editandoDatosPersonales, setEditandoDatosPersonales] =
    useState<boolean>(false);

  // Fotografía circular de Pilar
  const [fotoPilarCustom, setFotoPilarCustom] = useState<string | null>(() => {
    try {
      return localStorage.getItem('pilar_foto_perfil_custom');
    } catch {
      return null;
    }
  });
  const [imgPilarError, setImgPilarError] = useState<boolean>(false);
  const [imgIaError, setImgIaError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Día actual del Plan de 10 Días y checklist de tareas
  const [diaPlanActual, setDiaPlanActual] = useState<number>(1);
  const [tareasCompletadas, setTareasCompletadas] = useState<
    Record<string, boolean>
  >(() => {
    try {
      const saved = localStorage.getItem('pilar_tareas_10dias_v3');
      return saved ? JSON.parse(saved) : { 'd1-t1': true };
    } catch {
      return { 'd1-t1': true };
    }
  });

  // Ofertas inteligentes (incluye las creadas con el analizador IA)
  const [ofertas, setOfertas] = useState<OfertaEmpleoCompleta[]>(() => {
    try {
      const saved = localStorage.getItem('pilar_ofertas_custom_v3');
      if (saved) {
        const custom: OfertaEmpleoCompleta[] = JSON.parse(saved);
        return [...custom, ...OFERTAS_INTELIGENTES];
      }
      return OFERTAS_INTELIGENTES;
    } catch {
      return OFERTAS_INTELIGENTES;
    }
  });

  // Registros completos del Gestor de Candidaturas (Kanban con los 11 campos)
  const [registrosKanban, setRegistrosKanban] = useState<
    RegistroCandidaturaKanban[]
  >(() => {
    try {
      const saved = localStorage.getItem('pilar_registros_kanban_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const hoy = new Date().toISOString().split('T')[0];
    return OFERTAS_INTELIGENTES.map((of, index) => ({
      id: `kan-${of.id}`,
      ofertaId: of.id,
      empresa: of.empresa,
      puesto: of.tituloPuesto,
      localidad: of.municipioExacto,
      fecha: hoy,
      fuente: of.fuenteOferta,
      enlace: of.enlaceWebOficial,
      estado: index < 3 ? 'Me interesa' : 'Nueva',
      notas:
        index === 0
          ? 'A 6 minutos en coche propio desde Santo Domingo-Caudilla. Destacar Curso IA 120h.'
          : '',
      fechaSeguimiento: '',
      contacto: of.contactoReferencia,
      resultado: 'Pendiente de enviar CV',
    }));
  });

  // Filtros del Buscador de Empleo
  const [filtroLocalidad, setFiltroLocalidad] = useState<
    LocalidadPrioritaria | 'TODAS'
  >('TODAS');
  const [filtroDistanciaModo, setFiltroDistanciaModo] = useState<
    '5' | '8' | '15' | 'custom'
  >('8');
  const [distanciaCustomKm, setDistanciaCustomKm] = useState<number>(15);
  const [filtroPuesto, setFiltroPuesto] = useState<
    FiltroPuestoBuscador | 'TODOS'
  >('TODOS');
  const [filtroJornada, setFiltroJornada] = useState<
    'Ambas' | 'Completa' | 'Parcial'
  >('Ambas');
  const [filtroModalidad, setFiltroModalidad] = useState<
    'Ambas' | 'Presencial' | 'Híbrido'
  >('Ambas');
  const [permitirPocaExperiencia, setPermitirPocaExperiencia] =
    useState<boolean>(true);
  const [busquedaPalabra, setBusquedaPalabra] = useState<string>('');

  // Modal Dossier ("Preparar Mi Candidatura")
  const [ofertaDossierActiva, setOfertaDossierActiva] =
    useState<OfertaEmpleoCompleta | null>(null);

  // Analizador IA de ofertas externas
  const [empresaNuevaOferta, setEmpresaNuevaOferta] = useState<string>('');
  const [textoNuevaOferta, setTextoNuevaOferta] = useState<string>('');
  const [analizandoOferta, setAnalizandoOferta] = useState<boolean>(false);

  // Preparador de entrevistas y Chat con "Pilar IA"
  const [preguntaEntrevistaId, setPreguntaEntrevistaId] =
    useState<string>('ent-1');
  const [mensajesChat, setMensajesChat] = useState<MensajeChat[]>([
    {
      id: 'msg-bienvenida',
      emisor: 'pilar-ia',
      texto:
        '¡Buenos días, Pilar! Vamos a ver qué podemos hacer hoy. Estoy aquí para ayudarte durante tus 10 días de búsqueda en Santo Domingo-Caudilla, Torrijos, Alcabón y Novés. Por ejemplo, la oferta de Recepción en Torrijos tiene un 96% de compatibilidad con tu perfil, ¡creo que merece mucho la pena intentarlo! ¿Qué te apetece que preparemos primero?',
      hora: 'Hoy',
    },
  ]);
  const [inputChat, setInputChat] = useState<string>('');
  const [enviandoChat, setEnviandoChat] = useState<boolean>(false);

  // Copiar al portapapeles
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(
        'pilar_tareas_10dias_v3',
        JSON.stringify(tareasCompletadas)
      );
    } catch {
      // ignore
    }
  }, [tareasCompletadas]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'pilar_registros_kanban_v3',
        JSON.stringify(registrosKanban)
      );
    } catch {
      // ignore
    }
  }, [registrosKanban]);

  useEffect(() => {
    try {
      localStorage.setItem('pilar_tel_real', telefonoReal);
      localStorage.setItem('pilar_dir_real', direccionReal);
      localStorage.setItem('pilar_dni_real', dniReal);
      localStorage.setItem('pilar_email_real', emailReal);
    } catch {
      // ignore
    }
  }, [telefonoReal, direccionReal, dniReal, emailReal]);

  const handleCopyText = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto);
    setCopiadoId(id);
    setTimeout(() => {
      setCopiadoId((prev) => (prev === id ? null : prev));
    }, 2500);
  };

  const handleDescargarTxt = (nombreArchivo: string, contenido: string) => {
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubirFotoPilar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFotoPilarCustom(reader.result);
        setImgPilarError(false);
        try {
          localStorage.setItem('pilar_foto_perfil_custom', reader.result);
        } catch {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const fotoPilarActiva = fotoPilarCustom || fotoPerfilPilarDefault;

  // Datos protegidos o visibles según el interruptor de Privacidad
  const telefonoMostrar = privacidadActiva
    ? '6•• •• •• 98 (Protegido)'
    : telefonoReal;
  const direccionMostrar = privacidadActiva
    ? 'Santo Domingo-Caudilla, Toledo (CP 45526)'
    : direccionReal;
  const dniMostrar = privacidadActiva ? '•••••234-P' : dniReal;
  const emailMostrar = privacidadActiva
    ? 'pilar•••@gmail.com (Protegido)'
    : emailReal;

  const datosContactoPie = `Pilar Fernández Almaraz\nLocalidad: ${direccionMostrar}\nMovilidad: Permiso de conducir y coche propio\nTeléfono: ${telefonoMostrar} | Email: ${emailMostrar}`;

  const urlModoReclutador = `${window.location.origin}${window.location.pathname}?vista=curriculum`;

  // Helpers para sincronizar ofertas con Kanban
  const obtenerEstadoOferta = (ofertaId: string): EstadoKanban => {
    const reg = registrosKanban.find((r) => r.ofertaId === ofertaId);
    return reg ? reg.estado : 'Nueva';
  };

  const cambiarEstadoOferta = (
    oferta: OfertaEmpleoCompleta,
    nuevoEstado: EstadoKanban
  ) => {
    setRegistrosKanban((prev) => {
      const existe = prev.find((r) => r.ofertaId === oferta.id);
      if (existe) {
        return prev.map((r) =>
          r.ofertaId === oferta.id ? { ...r, estado: nuevoEstado } : r
        );
      }
      const hoy = new Date().toISOString().split('T')[0];
      return [
        {
          id: `kan-${oferta.id}`,
          ofertaId: oferta.id,
          empresa: oferta.empresa,
          puesto: oferta.tituloPuesto,
          localidad: oferta.municipioExacto,
          fecha: hoy,
          fuente: oferta.fuenteOferta,
          enlace: oferta.enlaceWebOficial,
          estado: nuevoEstado,
          notas: '',
          fechaSeguimiento: '',
          contacto: oferta.contactoReferencia,
          resultado: 'En proceso',
        },
        ...prev,
      ];
    });
  };

  const handleUpdateRegistroKanban = (
    id: string,
    cambios: Partial<RegistroCandidaturaKanban>
  ) => {
    setRegistrosKanban((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...cambios } : r))
    );
  };

  const handleAddRegistroKanbanManual = (
    nuevo: Omit<RegistroCandidaturaKanban, 'id'>
  ) => {
    setRegistrosKanban((prev) => [
      { ...nuevo, id: `kan-manual-${Date.now()}` },
      ...prev,
    ]);
  };

  // Analizar oferta externa con IA y abrir Dossier de 7 puntos
  const handleAnalizarYPrepararOfertaExterna = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textoNuevaOferta.trim()) return;
    setAnalizandoOferta(true);
    try {
      const res = await fetch('/api/ai/analyze-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          empresaOLocalidad:
            empresaNuevaOferta.trim() ||
            'Empresa en Comarca (Torrijos / Santo Domingo-Caudilla)',
          textoOferta: textoNuevaOferta.trim(),
        }),
      });
      const data = await res.json();
      const nuevaId = `of-ia-${Date.now()}`;
      const nuevaOferta: OfertaEmpleoCompleta = {
        id: nuevaId,
        diaPlan: diaPlanActual,
        destacadaDia1: false,
        tituloPuesto: data.tituloDetectado || 'Puesto Analizado para Pilar',
        empresa:
          empresaNuevaOferta.trim() || 'Empresa en la Comarca de Torrijos',
        localidad: 'Torrijos',
        municipioExacto: empresaNuevaOferta.trim() || 'Torrijos / Comarca',
        distanciaKm: 5,
        tiempoCocheMin: 6,
        categoriaPuesto: 'Atención al cliente',
        etiquetasPuesto: [
          'Atención al cliente',
          'Recepción',
          'Auxiliar administrativo',
          'Otros compatibles',
        ],
        jornada: 'Ambas',
        modalidad: 'Presencial',
        permitePocaExperiencia: true,
        fuenteOferta: 'Analizador IA de Ofertas',
        compatibilidadPorcentaje: data.compatibilidadPorcentaje || 92,
        desgloseCompatibilidad: {
          experiencia: 92,
          formacion: 95,
          movilidadCoche: 100,
          actitudYTrato: 98,
        },
        checksCompatibilidad: data.checksCompatibilidad || [
          '✓ Experiencia en atención al cliente',
          '✓ Experiencia en comercio',
          '✓ Formación administrativa (FP Auxiliar Administrativo)',
          '✓ Curso de IA de 120 horas (Cámara de Comercio de Torrijos)',
          '✓ Coche propio',
          '✓ Permiso de conducir',
        ],
        puntosFuertesEncaje: data.puntosFuertesEncaje || [],
        requisitoNoCumplidoOAlerta:
          data.requisitoNoCumplidoOAlerta ||
          'Revisar si solicitan algún programa informático propio.',
        comoDefenderSinDescartar:
          data.comoDefenderSinDescartar ||
          'Destaca tu coche propio desde Santo Domingo-Caudilla y tu Curso de 120h de IA.',
        enlaceWebOficial: 'https://www.google.com',
        contactoReferencia: 'Candidatura directa preparada con Pilar Empleo IA',
        guionLlamadaDirecta: data.guionLlamadaDirecta || '',
        dossierCandidatura: {
          resumenCVAdaptado: data.resumenCVAdaptado || '',
          cartaPresentacionNatural: data.cartaPresentacionNatural || '',
          emailAsunto: data.emailAsunto || '',
          emailCuerpo: data.emailCuerpo || '',
          mensajeLinkedInBreve: data.mensajeLinkedInBreve || '',
          presentacionCorta: data.presentacionCorta || '',
          preguntaProbableEntrevista: data.preguntaProbableEntrevista || '',
          respuestaRecomendadaPilar: data.respuestaRecomendadaPilar || '',
          puntosFuertesYRequisitosExplicar:
            data.puntosFuertesYRequisitosExplicar || [],
        },
      };

      setOfertas((prev) => {
        const actualizadas = [nuevaOferta, ...prev];
        try {
          const soloCustom = actualizadas.filter((o) =>
            o.id.startsWith('of-ia-')
          );
          localStorage.setItem(
            'pilar_ofertas_custom_v3',
            JSON.stringify(soloCustom)
          );
        } catch {
          // ignore
        }
        return actualizadas;
      });

      cambiarEstadoOferta(nuevaOferta, 'CV Preparado');
      setOfertaDossierActiva(nuevaOferta);
      setEmpresaNuevaOferta('');
      setTextoNuevaOferta('');
    } finally {
      setAnalizandoOferta(false);
    }
  };

  // Enviar mensaje a la orientadora virtual "Pilar IA"
  const handleEnviarMensajeChat = async (textoConsulta?: string) => {
    const msg = (textoConsulta ?? inputChat).trim();
    if (!msg || enviandoChat) return;

    const nuevoMsgUsuaria: MensajeChat = {
      id: `u-${Date.now()}`,
      emisor: 'usuaria',
      texto: msg,
      hora: 'Ahora',
    };

    setMensajesChat((prev) => [...prev, nuevoMsgUsuaria]);
    if (!textoConsulta) setInputChat('');
    setEnviandoChat(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          diaActual: diaPlanActual,
        }),
      });
      const data = await res.json();
      setMensajesChat((prev) => [
        ...prev,
        {
          id: `ia-${Date.now()}`,
          emisor: 'pilar-ia',
          texto:
            data.reply ||
            '¡Buenos días, Pilar! Vamos a por todas en Santo Domingo-Caudilla, Torrijos, Alcabón y Novés.',
          hora: 'Ahora',
        },
      ]);
    } catch {
      setMensajesChat((prev) => [
        ...prev,
        {
          id: `ia-${Date.now()}`,
          emisor: 'pilar-ia',
          texto:
            '¡Buenos días, Pilar! Recuerda destacar siempre tu coche propio desde Santo Domingo-Caudilla, tu FP de Auxiliar Administrativo y tu Curso de 120 horas de IA en la Cámara de Comercio de Torrijos.',
          hora: 'Ahora',
        },
      ]);
    } finally {
      setEnviandoChat(false);
    }
  };

  // Filtrado de ofertas en el Buscador de Empleo
  const kmMaximoActivo =
    filtroDistanciaModo === '5'
      ? 5
      : filtroDistanciaModo === '8'
      ? 8
      : filtroDistanciaModo === '15'
      ? 15
      : distanciaCustomKm;

  const ofertasFiltradas = ofertas.filter((of) => {
    const pasaLoc =
      filtroLocalidad === 'TODAS' || of.localidad === filtroLocalidad;
    const pasaDist = of.distanciaKm <= kmMaximoActivo;
    const pasaPuesto =
      filtroPuesto === 'TODOS' ||
      of.categoriaPuesto === filtroPuesto ||
      of.etiquetasPuesto.includes(filtroPuesto);
    const pasaJornada =
      filtroJornada === 'Ambas' ||
      of.jornada === 'Ambas' ||
      of.jornada === filtroJornada;
    const pasaModalidad =
      filtroModalidad === 'Ambas' || of.modalidad === filtroModalidad;
    const pasaExp = permitirPocaExperiencia ? true : of.permitePocaExperiencia;
    const pasaPalabra =
      !busquedaPalabra.trim() ||
      `${of.tituloPuesto} ${of.empresa} ${of.municipioExacto}`
        .toLowerCase()
        .includes(busquedaPalabra.toLowerCase());

    return (
      pasaLoc &&
      pasaDist &&
      pasaPuesto &&
      pasaJornada &&
      pasaModalidad &&
      pasaExp &&
      pasaPalabra
    );
  });

  // Los 6 contadores de "MI BÚSQUEDA DE EMPLEO"
  const contOfertasEncontradas = ofertas.length;
  const contOfertasInteresantes = registrosKanban.filter((r) =>
    [
      'Me interesa',
      'CV Preparado',
      'CV Enviado',
      'Contactada',
      'Entrevista',
      'Seguimiento',
      'Conseguido',
    ].includes(r.estado)
  ).length;
  const contCvEnviados = registrosKanban.filter((r) =>
    [
      'CV Enviado',
      'Contactada',
      'Entrevista',
      'Seguimiento',
      'Conseguido',
    ].includes(r.estado)
  ).length;
  const contContactosRealizados = registrosKanban.filter((r) =>
    ['Contactada', 'Entrevista', 'Seguimiento', 'Conseguido'].includes(r.estado)
  ).length;
  const contEntrevistas = registrosKanban.filter((r) =>
    ['Entrevista', 'Conseguido'].includes(r.estado)
  ).length;
  const contRespuestas = registrosKanban.filter((r) =>
    ['Entrevista', 'Seguimiento', 'Conseguido'].includes(r.estado)
  ).length;

  const textoCVCompletoPlano = `CURRÍCULUM VITAE — ${DATOS_USUARIA_PILAR.nombre.toUpperCase()}
${DATOS_USUARIA_PILAR.titularProfesional}
Ubicación: ${direccionMostrar}
Movilidad: ${DATOS_USUARIA_PILAR.movilidad}
Teléfono: ${telefonoMostrar} | Email: ${emailMostrar} | DNI: ${dniMostrar}

FORMACIÓN DESTACADA:
- Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos)
- FP Auxiliar Administrativo
- Graduado Escolar

OTROS CURSOS Y CONOCIMIENTOS:
${DATOS_USUARIA_PILAR.otrosConocimientos.join(', ')}

IDIOMAS:
Español: Nativo | Inglés: A2

EXPERIENCIA PROFESIONAL REAL:
${DATOS_USUARIA_PILAR.experienciaReal
  .map((e) => `• ${e.puesto} (${e.sector}): ${e.resumen}`)
  .join('\n')}

APTITUDES:
${DATOS_USUARIA_PILAR.aptitudes.join(', ')}`;

  const diaPlanObjeto =
    PLAN_10_DIAS_COMPLETO.find((d) => d.dia === diaPlanActual) ||
    PLAN_10_DIAS_COMPLETO[0];

  const preguntaActivaObj =
    PREGUNTAS_PREPARADOR_ENTREVISTAS.find(
      (p) => p.id === preguntaEntrevistaId
    ) || PREGUNTAS_PREPARADOR_ENTREVISTAS[0];

  // Si una empresa entra escaneando el Código QR (?vista=curriculum) o Pilar abre la vista de su Web Pública:
  // Se muestra ÚNICAMENTE su Web-Currículum limpia, sin nada de su asistente privado.
  if (viendoSoloWebEmpresas) {
    return (
      <PublicCurriculumWeb
        idioma={idioma}
        setIdioma={setIdioma}
        fotoPilarUrl={fotoPilarActiva}
        telefonoMostrar={telefonoMostrar}
        direccionMostrar={direccionMostrar}
        emailMostrar={emailMostrar}
        urlPublicaQR={urlModoReclutador}
        esVistaDesdeQRDirecto={esAccesoDirectoQR}
        onVolverAlAsistentePrivado={() => setViendoSoloWebEmpresas(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      {/* Input oculto para subir o cambiar la foto de perfil de Pilar */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleSubirFotoPilar}
        className="hidden"
      />

      {/* BARRA SUPERIOR (Navegación clara + Idioma ES/EN + Privacidad + QR) */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-2xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
          {/* Marca e identidad de Pilar */}
          <button
            type="button"
            onClick={() => setSeccionActiva('dashboard-bienvenida')}
            className="flex items-center gap-3 text-left cursor-pointer shrink-0"
          >
            {!imgPilarError ? (
              <img
                src={fotoPilarActiva}
                alt="Pilar Fernández Almaraz"
                onError={() => setImgPilarError(true)}
                className="w-11 h-11 rounded-full object-cover border-2 border-[#0F766E] shadow-xs"
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center text-sm">
                PF
              </div>
            )}
            <div>
              <span
                className="block text-lg font-extrabold text-slate-900 leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                PILAR EMPLEO IA
              </span>
              <span className="block text-xs font-semibold text-[#0F766E] mt-0.5">
                {t.subtituloApp}
              </span>
            </div>
          </button>

          {/* Enlaces rápidos de secciones */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {(
              [
                { id: 'dashboard-bienvenida', label: t.navInicio },
                { id: 'buscador-inteligente', label: t.navBuscador },
                { id: 'directorio-empresas', label: t.navDirectorio },
                { id: 'plan-10-dias', label: t.navPlan10 },
                { id: 'gestor-kanban', label: t.navKanban },
                { id: 'entrevistas-pilar-ia', label: t.navEntrevistas },
              ] as { id: SeccionActiva; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSeccionActiva(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  seccionActiva === item.id
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controles de Idioma (ES/EN), Privacidad y Botón QR Reclutador */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Selector Bilingüe Español / English */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIdioma('es')}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  idioma === 'es'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                🇪🇸 ES
              </button>
              <button
                type="button"
                onClick={() => setIdioma('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-all ${
                  idioma === 'en'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600'
                }`}
              >
                🇬🇧 EN
              </button>
            </div>

            {/* Botón Privacidad de DNI/Teléfono/Dirección */}
            <button
              type="button"
              onClick={() => setPrivacidadActiva(!privacidadActiva)}
              title="Ocultar o mostrar teléfono, dirección y DNI"
              className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 cursor-pointer ${
                privacidadActiva
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
            >
              {privacidadActiva ? (
                <EyeOff className="w-4 h-4 text-emerald-700" />
              ) : (
                <Eye className="w-4 h-4 text-amber-700" />
              )}
              <span className="hidden md:inline">
                {privacidadActiva ? 'Privacidad ON' : 'Datos Visibles'}
              </span>
            </button>

            {/* Botón Destacado QR / Modo Reclutador */}
            <button
              type="button"
              onClick={() => setSeccionActiva('web-presentacion')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all ${
                seccionActiva === 'web-presentacion'
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <QrCode className="w-4 h-4 text-amber-300" />
              <span>QR / Mi CV</span>
            </button>

            {/* Botón para ver la Web Pública exclusiva que ven las Empresas */}
            <button
              type="button"
              onClick={() => setViendoSoloWebEmpresas(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs cursor-pointer transition-all hidden sm:flex items-center gap-1.5"
              title="Ver exactamente la página web limpia que ven las empresas al escanear tu QR"
            >
              <span>🌐 Web Empresas</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-8 flex-1">
        {/* =========================================================
            BLOQUE HERO PRINCIPAL + LOS 8 BOTONES GRANDES Y ACCESIBLES
           ========================================================= */}
        <section className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F766E] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/30 relative overflow-hidden print:hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
              {/* Foto Circular Grande de Pilar + Presentación */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="relative shrink-0">
                  {!imgPilarError ? (
                    <img
                      src={fotoPilarActiva}
                      alt="Pilar Fernández Almaraz"
                      onError={() => setImgPilarError(true)}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-300 shadow-xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-2xl border-4 border-white">
                      PF
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-full px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold flex items-center justify-center gap-1 border border-white/25 cursor-pointer"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Mi foto</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider">
                      📍 Santo Domingo-Caudilla · Torrijos · Alcabón · Novés
                    </span>
                    <span className="px-3 py-1 rounded-full bg-teal-400/20 border border-teal-300/40 text-teal-100 text-xs font-bold flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-amber-300" />
                      Permiso de conducir y coche propio (Radio 8 km)
                    </span>
                  </div>

                  <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Pilar Empleo IA —{' '}
                    <span className="text-amber-300 font-normal">
                      {t.subtituloApp}
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl font-semibold text-teal-100">
                    «{t.lemaPrincipal}»
                  </p>

                  {/* Insignia visible del Curso de IA de 120 horas */}
                  <div className="inline-flex flex-wrap items-center gap-2 bg-white/10 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20 text-xs sm:text-sm text-white">
                    <Award className="w-4 h-4 text-amber-300 shrink-0" />
                    <span className="font-bold">
                      Curso de Inteligencia Artificial — 120 horas
                    </span>
                    <span className="text-teal-200">
                      · Certificado por la Cámara de Comercio de Torrijos + FP Auxiliar Administrativo
                    </span>
                  </div>
                </div>
              </div>

              {/* Tarjeta rápida de la orientadora "Pilar IA" */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 max-w-md w-full flex items-start gap-3.5">
                {!imgIaError ? (
                  <img
                    src={avatarPilarIa}
                    alt="Asistente Pilar IA"
                    onError={() => setImgIaError(true)}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-300 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center shrink-0">
                    IA
                  </div>
                )}
                <div className="text-xs sm:text-sm space-y-1">
                  <p className="font-bold text-amber-300">
                    🤖 Tu Orientadora «Pilar IA» (Día {diaPlanActual} de 10):
                  </p>
                  <p className="text-slate-100 leading-relaxed">
                    {diaPlanObjeto.mensajeMotivador}
                  </p>
                </div>
              </div>
            </div>

            {/* LOS 8 BOTONES PRINCIPALES GRANDES, CLAROS Y ACCESIBLES */}
            <div className="pt-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-teal-200 mb-2.5">
                Centro de Mando Principal — Pulsa cualquier botón grande para ir directamente:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setSeccionActiva('buscador-inteligente')}
                  className={`p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border text-left shadow-sm ${
                    seccionActiva === 'buscador-inteligente'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.01]'
                      : 'bg-white text-slate-900 hover:bg-teal-50 border-white'
                  }`}
                >
                  <span className="text-2xl">🔎</span>
                  <div>
                    <span className="block leading-tight">BUSCAR EMPLEO</span>
                    <span className="block text-xs font-medium text-slate-600">
                      Ofertas a 5-8 km y compatibilidad
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('directorio-empresas')}
                  className={`p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border text-left shadow-sm ${
                    seccionActiva === 'directorio-empresas'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.01]'
                      : 'bg-white text-slate-900 hover:bg-teal-50 border-white'
                  }`}
                >
                  <span className="text-2xl">🏢</span>
                  <div>
                    <span className="block leading-tight">BUSCAR EMPRESAS</span>
                    <span className="block text-xs font-medium text-slate-600">
                      Empresas que podrían contratarme
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('web-presentacion')}
                  className={`p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border text-left shadow-sm ${
                    seccionActiva === 'web-presentacion'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.01]'
                      : 'bg-white text-slate-900 hover:bg-teal-50 border-white'
                  }`}
                >
                  <span className="text-2xl">📄</span>
                  <div>
                    <span className="block leading-tight">MI CV</span>
                    <span className="block text-xs font-medium text-slate-600">
                      Ver, copiar o imprimir en A4
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOfertaDossierActiva(ofertas[0])}
                  className="p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border bg-white text-slate-900 hover:bg-teal-50 border-white text-left shadow-sm"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <span className="block leading-tight">
                      PREPARAR CANDIDATURA
                    </span>
                    <span className="block text-xs font-medium text-slate-600">
                      CV, Carta, Email y LinkedIn
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('entrevistas-pilar-ia')}
                  className={`p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border text-left shadow-sm ${
                    seccionActiva === 'entrevistas-pilar-ia'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.01]'
                      : 'bg-white text-slate-900 hover:bg-teal-50 border-white'
                  }`}
                >
                  <span className="text-2xl">🎤</span>
                  <div>
                    <span className="block leading-tight">
                      PREPARAR ENTREVISTA
                    </span>
                    <span className="block text-xs font-medium text-slate-600">
                      Preguntas y respuestas reales
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('gestor-kanban')}
                  className={`p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border text-left shadow-sm ${
                    seccionActiva === 'gestor-kanban'
                      ? 'bg-amber-400 text-slate-950 border-amber-300 scale-[1.01]'
                      : 'bg-white text-slate-900 hover:bg-teal-50 border-white'
                  }`}
                >
                  <span className="text-2xl">📋</span>
                  <div>
                    <span className="block leading-tight">MIS CANDIDATURAS</span>
                    <span className="block text-xs font-medium text-slate-600">
                      Tablero Kanban y seguimiento
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('entrevistas-pilar-ia')}
                  className="p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border bg-white text-slate-900 hover:bg-teal-50 border-white text-left shadow-sm"
                >
                  <span className="text-2xl">🤖</span>
                  <div>
                    <span className="block leading-tight">
                      HABLAR CON MI ASISTENTE
                    </span>
                    <span className="block text-xs font-medium text-slate-600">
                      Consultorio directo con Pilar IA
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('web-presentacion')}
                  className="p-4 rounded-2xl font-extrabold text-base flex items-center gap-3 transition-all cursor-pointer border-2 bg-amber-400 hover:bg-amber-300 text-slate-950 border-amber-200 text-left shadow-md"
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <span className="block leading-tight">
                      CÓDIGO QR / RECLUTADOR
                    </span>
                    <span className="block text-xs font-bold text-slate-800">
                      Tarjeta Digital en vivo
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECCIÓN 1: DASHBOARD PRINCIPAL ("MI BÚSQUEDA DE EMPLEO")
           ========================================================= */}
        {seccionActiva === 'dashboard-bienvenida' && (
          <div className="space-y-8">
            {/* PANEL: "MI BÚSQUEDA DE EMPLEO" con los 6 contadores y barra de 10 días */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                    PANEL DE CONTROL INTERACTIVO
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    MI BÚSQUEDA DE EMPLEO — DÍA {diaPlanActual} DE 10
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSeccionActiva('plan-10-dias')}
                  className="px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 font-bold text-sm cursor-pointer"
                >
                  Ver Plan Completo de 10 Días →
                </button>
              </div>

              {/* Los 6 Contadores Oficiales */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                {[
                  {
                    label: 'Ofertas encontradas',
                    valor: contOfertasEncontradas,
                    color: 'bg-slate-50 border-slate-200 text-slate-900',
                  },
                  {
                    label: 'Ofertas interesantes',
                    valor: contOfertasInteresantes,
                    color: 'bg-teal-50/70 border-teal-200 text-[#0F766E]',
                  },
                  {
                    label: 'CV enviados',
                    valor: contCvEnviados,
                    color: 'bg-blue-50/70 border-blue-200 text-blue-900',
                  },
                  {
                    label: 'Contactos realizados',
                    valor: contContactosRealizados,
                    color: 'bg-amber-50/70 border-amber-200 text-amber-900',
                  },
                  {
                    label: 'Entrevistas',
                    valor: contEntrevistas,
                    color: 'bg-emerald-50 border-emerald-300 text-emerald-900',
                  },
                  {
                    label: 'Respuestas',
                    valor: contRespuestas,
                    color: 'bg-purple-50/70 border-purple-200 text-purple-900',
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${stat.color} flex flex-col justify-between`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                      {stat.label}
                    </span>
                    <span className="text-3xl font-extrabold tabular-nums mt-2">
                      {stat.valor}
                    </span>
                  </div>
                ))}
              </div>

              {/* Barra de Progreso Interactiva de 10 Días */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-slate-700">
                  <span>
                    Barra de Progreso de 10 Días (Pulsa cualquier día para ver tus tareas):
                  </span>
                  <span className="text-[#0F766E] tabular-nums">
                    Progreso Día {diaPlanActual} de 10 ({diaPlanActual * 10}%)
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#0F766E] to-emerald-500 transition-all duration-300"
                    style={{ width: `${diaPlanActual * 10}%` }}
                  />
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-1">
                  {PLAN_10_DIAS_COMPLETO.map((d) => (
                    <button
                      key={d.dia}
                      type="button"
                      onClick={() => setDiaPlanActual(d.dia)}
                      className={`py-2.5 px-2 rounded-xl font-extrabold text-xs border transition-all cursor-pointer tabular-nums ${
                        diaPlanActual === d.dia
                          ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                          : d.dia < diaPlanActual
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Día {d.dia}
                    </button>
                  ))}
                </div>

                {/* Tareas del día seleccionado */}
                <div className="bg-teal-50/50 rounded-2xl p-5 border border-teal-200/80 space-y-3 mt-3">
                  <h3 className="font-bold text-base sm:text-lg text-slate-900">
                    📅 {diaPlanObjeto.titulo}
                  </h3>
                  <p className="text-sm text-slate-700">{diaPlanObjeto.focoDelDia}</p>
                  <div className="space-y-2 pt-1">
                    {diaPlanObjeto.tareasPasoAPaso.map((tarea) => {
                      const marcada = !!tareasCompletadas[tarea.id];
                      return (
                        <label
                          key={tarea.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            marcada
                              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                              : 'bg-white border-slate-200 text-slate-900 hover:border-teal-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={marcada}
                            onChange={() =>
                              setTareasCompletadas((prev) => ({
                                ...prev,
                                [tarea.id]: !prev[tarea.id],
                              }))
                            }
                            className="mt-1 w-5 h-5 accent-[#0F766E] rounded cursor-pointer"
                          />
                          <div>
                            <span
                              className={`block font-bold text-sm sm:text-base ${
                                marcada ? 'line-through opacity-80' : ''
                              }`}
                            >
                              {tarea.texto}
                            </span>
                            <span className="block text-xs text-slate-600 mt-0.5">
                              {tarea.explicacionSencilla}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* LAS 3 OFERTAS RECOMENDADAS HOY EN TU ZONA */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                    PRIORIDAD GEOGRÁFICA · SANTO DOMINGO-CAUDILLA, TORRIJOS, ALCABÓN Y NOVÉS
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-slate-900"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Ofertas Destacadas para Empezar Hoy
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSeccionActiva('buscador-inteligente')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm cursor-pointer"
                >
                  Ver todas las ofertas y filtros ({ofertas.length}) →
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {ofertas.slice(0, 3).map((oferta) => {
                  const estadoActual = obtenerEstadoOferta(oferta.id);
                  return (
                    <div
                      key={oferta.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold">
                            📍 {oferta.municipioExacto} ({oferta.distanciaKm} km)
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-extrabold tabular-nums">
                            COMPATIBILIDAD CON PILAR: {oferta.compatibilidadPorcentaje}%
                          </span>
                        </div>

                        <div>
                          <h3
                            className="text-xl font-bold text-slate-900 leading-snug"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            {oferta.tituloPuesto}
                          </h3>
                          <p className="text-sm font-semibold text-slate-600 mt-1">
                            {oferta.empresa}
                          </p>
                        </div>

                        {/* Lista clara de ✓ Checks de Compatibilidad */}
                        <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-1 text-xs text-slate-800">
                          {oferta.checksCompatibilidad.map((chk, idx) => (
                            <p key={idx} className="font-semibold text-emerald-950">
                              {chk}
                            </p>
                          ))}
                        </div>

                        {/* ⚠️ Requisitos que no cumples (sin descartar) */}
                        <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200 text-xs space-y-1">
                          <p className="font-extrabold text-amber-950">
                            ⚠️ REQUISITOS A TENER EN CUENTA:
                          </p>
                          <p className="text-amber-900">
                            {oferta.requisitoNoCumplidoOAlerta}
                          </p>
                          <p className="text-emerald-900 font-semibold pt-0.5">
                            ✓ No se descarta: {oferta.comoDefenderSinDescartar}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2.5 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setOfertaDossierActiva(oferta)}
                          className="w-full py-3.5 px-4 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>PREPARAR MI CANDIDATURA</span>
                        </button>

                        <div className="flex items-center justify-between gap-2">
                          <select
                            value={estadoActual}
                            onChange={(e) =>
                              cambiarEstadoOferta(
                                oferta,
                                e.target.value as EstadoKanban
                              )
                            }
                            className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800"
                          >
                            {ESTADOS_KANBAN_LISTA.map((est) => (
                              <option key={est} value={est}>
                                Estado: {est}
                              </option>
                            ))}
                          </select>

                          <a
                            href={oferta.enlaceWebOficial}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                          >
                            <span>Web</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* CONEXIÓN PRIVADA CON GOOGLE WORKSPACE (DRIVE, DOCS, GMAIL, CALENDAR) Y FIREBASE */}
            <GoogleWorkspacePanel
              registrosKanban={registrosKanban}
              onReplaceRegistrosKanban={(nuevos) => setRegistrosKanban(nuevos)}
              textoCVCompletoPlano={textoCVCompletoPlano}
              ofertaDestacada={ofertas[0]}
            />
          </div>
        )}

        {/* =========================================================
            SECCIÓN 2: BUSCADOR DE EMPLEO CON TODOS LOS FILTROS
           ========================================================= */}
        {seccionActiva === 'buscador-inteligente' && (
          <div className="space-y-8">
            {/* Panel de Filtros Completos */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  BUSCADOR DE EMPLEO INTELIGENTE · RADIO PRIORITARIO 8 KM
                </span>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  🔎 Buscar Empleo Compatible con Pilar
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-1">
                  Descubre oportunidades en Santo Domingo-Caudilla, Torrijos, Alcabón, Novés y alrededores aunque el nombre del puesto sea diferente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. LOCALIDAD */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    📍 LOCALIDAD:
                  </label>
                  <select
                    value={filtroLocalidad}
                    onChange={(e) =>
                      setFiltroLocalidad(
                        e.target.value as LocalidadPrioritaria | 'TODAS'
                      )
                    }
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                  >
                    <option value="TODAS">
                      Todas (Santo Domingo, Torrijos, Alcabón, Novés...)
                    </option>
                    <option value="Santo Domingo-Caudilla">
                      Santo Domingo-Caudilla (0-2 km)
                    </option>
                    <option value="Torrijos">Torrijos (5 km)</option>
                    <option value="Alcabón">Alcabón (3 km)</option>
                    <option value="Novés">Novés (7 km)</option>
                    <option value="Otras localidades cercanas">
                      Otras localidades cercanas (Portillo / Fuensalida)
                    </option>
                  </select>
                </div>

                {/* 2. DISTANCIA */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    🚗 DISTANCIA DESDE SANTO DOMINGO-CAUDILLA:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(
                      [
                        { id: '5', label: '5 km' },
                        { id: '8', label: '8 km (Ideal)' },
                        { id: '15', label: '15 km' },
                        { id: 'custom', label: 'Personalizada' },
                      ] as const
                    ).map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setFiltroDistanciaModo(d.id)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                          filtroDistanciaModo === d.id
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  {filtroDistanciaModo === 'custom' && (
                    <div className="mt-2 flex items-center gap-3">
                      <input
                        type="range"
                        min={2}
                        max={35}
                        value={distanciaCustomKm}
                        onChange={(e) =>
                          setDistanciaCustomKm(Number(e.target.value))
                        }
                        className="flex-1 accent-[#0F766E]"
                      />
                      <span className="text-xs font-extrabold text-[#0F766E] tabular-nums">
                        Hasta {distanciaCustomKm} km
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. PUESTO */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    💼 PUESTO OBJETIVO:
                  </label>
                  <select
                    value={filtroPuesto}
                    onChange={(e) =>
                      setFiltroPuesto(
                        e.target.value as FiltroPuestoBuscador | 'TODOS'
                      )
                    }
                    className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-bold text-slate-900"
                  >
                    <option value="TODOS">
                      Todos los puestos compatibles con Pilar
                    </option>
                    {FILTROS_PUESTO_LISTA.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. JORNADA */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    ⏰ JORNADA:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Ambas', 'Completa', 'Parcial'] as const).map((j) => (
                      <button
                        key={j}
                        type="button"
                        onClick={() => setFiltroJornada(j)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          filtroJornada === j
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        {j}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. MODALIDAD */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    🏢 MODALIDAD:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Ambas', 'Presencial', 'Híbrido'] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setFiltroModalidad(m)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          filtroModalidad === m
                            ? 'bg-[#0F766E] text-white border-[#0F766E]'
                            : 'bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. EXPERIENCIA Y PALABRA CLAVE */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1.5">
                    🔍 BUSCAR POR PALABRA:
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={busquedaPalabra}
                      onChange={(e) => setBusquedaPalabra(e.target.value)}
                      placeholder="Ej. recepción, clínica, caja, albaranes..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permitirPocaExperiencia}
                    onChange={(e) =>
                      setPermitirPocaExperiencia(e.target.checked)
                    }
                    className="w-4 h-4 accent-[#0F766E] rounded"
                  />
                  <span>
                    Incluir ofertas que soliciten poca experiencia o tengan nombres de puesto diferentes pero compatibles con mi perfil
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setFiltroLocalidad('TODAS');
                    setFiltroDistanciaModo('15');
                    setFiltroPuesto('TODOS');
                    setFiltroJornada('Ambas');
                    setFiltroModalidad('Ambas');
                    setBusquedaPalabra('');
                  }}
                  className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
                >
                  Restablecer todos los filtros (Ver las {ofertas.length} ofertas)
                </button>
              </div>
            </section>

            {/* Analizador IA para pegar cualquier oferta nueva */}
            <section className="bg-gradient-to-r from-teal-50 via-white to-amber-50/60 rounded-3xl p-6 sm:p-8 border-2 border-teal-300/80 space-y-4">
              <div className="flex items-center gap-2 text-[#0F766E] text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>
                  ¿Has visto una oferta en internet, WhatsApp o en un escaparate de Torrijos?
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Pégala aquí y te calculo tu Compatibilidad + los 7 Materiales de Candidatura
              </h3>
              <form
                onSubmit={handleAnalizarYPrepararOfertaExterna}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4"
              >
                <div className="lg:col-span-4">
                  <input
                    type="text"
                    value={empresaNuevaOferta}
                    onChange={(e) => setEmpresaNuevaOferta(e.target.value)}
                    placeholder="Nombre de la empresa o comercio (ej. Clínica Torrijos)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm"
                  />
                </div>
                <div className="lg:col-span-5">
                  <input
                    type="text"
                    required
                    value={textoNuevaOferta}
                    onChange={(e) => setTextoNuevaOferta(e.target.value)}
                    placeholder="Pega o escribe qué piden (ej. Buscamos recepcionista media jornada...)"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm"
                  />
                </div>
                <div className="lg:col-span-3">
                  <button
                    type="submit"
                    disabled={analizandoOferta}
                    className="w-full py-3 px-4 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {analizandoOferta
                        ? 'Preparando...'
                        : 'Analizar y Preparar CV'}
                    </span>
                  </button>
                </div>
              </form>
            </section>

            {/* Listado de Ofertas con Puntuación de Compatibilidad */}
            <div className="space-y-5">
              {ofertasFiltradas.map((oferta) => {
                const estadoActual = obtenerEstadoOferta(oferta.id);
                return (
                  <div
                    key={oferta.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold">
                            📍 {oferta.municipioExacto} · {oferta.distanciaKm} km ({oferta.tiempoCocheMin} min en coche)
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold">
                            Jornada: {oferta.jornada} · {oferta.modalidad}
                          </span>
                        </div>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-slate-900"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {oferta.tituloPuesto}
                        </h3>
                        <p className="text-base font-semibold text-slate-700">
                          {oferta.empresa}
                        </p>
                      </div>

                      {/* Bloque grande de COMPATIBILIDAD CON PILAR */}
                      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl px-5 py-3 text-right shrink-0">
                        <span className="block text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                          COMPATIBILIDAD CON PILAR:
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-800 tabular-nums">
                          {oferta.compatibilidadPorcentaje}%
                        </span>
                      </div>
                    </div>

                    {/* Explicación clara con ✓ Checks y ⚠️ Requisitos que no cumples */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      <div className="lg:col-span-7 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-2">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-950">
                          POR QUÉ ENCAJA CONTIGO (DATOS REALES DE TU CV):
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm font-semibold text-emerald-950">
                          {oferta.checksCompatibilidad.map((chk, index) => (
                            <p key={index}>{chk}</p>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-2">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-700" />
                          ⚠️ REQUISITOS QUE NO CUMPLES O A TENER EN CUENTA:
                        </p>
                        <p className="text-sm text-amber-950">
                          {oferta.requisitoNoCumplidoOAlerta}
                        </p>
                        <p className="text-xs font-bold text-emerald-900 pt-1">
                          💡 Decisión final tuya (no descartada):{' '}
                          {oferta.comoDefenderSinDescartar}
                        </p>
                      </div>
                    </div>

                    {/* Botones de Acción de la Oferta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setOfertaDossierActiva(oferta)}
                          className="px-6 py-3.5 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-md cursor-pointer"
                        >
                          <Sparkles className="w-5 h-5" />
                          <span>PREPARAR MI CANDIDATURA (7 Materiales)</span>
                        </button>

                        <a
                          href={oferta.enlaceWebOficial}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-sm flex items-center gap-1.5"
                        >
                          <span>Ver oferta / web</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-600">
                          Estado en Mis Candidaturas:
                        </span>
                        <select
                          value={estadoActual}
                          onChange={(e) =>
                            cambiarEstadoOferta(
                              oferta,
                              e.target.value as EstadoKanban
                            )
                          }
                          className="px-3.5 py-2.5 rounded-xl bg-teal-50 border border-teal-300 text-sm font-extrabold text-slate-900"
                        >
                          {ESTADOS_KANBAN_LISTA.map((est) => (
                            <option key={est} value={est}>
                              {est}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            SECCIÓN 3: EMPRESAS QUE PODRÍAN CONTRATARME
           ========================================================= */}
        {seccionActiva === 'directorio-empresas' && (
          <CompaniesDirectory
            ofertas={ofertas}
            onPrepararCandidaturaEmpresa={(ofertaAsociada) =>
              setOfertaDossierActiva(ofertaAsociada)
            }
          />
        )}

        {/* =========================================================
            SECCIÓN 4: PLAN GUIADO DE 10 DÍAS COMPLETO
           ========================================================= */}
        {seccionActiva === 'plan-10-dias' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                HOJA DE RUTA PASO A PASO · 10 DÍAS DE BÚSQUEDA ORGANIZADA
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                📅 Mi Plan de 10 Días en Santo Domingo-Caudilla, Torrijos, Alcabón y Novés
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Marca las casillas a medida que avances. Tu progreso se guarda automáticamente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {PLAN_10_DIAS_COMPLETO.map((diaObj) => (
                <div
                  key={diaObj.dia}
                  className={`bg-white rounded-3xl p-6 border-2 transition-all space-y-4 ${
                    diaPlanActual === diaObj.dia
                      ? 'border-[#0F766E] shadow-md'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-extrabold">
                      DÍA {diaObj.dia} DE 10
                    </span>
                    <button
                      type="button"
                      onClick={() => setDiaPlanActual(diaObj.dia)}
                      className="text-xs font-bold text-[#0F766E] hover:underline cursor-pointer"
                    >
                      {diaPlanActual === diaObj.dia
                        ? '✓ Día activo hoy'
                        : 'Activar este día'}
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {diaObj.titulo}
                  </h3>
                  <p className="text-sm text-slate-600">{diaObj.focoDelDia}</p>

                  <div className="space-y-2">
                    {diaObj.tareasPasoAPaso.map((tItem) => {
                      const hecha = !!tareasCompletadas[tItem.id];
                      return (
                        <label
                          key={tItem.id}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer ${
                            hecha
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={hecha}
                            onChange={() =>
                              setTareasCompletadas((prev) => ({
                                ...prev,
                                [tItem.id]: !prev[tItem.id],
                              }))
                            }
                            className="mt-0.5 w-4 h-4 accent-[#0F766E]"
                          />
                          <span className={hecha ? 'line-through font-medium' : 'font-semibold'}>
                            {tItem.texto}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            SECCIÓN 5: GESTOR DE CANDIDATURAS (KANBAN)
           ========================================================= */}
        {seccionActiva === 'gestor-kanban' && (
          <KanbanTracker
            registros={registrosKanban}
            onUpdateRegistro={handleUpdateRegistroKanban}
            onAddRegistroManual={handleAddRegistroKanbanManual}
            ofertasDisponibles={ofertas}
            onAbrirDossierOferta={(of) => setOfertaDossierActiva(of)}
          />
        )}

        {/* =========================================================
            SECCIÓN 6: PREPARAR ENTREVISTA Y ASISTENTE "PILAR IA"
           ========================================================= */}
        {seccionActiva === 'entrevistas-pilar-ia' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Simulador de Preguntas y Respuestas Reales */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F766E]">
                  SIMULADOR DE ENTREVISTAS · 100 % BASADO EN TU CV REAL
                </span>
                <h2
                  className="text-2xl font-bold text-slate-900 mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  🎤 Preparar Entrevista con Seguridad
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {PREGUNTAS_PREPARADOR_ENTREVISTAS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPreguntaEntrevistaId(p.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                      preguntaEntrevistaId === p.id
                        ? 'bg-[#0F766E] text-white border-[#0F766E]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.categoria}
                  </button>
                ))}
              </div>

              <div className="bg-amber-50/80 p-5 rounded-2xl border border-amber-200 space-y-1.5">
                <p className="text-xs font-bold uppercase text-amber-900">
                  Pregunta del entrevistador/a:
                </p>
                <p className="text-lg font-bold text-slate-900">
                  {preguntaActivaObj.pregunta}
                </p>
                <p className="text-xs text-slate-600">
                  🎯 Qué buscan evaluar: {preguntaActivaObj.objetivoRRHH}
                </p>
              </div>

              <div className="bg-emerald-50/80 p-6 rounded-2xl border border-emerald-200 space-y-3">
                <p className="text-xs font-extrabold uppercase text-emerald-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Respuesta recomendada para Pilar:
                </p>
                <p className="text-base font-medium text-slate-900 leading-relaxed">
                  {preguntaActivaObj.respuestaBasadaEnExperienciaReal}
                </p>
                <p className="text-xs font-bold text-[#0F766E] pt-1">
                  ✓ Datos reales utilizados: {preguntaActivaObj.datosRealesUsados}
                </p>
              </div>
            </div>

            {/* Chat directo con la Orientadora Virtual "Pilar IA" */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  {!imgIaError ? (
                    <img
                      src={avatarPilarIa}
                      alt="Pilar IA"
                      onError={() => setImgIaError(true)}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0F766E]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#0F766E] text-white font-bold flex items-center justify-center">
                      IA
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      🤖 Hablar con mi Asistente «Pilar IA»
                    </h3>
                    <p className="text-xs text-slate-600">
                      Tu orientadora laboral personal · Siempre positiva y realista
                    </p>
                  </div>
                </div>

                {/* Botones de consulta rápida en 1 clic */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '¿Cómo destaco mi Curso de 120h de IA de la Cámara de Torrijos?',
                    '¿Cómo uso a mi favor tener coche propio en Santo Domingo-Caudilla?',
                    '¿Qué digo si piden inglés B1 y tengo A2?',
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleEnviarMensajeChat(q)}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F766E] border border-teal-200 text-xs font-bold text-left cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Historial de conversación */}
                <div className="h-80 overflow-y-auto space-y-3 pr-1 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {mensajesChat.map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                        m.emisor === 'pilar-ia'
                          ? 'bg-white border border-slate-200 text-slate-800'
                          : 'bg-[#0F766E] text-white ml-6'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.texto}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEnviarMensajeChat();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputChat}
                  onChange={(e) => setInputChat(e.target.value)}
                  placeholder="Escribe aquí tu duda a Pilar IA..."
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm"
                />
                <button
                  type="submit"
                  disabled={enviandoChat}
                  className="px-4 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================
            SECCIÓN 7: MI CV + CÓDIGO QR EN VIVO + MODO RECLUTADOR
           ========================================================= */}
        {seccionActiva === 'web-presentacion' && (
          <CVAndRecruiterSection
            idioma={idioma}
            urlModoReclutador={urlModoReclutador}
            fotoPilarUrl={fotoPilarActiva}
            onTriggerSubirFoto={() => fileInputRef.current?.click()}
            privacidadActiva={privacidadActiva}
            onTogglePrivacidad={() => setPrivacidadActiva(!privacidadActiva)}
            telefonoMostrar={telefonoMostrar}
            direccionMostrar={direccionMostrar}
            dniMostrar={dniMostrar}
            emailMostrar={emailMostrar}
            editandoDatos={editandoDatosPersonales}
            onToggleEditarDatos={() =>
              setEditandoDatosPersonales(!editandoDatosPersonales)
            }
            telefonoReal={telefonoReal}
            setTelefonoReal={setTelefonoReal}
            direccionReal={direccionReal}
            setDireccionReal={setDireccionReal}
            dniReal={dniReal}
            setDniReal={setDniReal}
            emailReal={emailReal}
            setEmailReal={setEmailReal}
            onCopyText={handleCopyText}
            copiadoId={copiadoId}
            textoCVCompletoPlano={textoCVCompletoPlano}
            onAbrirWebPublicaEmpresas={() => setViendoSoloWebEmpresas(true)}
          />
        )}
      </main>

      {/* MODAL DOSSIER DE 7 PUNTOS ("PREPARAR MI CANDIDATURA") */}
      {ofertaDossierActiva && (
        <DossierModal
          oferta={ofertaDossierActiva}
          onClose={() => setOfertaDossierActiva(null)}
          estadoActual={obtenerEstadoOferta(ofertaDossierActiva.id)}
          onChangeEstado={(nuevoEst) =>
            cambiarEstadoOferta(ofertaDossierActiva, nuevoEst)
          }
          onCopyText={handleCopyText}
          copiadoId={copiadoId}
          onDownloadTxt={handleDescargarTxt}
          datosContactoPie={datosContactoPie}
        />
      )}
    </div>
  );
}
