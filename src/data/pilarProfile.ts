export type IdiomaApp = 'es' | 'en';

export type EstadoKanban =
  | 'Nueva'
  | 'Me interesa'
  | 'CV Preparado'
  | 'CV Enviado'
  | 'Contactada'
  | 'Entrevista'
  | 'Seguimiento'
  | 'Conseguido'
  | 'Descartada';

export const ESTADOS_KANBAN_LISTA: EstadoKanban[] = [
  'Nueva',
  'Me interesa',
  'CV Preparado',
  'CV Enviado',
  'Contactada',
  'Entrevista',
  'Seguimiento',
  'Conseguido',
  'Descartada',
];

export type LocalidadPrioritaria =
  | 'Santo Domingo-Caudilla'
  | 'Torrijos'
  | 'Alcabón'
  | 'Novés'
  | 'Otras localidades cercanas';

export type FiltroPuestoBuscador =
  | 'Atención al cliente'
  | 'Recepción'
  | 'Administración'
  | 'Auxiliar administrativo'
  | 'Dependienta'
  | 'Comercio'
  | 'Atención telefónica'
  | 'Información al cliente'
  | 'Atención al público'
  | 'Otros compatibles';

export const FILTROS_PUESTO_LISTA: FiltroPuestoBuscador[] = [
  'Atención al cliente',
  'Recepción',
  'Administración',
  'Auxiliar administrativo',
  'Dependienta',
  'Comercio',
  'Atención telefónica',
  'Información al cliente',
  'Atención al público',
  'Otros compatibles',
];

export interface RegistroCandidaturaKanban {
  id: string;
  ofertaId?: string;
  empresa: string;
  puesto: string;
  localidad: string;
  fecha: string;
  fuente: string;
  enlace: string;
  estado: EstadoKanban;
  notas: string;
  fechaSeguimiento: string;
  contacto: string;
  resultado: string;
}

export interface OfertaEmpleoCompleta {
  id: string;
  diaPlan: number;
  destacadaDia1: boolean;
  tituloPuesto: string;
  empresa: string;
  localidad: LocalidadPrioritaria;
  municipioExacto: string;
  distanciaKm: number;
  tiempoCocheMin: number;
  categoriaPuesto: FiltroPuestoBuscador;
  etiquetasPuesto: FiltroPuestoBuscador[];
  jornada: 'Completa' | 'Parcial' | 'Ambas';
  modalidad: 'Presencial' | 'Híbrido';
  permitePocaExperiencia: boolean;
  fuenteOferta: string;
  compatibilidadPorcentaje: number;
  desgloseCompatibilidad: {
    experiencia: number;
    formacion: number;
    movilidadCoche: number;
    actitudYTrato: number;
  };
  checksCompatibilidad: string[];
  puntosFuertesEncaje: string[];
  requisitoNoCumplidoOAlerta: string;
  comoDefenderSinDescartar: string;
  enlaceWebOficial: string;
  contactoReferencia: string;
  guionLlamadaDirecta: string;
  // 7 elementos del Dossier "Preparar Mi Candidatura"
  dossierCandidatura: {
    resumenCVAdaptado: string;
    cartaPresentacionNatural: string;
    emailAsunto: string;
    emailCuerpo: string;
    mensajeLinkedInBreve: string;
    presentacionCorta: string;
    preguntaProbableEntrevista: string;
    respuestaRecomendadaPilar: string;
    puntosFuertesYRequisitosExplicar: string[];
  };
}

export interface EmpresaDirectorioComarca {
  id: string;
  nombre: string;
  localidad: LocalidadPrioritaria;
  municipioExacto: string;
  distanciaDesdeSantoDomingoKm: number;
  sector: string;
  puestoQuePodriaEncajar: string;
  puestosHabitualesParaPilar: string[];
  motivoEncajePilar: string;
  ventajaCochePropio: string;
  webOficial: string;
  paginaEmpleo: string;
  estadoContratacionVerificado: string;
  tieneOfertaActivaVerificada: boolean;
  canalEmpleoDirecto: string;
  ofertaAsociadaId: string;
}

export interface DiaPlan10 {
  dia: number;
  titulo: string;
  resumenCorto: string;
  focoDelDia: string;
  mensajeMotivador: string;
  metaCandidaturasDia: number;
  tareasPasoAPaso: {
    id: string;
    texto: string;
    explicacionSencilla: string;
  }[];
}

export interface PreguntaEntrevista {
  id: string;
  categoria: string;
  pregunta: string;
  objetivoRRHH: string;
  respuestaBasadaEnExperienciaReal: string;
  datosRealesUsados: string;
}

export const DATOS_USUARIA_PILAR = {
  nombre: 'Pilar Fernández Almaraz',
  tituloApp: 'PILAR EMPLEO IA',
  subtituloApp: 'Mi asistente personal para encontrar trabajo',
  lemaPrincipal: 'Vamos a buscar un trabajo que encaje contigo.',
  titularProfesional:
    'Atención al Cliente · Recepción · Auxiliar Administrativo · Comercio y Trato con Personas',
  zonaPrincipal: 'Santo Domingo-Caudilla, Toledo, España',
  municipiosPrioritarios: [
    'Santo Domingo-Caudilla (0 km)',
    'Alcabón (3 km · 4 min en coche)',
    'Torrijos (5 km · 6 min en coche)',
    'Novés (7 km · 8 min en coche)',
    'Otras localidades cercanas (Portillo, Fuensalida, Toledo)',
  ],
  radioReferencia: 'Radio prioritario de 8 km alrededor de Santo Domingo-Caudilla (ampliable manualmente)',
  movilidad: 'Permiso de conducir y coche propio (disponibilidad inmediata y total puntualidad)',
  emailDefault: 'pilarfernandezalmaraz81@gmail.com',
  telefonoDefault: '654 32 10 98',
  direccionDefault: 'C/ Mayor s/n, 45526 Santo Domingo-Caudilla (Toledo)',
  dniDefault: '03891234-P',
  jornadaBuscada: 'Jornada completa o parcial',
  modalidadBuscada: 'Presencial o Híbrido',
  prioridadesPuestos: [
    '1. Atención al cliente',
    '2. Recepción',
    '3. Administración y auxiliar administrativo',
    '4. Comercio y dependienta',
    '5. Atención telefónica',
    '6. Información al cliente',
    '7. Puestos de atención al público',
    '8. Otros puestos compatibles con mi experiencia y capacidad de aprendizaje',
  ],
  formacionReglada: [
    {
      titulo: 'Curso de Inteligencia Artificial — 120 horas',
      centro: 'Certificado expedido por la Cámara de Comercio de Torrijos',
      destacado: true,
      detalle:
        'Formación práctica de 120 horas en herramientas digitales e Inteligencia Artificial aplicada a tareas administrativas, redacción profesional, organización de información y atención al cliente.',
    },
    {
      titulo: 'Formación Profesional (FP) de Auxiliar Administrativo',
      centro: 'Titulación Oficial de Formación Profesional',
      destacado: true,
      detalle:
        'Formación oficial en gestión administrativa, archivo, atención telefónica, facturación, documentación y trato con el público.',
    },
    {
      titulo: 'Graduado Escolar',
      centro: 'Educación General Básica Oficial',
      destacado: false,
      detalle: 'Formación básica oficial completa.',
    },
  ],
  otrosConocimientos: [
    'Mecanografía',
    'Contaplus',
    'Plan General de Contabilidad',
    'Gestión de personal',
    'Windows',
    'Word',
  ],
  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'A2' },
  ],
  experienciaReal: [
    {
      puesto: 'Atención y Servicio al Cliente / Información sobre Productos',
      sector: 'Atención al Público y Servicios',
      resumen:
        'Trato directo y cercano con clientes, resolución amable de dudas, información detallada sobre productos y orientación personalizada.',
    },
    {
      puesto: 'Dependienta de Comercio, Caja y Reposición',
      sector: 'Comercio y Distribución',
      resumen:
        'Cobro en caja con agilidad y exactitud, reposición ordenada de mercancía, control de lineal y atención al público en tienda.',
    },
    {
      puesto: 'Administración y Aprendiz en Diputación Provincial de Toledo',
      sector: 'Administración Pública y Gestión de Oficina',
      resumen:
        'Apoyo administrativo, organización de expedientes, registro documental, mecanografía y atención presencial y telefónica.',
    },
    {
      puesto: 'Conductora de Taxi y Atención a Clientes',
      sector: 'Transporte de Viajeros y Servicio Público',
      resumen:
        'Conducción profesional responsable en la comarca, trato educado y paciente con todo tipo de pasajeros, gestión de cobros y puntualidad.',
    },
    {
      puesto: 'Auxiliar de Ayuda a Domicilio',
      sector: 'Atención Directa a Personas y Servicios Sociales',
      resumen:
        'Trato humano, empático, paciente y de máxima confianza atendiendo directamente a personas y familias en su día a día.',
    },
    {
      puesto: 'Operaria en Fabricación de Calzado',
      sector: 'Industria del Calzado en la Comarca',
      resumen:
        'Trabajo en equipo, seriedad, orden, revisión de acabados y cumplimiento de tiempos en entorno productivo.',
    },
  ],
  aptitudes: [
    'Amable',
    'Responsable',
    'Profesional',
    'Puntual',
    'Seria',
    'Servicial',
    'Orientada al cliente',
    'Buena disposición para aprender',
    'Disponibilidad',
    'Experiencia tratando directamente con personas',
  ],
  valorDiferencialTexto:
    'Combino toda una vida laboral de trato cercano, responsable y humano con las personas (en comercio, caja, administración, taxi y ayuda a domicilio) con la titulación de FP de Auxiliar Administrativo, coche propio en Santo Domingo-Caudilla y el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos.',
};

export const OFERTAS_INTELIGENTES: OfertaEmpleoCompleta[] = [
  {
    id: 'of-1',
    diaPlan: 1,
    destacadaDia1: true,
    tituloPuesto: 'Recepcionista y Atención al Paciente / Auxiliar Administrativa',
    empresa: 'Clínica Dental y Centro Médico en Torrijos',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Centro)',
    distanciaKm: 5,
    tiempoCocheMin: 6,
    categoriaPuesto: 'Recepción',
    etiquetasPuesto: ['Recepción', 'Atención al cliente', 'Auxiliar administrativo', 'Atención telefónica', 'Atención al público'],
    jornada: 'Ambas',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Directorio Sanitario y Clínicas de Torrijos',
    compatibilidadPorcentaje: 96,
    desgloseCompatibilidad: {
      experiencia: 96,
      formacion: 98,
      movilidadCoche: 100,
      actitudYTrato: 100,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y trato directo con personas',
      '✓ Experiencia en comercio, cobros y resolución de dudas',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Contaplus + Word)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (a 5 km / 6 min desde Santo Domingo-Caudilla)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Vives en Santo Domingo-Caudilla (a solo 5 km / 6 minutos en tu propio coche), garantizando puntualidad absoluta en apertura de clínica.',
      'Tu experiencia real en atención al cliente, ayuda a domicilio y conducción de taxi aporta una paciencia, empatía y educación ideales para recibir pacientes.',
      'Tienes FP de Auxiliar Administrativo, mecanografía, Windows, Word y Contaplus para gestionar agendas, fichas y cobros.',
      'Tu Curso de Inteligencia Artificial — 120 horas (Cámara de Comercio de Torrijos) demuestra actualización tecnológica.',
    ],
    requisitoNoCumplidoOAlerta:
      'Pueden utilizar un programa específico de gestión de citas médicas o clínicas que no hayas usado antes.',
    comoDefenderSinDescartar:
      'No descartes la oferta: con tu base de Windows, Word, Contaplus y tu reciente Curso de 120 horas de IA en la Cámara de Comercio de Torrijos, aprenderás su programa de citas en los primeros días.',
    enlaceWebOficial: 'https://www.google.com/search?q=clinicas+dentales+y+centros+medicos+en+Torrijos+empleo',
    contactoReferencia: 'Entrega en mano en recepción (Torrijos centro) o envío por correo electrónico.',
    guionLlamadaDirecta:
      '«Buenos días. Mi nombre es Pilar Fernández Almaraz, soy vecina de Santo Domingo-Caudilla, aquí al lado de Torrijos, y tengo coche propio. Llamaba porque soy Auxiliar Administrativo con amplia experiencia en atención al público, recepción y trato cercano con personas, además del Curso de 120 horas de IA en la Cámara de Comercio de Torrijos. ¿A qué correo o a nombre de quién podría acercarles mi currículum por si necesitan cubrir recepción o atención al paciente?»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA RECEPCIÓN Y ATENCIÓN AL PACIENTE (TORRIJOS)
