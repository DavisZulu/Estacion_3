// ============================================================================
// ARCHIVO DE DATOS DEL PORTAFOLIO
// ============================================================================
// Este es el ÚNICO archivo que necesitas editar para personalizar tu portafolio.
// Los componentes en src/components/ solo leen estos datos.
//
// Contenido basado en CV_Deibis_2026_V5.pdf (abril 2026).
// ============================================================================

import profilePhoto from '../assets/images/profile.jpg'
import projectPlaceholder from '../assets/images/project-placeholder.svg'
import bancoCeipa from '../assets/images/banco-ceipa.png'

// ----------------------------------------------------------------------------
// PERFIL: información principal que aparece en la sección Hero
// ----------------------------------------------------------------------------
export const profileData = {
  name: 'Deibis Zuluaga Baena',
  title: 'Director de Operaciones y Tecnología · Desarrollador Full-Stack',
  tagline:
    'Veinte años en operaciones de floricultura de exportación, ahora construyendo el software que las gestiona.',
  location: 'El Retiro, Antioquia, Colombia',
  // Foto de perfil: src/assets/images/profile.jpg
  photo: profilePhoto,
}

// ----------------------------------------------------------------------------
// REDES SOCIALES Y CONTACTO
// Si dejas 'linkedin' vacío, el botón no se muestra.
// ----------------------------------------------------------------------------
export const socialLinks = {
  linkedin: '',
  github: 'https://github.com/DavisZulu',
  email: 'deibis.zuluaga@gmail.com',
}

// ----------------------------------------------------------------------------
// SOBRE MÍ: párrafo de presentación
// ----------------------------------------------------------------------------
export const aboutData = {
  paragraph:
    'Llevo más de veinte años dirigiendo operaciones y tecnología en floricultura de exportación. ' +
    'Empecé en costos y planeación financiera, y con el tiempo fui construyendo yo mismo las herramientas ' +
    'que necesitaba: simuladores de costeo, modelos de presupuestación y, más recientemente, plataformas ' +
    'web completas. Hoy trabajo con React, Firebase, Node.js y bases de datos SQL, y uso IA generativa ' +
    '(Claude, Cursor) como parte del proceso de desarrollo. Estoy cursando Ingeniería de Sistemas en CEIPA ' +
    'para formalizar lo que aprendí construyendo. Me interesan los proyectos donde el software resuelve un ' +
    'problema operativo real.',
}

