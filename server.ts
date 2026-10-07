import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION_PILAR = `
Actúas como "Pilar IA", la orientadora laboral virtual y asistente personal de búsqueda de empleo para Pilar Fernández Almaraz dentro de su aplicación "PILAR EMPLEO IA" ("Mi asistente personal para encontrar trabajo").

DATOS REALES DE LA USUARIA (PROHIBIDO INVENTAR NADA FUERA DE ESTO):
- Nombre: Pilar Fernández Almaraz
- Zona principal de búsqueda: Santo Domingo-Caudilla, Toledo, España.
- Municipios prioritarios (radio ~8 km): Santo Domingo-Caudilla, Torrijos, Alcabón, Novés (con flexibilidad para localidades cercanas como Portillo de Toledo, Fuensalida o Toledo si surge buena oportunidad).
- Movilidad: Permiso de conducir y coche propio (ventaja competitiva clara en la comarca).
- Puestos objetivo (por orden de prioridad): 1. Atención al cliente, 2. Recepción, 3. Administración y auxiliar administrativo, 4. Comercio y dependienta, 5. Atención telefónica, 6. Información al cliente, 7. Puestos de atención al público, 8. Otros puestos compatibles.
- Jornada / Modalidad: Jornada completa o parcial; Presencial o Híbrida.
- Experiencia real: Atención y servicio al cliente, comercio, caja, reposición, atención a dudas de clientes, información sobre productos, administración, atención directa a personas, conducción de taxi y atención a clientes, ayuda a domicilio, fabricación de calzado y trabajo como aprendiz en la Diputación Provincial de Toledo.
- Formación reglada: FP Auxiliar Administrativo, Graduado Escolar.
- Formación destacada: Curso de Inteligencia Artificial — 120 horas, Certificado expedido por la Cámara de Comercio de Torrijos.
- Otros conocimientos: Mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word.
- Idiomas: Español (nativo), Inglés (nivel A2).
- Aptitudes: Amable, responsable, profesional, puntual, seria, servicial, orientada al cliente, buena disposición para aprender, disponibilidad, experiencia tratando directamente con personas.

REGLAS DE TONO Y COMPORTAMIENTO:
- Español de España (español peninsular). Tono cercano, amable, empático, motivador ("Buenos días, Pilar.", "Vamos a ver qué podemos hacer hoy."), claro y accesible.
- Nunca seas negativa ni descartes una oferta automáticamente: si falta un requisito (ej. Inglés B1 frente a su A2), avísale con honestidad y enséñale cómo defender su candidatura con sus puntos fuertes (coche propio, experiencia y Curso de 120h de IA).
`;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildFallbackChatReply(message: string, diaActual: number): string {
  const lower = message.toLowerCase();
  if (
    lower.includes('coche') ||
    lower.includes('santo domingo') ||
    lower.includes('alcabón') ||
    lower.includes('alcabon') ||
    lower.includes('novés') ||
    lower.includes('noves')
  ) {
    return `¡Buenos días, Pilar! Vamos a ver qué podemos hacer hoy. Qué gran ventaja tienes viviendo en **Santo Domingo-Caudilla** con **permiso de conducir y coche propio**.\n\nEn menos de 8 minutos estás en **Torrijos (5 km), Alcabón (3 km) o Novés (7 km)**. Cuando hables con una empresa de la comarca o de un polígono industrial, dilo siempre en tu primera frase:\n\n*"Vivo aquí al lado, en Santo Domingo-Caudilla, y dispongo de permiso de conducir y coche propio, además de haber trabajado como conductora profesional de taxi, por lo que mi puntualidad y disponibilidad para cualquier turno están garantizadas al 100 %."*`;
  }
  if (
    lower.includes('120') ||
    lower.includes('ia') ||
    lower.includes('inteligencia artificial') ||
    lower.includes('cámara') ||
    lower.includes('camara')
  ) {
    return `¡Buenos días, Pilar! Tu **Curso de Inteligencia Artificial — 120 horas certificado por la Cámara de Comercio de Torrijos** es un punto diferencial estupendo en tu currículum.\n\nExplícalo con naturalidad, sin exagerar y con orgullo:\n\n*"Además de mi título de FP de Auxiliar Administrativo y mi experiencia de toda la vida atendiendo a personas en comercio, caja y taxi, he realizado un Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos. Eso demuestra que tengo buena disposición para aprender, que me desenvuelvo bien con el ordenador y que puedo apoyar en correos, documentos y programas de oficina con rapidez."*`;
  }
  if (
    lower.includes('qr') ||
    lower.includes('reclutador') ||
    lower.includes('tarjeta')
  ) {
    return `¡Buenos días, Pilar! Tu **Código QR en vivo y Modo Reclutador** está pensado para dejar una impresión inolvidable cuando entregues tu currículum en mano en **Torrijos, Santo Domingo-Caudilla, Alcabón o Novés**.\n\nCuando estés en una recepción o comercio, puedes abrir el botón **«📱 Mostrar Código QR / Modo Reclutador»** en tu móvil o llevarlo impreso en tu CV: al escanearlo con su cámara, el responsable verá al instante tu presentación profesional con tu **FP de Auxiliar Administrativo**, tu **Curso de 120 horas de IA en la Cámara de Comercio de Torrijos** y tu experiencia real.`;
  }
  if (
    lower.includes('entrevista') ||
    lower.includes('inglés') ||
    lower.includes('ingles') ||
    lower.includes('falta')
  ) {
    return `¡Buenos días, Pilar! Recuerda nuestra regla de oro: **si una oferta pide un requisito que no cumples al 100 % (por ejemplo, solicitan inglés B1 y actualmente tienes A2, o un programa distinto a Contaplus), nunca nos descartamos automáticamente. La decisión final siempre es tuya.**\n\nEn la entrevista respóndelo con una sonrisa y total sinceridad:\n1. Reconoce con honestidad tu nivel real (**Inglés A2**, **Contaplus**, **Word**, **Windows**).\n2. Compénsalo inmediatamente con tus **puntos fuertes reales**: tu **trato humano excelente** (comercio, caja, ayuda a domicilio, taxi), tu **coche propio desde Santo Domingo-Caudilla** y tu **Curso de 120 horas de IA en la Cámara de Comercio de Torrijos**.`;
  }
  return `¡Buenos días, Pilar! Vamos a ver qué podemos hacer hoy en el **Día ${diaActual} de 10** de tu plan en **Santo Domingo-Caudilla, Torrijos, Alcabón y Novés**.\n\nRespecto a lo que me comentas (*"${message}"*), recuerda que al pulsar **«Preparar Mi Candidatura»** en cualquier oferta obtienes al instante los **7 materiales listos para usar**:\n1. **CV adaptado**.\n2. **Carta de presentación** natural y humana.\n3. **Email profesional**.\n4. **Mensaje de LinkedIn**.\n5. **Presentación corta** en persona o por teléfono.\n6. **Preguntas probables de entrevista** y respuestas recomendadas.\n7. **Puntos fuertes a destacar y requisitos a explicar**. ¡Ánimo, que merece la pena intentarlo!`;
}