• Candidata: Pilar Fernández Almaraz | Residencia: Santo Domingo-Caudilla (a 5 km de Torrijos).
• Movilidad: Permiso de conducir y coche propio (desplazamiento en 6 minutos).
• Formación Oficial: FP Auxiliar Administrativo | Graduado Escolar.
• Formación Destacada: Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos).
• Informática y Gestión: Mecanografía, Windows, Word, Contaplus, Plan General de Contabilidad, Gestión de personal.
• Experiencia Clave: Atención y servicio al cliente, cobro en caja, información al público, aprendiz en Diputación Provincial de Toledo, conducción de taxi y auxiliar de ayuda a domicilio (trato cercano, paciente y empático).
• Idiomas: Español (nativo) | Inglés (A2).`,
      cartaPresentacionNatural: `Estimada dirección del Centro / Clínica en Torrijos:

Me pongo en contacto con ustedes porque busco incorporarme en un puesto de recepción, atención al paciente y apoyo administrativo en Torrijos. Resido en Santo Domingo-Caudilla, a tan solo 5 kilómetros, y dispongo de permiso de conducir y coche propio, por lo que tengo total disponibilidad y puntualidad garantizada.

Cuento con la titulación de FP de Auxiliar Administrativo, experiencia como aprendiz en la Diputación Provincial de Toledo y manejo de mecanografía, Word, Windows y Contaplus. Además, he finalizado el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos, lo que refleja mis ganas constantes de aprender y manejar con soltura las herramientas informáticas actuales.

Mi trayectoria atendiendo directamente a personas —en comercio, caja, conducción de taxi y ayuda a domicilio— me ha enseñado a recibir a cada persona con una sonrisa, paciencia, discreción y amabilidad.

Estaré encantada de acercarme personalmente a entregarles mi currículum o mantener una breve entrevista cuando les venga bien.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto:
        'Candidatura Recepción / Atención al Paciente — Pilar Fernández Almaraz (Santo Domingo-Caudilla / Torrijos)',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para que lo tengan en cuenta en futuros procesos de selección para recepción, atención al paciente o auxiliar administrativo en su centro de Torrijos.

Destaco de mi perfil:
- Residencia en Santo Domingo-Caudilla con permiso de conducir y coche propio (a 6 minutos de Torrijos).
- Titulación de FP Auxiliar Administrativo + Curso de Inteligencia Artificial de 120 horas (Certificado por la Cámara de Comercio de Torrijos).
- Amplia experiencia en atención directa a personas, cobro en caja, teléfono, ayuda a domicilio y administración (Diputación de Toledo).

Quedo a su entera disposición para una entrevista personal.

Atentamente,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla (con coche propio, a 5 min de Torrijos). Tengo FP de Auxiliar Administrativo, el Curso de 120h de IA de la Cámara de Comercio de Torrijos y amplia experiencia en atención al cliente y trato humano. Me encantaría presentar mi candidatura para recepción o administración.',
      presentacionCorta:
        '«Hola, buenos días. Soy Pilar Fernández Almaraz, vivo aquí al lado en Santo Domingo-Caudilla y tengo coche propio. Soy Auxiliar Administrativo con experiencia toda mi vida atendiendo al público en comercio, caja, ayuda a domicilio y taxi, y acabo de certificarme en el Curso de 120 horas de Inteligencia Artificial de la Cámara de Comercio de Torrijos. Vengo a dejarles mi currículum para recepción o atención al cliente.»',
      preguntaProbableEntrevista:
        '«En recepción a veces coinciden pacientes esperando en mostrador y el teléfono sonando a la vez. ¿Cómo te organizas para atender a todos con amabilidad?»',
      respuestaRecomendadaPilar:
        '«Gracias a mi experiencia real en comercio, caja, conducción de taxi y ayuda a domicilio, estoy muy acostumbrada a tratar con personas de todas las edades manteniendo siempre la calma y la sonrisa. Si estoy con un paciente en mostrador y suena el teléfono, pido disculpas un segundo con amabilidad, tomo nota rápida o doy cita gracias a mi soltura con la mecanografía y el ordenador, y continúo atendiendo al paciente haciéndole sentir escuchado.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Proximidad real (Santo Domingo-Caudilla a 5 km) con permiso de conducir y coche propio.',
        'Punto fuerte 2: Trato paciente y humano demostrado en ayuda a domicilio, taxi y comercio.',
        'Punto fuerte 3: FP Auxiliar Administrativo + Curso de IA de 120 horas (Cámara de Comercio de Torrijos).',
        'Cómo explicar el software de clínica: Tu dominio de Contaplus, Word, mecanografía y herramientas de IA te permite aprender cualquier agenda médica en pocos días.',
      ],
    },
  },
  {
    id: 'of-2',
    diaPlan: 1,
    destacadaDia1: true,
    tituloPuesto: 'Personal de Atención al Cliente, Caja, Información y Reposición',
    empresa: 'Supermercados e Hipermercados en Torrijos (Carrefour / Ahorramas / Lidl)',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Avda. Estación / Ctra. Gerindote)',
    distanciaKm: 5,
    tiempoCocheMin: 6,
    categoriaPuesto: 'Atención al cliente',
    etiquetasPuesto: ['Atención al cliente', 'Comercio', 'Dependienta', 'Información al cliente', 'Atención al público'],
    jornada: 'Ambas',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Portales Oficiales de Empleo Carrefour / Ahorramas / Lidl Torrijos',
    compatibilidadPorcentaje: 95,
    desgloseCompatibilidad: {
      experiencia: 98,
      formacion: 92,
      movilidadCoche: 100,
      actitudYTrato: 98,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y resolución de dudas',
      '✓ Experiencia en comercio, caja y reposición de mercancía',
      '✓ Formación administrativa (FP Auxiliar Administrativo)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (ideal para turnos de mañana o cierre en Torrijos)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Experiencia directa y demostrable en tu CV en comercio, cobro en caja, reposición e información sobre productos.',
      'Vives a 5 km (Santo Domingo-Caudilla) y tienes permiso de conducir y coche propio, ideal para entrar en el primer turno de la mañana o salir al cierre sin depender de transporte.',
      'Trato amable, servicial, responsable y puntual con los vecinos y clientes de la comarca.',
    ],
    requisitoNoCumplidoOAlerta:
      'Las grandes superficies exigen registrar el CV en su portal web oficial además de valorar el uso de terminales digitales de tienda.',
    comoDefenderSinDescartar:
      'Con tu Curso de 120 horas de Inteligencia Artificial en la Cámara de Comercio de Torrijos y tu manejo de Windows y Word, los terminales digitales de tienda y el registro online te resultarán muy sencillos.',
    enlaceWebOficial: 'https://www.carrefour.es/trabaja-con-nosotros/',
    contactoReferencia: 'Web oficial de empleo Carrefour / Ahorramas + Atención al Cliente en tienda de Torrijos.',
    guionLlamadaDirecta:
      '«Buenos días, quería hacer una consulta en Atención al Cliente. Soy Pilar Fernández Almaraz, vivo aquí al lado en Santo Domingo-Caudilla, tengo coche propio y experiencia real como cajera, reponedora y en atención al cliente. Ya me estoy inscribiendo en su web de empleo, pero quería preguntarles si también recogen el currículum en tienda para futuras vacantes en Torrijos.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA ATENCIÓN AL CLIENTE, CAJA Y COMERCIO (TORRIJOS)
• Candidata: Pilar Fernández Almaraz | Santo Domingo-Caudilla (a 5 km de Torrijos).
• Ventaja Competitiva: Permiso de conducir y coche propio (disponibilidad para cualquier turno horario).
• Experiencia Directa en el Puesto: Atención y servicio al cliente, cobro en caja, reposición de mercancía, atención a dudas de clientes e información sobre productos.
• Formación: FP Auxiliar Administrativo | Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos) | Graduado Escolar.
• Aptitudes: Amable, responsable, puntual, seria, servicial y orientada al cliente.`,
      cartaPresentacionNatural: `Estimado equipo de Selección y Recursos Humanos en Torrijos:

Les escribo para presentar mi candidatura a los puestos de atención al cliente, caja, información y reposición en su centro de Torrijos. Resido en Santo Domingo-Caudilla, a solo 5 minutos en coche propio, lo que me permite adaptarme con total puntualidad a turnos de mañana, tarde, jornada completa o parcial.

Cuento con experiencia real trabajando en comercio, manejo de caja, reposición y atención directa a las dudas de los clientes sobre productos. Además, poseo el título de FP de Auxiliar Administrativo y el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos, por lo que me desenvuelvo muy bien con ordenadores y terminales de cobro o gestión.

Soy una persona trabajadora, amable, puntual y muy acostumbrada al trato diario con el público.