// ----------------------------------------------------------------------------
// HABILIDADES
// ----------------------------------------------------------------------------
export const skillsData = [
  { name: 'React', icon: '⚛️' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Node.js / Express', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'Firebase / Firestore', icon: '🔥' },
  { name: 'SQL Server', icon: '🗄️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Google Cloud Run', icon: '☁️' },
  { name: 'Microsoft Azure', icon: '🌩️' },
  { name: 'IA generativa (Claude)', icon: '🤖' },
  { name: 'Git y GitHub', icon: '🔧' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Power BI', icon: '📊' },
  { name: 'Gerencia de proyectos', icon: '📋' },
  { name: 'Dirección de operaciones', icon: '🧭' },
]

// ----------------------------------------------------------------------------
// PROYECTOS
// ----------------------------------------------------------------------------
export const projectsData = [
  {
    id: 4,
    title: 'Banco de Tecnología CEIPA',
    description:
      'Aplicación web de tres capas para registrar consignaciones, avances, pagos y transferencias con el ' +
      'saldo calculado en todo momento. API REST en Flask con validaciones y reglas de negocio (el saldo nunca ' +
      'queda negativo), base de datos MySQL en Docker con Prisma e interfaz en React.',
    image: bancoCeipa,
    technologies: ['React', 'Tailwind CSS', 'Python', 'Flask', 'Prisma', 'MySQL', 'Docker'],
    repoUrl: 'https://github.com/DavisZulu/Estacion_3',
    demoUrl: '',
  },
  {
    id: 1,
    title: 'MasterFlor',
    description:
      'Plataforma web de gestión de producción para cultivos de flores de exportación. Incluye bitácora ' +
      'de campo, planeación comercial, tablero de KPIs, maestro de variedades y estadísticas de producción. ' +
      'Diseñé la arquitectura y la desarrollé de punta a punta, apoyado en IA generativa.',
    image: projectPlaceholder,
    technologies: ['React', 'Firebase', 'Node.js', 'Google Cloud Run', 'Claude API'],
    repoUrl: '',
    demoUrl: 'https://master-flor-main.vercel.app',
  },
  {
    id: 2,
    title: 'Simuladores de costo de mano de obra',
    description:
      'Modelos de costeo para la operación de poscosecha de fincas de flores. Permiten simular escenarios ' +
      'de personal, ritmo de proceso y volumen de despacho, y ver el impacto en el costo por tallo antes de ' +
      'tomar la decisión.',
    image: projectPlaceholder,
    technologies: ['Excel avanzado', 'Modelos de costeo', 'Power BI'],
    repoUrl: '',
    demoUrl: '',
  },
  {
    id: 3,
    title: 'Modelos de presupuestación y valoración',
    description:
      'Modelos automatizados de producción y planeación financiera para presupuestos de más de 10 millones ' +
      'de dólares, junto con valoraciones a cinco años usadas para orientar decisiones de inversión en ' +
      'grupos empresariales del sector floricultor.',
    image: projectPlaceholder,
    technologies: ['Modelado financiero', 'Excel avanzado', 'SQL'],
    repoUrl: '',
    demoUrl: '',
  },
]

// ----------------------------------------------------------------------------
// EXPERIENCIA Y EDUCACIÓN: del más reciente al más antiguo.
// type: 'work' | 'education'
// ----------------------------------------------------------------------------
export const experienceData = [
  {
    id: 1,
    type: 'education',
    role: 'Ingeniería de Sistemas (énfasis en desarrollo de software)',
    place: 'CEIPA · Arizona State University',
    period: '2026 - Actualidad',
    description:
      'Formación en desarrollo de software, programación orientada a objetos, bases de datos y arquitectura ' +
      'de aplicaciones.',
  },
  {
    id: 2,
    type: 'work',
    role: 'Director de Planeación, Operaciones y Tecnología',
    place: 'Flores Silvestres S.A.',
    period: 'Febrero 2026 - Julio 2026',
    description:
      'Dirección de poscosecha, planeación de siembras, bouquets, logística y sistemas de información. ' +
      'Rediseñé los flujos de poscosecha con controles digitales, optimicé el transporte de exportación hacia ' +
      'Chile y otros mercados, y lideré el diseño y desarrollo de MasterFlor.',
  },
  {
    id: 3,
    type: 'work',
    role: 'Director de Planeación Financiera',
    place: 'Tahami & Cultiflores S.A.',
    period: 'Diciembre 2021 - Septiembre 2023',
    description:
      'Modelos de valoración a cinco años, consolidación de información financiera y modelos automatizados ' +
      'de producción y presupuestación para presupuestos superiores a 10 millones de dólares.',
  },
  {
    id: 4,
    type: 'work',
    role: 'Director Financiero y Administrativo',
    place: 'Urantus Greenhouses · Serviestructuras · Anutea',
    period: 'Octubre 2018 - Noviembre 2021',
    description:
      'Estructuré las áreas financiera, administrativa y contable, e implementé un sistema integrado de ' +
      'información y CRM. Reestructuré pasivos reduciendo obligaciones hasta en 50% y bajé la cartera de más ' +
      'de 90 días a menos de 30.',
  },
  {
    id: 5,
    type: 'work',
    role: 'Asesor financiero y de tecnología (freelance)',
    place: 'PharmaCielo · Tahami & Cultiflores',
    period: 'Marzo 2012 - Septiembre 2018',
    description:
      'Modelos de producción, presupuestación y análisis financiero, además de soluciones tecnológicas para ' +
      'modernizar procesos operativos.',
  },
  {
    id: 6,
    type: 'work',
    role: 'Gerente de Operaciones y Director de Proyectos',
    place: 'C.I. Calla Farms · Blooms Direct (Grupo Galleria Farms)',
    period: 'Septiembre 2012 - Septiembre 2016',
    description:
      'Diseñé e implementé la operación integral de la compañía, con un crecimiento superior al 300% en dos ' +
      'años. Dirigí el equipo de TI en el desarrollo de software y lideré la transformación digital de los ' +
      'procesos productivos.',
  },
  {
    id: 7,
    type: 'education',
    role: 'Especialización en Gerencia de Proyectos',
    place: 'Universidad EAFIT',
    period: '2009',
    description: 'Planeación y control de proyectos, modelo PERT - CPM, Project y Primavera.',
  },
  {
    id: 8,
    type: 'work',
    role: 'Director de Planeación',
    place: 'C.I. Flores Los Sauces S.A.',
    period: 'Febrero 2006 - Julio 2008',
    description:
      'Sistemas digitales de planeación, costeo y análisis de precios, y desarrollo de simuladores y ' +
      'presupuestadores para la gestión del talento humano.',
  },
  {
    id: 9,
    type: 'work',
    role: 'Analista de Costos y Presupuestos',
    place: 'C.I. Cultivos del Caribe y San Nicolás (Grupo Dole Fresh)',
    period: 'Octubre 2003 - Junio 2005',
    description:
      'Herramientas de costeo y presupuestación e implementación del costeo estándar sobre la plataforma ' +
      'J.D. Edwards en las fincas de Antioquia.',
  },
  {
    id: 10,
    type: 'education',
    role: 'Administración de Empresas',
    place: 'Universidad CEIPA',
    period: '2004',
    description: 'Título profesional en administración de empresas.',
  },
]

// ----------------------------------------------------------------------------
// CONTACTO
// Deja 'phone' vacío si no quieres publicar tu número.
// ----------------------------------------------------------------------------
export const contactData = {
  email: 'deibis.zuluaga@gmail.com',
  phone: '',
  availability:
    'Abierto a proyectos de desarrollo de software y a roles de dirección de operaciones y tecnología en agroindustria.',
}