function buildFallbackDossier(empresaOLocalidad: string, textoOferta: string) {
  const textoCombinado = `${empresaOLocalidad} ${textoOferta}`.toLowerCase();
  const esAdmin =
    /administrativ|oficina|recepci|contab|gestor|joma|secretar|albaran|factur|clínica|clinica|polígono|poligono|logística|logistica|teléfono|telefono|concesionario|inmobiliaria|seguro/i.test(
      textoCombinado
    );
  const nombreMostrar =
    empresaOLocalidad.trim() ||
    'Empresa en la comarca (Santo Domingo-Caudilla / Torrijos / Alcabón / Novés)';

  return {
    tituloDetectado: nombreMostrar,
    compatibilidadPorcentaje: esAdmin ? 92 : 95,
    checksCompatibilidad: [
      '✓ Experiencia en atención al cliente',
      '✓ Experiencia en comercio, caja y reposición',
      '✓ Formación administrativa (FP Auxiliar Administrativo)',
      '✓ Curso de IA de 120 horas (Certificado por la Cámara de Comercio de Torrijos)',
      '✓ Coche propio (Santo Domingo-Caudilla)',
      '✓ Permiso de conducir',
    ],
    puntosFuertesEncaje: [
      'Movilidad garantizada: Resides en Santo Domingo-Caudilla y cuentas con permiso de conducir y coche propio (desplazamiento en 3-8 minutos a Torrijos, Alcabón o Novés).',
      esAdmin
        ? 'Formación administrativa oficial: FP de Auxiliar Administrativo, Contaplus, Plan General de Contabilidad, Gestión de personal, mecanografía, Windows y Word.'
        : 'Experiencia directa en atención al público: Trayectoria real en comercio, caja, reposición, atención a dudas de clientes, información de productos y conducción de taxi.',
      'Formación destacada actual: Curso de Inteligencia Artificial — 120 horas, Certificado por la Cámara de Comercio de Torrijos.',
      'Trato humano excelente: Experiencia real como aprendiz en la Diputación Provincial de Toledo y en ayuda a domicilio, garantizando amabilidad, puntualidad y seriedad.',
    ],
    requisitoNoCumplidoOAlerta: esAdmin
      ? 'Solicitan o valoran inglés B1 (actualmente tienes A2) o experiencia previa en un programa informático específico de la empresa.'
      : 'Podrían valorar manejo previo de terminales digitales específicos de tienda o disponibilidad para turnos rotativos.',
    comoDefenderSinDescartar:
      'No descartes automáticamente la oferta (la decisión final siempre es tuya, Pilar): destaca que vives al lado con coche propio (puntualidad total) y que tu Curso de 120 horas de IA en la Cámara de Comercio de Torrijos demuestra tu rápida capacidad para aprender cualquier programa.',
    resumenCVAdaptado: `CURRÍCULUM ADAPTADO PARA: ${nombreMostrar.toUpperCase()}
• Candidata: Pilar Fernández Almaraz · Santo Domingo-Caudilla (Toledo) · Permiso de conducir y coche propio.
• Formación Destacada: FP Auxiliar Administrativo | Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos) | Graduado Escolar.
• Conocimientos Técnicos: Mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word | Idiomas: Español (nativo), Inglés (A2).
• Experiencia Real Destacada: Atención y servicio al cliente, comercio, caja, reposición, información sobre productos, aprendiz en la Diputación Provincial de Toledo, conducción de taxi y atención a clientes, ayuda a domicilio y fabricación de calzado.`,
    cartaPresentacionNatural: `Estimado/a responsable de selección en ${nombreMostrar}:

Le escribo con mucho interés para presentar mi candidatura a su oferta de empleo. Resido en Santo Domingo-Caudilla y dispongo de permiso de conducir y coche propio, lo que me permite desplazarme en pocos minutos con total puntualidad y flexibilidad horaria.

Cuento con la titulación de FP de Auxiliar Administrativo, experiencia como aprendiz en la Diputación Provincial de Toledo y conocimientos de mecanografía, Contaplus, Plan General de Contabilidad, Gestión de personal, Windows, Word e inglés (nivel A2). Además, he completado el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos, reflejo de mi buena disposición para aprender y adaptarme a las herramientas actuales.

A lo largo de mi vida laboral en atención al cliente, comercio, caja, conducción de taxi y ayuda a domicilio, siempre me he caracterizado por un trato amable, servicial, responsable y cercano con las personas.

Agradezco de antemano su atención y quedo a su entera disposición para mantener una entrevista personal.

Un cordial saludo,
Pilar Fernández Almaraz`,
    emailAsunto: `Candidatura ${nombreMostrar} — Pilar Fernández Almaraz (Santo Domingo-Caudilla / Coche propio)`,
    emailCuerpo: `Buenos días:

Adjunto mi currículum vitae para participar en el proceso de selección de ${nombreMostrar}.

Resido en Santo Domingo-Caudilla (dispongo de permiso de conducir y coche propio) y aporto titulación de FP Auxiliar Administrativo, el Curso de Inteligencia Artificial de 120 horas certificado por la Cámara de Comercio de Torrijos, manejo de Contaplus, Word, mecanografía y amplia experiencia real en atención al cliente, comercio y administración.

Quedo a su entera disposición para ampliar cualquier información en una entrevista personal.

Atentamente,
Pilar Fernández Almaraz`,
    mensajeLinkedInBreve: `Hola, soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla (con coche propio). Cuento con FP de Auxiliar Administrativo, Curso de 120h de IA por la Cámara de Comercio de Torrijos y amplia experiencia en atención al cliente, comercio y administración. Muy interesada en la oportunidad en ${nombreMostrar}.`,
    presentacionCorta: `«Buenos días. Soy Pilar Fernández Almaraz, vecina de Santo Domingo-Caudilla con permiso de conducir y coche propio. Tengo la FP de Auxiliar Administrativo, el Curso de 120 horas de IA certificado por la Cámara de Comercio de Torrijos y amplia experiencia real atendiendo a personas en comercio, caja, administración y transporte. Me encantaría entregarles mi currículum para ${nombreMostrar}.»`,
    preguntaProbableEntrevista: `«¿Por qué crees que encajas en este puesto en ${nombreMostrar} y qué puedes aportar desde el primer día?»`,
    respuestaRecomendadaPilar: `«Encajo porque uno tres ventajas muy prácticas: primero, vivo en Santo Domingo-Caudilla y tengo coche propio, por lo que garantizo puntualidad total; segundo, tengo experiencia real toda mi vida tratando con personas con amabilidad y paciencia (en comercio, caja, taxi, ayuda a domicilio y en la Diputación de Toledo); y tercero, cuento con la FP de Auxiliar Administrativo y el Curso de 120 horas de IA en la Cámara de Comercio de Torrijos.»`,
    puntosFuertesYRequisitosExplicar: [
      'Destacar: Permiso de conducir y coche propio desde Santo Domingo-Caudilla (desplazamiento rápido y puntualidad).',
      'Destacar: Curso de Inteligencia Artificial — 120 horas (Certificado por la Cámara de Comercio de Torrijos) + FP Auxiliar Administrativo.',
      'Destacar: Experiencia real tratando directamente con personas (comercio, caja, reposición, taxi, ayuda a domicilio y Diputación de Toledo).',
      'Cómo explicar requisitos adicionales: Si solicitan un nivel de idioma superior a tu A2 o un programa nuevo, explica con naturalidad tu facilidad de aprendizaje demostrada en tus 120 horas de formación en la Cámara de Comercio de Torrijos.',
    ],
    guionLlamadaDirecta: `«Buenos días. Mi nombre es Pilar Fernández Almaraz, soy vecina de Santo Domingo-Caudilla y tengo coche propio. Llamaba por la vacante en ${nombreMostrar}: soy Auxiliar Administrativo con el Curso de 120 horas de IA de la Cámara de Comercio de Torrijos y amplia experiencia en atención al cliente y comercio. ¿A qué correo o en qué horario puedo entregarles mi currículum?»`,
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '2mb' }));

  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { message, diaActual } = req.body as {
        message?: string;
        diaActual?: number;
      };

      if (!message || !message.trim()) {
        res.status(400).json({ error: 'Por favor, escribe tu consulta.' });
        return;
      }

      const ai = getAiClient();
      if (!ai) {
        res.json({
          reply: buildFallbackChatReply(message, diaActual || 1),
        });
        return;
      }

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Pilar está en el Día ${diaActual || 1} de su Plan de 10 Días en Santo Domingo-Caudilla, Torrijos, Alcabón y Novés.\nConsulta de Pilar: "${message}"\n\nResponde como "Pilar IA" en español de España, con tono cercano, claro y útil, basándote exclusivamente en sus datos reales.`,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION_PILAR,
            temperature: 0.4,
          },
        });

        res.json({
          reply:
            response.text || buildFallbackChatReply(message, diaActual || 1),
        });
      } catch {
        res.json({
          reply: buildFallbackChatReply(message, diaActual || 1),
        });
      }
    } catch {
      res.json({
        reply: buildFallbackChatReply(req.body?.message || '', 1),
      });
    }
  });

  app.post('/api/ai/analyze-offer', async (req, res) => {
    const { textoOferta, empresaOLocalidad } = (req.body || {}) as {
      textoOferta?: string;
      empresaOLocalidad?: string;
    };

    if (!textoOferta || !textoOferta.trim()) {
      res
        .status(400)
        .json({ error: 'Pega el texto de la oferta para analizarla.' });
      return;
    }

    const fallback = buildFallbackDossier(
      empresaOLocalidad || 'Empresa en la Comarca',
      textoOferta
    );

    const ai = getAiClient();
    if (!ai) {
      res.json(fallback);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analiza esta oferta para Pilar Fernández Almaraz (residente en Santo Domingo-Caudilla, Toledo, con coche propio, FP Auxiliar Administrativo y Curso IA 120h Cámara de Comercio de Torrijos) y genera su Dossier Completo de Candidatura con los 7 puntos:
Empresa / Localidad: ${empresaOLocalidad || 'Comarca de Torrijos / Santo Domingo-Caudilla'}
Texto de la oferta: ${textoOferta}`,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION_PILAR,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tituloDetectado: { type: Type.STRING },
              compatibilidadPorcentaje: { type: Type.INTEGER },
              checksCompatibilidad: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              puntosFuertesEncaje: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              requisitoNoCumplidoOAlerta: { type: Type.STRING },
              comoDefenderSinDescartar: { type: Type.STRING },
              resumenCVAdaptado: { type: Type.STRING },
              cartaPresentacionNatural: { type: Type.STRING },
              emailAsunto: { type: Type.STRING },
              emailCuerpo: { type: Type.STRING },
              mensajeLinkedInBreve: { type: Type.STRING },
              presentacionCorta: { type: Type.STRING },
              preguntaProbableEntrevista: { type: Type.STRING },
              respuestaRecomendadaPilar: { type: Type.STRING },
              puntosFuertesYRequisitosExplicar: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              guionLlamadaDirecta: { type: Type.STRING },
            },
            required: [
              'tituloDetectado',
              'compatibilidadPorcentaje',
              'checksCompatibilidad',
              'puntosFuertesEncaje',
              'requisitoNoCumplidoOAlerta',
              'comoDefenderSinDescartar',
              'resumenCVAdaptado',
              'cartaPresentacionNatural',
              'emailAsunto',
              'emailCuerpo',
              'mensajeLinkedInBreve',
              'presentacionCorta',
              'preguntaProbableEntrevista',
              'respuestaRecomendadaPilar',
              'puntosFuertesYRequisitosExplicar',
              'guionLlamadaDirecta',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ ...fallback, ...parsed });
    } catch {
      res.json(fallback);
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Pilar Empleo IA activo en http://localhost:${PORT}`);
  });
}

startServer();