Agradeciendo su atención, quedo a su disposición para mantener una entrevista personal.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto:
        'Candidatura Caja / Atención al Cliente / Comercio (Torrijos) — Pilar Fernández Almaraz',
      emailCuerpo: `Buenos días:

Les remito mi currículum para participar en los procesos de selección de personal de caja, atención al cliente y reposición en Torrijos.

Aporto experiencia real en comercio, caja, reposición e información de productos, junto con formación de FP Auxiliar Administrativo, el Curso de 120 horas de IA en la Cámara de Comercio de Torrijos y vehículo propio desde Santo Domingo-Caudilla.

Muchas gracias por su tiempo y consideración.

Atentamente,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz. Vivo en Santo Domingo-Caudilla (con coche propio, a 5 min de Torrijos) y cuento con experiencia real en atención al cliente, caja, comercio y reposición, además de FP Auxiliar Administrativo y Curso de 120h de IA. Muy interesada en vacantes en Torrijos.',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Tengo experiencia real en comercio, cobro en caja, reposición e información de productos, además de FP de Auxiliar Administrativo y el Curso de 120h de IA de la Cámara de Torrijos. Tengo disponibilidad inmediata para jornada completa o parcial.»',
      preguntaProbableEntrevista:
        '«En horas punta se forman colas en línea de cajas o en el mostrador de información. ¿Cómo trabajas en esos momentos?»',
      respuestaRecomendadaPilar:
        '«Con mucha agilidad, orden y sin perder nunca la amabilidad. Ya tengo experiencia real trabajando en caja, comercio y reposición, así que sé cobrar con rapidez y exactitud mientras saludo con una sonrisa al cliente. Si surge una duda sobre un producto, la resuelvo de forma clara para que la fila avance con fluidez.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Experiencia directa ya demostrada en caja, reposición, comercio e información sobre productos.',
        'Punto fuerte 2: Coche propio en Santo Domingo-Caudilla (a 5 km), sin problemas para turnos de apertura o cierre.',
        'Cómo explicar el manejo de terminales modernos: Tu FP Administrativa y tu Curso de 120h de IA acreditan que dominas las herramientas digitales.',
      ],
    },
  },
  {
    id: 'of-3',
    diaPlan: 1,
    destacadaDia1: true,
    tituloPuesto: 'Auxiliar Administrativa, Atención Telefónica y Recepción',
    empresa: 'Empresas y Polígono Industrial de Santo Domingo-Caudilla y Alcabón',
    localidad: 'Santo Domingo-Caudilla',
    municipioExacto: 'Santo Domingo-Caudilla / Alcabón',
    distanciaKm: 2,
    tiempoCocheMin: 3,
    categoriaPuesto: 'Auxiliar administrativo',
    etiquetasPuesto: ['Auxiliar administrativo', 'Administración', 'Recepción', 'Atención telefónica', 'Atención al cliente'],
    jornada: 'Completa',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Empresas Locales Santo Domingo-Caudilla y Alcabón',
    compatibilidadPorcentaje: 94,
    desgloseCompatibilidad: {
      experiencia: 92,
      formacion: 96,
      movilidadCoche: 100,
      actitudYTrato: 96,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y administración (Diputación de Toledo)',
      '✓ Experiencia en comercio y trato directo',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Contaplus + PGC)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (resides en el propio municipio de Santo Domingo-Caudilla)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Resides en el mismo municipio (Santo Domingo-Caudilla) y estás a 3 minutos en coche de Alcabón: cero retrasos y máxima cercanía.',
      'Titulación oficial de FP Auxiliar Administrativo + conocimientos reales de Contaplus, Plan General de Contabilidad, Gestión de personal, mecanografía, Windows y Word.',
      'Experiencia como aprendiz en la Diputación Provincial de Toledo y Curso de 120 horas de IA certificado por la Cámara de Comercio de Torrijos.',
    ],
    requisitoNoCumplidoOAlerta:
      'Algunas naves o empresas utilizan programas propios de albaranes y facturación distintos a Contaplus.',
    comoDefenderSinDescartar:
      'Tu base en el Plan General de Contabilidad, Contaplus, mecanografía y tu Curso de 120 horas de IA demuestran que aprendes cualquier programa de gestión o albaranes con gran rapidez.',
    enlaceWebOficial: 'https://www.google.com/search?q=empresas+poligono+industrial+Santo+Domingo+Caudilla+Alcabon',
    contactoReferencia: 'Polígono Industrial de Santo Domingo-Caudilla y empresas en carretera de Alcabón.',
    guionLlamadaDirecta:
      '«Buenos días. Les llamo porque soy Pilar Fernández Almaraz, vecina de aquí mismo, de Santo Domingo-Caudilla, y dispongo de coche propio. Tengo la FP de Auxiliar Administrativo, manejo de Contaplus, Word, mecanografía y el Curso de 120 horas de Inteligencia Artificial de la Cámara de Comercio de Torrijos. Quería saber si puedo acercarles mi currículum en mano para puestos de oficina, recepción de llamadas o atención a clientes.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA AUXILIAR ADMINISTRATIVO Y RECEPCIÓN (SANTO DOMINGO-CAUDILLA / ALCABÓN)
• Candidata: Pilar Fernández Almaraz | Vecina de Santo Domingo-Caudilla (Toledo) con coche propio.
• Titulación: FP Auxiliar Administrativo | Graduado Escolar.
• Certificación Tecnológica: Curso de Inteligencia Artificial — 120 horas (Cámara de Comercio de Torrijos).
• Conocimientos Administrativos: Contaplus, Plan General de Contabilidad, Gestión de personal, Mecanografía, Windows, Word.
• Experiencia Administrativa y Atención: Aprendiz en la Diputación Provincial de Toledo, atención y servicio al cliente, comercio, caja y gestión de clientes en servicio de taxi.`,
      cartaPresentacionNatural: `Estimado/a responsable de Administración y Recursos Humanos:

Como vecina de Santo Domingo-Caudilla y contando con permiso de conducir y vehículo propio, me dirijo a su empresa con gran ilusión por formar parte de su equipo de oficina, recepción o atención telefónica.

Poseo la titulación de FP de Auxiliar Administrativo, experiencia práctica como aprendiz en la Diputación Provincial de Toledo y conocimientos sólidos de mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows y Word. Además, recientemente he obtenido el certificado del Curso de Inteligencia Artificial de 120 horas por la Cámara de Comercio de Torrijos, que me permite agilizar la redacción de correos, el archivo y las tareas administrativas diarias.

Sumado a mi experiencia atendiendo a clientes, aporto formalidad, puntualidad absoluta y muchas ganas de trabajar cerca de casa.

Quedo a su disposición para acercarme en cualquier momento a una entrevista personal.

Atentamente,
Pilar Fernández Almaraz`,
      emailAsunto:
        'Candidatura Auxiliar Administrativo / Recepción — Pilar Fernández Almaraz (Vecina de Santo Domingo-Caudilla)',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para su departamento de administración, recepción y atención al cliente.

Resido en Santo Domingo-Caudilla (dispongo de coche propio) y cuento con la titulación de FP de Auxiliar Administrativo, manejo de Contaplus, Plan General de Contabilidad, Word, mecanografía y el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos.

Agradezco de antemano su atención y quedo a su disposición.

Un cordial saludo,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Soy Auxiliar Administrativo (FP), con conocimientos de Contaplus, contabilidad, Word y Curso de 120h de IA por la Cámara de Comercio de Torrijos. Busco oportunidad en administración o recepción en nuestra zona.',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vivo aquí mismo en Santo Domingo-Caudilla y tengo coche propio. Tengo el título de FP de Auxiliar Administrativo, Contaplus, Plan General de Contabilidad, práctica en la Diputación de Toledo y el Curso de 120h de IA de la Cámara de Comercio de Torrijos. Vengo a entregarles mi currículum para oficina, teléfono o recepción.»',
      preguntaProbableEntrevista:
        '«¿Cómo te defiendes con el ordenador, la contabilidad básica y la atención telefónica a proveedores o clientes?»',
      respuestaRecomendadaPilar:
        '«Me defiendo con mucha seguridad. Tengo la FP de Auxiliar Administrativo, hice prácticas en la Diputación Provincial de Toledo y conozco el Plan General de Contabilidad, Contaplus, Gestión de personal, mecanografía, Windows y Word. Además, con el Curso de 120 horas de Inteligencia Artificial en la Cámara de Comercio de Torrijos estoy muy al día con el ordenador, y en el trato telefónico aporto toda mi experiencia atendiendo al público con educación y eficacia.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Vecina de Santo Domingo-Caudilla (0-3 km) con coche propio.',
        'Punto fuerte 2: Formación oficial FP Auxiliar Administrativo + Contaplus + Plan General de Contabilidad + Gestión de personal.',
        'Punto fuerte 3: Curso de IA de 120 horas (Cámara de Comercio de Torrijos).',
      ],
    },
  },
  {
    id: 'of-4',
    diaPlan: 2,
    destacadaDia1: false,
    tituloPuesto: 'Dependienta de Comercio e Información sobre Productos',
    empresa: 'Comercios Especializados, Ópticas y Tiendas en Torrijos y Alcabón',
    localidad: 'Alcabón',
    municipioExacto: 'Alcabón / Torrijos',
    distanciaKm: 3,
    tiempoCocheMin: 4,
    categoriaPuesto: 'Comercio',
    etiquetasPuesto: ['Comercio', 'Dependienta', 'Atención al cliente', 'Información al cliente', 'Atención al público'],
    jornada: 'Ambas',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Comercio Local de Alcabón y Torrijos',
    compatibilidadPorcentaje: 95,
    desgloseCompatibilidad: {
      experiencia: 98,
      formacion: 90,
      movilidadCoche: 100,
      actitudYTrato: 98,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente e información sobre productos',
      '✓ Experiencia en comercio, caja y reposición',
      '✓ Formación administrativa (FP Auxiliar Administrativo)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (a 3 km de Alcabón y 5 km de Torrijos)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Tienes experiencia real demostrable en comercio, cobro en caja, reposición, atención a dudas de clientes e información sobre productos.',
      'Además, tu experiencia en fabricación de calzado te da un conocimiento muy valioso para zapaterías, tiendas de moda o comercios de la comarca.',
      'A solo 3-5 km de casa con coche propio.',
    ],
    requisitoNoCumplidoOAlerta:
      'En pequeño comercio valoran mucho la confianza personal y que entregues el currículum en mano al encargado/a.',
    comoDefenderSinDescartar:
      'Tu trato directo, cercano y educado en persona es tu mejor carta de presentación: entregar tu CV impreso con código QR causará una impresión inmejorable.',
    enlaceWebOficial: 'https://www.google.com/search?q=comercios+y+tiendas+en+Torrijos+y+Alcabon',
    contactoReferencia: 'Entrega presencial en comercios de C/ Murillo y Plaza de España (Torrijos) y Alcabón.',
    guionLlamadaDirecta:
      '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Tengo experiencia en comercio, caja, reposición y asesoramiento a clientes sobre productos. Quería acercarme a dejarles mi currículum en mano por si necesitan una persona de total confianza y responsabilidad en tienda.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA COMERCIO Y DEPENDIENTA (ALCABÓN / TORRIJOS)
• Candidata: Pilar Fernández Almaraz | Santo Domingo-Caudilla (a 3-5 km, con coche propio).
• Experiencia en Comercio: Atención y servicio al cliente, cobro en caja, reposición, atención a dudas de clientes, información sobre productos y conocimiento del sector calzado.
• Formación: FP Auxiliar Administrativo | Curso de Inteligencia Artificial de 120h (Cámara de Comercio de Torrijos) | Graduado Escolar.`,
      cartaPresentacionNatural: `Estimado/a responsable del comercio:

Me gustaría presentar mi candidatura como dependienta y personal de atención al cliente en su establecimiento. Vivo muy cerca, en Santo Domingo-Caudilla, y cuento con coche propio para desplazarme en apenas unos minutos.

A lo largo de mi trayectoria he trabajado en comercio, cobro en caja, reposición e información sobre productos, atendiendo siempre a cada cliente con amabilidad, paciencia y buena presencia. También cuento con formación de FP como Auxiliar Administrativo y el Curso de 120 horas de Inteligencia Artificial en la Cámara de Comercio de Torrijos, por lo que puedo ayudar tanto en el mostrador como con las facturas, pedidos o el ordenador de la tienda.

Agradezco mucho su atención y quedo a su disposición para cuando deseen conocerme en persona.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto: 'Candidatura Dependienta / Atención al Cliente — Pilar Fernández Almaraz',
      emailCuerpo: `Buenos días:

Adjunto mi currículum para posibles vacantes de dependienta y atención al cliente en su comercio. Resido en Santo Domingo-Caudilla (con coche propio) y aporto experiencia real en tienda, caja, reposición e información de productos, además de formación administrativa.

Un cordial saludo,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz (Santo Domingo-Caudilla, con coche propio). Tengo experiencia real en comercio, caja, reposición e información de productos, más FP Administrativa y Curso de 120h de IA. Disponible para incorporación inmediata.',
      presentacionCorta:
        '«Hola, buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla. He trabajado en comercio, caja, reposición e información de productos, y además soy Auxiliar Administrativo. Les dejo mi currículum con mi código QR por si necesitan una dependienta responsable y puntual.»',
      preguntaProbableEntrevista:
        '«¿Qué es para ti lo más importante cuando un cliente entra por la puerta de una tienda con dudas?»',
      respuestaRecomendadaPilar:
        '«Hacerle sentir bienvenido desde el primer segundo con una sonrisa, escuchar qué necesita sin presionarle y darle información sincera y clara sobre los productos. En mi experiencia en comercio y atención al público he comprobado que cuando tratas bien a una persona, siempre vuelve.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Experiencia real en comercio, caja, reposición e información de productos.',
        'Punto fuerte 2: Polivalencia para apoyar también en albaranes, pedidos y caja gracias a tu FP Administrativa.',
        'Punto fuerte 3: Tu código QR en el CV impreso causará un impacto moderno e inolvidable en el comercio.',
      ],
    },
  },
  {
    id: 'of-5',
    diaPlan: 4,
    destacadaDia1: false,
    tituloPuesto: 'Auxiliar de Oficina, Atención Telefónica y Recepción de Logística',
    empresa: 'Empresas Logísticas e Industriales en Novés y Polígono "Las Atalayas" (UDL Libros / Distribuidoras)',
    localidad: 'Novés',
    municipioExacto: 'Novés / Polígono Las Atalayas Torrijos',
    distanciaKm: 7,
    tiempoCocheMin: 8,
    categoriaPuesto: 'Atención telefónica',
    etiquetasPuesto: ['Atención telefónica', 'Auxiliar administrativo', 'Administración', 'Recepción', 'Atención al cliente'],
    jornada: 'Completa',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Polígonos Industriales de Novés y Torrijos',
    compatibilidadPorcentaje: 91,
    desgloseCompatibilidad: {
      experiencia: 89,
      formacion: 94,
      movilidadCoche: 100,
      actitudYTrato: 94,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y trato con transportistas/viajeros',
      '✓ Experiencia en comercio y control de mercancía/reposición',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Mecanografía)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (imprescindible para polígonos de Novés y Torrijos a 7 km)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Para trabajar en los polígonos de Novés o Las Atalayas es imprescindible tener coche propio: tú estás a 7 km desde Santo Domingo-Caudilla.',
      'Tu combinación de FP Auxiliar Administrativo, mecanografía, Contaplus y Curso de 120h de IA es perfecta para grabar albaranes, atender el teléfono y recibir a transportistas.',
    ],
    requisitoNoCumplidoOAlerta:
      'En ocasiones piden manejo previo de programas logísticos o inglés B1 (actualmente tienes inglés A2).',
    comoDefenderSinDescartar:
      'No descartes la oferta: destaca tu mecanografía rápida, tu FP Administrativa, tu Curso de 120h de IA y tu coche propio a 7 minutos del polígono.',
    enlaceWebOficial: 'https://www.udllibros.com/',
    contactoReferencia: 'Polígono Industrial de Novés y Polígono Las Atalayas de Torrijos.',
    guionLlamadaDirecta:
      '«Buenos días. Soy Pilar Fernández Almaraz, vivo en Santo Domingo-Caudilla, a 7 minutos en coche propio de sus instalaciones en Novés / Torrijos. Soy Auxiliar Administrativo con mecanografía, Contaplus, Word y el Curso de 120 horas de IA en la Cámara de Comercio de Torrijos. Llamaba para ofrecerme en tareas de recepción, atención telefónica o grabación de albaranes en oficina.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA ADMINISTRACIÓN, RECEPCIÓN Y ATENCIÓN TELEFÓNICA (NOVÉS / POLÍGONOS)
• Candidata: Pilar Fernández Almaraz | Santo Domingo-Caudilla (a 7 km de Novés, con coche propio).
• Formación: FP Auxiliar Administrativo | Curso de Inteligencia Artificial — 120 horas (Cámara de Comercio de Torrijos) | Graduado Escolar.
• Habilidades de Oficina: Mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word.
• Experiencia: Aprendiz en Diputación de Toledo, atención al cliente, control de mercancía y trato directo con personas y conductores.`,
      cartaPresentacionNatural: `Estimado/a responsable de Administración y Logística:

Les escribo para presentar mi candidatura a puestos de auxiliar administrativo, atención telefónica o recepción en sus instalaciones de la comarca (Novés / Torrijos). Resido en Santo Domingo-Caudilla y cuento con permiso de conducir y coche propio, por lo que me desplazo al polígono en menos de 8 minutos.

Cuento con la titulación de FP de Auxiliar Administrativo, mecanografía, conocimientos de Contaplus, Plan General de Contabilidad, Word y Windows, además del Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos. Mi experiencia en atención al cliente, en la Diputación de Toledo y en el sector del transporte y calzado me permite organizarme con eficacia tanto en oficina como en la recepción de visitas y transportistas.

Quedo a su disposición para mantener una entrevista personal.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto: 'Candidatura Auxiliar Administrativo / Atención Telefónica — Pilar Fernández Almaraz (Coche propio)',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para posibles vacantes en administración, recepción o atención telefónica en sus instalaciones.

Vivo en Santo Domingo-Caudilla (a 7 minutos en coche propio) y aporto FP de Auxiliar Administrativo, Contaplus, mecanografía, Curso de 120h de IA por la Cámara de Comercio de Torrijos y amplia experiencia en atención al cliente.

Atentamente,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz (Santo Domingo-Caudilla, con coche propio a 7 min de Novés y Torrijos). Titulada en FP Auxiliar Administrativo con Curso de 120h de IA (Cámara de Torrijos), Contaplus y experiencia en atención al cliente. Interesada en puestos de oficina y recepción.',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio, a 7 minutos de aquí. Soy Auxiliar Administrativo (FP), manejo Contaplus, mecanografía y Word, y tengo el Curso de 120h de IA de la Cámara de Torrijos. Busco un puesto en recepción, teléfono o grabación de albaranes.»',
      preguntaProbableEntrevista:
        '«En la oficina del polígono hay que atender a transportistas en ventanilla, coger el teléfono y meter albaranes en el ordenador. ¿Te ves cómoda en ese ritmo?»',
      respuestaRecomendadaPilar:
        '«Totalmente cómoda. Por mi experiencia como conductora de taxi, en comercio y en fabricación de calzado, sé tratar con transportistas y clientes con naturalidad y firmeza amable, y gracias a mi FP de Auxiliar Administrativo, mi mecanografía y el Curso de 120 horas de IA, introduzco los datos en el ordenador con rapidez y orden.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Coche propio desde Santo Domingo-Caudilla (imprescindible para llegar a polígonos de Novés y Torrijos).',
        'Punto fuerte 2: Mecanografía, Contaplus, FP Auxiliar Administrativo y Curso IA 120h.',
        'Cómo explicar el inglés A2 si piden B1: Reconoce con honestidad tu nivel A2 para trato básico y destaca que para correos escritos usas con agilidad las herramientas aprendidas en tu curso de 120h de IA.',
      ],
    },
  },
  {
    id: 'of-6',
    diaPlan: 5,
    destacadaDia1: false,
    tituloPuesto: 'Recepción, Atención Telefónica y Administración (Sede Central Joma Sport)',
    empresa: 'Joma Sport S.A. (Portillo de Toledo) y Zona Calzado Fuensalida',
    localidad: 'Otras localidades cercanas',
    municipioExacto: 'Portillo de Toledo / Fuensalida',
    distanciaKm: 13,
    tiempoCocheMin: 12,
    categoriaPuesto: 'Administración',
    etiquetasPuesto: ['Administración', 'Auxiliar administrativo', 'Recepción', 'Atención al cliente', 'Atención telefónica'],
    jornada: 'Completa',
    modalidad: 'Presencial',
    permitePocaExperiencia: false,
    fuenteOferta: 'Canal RRHH Joma Sport y Empresas del Calzado',
    compatibilidadPorcentaje: 89,
    desgloseCompatibilidad: {
      experiencia: 90,
      formacion: 90,
      movilidadCoche: 95,
      actitudYTrato: 94,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y fabricación de calzado',
      '✓ Experiencia en comercio e información sobre productos',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Contaplus)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (a 12 min por carretera directa desde Santo Domingo-Caudilla)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Aunque está ligeramente por encima de los 8 km (a unos 12 minutos en coche propio), une tres piezas reales de tu CV: tu experiencia en fabricación de calzado, tu experiencia en atención al cliente/comercio y tu FP de Auxiliar Administrativo.',
      'Tu Curso de 120 horas de Inteligencia Artificial de la Cámara de Comercio de Torrijos aporta modernidad para sus departamentos de atención comercial y recepción.',
    ],
    requisitoNoCumplidoOAlerta:
      'Solicitan en algunos departamentos inglés B1 (actualmente tienes A2) y está a 13 km (un poco más allá de tu radio ideal de 8 km, pero por carretera cómoda).',
    comoDefenderSinDescartar:
      'En recepción nacional, atención telefónica a tiendas de España y apoyo administrativo, tu español nativo, tu inglés A2 básico y tu conocimiento real del calzado y comercio encajan de maravilla. La decisión final es siempre tuya.',
    enlaceWebOficial: 'https://www.joma-sport.com/es_ES/trabaja-con-nosotros/',
    contactoReferencia: 'Web oficial Joma Sport y correo rrhh@joma-sport.com.',
    guionLlamadaDirecta:
      '«Buenos días, llamaba para el departamento de Recursos Humanos. Soy Pilar Fernández Almaraz, vecina de la comarca (Santo Domingo-Caudilla, con coche propio a 12 minutos de Portillo). Tengo la FP de Auxiliar Administrativo, el Curso de 120 horas de IA por la Cámara de Comercio de Torrijos y experiencia real tanto en atención al cliente y comercio como en fabricación de calzado. Quería confirmar si puedo enviar mi CV a rrhh@joma-sport.com para puestos de recepción o administración.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA RECEPCIÓN Y ADMINISTRACIÓN EN SECTOR CALZADO / DEPORTE (PORTILLO / FUENSALIDA)
• Candidata: Pilar Fernández Almaraz | Santo Domingo-Caudilla (a 12 min en coche propio).
• Conexión Única con el Sector: Experiencia real en Fabricación de Calzado + Comercio y Atención al Cliente + FP Auxiliar Administrativo.
• Formación Tecnológica: Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos).
• Herramientas: Mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word | Idiomas: Español (nativo), Inglés (A2).`,
      cartaPresentacionNatural: `Estimado equipo de Recursos Humanos de Joma Sport:

Me dirijo a ustedes con gran entusiasmo para presentar mi candidatura a puestos de recepción, atención telefónica al cliente o auxiliar administrativo en sus instalaciones de Portillo de Toledo. Resido muy cerca, en Santo Domingo-Caudilla, y cuento con permiso de conducir y coche propio (a apenas 12 minutos de trayecto).

Mi perfil reúne una combinación muy práctica para su empresa: por un lado, poseo la titulación de FP de Auxiliar Administrativo, experiencia en la Diputación Provincial de Toledo y el reciente Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos; por otro lado, cuento con experiencia real tanto en atención al cliente y comercio como en la fabricación de calzado, por lo que conozco y valoro el producto desde dentro.

Agradezco de antemano su atención y quedo a su entera disposición para mantener una entrevista personal.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto:
        'Candidatura Recepción / Atención al Cliente / Auxiliar Administrativo — Pilar Fernández Almaraz',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para su consideración en puestos de recepción, atención al cliente o administración en Portillo de Toledo.

Resido en Santo Domingo-Caudilla (con vehículo propio) y aporto titulación de FP Auxiliar Administrativo, Curso de Inteligencia Artificial de 120 horas (Cámara de Comercio de Torrijos), experiencia en atención al cliente y experiencia previa en el sector del calzado.

Muchas gracias por su atención.

Atentamente,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz. Resido en Santo Domingo-Caudilla (con coche propio, a 12 min de Portillo) y cuento con FP Auxiliar Administrativo, Curso de 120h de IA (Cámara de Torrijos) y experiencia real en atención al cliente y en el sector del calzado. Muy interesada en recepción y administración.',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Uno mi título de FP de Auxiliar Administrativo y mi Curso de 120h de IA en la Cámara de Torrijos con mi experiencia real en atención al cliente, comercio y fabricación de calzado.»',
      preguntaProbableEntrevista:
        '«Vemos que has trabajado tanto en atención al público y administración como en fabricación de calzado. ¿Qué te aporta esa mezcla?»',
      respuestaRecomendadaPilar:
        '«Me aporta una visión muy completa y humilde del trabajo: conozco el esfuerzo que hay detrás de fabricar un par de calzado, sé cómo se vende en una tienda y cómo hay que atender por teléfono o en recepción a un cliente o distribuidor con amabilidad, orden administrativo y puntualidad.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Conocimiento real del calzado + experiencia en comercio + FP Auxiliar Administrativo.',
        'Punto fuerte 2: Coche propio desde Santo Domingo-Caudilla (a 12 minutos por carretera).',
        'Cómo explicar el requisito de inglés B1 (teniendo A2): Destaca que para recepción nacional, atención a tiendas de España y gestión administrativa tu perfil encaja al 100 %, y que cuentas con nivel A2 y herramientas de IA de tu curso de 120 horas para apoyo documental.',
      ],
    },
  },
  {
    id: 'of-7',
    diaPlan: 7,
    destacadaDia1: false,
    tituloPuesto: 'Información al Ciudadano, Recepción Municipal y Apoyo Auxiliar',
    empresa: 'Ayuntamientos y Servicios Municipales (Santo Domingo-Caudilla, Torrijos, Alcabón y Novés)',
    localidad: 'Santo Domingo-Caudilla',
    municipioExacto: 'Santo Domingo-Caudilla y Comarca',
    distanciaKm: 1,
    tiempoCocheMin: 2,
    categoriaPuesto: 'Información al cliente',
    etiquetasPuesto: ['Información al cliente', 'Atención al público', 'Auxiliar administrativo', 'Recepción', 'Otros compatibles'],
    jornada: 'Ambas',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Bolsas de Empleo y Tablones Municipales de la Comarca',
    compatibilidadPorcentaje: 97,
    desgloseCompatibilidad: {
      experiencia: 98,
      formacion: 96,
      movilidadCoche: 100,
      actitudYTrato: 100,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y aprendiz en Diputación Provincial de Toledo',
      '✓ Experiencia en atención directa a personas (ayuda a domicilio y servicio público de taxi)',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Word + Windows)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (disponibilidad total en los 4 municipios)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Haber trabajado como aprendiz en la Diputación Provincial de Toledo y como auxiliar de ayuda a domicilio es un aval directo para ayuntamientos y servicios municipales.',
      'Conoces perfectamente Santo Domingo-Caudilla, Torrijos, Alcabón y Novés.',
      'Tu título de FP de Auxiliar Administrativo y tu Curso de 120 horas de IA suman mérito formativo.',
    ],
    requisitoNoCumplidoOAlerta:
      'Las bolsas municipales requieren estar pendiente de los plazos de apertura de instancia en el tablón de anuncios.',
    comoDefenderSinDescartar:
      'Presentar instancia o consultar periódicamente en el registro de los 4 ayuntamientos (que tienes en un radio de 0 a 7 km) te permite entrar en sustituciones y bolsas de empleo.',
    enlaceWebOficial: 'https://www.torrijos.es/',
    contactoReferencia: 'Ayuntamientos de Santo Domingo-Caudilla, Torrijos, Alcabón y Novés.',
    guionLlamadaDirecta:
      '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla. Tengo el título de FP de Auxiliar Administrativo, experiencia previa como aprendiz en la Diputación Provincial de Toledo, en ayuda a domicilio y el Curso de 120 horas de IA de la Cámara de Comercio de Torrijos. Llamaba para consultar si hay abierta alguna bolsa de empleo para atención al público, conserjería/recepción, auxiliar administrativo o servicios municipales.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA ATENCIÓN AL PÚBLICO, INFORMACIÓN Y SERVICIOS MUNICIPALES
• Candidata: Pilar Fernández Almaraz | Vecina de Santo Domingo-Caudilla (con coche propio).
• Experiencia en Administración Pública y Servicios: Aprendiz en la Diputación Provincial de Toledo | Auxiliar de Ayuda a Domicilio | Atención y servicio al cliente | Conductora de taxi.
• Formación: FP Auxiliar Administrativo | Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos) | Graduado Escolar.`,
      cartaPresentacionNatural: `Al Registro / Área de Personal del Ayuntamiento:

Expongo mi interés en participar en las bolsas de empleo y contrataciones temporales para puestos de atención al público, información, recepción, auxiliar administrativo o apoyo en servicios municipales.

Soy vecina de Santo Domingo-Caudilla, dispongo de permiso de conducir y vehículo propio, y cuento con la titulación de FP de Auxiliar Administrativo, el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos, así como experiencia real como aprendiz en la Diputación Provincial de Toledo y como auxiliar de ayuda a domicilio.

Atentamente,
Pilar Fernández Almaraz`,
      emailAsunto: 'Consulta Bolsa de Empleo / Candidatura Municipal — Pilar Fernández Almaraz',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae y datos profesionales para información sobre bolsas de empleo de auxiliar administrativo, recepción, atención al ciudadano o ayuda a domicilio.

Cuento con experiencia como aprendiz en la Diputación Provincial de Toledo, en ayuda a domicilio, título de FP Auxiliar Administrativo y Curso de 120 horas de IA por la Cámara de Comercio de Torrijos.

Reciban un cordial saludo,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Pilar Fernández Almaraz — Vecina de Santo Domingo-Caudilla con FP Auxiliar Administrativo, experiencia como aprendiz en la Diputación de Toledo, ayuda a domicilio, atención al cliente y Curso de 120h de IA (Cámara de Comercio de Torrijos).',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla. Tengo la FP de Auxiliar Administrativo, trabajé como aprendiz en la Diputación Provincial de Toledo y en ayuda a domicilio, y cuento con el Curso de 120h de IA de la Cámara de Comercio de Torrijos.»',
      preguntaProbableEntrevista:
        '«¿Qué destacarías de tu paso como aprendiz en la Diputación Provincial de Toledo y en ayuda a domicilio?»',
      respuestaRecomendadaPilar:
        '«En la Diputación Provincial de Toledo aprendí la importancia del orden administrativo, el respeto a los procedimientos y la atención formal al ciudadano; y en ayuda a domicilio reforcé mi vocación de servicio, paciencia y empatía tratando directamente con personas y familias.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: Experiencia real previa en la Diputación Provincial de Toledo y en ayuda a domicilio.',
        'Punto fuerte 2: Vecina empadronada en Santo Domingo-Caudilla con coche propio para desplazarse por toda la comarca.',
      ],
    },
  },
  {
    id: 'of-8',
    diaPlan: 3,
    destacadaDia1: false,
    tituloPuesto: 'Recepcionista y Atención al Cliente en Concesionario / Gestoría / Inmobiliaria',
    empresa: 'Concesionarios, Gestorías, Seguros e Inmobiliarias de Torrijos',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Avda. Toledo / Centro)',
    distanciaKm: 5,
    tiempoCocheMin: 6,
    categoriaPuesto: 'Atención al público',
    etiquetasPuesto: ['Atención al público', 'Recepción', 'Atención al cliente', 'Auxiliar administrativo', 'Otros compatibles'],
    jornada: 'Ambas',
    modalidad: 'Presencial',
    permitePocaExperiencia: true,
    fuenteOferta: 'Directorio de Servicios y Concesionarios de Torrijos',
    compatibilidadPorcentaje: 93,
    desgloseCompatibilidad: {
      experiencia: 94,
      formacion: 95,
      movilidadCoche: 100,
      actitudYTrato: 96,
    },
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente y sector automoción/transporte (conductora de taxi)',
      '✓ Experiencia en comercio, cobros y trato presencial',
      '✓ Formación administrativa (FP Auxiliar Administrativo + Contaplus + PGC)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (a 5 km de Torrijos)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'En un concesionario, taller oficial, agencia de seguros, inmobiliaria o gestoría de Torrijos, tu combinación de FP Auxiliar Administrativo (Contaplus) + experiencia como conductora profesional de taxi + trato amable al cliente es ideal.',
      'A solo 6 minutos en coche desde Santo Domingo-Caudilla.',
    ],
    requisitoNoCumplidoOAlerta:
      'Pueden pedir manejo de programas propios de pólizas, citas de taller o gestión inmobiliaria.',
    comoDefenderSinDescartar:
      'Destaca tu dominio de Contaplus, Word, mecanografía y tu Curso de 120 horas de IA en la Cámara de Comercio de Torrijos: aprendes cualquier software de oficina rápidamente.',
    enlaceWebOficial: 'https://www.google.com/search?q=concesionarios+gestorias+inmobiliarias+seguros+Torrijos',
    contactoReferencia: 'Concesionarios de Avda. de Toledo y gestorías/inmobiliarias del centro de Torrijos.',
    guionLlamadaDirecta:
      '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Tengo la FP de Auxiliar Administrativo, manejo de Contaplus, el Curso de 120 horas de IA en la Cámara de Comercio de Torrijos y mucha experiencia atendiendo al público y en el sector del transporte. Quería preguntarles si puedo acercarles mi currículum por si necesitan cubrir recepción, atención al cliente o apoyo administrativo.»',
    dossierCandidatura: {
      resumenCVAdaptado: `PERFIL ADAPTADO PARA RECEPCIÓN EN CONCESIONARIOS, GESTORÍAS, SEGUROS E INMOBILIARIAS (TORRIJOS)
• Candidata: Pilar Fernández Almaraz | Santo Domingo-Caudilla (a 5 km de Torrijos, con coche propio).
• Formación Administrativa: FP Auxiliar Administrativo | Contaplus | Plan General de Contabilidad | Gestión de personal | Curso de IA — 120 horas (Cámara de Comercio de Torrijos).
• Experiencia de Valor: Atención y servicio al cliente, administración (Diputación de Toledo), comercio, caja y conducción profesional de taxi.`,
      cartaPresentacionNatural: `Estimada dirección en Torrijos:

Me pongo en contacto con ustedes para presentar mi candidatura a puestos de recepción, atención al cliente o auxiliar administrativo en su oficina de Torrijos. Resido a tan solo 5 kilómetros, en Santo Domingo-Caudilla, y cuento con permiso de conducir y vehículo propio.

Poseo la titulación de FP de Auxiliar Administrativo, conocimientos de Contaplus, Plan General de Contabilidad, Gestión de personal, mecanografía y Word, además del Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos. A ello sumo una sólida trayectoria tratando directamente con clientes en comercio, administración y transporte de viajeros en taxi.

Estaré encantada de saludarles personalmente y ampliar cualquier detalle en una entrevista.

Un cordial saludo,
Pilar Fernández Almaraz`,
      emailAsunto: 'Candidatura Recepción / Atención al Cliente / Administración — Pilar Fernández Almaraz',
      emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para posibles vacantes de recepción, atención al público o apoyo administrativo en su empresa de Torrijos.

Aporto FP Auxiliar Administrativo, Contaplus, Curso de 120h de IA (Cámara de Comercio de Torrijos), vehículo propio desde Santo Domingo-Caudilla y amplia experiencia en trato directo con clientes.

Atentamente,
Pilar Fernández Almaraz`,
      mensajeLinkedInBreve:
        'Hola, soy Pilar Fernández Almaraz (Santo Domingo-Caudilla, a 5 min de Torrijos con coche propio). Auxiliar Administrativo (FP) con Contaplus, Curso de 120h de IA (Cámara de Torrijos) y experiencia en atención al cliente y transporte. Disponible para recepción y oficina.',
      presentacionCorta:
        '«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con coche propio. Soy Auxiliar Administrativo con Contaplus, Curso de 120h de IA de la Cámara de Torrijos y amplia experiencia en atención al cliente y sector del transporte. Les dejo mi currículum para recepción o administración.»',
      preguntaProbableEntrevista:
        '«En nuestra oficina atendemos tanto a clientes que vienen en persona a hacer gestiones como llamadas telefónicas y archivo de documentación. ¿Qué es lo que mejor se te da?»',
      respuestaRecomendadaPilar:
        '«Precisamente combinar el trato cercano a las personas con el orden en los papeles. Al cliente que entra por la puerta le recibo con amabilidad y serenidad, y gracias a mi FP de Auxiliar Administrativo, Contaplus y el Curso de 120 horas de IA, llevo el archivo, las citas y los documentos al día.»',
      puntosFuertesYRequisitosExplicar: [
        'Punto fuerte 1: FP Auxiliar Administrativo + Contaplus + Plan General de Contabilidad.',
        'Punto fuerte 2: Permiso de conducir, coche propio y experiencia como conductora profesional de taxi (muy valorado en concesionarios, talleres y seguros).',
        'Punto fuerte 3: Curso de Inteligencia Artificial de 120 horas (Cámara de Comercio de Torrijos).',
      ],
    },
  },
];

export const DIRECTORIO_EMPRESAS_COMARCA: EmpresaDirectorioComarca[] = [
  {
    id: 'emp-1',
    nombre: 'Clínicas Dentales, Ópticas y Centros Médicos de Torrijos',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Avda. Estación / Plaza de España)',
    distanciaDesdeSantoDomingoKm: 5,
    sector: 'Clínicas y Centros Sanitarios con Recepción',
    puestoQuePodriaEncajar: 'Recepcionista, Atención al Paciente y Gestión de Citas / Cobros',
    puestosHabitualesParaPilar: ['Recepción', 'Atención al cliente', 'Atención telefónica', 'Auxiliar administrativo'],
    motivoEncajePilar:
      'Tu trato humano y paciente (demostrado en ayuda a domicilio, taxi y comercio) unido a tu FP de Auxiliar Administrativo, Contaplus y Curso de 120h de IA encaja al 100 % en la recepción de una clínica.',
    ventajaCochePropio: 'A solo 5 km (6 min en tu coche propio desde Santo Domingo-Caudilla).',
    webOficial: 'https://www.google.com/search?q=clinicas+dentales+y+medicas+en+Torrijos',
    paginaEmpleo: 'https://www.google.com/search?q=empleo+recepcionista+clinica+Torrijos',
    estadoContratacionVerificado:
      'Rotación habitual en puestos de recepción de tarde/completa. Recomendada entrega de CV en mano y autocandidatura.',
    tieneOfertaActivaVerificada: true,
    canalEmpleoDirecto: 'Entrega presencial en mostrador de recepción (mañanas de 10:00 a 12:30).',
    ofertaAsociadaId: 'of-1',
  },
  {
    id: 'emp-2',
    nombre: 'Hipermercado Carrefour, Ahorramas y Lidl (Torrijos)',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos',
    distanciaDesdeSantoDomingoKm: 5,
    sector: 'Grandes Superficies y Alimentación',
    puestoQuePodriaEncajar: 'Cajera, Atención al Cliente, Información y Reposición',
    puestosHabitualesParaPilar: ['Atención al cliente', 'Comercio y dependienta', 'Información al cliente', 'Atención al público'],
    motivoEncajePilar:
      'Tienes experiencia real exacta en tu CV en comercio, cobro en caja, reposición, atención a dudas de clientes e información sobre productos.',
    ventajaCochePropio: 'A 5 km en coche propio, permitiendo cubrir turnos de apertura (06:30/07:00) o cierre sin problema.',
    webOficial: 'https://www.carrefour.es',
    paginaEmpleo: 'https://www.carrefour.es/trabaja-con-nosotros/',
    estadoContratacionVerificado:
      'Bolsa de empleo activa todo el año en sus portales oficiales para Torrijos.',
    tieneOfertaActivaVerificada: true,
    canalEmpleoDirecto: 'Inscripción online en web de empleo + entrega en mostrador de Atención al Cliente.',
    ofertaAsociadaId: 'of-2',
  },
  {
    id: 'emp-3',
    nombre: 'Empresas y Naves del Polígono Industrial de Santo Domingo-Caudilla',
    localidad: 'Santo Domingo-Caudilla',
    municipioExacto: 'Santo Domingo-Caudilla',
    distanciaDesdeSantoDomingoKm: 1,
    sector: 'Empresas Industriales y de Transporte con Atención al Cliente',
    puestoQuePodriaEncajar: 'Auxiliar Administrativa de Oficina, Albaranes y Atención Telefónica',
    puestosHabitualesParaPilar: ['Administración y auxiliar administrativo', 'Recepción', 'Atención telefónica'],
    motivoEncajePilar:
      'Eres vecina de Santo Domingo-Caudilla, tienes FP Auxiliar Administrativo, Contaplus, Plan General de Contabilidad, mecanografía y el Curso de 120h de IA de la Cámara de Torrijos.',
    ventajaCochePropio: 'A 1-2 km de tu casa (disponibilidad inmediata ante cualquier imprevisto).',
    webOficial: 'https://www.google.com/search?q=poligono+industrial+Santo+Domingo+Caudilla+empresas',
    paginaEmpleo: '',
    estadoContratacionVerificado:
      'Sin oferta pública publicada en portales hoy — Oportunidad excelente para autocandidatura presencial como vecina del municipio.',
    tieneOfertaActivaVerificada: false,
    canalEmpleoDirecto: 'Llamada previa y entrega de CV en mano en las oficinas del polígono local.',
    ofertaAsociadaId: 'of-3',
  },
  {
    id: 'emp-4',
    nombre: 'Gestorías, Asesorías y Agencias de Seguros en Torrijos',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Centro)',
    distanciaDesdeSantoDomingoKm: 5,
    sector: 'Gestorías, Empresas de Seguros y Servicios Administrativos',
    puestoQuePodriaEncajar: 'Auxiliar Administrativo, Recepción de Clientes y Archivo',
    puestosHabitualesParaPilar: ['Administración y auxiliar administrativo', 'Recepción', 'Atención al cliente', 'Atención telefónica'],
    motivoEncajePilar:
      'Conoces Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word y tienes experiencia como aprendiz en la Diputación Provincial de Toledo.',
    ventajaCochePropio: 'A 6 minutos en coche propio desde Santo Domingo-Caudilla.',
    webOficial: 'https://www.google.com/search?q=gestorias+asesorias+y+seguros+en+Torrijos',
    paginaEmpleo: '',
    estadoContratacionVerificado:
      'Seleccionan habitualmente por currículum entregado en oficina o bolsa de la Cámara de Comercio de Torrijos.',
    tieneOfertaActivaVerificada: false,
    canalEmpleoDirecto: 'Correo electrónico directo y visita presencial en Torrijos.',
    ofertaAsociadaId: 'of-8',
  },
  {
    id: 'emp-5',
    nombre: 'Concesionarios, Talleres Oficiales e Inmobiliarias de Torrijos',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos (Avda. de Toledo y Centro)',
    distanciaDesdeSantoDomingoKm: 5,
    sector: 'Concesionarios, Automoción e Inmobiliarias',
    puestoQuePodriaEncajar: 'Recepcionista de Clientes, Atención Telefónica y Gestión de Citas / Expedientes',
    puestosHabitualesParaPilar: ['Recepción', 'Atención al cliente', 'Atención telefónica', 'Información al cliente'],
    motivoEncajePilar:
      'Tu experiencia como conductora profesional de taxi te da un lenguaje muy cercano para concesionarios y talleres, y tu trato amable y FP Administrativa encajan de lleno en inmobiliarias.',
    ventajaCochePropio: 'A 5 km desde Santo Domingo-Caudilla con permiso de conducir y coche propio.',
    webOficial: 'https://www.google.com/search?q=concesionarios+e+inmobiliarias+en+Torrijos',
    paginaEmpleo: '',
    estadoContratacionVerificado:
      'Sin oferta pública confirmada hoy — Muy receptivos a candidaturas presenciales para recepción y atención telefónica.',
    tieneOfertaActivaVerificada: false,
    canalEmpleoDirecto: 'Entrega presencial de CV con código QR en recepción.',
    ofertaAsociadaId: 'of-8',
  },
  {
    id: 'emp-6',
    nombre: 'Comercios, Cooperativas y Servicios en Alcabón',
    localidad: 'Alcabón',
    municipioExacto: 'Alcabón',
    distanciaDesdeSantoDomingoKm: 3,
    sector: 'Pequeños Comercios, Cooperativas y Atención al Público',
    puestoQuePodriaEncajar: 'Dependienta, Atención al Público y Auxiliar de Oficina',
    puestosHabitualesParaPilar: ['Comercio y dependienta', 'Atención al público', 'Administración y auxiliar administrativo'],
    motivoEncajePilar:
      'Alcabón es el municipio vecino más cercano a Santo Domingo-Caudilla (3 km). Tu perfil polivalente de comercio + caja + administración es ideal para pymes locales.',
    ventajaCochePropio: 'A tan solo 3 km (4 minutos en coche propio).',
    webOficial: 'https://www.google.com/search?q=empresas+cooperativas+y+comercios+en+Alcabon',
    paginaEmpleo: '',
    estadoContratacionVerificado:
      'Contratación directa por cercanía y confianza en el municipio.',
    tieneOfertaActivaVerificada: false,
    canalEmpleoDirecto: 'Trato directo en los comercios, cooperativas y oficinas de Alcabón.',
    ofertaAsociadaId: 'of-4',
  },
  {
    id: 'emp-7',
    nombre: 'UDL Libros y Empresas de Transporte/Logística (Novés y Polígono Las Atalayas)',
    localidad: 'Novés',
    municipioExacto: 'Novés / Polígono Las Atalayas Torrijos',
    distanciaDesdeSantoDomingoKm: 7,
    sector: 'Empresas de Transporte, Logística y Distribución con Recepción',
    puestoQuePodriaEncajar: 'Auxiliar Administrativo de Logística, Recepción y Atención Telefónica',
    puestosHabitualesParaPilar: ['Atención telefónica', 'Administración y auxiliar administrativo', 'Recepción'],
    motivoEncajePilar:
      'Mecanografía, Contaplus, Word, Curso de 120h de IA y experiencia real tratando con clientes y en el sector del transporte.',
    ventajaCochePropio: 'A 7 km (8 min en coche propio, imprescindible porque a los polígonos no llega transporte frecuente).',
    webOficial: 'https://www.udllibros.com/',
    paginaEmpleo: 'https://www.udllibros.com/',
    estadoContratacionVerificado:
      'Polígono con actividad continua en administración de albaranes y recepción de transportistas.',
    tieneOfertaActivaVerificada: true,
    canalEmpleoDirecto: 'Contacto telefónico y envío de CV adaptado al departamento de administración.',
    ofertaAsociadaId: 'of-5',
  },
  {
    id: 'emp-8',
    nombre: 'Vivero de Empresas Cámara de Comercio de Torrijos y Centros Educativos/Formación',
    localidad: 'Torrijos',
    municipioExacto: 'Torrijos',
    distanciaDesdeSantoDomingoKm: 5,
    sector: 'Centros Educativos, Academias y Vivero Empresarial',
    puestoQuePodriaEncajar: 'Recepción, Información al Alumno/Cliente y Secretaría Auxiliar',
    puestosHabitualesParaPilar: ['Información al cliente', 'Recepción', 'Auxiliar administrativo', 'Atención al público'],
    motivoEncajePilar:
      'Te has certificado allí mismo en el Curso de Inteligencia Artificial de 120 horas por la Cámara de Comercio de Torrijos, lo que genera una confianza inmediata.',
    ventajaCochePropio: 'A 5 km desde Santo Domingo-Caudilla en coche propio.',
    webOficial: 'https://camaratoledo.com/',
    paginaEmpleo: 'https://camaratoledo.com/',
    estadoContratacionVerificado:
      'Bolsa de orientación y contacto directo con pymes instaladas en el Vivero de Torrijos.',
    tieneOfertaActivaVerificada: true,
    canalEmpleoDirecto: 'Visita presencial al Vivero de Empresas de la Cámara en Torrijos.',
    ofertaAsociadaId: 'of-3',
  },
  {
    id: 'emp-9',
    nombre: 'Joma Sport S.A. (Portillo de Toledo) y Empresas de Calzado (Fuensalida)',
    localidad: 'Otras localidades cercanas',
    municipioExacto: 'Portillo de Toledo / Fuensalida',
    distanciaDesdeSantoDomingoKm: 13,
    sector: 'Empresas Industriales con Departamento de Atención al Cliente y Recepción',
    puestoQuePodriaEncajar: 'Recepción Centralita, Atención al Cliente Comercial y Apoyo Administrativo',
    puestosHabitualesParaPilar: ['Atención al cliente', 'Recepción', 'Administración y auxiliar administrativo', 'Comercio y dependienta'],
    motivoEncajePilar:
      'Une tu experiencia real en fabricación de calzado con tu experiencia en comercio y tu título de FP de Auxiliar Administrativo + Curso de 120h de IA.',
    ventajaCochePropio: 'A 12 minutos en coche propio por carretera cómoda.',
    webOficial: 'https://www.joma-sport.com/',
    paginaEmpleo: 'https://www.joma-sport.com/es_ES/trabaja-con-nosotros/',
    estadoContratacionVerificado:
      'Portal de empleo corporativo activo en web oficial (rrhh@joma-sport.com).',
    tieneOfertaActivaVerificada: true,
    canalEmpleoDirecto: 'Portal web de empleo de Joma Sport y correo de Recursos Humanos.',
    ofertaAsociadaId: 'of-6',
  },
];

export const PLAN_10_DIAS_COMPLETO: DiaPlan10[] = [
  {
    dia: 1,
    titulo: 'DÍA 1: Revisar CV, completar perfil, buscar primeras ofertas y seleccionar 5 interesantes',
    resumenCorto: 'Revisar CV · Completar perfil · Seleccionar 5 ofertas interesantes',
    focoDelDia: 'Poner a punto tu CV con el Curso de IA de 120h (Cámara de Comercio de Torrijos), tu código QR y elegir tus primeras 5 ofertas.',
    mensajeMotivador:
      '«Buenos días, Pilar. Hoy empezamos tu plan de 10 días desde Santo Domingo-Caudilla. Tu experiencia con las personas, tu coche propio y tu Curso de 120h de IA son tu mejor aval.»',
    metaCandidaturasDia: 5,
    tareasPasoAPaso: [
      {
        id: 'd1-t1',
        texto: 'Revisar tu CV oficial y comprobar que aparece visible el "Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos)"',
        explicacionSencilla: 'Abre la sección "Mi CV" o "Modo Reclutador / QR" para ver cómo queda tu presentación.',
      },
      {
        id: 'd1-t2',
        texto: 'Explorar el Buscador de Empleo en Santo Domingo-Caudilla, Torrijos, Alcabón y Novés (radio 8 km)',
        explicacionSencilla: 'Revisa el porcentaje de compatibilidad y los puntos fuertes de cada oferta.',
      },
      {
        id: 'd1-t3',
        texto: 'Seleccionar 5 ofertas interesantes y marcarlas en "Me interesa" o "CV Preparado"',
        explicacionSencilla: 'Así tu panel "Mi Búsqueda de Empleo" actualizará tus contadores automáticamente.',
      },
    ],
  },
  {
    dia: 2,
    titulo: 'DÍA 2: Enviar 5 candidaturas adaptadas',
    resumenCorto: 'Enviar tus primeras 5 candidaturas',
    focoDelDia: 'Usar el botón "Preparar Mi Candidatura" para enviar CV adaptado, carta y email a tus 5 ofertas prioritarias.',
    mensajeMotivador:
      '«Vamos a ver qué podemos hacer hoy, Pilar. Con tus cartas y correos ya redactados, enviar tus 5 primeras candidaturas te resultará súper fácil.»',
    metaCandidaturasDia: 5,
    tareasPasoAPaso: [
      {
        id: 'd2-t1',
        texto: 'Pulsar "Preparar Mi Candidatura" en las ofertas de Recepción, Supermercados y Polígono local',
        explicacionSencilla: 'Copia el email o imprime el CV adaptado con un solo clic.',
      },
      {
        id: 'd2-t2',
        texto: 'Enviar las 5 candidaturas y pasar su estado a "CV Enviado" en Mis Candidaturas (Kanban)',
        explicacionSencilla: 'El contador de "CV enviados" de tu panel subirá al instante.',
      },
    ],
  },
  {
    dia: 3,
    titulo: 'DÍA 3: Buscar nuevas empresas cercanas (Torrijos, Santo Domingo-Caudilla, Alcabón y Novés)',
    resumenCorto: 'Buscar nuevas empresas cercanas',
    focoDelDia: 'Explorar la sección "Empresas que podrían contratarme": clínicas, gestorías, concesionarios, inmobiliarias y comercios.',
    mensajeMotivador:
      '«Muchas empresas de Torrijos, Alcabón y Novés no publican anuncio en internet, pero contratan cuando alguien formal y cercana como tú les entrega su CV.»',
    metaCandidaturasDia: 3,
    tareasPasoAPaso: [
      {
        id: 'd3-t1',
        texto: 'Revisar la sección "Buscar Empresas" y elegir 3 empresas cercanas (radio 5-8 km)',
        explicacionSencilla: 'Fíjate en clínicas, gestorías, concesionarios y comercios de Torrijos y Alcabón.',
      },
      {
        id: 'd3-t2',
        texto: 'Preparar tu tarjeta con Código QR para enseñarla o entregarla en mano',
        explicacionSencilla: 'Al escanear tu código QR, las empresas verán tu perfil profesional moderno al instante.',
      },
    ],
  },
  {
    dia: 4,
    titulo: 'DÍA 4: Enviar nuevas candidaturas a empresas de la comarca',
    resumenCorto: 'Enviar nuevas candidaturas',
    focoDelDia: 'Autocandidatura directa por correo, teléfono o en mano en empresas de Torrijos, Alcabón y Novés.',
    mensajeMotivador:
      '«Tu permiso de conducir y tu coche propio te permiten llegar en 5 minutos a cualquier empresa de la comarca. ¡Hagámoslo saber!»',
    metaCandidaturasDia: 4,
    tareasPasoAPaso: [
      {
        id: 'd4-t1',
        texto: 'Enviar nuevas candidaturas a empresas de transporte/logística (Novés / Polígono Las Atalayas) y gestorías',
        explicacionSencilla: 'Usa la presentación corta y el email del botón "Preparar Mi Candidatura".',
      },
      {
        id: 'd4-t2',
        texto: 'Registrar en el Kanban la fecha, fuente y persona de contacto de cada empresa',
        explicacionSencilla: 'Así tendrás todo anotado para cuando toque hacer seguimiento.',
      },
    ],
  },
  {
    dia: 5,
    titulo: 'DÍA 5: Preparar entrevistas con tu orientadora "Pilar IA"',
    resumenCorto: 'Preparar entrevistas',
    focoDelDia: 'Practicar respuestas reales sobre tu experiencia en atención al cliente, tu Curso de 120h de IA y cómo defender requisitos como el inglés A2.',
    mensajeMotivador:
      '«Cuando te llamen para una entrevista irás con total tranquilidad: no tenemos que inventar nada porque tu experiencia real vale muchísimo.»',
    metaCandidaturasDia: 0,
    tareasPasoAPaso: [
      {
        id: 'd5-t1',
        texto: 'Entrar en "Preparar Entrevista" y repasar las 5 preguntas clave de Recursos Humanos',
        explicacionSencilla: 'Lee en voz alta cómo explicar tu Curso de 120h de IA en la Cámara de Comercio de Torrijos.',
      },
      {
        id: 'd5-t2',
        texto: 'Practicar una respuesta con el asistente "Hablar con mi Asistente (Pilar IA)"',
        explicacionSencilla: 'Pulsa cualquiera de los botones rápidos de consulta para ensayar.',
      },
    ],
  },
  {
    dia: 6,
    titulo: 'DÍA 6: Buscar nuevas oportunidades (incluyendo puestos con nombres distintos pero compatibles)',
    resumenCorto: 'Buscar nuevas oportunidades',
    focoDelDia: 'Ampliar la mirada a puestos de información al cliente, recepción en concesionarios, clínicas o empresas de Portillo/Fuensalida.',
    mensajeMotivador:
      '«No nos limitamos a un solo nombre de puesto: tu experiencia sirve para recepción, atención telefónica, caja, información al público y oficina.»',
    metaCandidaturasDia: 3,
    tareasPasoAPaso: [
      {
        id: 'd6-t1',
        texto: 'Usar el filtro de distancia (8 km / 15 km) en el Buscador para descubrir oportunidades adicionales',
        explicacionSencilla: 'Valora ofertas como recepción en Joma Sport (Portillo) o ayuntamientos de la comarca.',
      },
      {
        id: 'd6-t2',
        texto: 'Analizar cualquier oferta nueva pegando su texto en el Analizador Inteligente',
        explicacionSencilla: 'La aplicación calculará al instante tu compatibilidad y te creará el CV y la carta.',
      },
    ],
  },
  {
    dia: 7,
    titulo: 'DÍA 7: Revisar candidaturas enviadas y organizar tu tablero Kanban',
    resumenCorto: 'Revisar candidaturas enviadas',
    focoDelDia: 'Comprobar el estado de todas las ofertas guardadas en "Mis Candidaturas" y anotar fechas de seguimiento.',
    mensajeMotivador:
      '«Llevas una semana trabajando con el orden de una auténtica profesional de la administración. Hoy ponemos al día tu tablero.»',
    metaCandidaturasDia: 0,
    tareasPasoAPaso: [
      {
        id: 'd7-t1',
        texto: 'Revisar las tarjetas en "Mis Candidaturas" (CV Enviado / Contactada) y anotar notas o fechas',
        explicacionSencilla: 'Comprueba qué empresas llevan más de 4 o 5 días desde que enviaste el CV.',
      },
    ],
  },
  {
    dia: 8,
    titulo: 'DÍA 8: Hacer seguimiento amable y profesional',
    resumenCorto: 'Hacer seguimiento',
    focoDelDia: 'Llamar o escribir un mensaje breve de cortesía a las empresas donde enviaste tu candidatura en los primeros días.',
    mensajeMotivador:
      '«Una llamada amable de 30 segundos diciendo "Soy Pilar, de Santo Domingo-Caudilla, quería confirmar que recibieron bien mi CV" marca la diferencia.»',
    metaCandidaturasDia: 3,
    tareasPasoAPaso: [
      {
        id: 'd8-t1',
        texto: 'Realizar seguimiento de 3 candidaturas enviadas y moverlas al estado "Seguimiento" o "Contactada"',
        explicacionSencilla: 'Usa el guion telefónico incluido en cada oferta para hablar con total seguridad.',
      },
    ],
  },
  {
    dia: 9,
    titulo: 'DÍA 9: Enviar nuevas candidaturas de refuerzo',
    resumenCorto: 'Enviar nuevas candidaturas',
    focoDelDia: 'Dar un impulso final enviando candidaturas a las empresas o comercios que aún tenías en "Me interesa" o "CV Preparado".',
    mensajeMotivador:
      '«Cada candidatura enviada en nuestro radio de Santo Domingo-Caudilla, Torrijos, Alcabón y Novés es una puerta abierta más.»',
    metaCandidaturasDia: 3,
    tareasPasoAPaso: [
      {
        id: 'd9-t1',
        texto: 'Convertir las ofertas en "Me interesa" o "CV Preparado" en "CV Enviado"',
        explicacionSencilla: 'Apóyate en el botón "Preparar Mi Candidatura" para hacerlo en un minuto.',
      },
    ],
  },
  {
    dia: 10,
    titulo: 'DÍA 10: Analizar resultados y crear el siguiente plan de acción',
    resumenCorto: 'Analizar resultados y crear el siguiente plan',
    focoDelDia: 'Revisar tus contadores de "Mi Búsqueda de Empleo" (ofertas, CV enviados, contactos, entrevistas) y consolidar tu hoja de ruta.',
    mensajeMotivador:
      '«¡Enhorabuena, Pilar! Has completado tus 10 días con constancia, organización y una presentación profesional de primer nivel.»',
    metaCandidaturasDia: 0,
    tareasPasoAPaso: [
      {
        id: 'd10-t1',
        texto: 'Revisar los contadores finales en el panel "Mi Búsqueda de Empleo" y las entrevistas en marcha',
        explicacionSencilla: 'Comprueba tus avances y pide a "Pilar IA" tu resumen de continuidad.',
      },
    ],
  },
];

export const PREGUNTAS_PREPARADOR_ENTREVISTAS: PreguntaEntrevista[] = [
  {
    id: 'ent-1',
    categoria: 'Presentación Personal y Cercanía',
    pregunta: '«Háblame un poco de ti, Pilar. ¿Por qué te interesa este puesto en nuestra empresa?»',
    objetivoRRHH: 'Conocer tu motivación, tu cercanía geográfica y qué aportas desde el primer día.',
    respuestaBasadaEnExperienciaReal:
      '«Soy vecina de Santo Domingo-Caudilla, tengo permiso de conducir y coche propio, por lo que estoy a poquísimos minutos de aquí. Toda mi vida laboral ha girado en torno al trato directo y amable con las personas (en atención al cliente, comercio, caja, conducción de taxi y ayuda a domicilio) y a la gestión administrativa, ya que tengo la FP de Auxiliar Administrativo, hice prácticas en la Diputación de Toledo y me he certificado en el Curso de Inteligencia Artificial de 120 horas en la Cámara de Comercio de Torrijos. Busco un puesto estable donde aportar mi formalidad, puntualidad y ganas de trabajar.»',
    datosRealesUsados:
      'Residencia en Santo Domingo-Caudilla + Coche propio + FP Auxiliar Administrativo + Curso IA 120h Cámara de Torrijos + Experiencia en comercio/taxi/Diputación.',
  },
  {
    id: 'ent-2',
    categoria: 'Formación Destacada (Curso IA 120h)',
    pregunta: '«Vemos en tu CV el Curso de Inteligencia Artificial — 120 horas certificado por la Cámara de Comercio de Torrijos. ¿En qué consiste?»',
    objetivoRRHH: 'Comprobar que tienes interés por aprender, que te llevas bien con la tecnología y que lo explicas con sencillez y sin exagerar.',
    respuestaBasadaEnExperienciaReal:
      '«Lo realicé porque me gusta estar actualizada y aprender herramientas útiles. Han sido 120 horas certificadas por la Cámara de Comercio de Torrijos donde he aprendido de forma práctica a apoyarme en la Inteligencia Artificial para redactar correos y escritos con corrección, organizar información, resumir documentos y agilizar tareas administrativas y de atención al cliente. Unido a mi mecanografía, Word y Contaplus, me ayuda a trabajar de forma mucho más ordenada y rápida.»',
    datosRealesUsados:
      'Curso de Inteligencia Artificial de 120 horas (Cámara de Comercio de Torrijos) + Mecanografía + Word + Contaplus.',
  },
  {
    id: 'ent-3',
    categoria: 'Atención al Cliente y Resolución de Situaciones',
    pregunta: '«Si entra un cliente con prisa o con una queja mientras estás atendiendo el teléfono o la caja, ¿cómo actúas?»',
    objetivoRRHH: 'Evaluar tu paciencia, educación y capacidad para mantener la calma cara al público.',
    respuestaBasadaEnExperienciaReal:
      '«Mantengo siempre la calma y el trato respetuoso. Después de trabajar cara al público en comercio, caja, como conductora de taxi atendiendo a todo tipo de clientes y en ayuda a domicilio, sé que lo principal es escuchar a la persona con amabilidad, transmitirle tranquilidad y darle una respuesta clara y ordenada sin perder la sonrisa.»',
    datosRealesUsados:
      'Atención y servicio al cliente + Comercio y caja + Conducción de taxi + Ayuda a domicilio.',
  },
  {
    id: 'ent-4',
    categoria: 'Defensa de Requisitos (Inglés A2 o Programas Nuevos)',
    pregunta: '«En el anuncio indicábamos inglés B1 o un programa informático propio, y vemos que tienes inglés A2 y Contaplus. ¿Cómo lo ves?»',
    objetivoRRHH: 'Comprobar tu sinceridad y tu disposición para aprender.',
    respuestaBasadaEnExperienciaReal:
      '«Les hablo con total sinceridad: mi nivel de inglés es A2, suficiente para comprender lo básico y dar una primera atención educada, y para cualquier correo o documento escrito me apoyo con mucha agilidad en las herramientas que he aprendido en mi Curso de 120 horas de IA. Y en cuanto al programa informático, al tener la base de FP de Auxiliar Administrativo, Contaplus, Plan General de Contabilidad y mecanografía, aprendo el manejo de su programa en muy pocos días.»',
    datosRealesUsados:
      'Inglés A2 real + Contaplus + Plan General de Contabilidad + Curso IA 120h.',
  },
  {
    id: 'ent-5',
    categoria: 'Movilidad, Coche Propio y Puntualidad',
    pregunta: '«¿Tendrías algún problema para desplazarte a diario o adaptarte a nuestros horarios en Torrijos / Alcabón / Novés?»',
    objetivoRRHH: 'Garantizar puntualidad y autonomía en los desplazamientos por la comarca.',
    respuestaBasadaEnExperienciaReal:
      '«Ningún problema en absoluto. Vivo en Santo Domingo-Caudilla, tengo permiso de conducir y coche propio, y además he trabajado como conductora profesional de taxi, por lo que conozco al detalle todas las carreteras entre Santo Domingo-Caudilla, Torrijos, Alcabón y Novés. Soy una persona muy puntual y responsable.»',
    datosRealesUsados:
      'Permiso de conducir y coche propio + Conductora de taxi + Radio de 8 km.',
  },
];

export const TEXTOS_UI_BILINGUE = {
  es: {
    subtituloApp: 'Mi asistente personal para encontrar trabajo',
    lemaPrincipal: 'Vamos a buscar un trabajo que encaje contigo.',
    fraseMotivadoraDia:
      '«Buenos días, Pilar. Vamos a ver qué podemos hacer hoy. Tu experiencia con las personas, tu coche propio en Santo Domingo-Caudilla y tu Curso de 120h de IA en la Cámara de Comercio de Torrijos son tu gran ventaja.»',
    navInicio: 'Inicio y Panel',
    navBuscador: '🔎 Buscar Empleo',
    navDirectorio: '🏢 Buscar Empresas',
    navPlan10: '📅 Plan 10 Días',
    navKanban: '📋 Mis Candidaturas',
    navEntrevistas: '🎤 Entrevistas / IA',
    navWebPublica: '📱 Código QR / Reclutador',
    btnPrepararCandidatura: 'Preparar Mi Candidatura',
    privacidadActiva: 'Privacidad Activa (Datos Protegidos)',
    privacidadVisible: 'Datos Visibles para Imprimir',
  },
  en: {
    subtituloApp: 'My personal job search assistant',
    lemaPrincipal: "Let's find a job that truly fits you.",
    fraseMotivadoraDia:
      '«Good morning, Pilar. Let us see what we can achieve today. Your customer service experience, your own car in Santo Domingo-Caudilla, and your 120-hour AI Course from the Torrijos Chamber of Commerce are your greatest advantage.»',
    navInicio: 'Home & Dashboard',
    navBuscador: '🔎 Find Jobs',
    navDirectorio: '🏢 Find Companies',
    navPlan10: '📅 10-Day Plan',
    navKanban: '📋 My Applications',
    navEntrevistas: '🎤 Interviews / AI',
    navWebPublica: '📱 QR Code / Recruiter Mode',
    btnPrepararCandidatura: 'Prepare My Application',
    privacidadActiva: 'Privacy On (Data Protected)',
    privacidadVisible: 'Data Visible for Print',
  },
};
