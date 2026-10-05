# Plantilla de Portafolio — Ingeniería Informática

Plantilla  de portafolio profesional para estudiantes de Ingeniería Informática (o carreras afines), construida con **React + Vite + Tailwind CSS**, lista para instalarse como **PWA (Progressive Web App)** y para desplegarse como sitio 100% estático.

Este documento está escrito paso a paso pensando en estudiantes que recién empiezan a usar estas herramientas. Léelo completo antes de empezar a editar.

---

## 1. ¿Qué es este proyecto y para qué sirve?

Es una **plantilla**, no un portafolio terminado. La idea es que la clones (o descargues), la personalices con tu propia información (nombre, foto, proyectos, habilidades, experiencia) y la publiques como tu portafolio personal, sin necesidad de escribir lógica nueva ni tocar componentes de React.

Todo el contenido "editable" vive en **un solo archivo**: [`src/data/portfolioData.js`](src/data/portfolioData.js). El resto del código (componentes, estilos base, configuración) ya está resuelto para ti.

---

## 2. Requisitos previos

Necesitas tener instalado:

- **Node.js** versión 18 o superior (recomendado 20+). Descárgalo desde [nodejs.org](https://nodejs.org/).
- **npm** (viene incluido con Node.js).

Para verificar que ya los tienes instalados, abre una terminal y ejecuta:

```bash
node -v
npm -v
```

Si ambos comandos muestran un número de versión, estás listo.

---

## 3. Cómo instalar y correr el proyecto

1. Clona o descarga este repositorio y entra a la carpeta del proyecto:

   ```bash
   cd nombre-de-la-carpeta
   ```

2. Instala las dependencias (solo la primera vez, o cuando cambie `package.json`):

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre en tu navegador la URL que aparece en la terminal (normalmente `http://localhost:5173`). Cada vez que guardes un archivo, la página se actualizará automáticamente.

---

## 4. Cómo editar tu portafolio

### Todo se edita desde un solo archivo

Abre [`src/data/portfolioData.js`](src/data/portfolioData.js). Ahí encontrarás varios objetos exportados, cada uno controla una sección del portafolio:

| Objeto/array          | Qué controla                                             |
| ---------------------- | --------------------------------------------------------- |
| `profileData`          | Nombre, título profesional, frase corta, foto (Hero)      |
| `socialLinks`          | LinkedIn, GitHub, correo                                   |
| `aboutData`            | Párrafo de la sección "Sobre mí"                           |
| `skillsData`           | Lista de habilidades/tecnologías                           |
| `projectsData`         | Tarjetas de proyectos                                      |
| `experienceData`       | Timeline de experiencia y educación                        |
| `contactData`          | Correo, teléfono y disponibilidad en la sección Contacto   |

Los componentes en `src/components/` **solo leen estos datos**; no tienen textos escritos directamente ("hardcodeados"). Esto significa que puedes cambiar absolutamente todo el contenido sin abrir un solo componente.

### Ejemplo: cambiar el nombre y el título

```js
export const profileData = {
  name: 'Ana Gómez',
  title: 'Desarrolladora Frontend',
  tagline: 'Me encanta crear interfaces claras y accesibles.',
  location: 'Medellín, Colombia',
  photo: profilePlaceholder,
}
```

### Ejemplo: agregar un proyecto nuevo

Copia un objeto existente dentro del array `projectsData` y cambia sus valores:

```js
export const projectsData = [
  // ...proyectos existentes,
  {
    id: 4,
    title: 'Mi Proyecto Nuevo',
    description: 'Breve descripción de qué hace el proyecto y qué problema resuelve.',
    image: projectPlaceholder, // o tu propia imagen (ver abajo)
    technologies: ['React', 'Tailwind CSS'],
    repoUrl: 'https://github.com/tu-usuario/mi-proyecto',
    demoUrl: 'https://mi-proyecto-demo.vercel.app', // déjalo como '' si no tienes demo
  },
]
```

Para **quitar** un proyecto, simplemente elimina su objeto del array.

### Ejemplo: agregar o quitar una habilidad

```js
export const skillsData = [
  // ...habilidades existentes,
  { name: 'TypeScript', icon: '🔷' },
]
```

Los íconos son simples emojis (para no depender de imágenes ni librerías externas). Puedes buscar más emojis en [emojipedia.org](https://emojipedia.org/) y pegarlos directamente.

### Cómo reemplazar la foto de perfil y las imágenes de proyectos

Las imágenes de ejemplo están en `src/assets/images/`:

- `profile-placeholder.svg` → foto de perfil del Hero.
- `project-placeholder.svg` → imagen usada en las tarjetas de proyectos.

Para usar tus propias imágenes:

1. Copia tu imagen (por ejemplo `mi-foto.jpg`) dentro de `src/assets/images/`.
2. En `src/data/portfolioData.js`, impórtala arriba del archivo:
   ```js
   import miFoto from '../assets/images/mi-foto.jpg'
   ```
3. Úsala en el objeto correspondiente, por ejemplo `photo: miFoto` en `profileData`, o `image: miFoto` en un proyecto.

### Qué archivos NO debes tocar (si no sabes qué hacen) vs qué SÍ puedes editar libremente

**Puedes editar libremente:**
- `src/data/portfolioData.js` (todo tu contenido).
- `tailwind.config.js` (colores, ver sección 5).
- Imágenes dentro de `src/assets/images/`.
- `README.md` (para tus propias notas).

**Evita tocar si no sabes qué hacen** (son la "lógica" de la plantilla):
- Los componentes en `src/components/` (`Navbar.jsx`, `Hero.jsx`, `Projects.jsx`, `InstallPWA.jsx`, etc.).
- `src/App.jsx`, `src/main.jsx`.
- `vite.config.js` (configura Vite y la PWA).
- `postcss.config.js`.

Si quieres cambiar el *diseño* (no el contenido), sí puedes editar las clases de Tailwind dentro de los componentes, con cuidado.

---

## 5. Cómo cambiar los colores

La paleta de colores está centralizada en [`tailwind.config.js`](tailwind.config.js), dentro de `theme.extend.colors`:

```js
colors: {
  primary: {
    DEFAULT: '#2563EB', // azul principal
    light: '#60A5FA',
    dark: '#1E40AF',
  },
  secondary: {
    DEFAULT: '#0EA5E9',
    light: '#7DD3FC',
    dark: '#0369A1',
  },
},
```

Para cambiar el color global de todo el portafolio (botones, enlaces, acentos), reemplaza estos valores hexadecimales por los de tu propia paleta. Por ejemplo, para pasar de azul a verde:

```js
primary: {
  DEFAULT: '#16A34A',
  light: '#4ADE80',
  dark: '#166534',
},
```

No necesitas cambiar nada más: todos los componentes usan las clases `primary`, `primary-light`, `primary-dark`, `secondary`, etc. (ej. `bg-primary`, `text-primary-light`), así que el cambio se refleja en todo el sitio automáticamente.

También deberías actualizar `theme_color` en `vite.config.js` (dentro de `manifest`) para que coincida con tu nuevo color principal — así la barra del navegador y la pantalla de carga de la PWA usan el mismo tono.

---

## 6. Sobre la funcionalidad PWA

### ¿Qué es una PWA?

Una **PWA (Progressive Web App)** es un sitio web que se puede "instalar" en un computador o celular como si fuera una aplicación nativa: aparece con su propio ícono, se abre en su propia ventana (sin barra de direcciones) y puede funcionar parcialmente sin conexión. Todo esto sin pasar por una tienda de aplicaciones.

Esta plantilla ya viene configurada como PWA gracias al plugin [`vite-plugin-pwa`](https://vite-pwa-org.netlify.app/), que genera automáticamente:

- Un **manifest** (`manifest.webmanifest`): un archivo con el nombre, colores e íconos de tu app.
- Un **service worker**: un script que permite cachear archivos y actualizar la app automáticamente (`registerType: 'autoUpdate'`).

### Cómo cambiar el nombre e íconos de la app

Abre [`vite.config.js`](vite.config.js) y busca el bloque `manifest` dentro de `VitePWA({ ... })`:

```js
manifest: {
  name: 'Mi Portafolio - Ingeniero de Software',
  short_name: 'Portafolio',
  description: 'Portafolio profesional de un estudiante/egresado de Ingeniería Informática',
  theme_color: '#2563EB',
  background_color: '#ffffff',
  ...
}
```

- `name`: nombre completo que se muestra al instalar.
- `short_name`: nombre corto que aparece debajo del ícono.
- `theme_color`: debe coincidir con tu color `primary` (ver sección 5).

Para cambiar los **íconos**, reemplaza los archivos `public/pwa-192x192.png` y `public/pwa-512x512.png` por tus propios íconos (deben mantenerse esos tamaños exactos y esos nombres, o si usas otros nombres/tamaños, actualiza también la lista `icons` dentro de `manifest`). Puedes crear íconos fácilmente en [realfavicongenerator.net](https://realfavicongenerator.net/) o cualquier editor de imágenes.

### Sobre la instalación en el navegador

Este proyecto incluye un componente propio, [`InstallPWA.jsx`](src/components/InstallPWA.jsx), que muestra una tarjeta flotante en la esquina inferior derecha invitando a instalar el portafolio, con botones "Instalar" y para cerrarla. Si el usuario cierra el banner (o ya instaló la app), no se vuelve a mostrar (se guarda una preferencia en `localStorage`).

**Importante:** la opción de "instalar" (y por lo tanto el banner) solo aparece cuando el navegador considera que el sitio es instalable, lo cual requiere que esté servido por **HTTPS**. Esto casi nunca ocurre corriendo `npm run dev` en tu máquina local. Para probarlo correctamente:

1. Corre `npm run build` y luego `npm run preview` (sirve una versión de producción localmente).
2. O mejor aún, despliega el sitio (Render, Vercel, Netlify, todos usan HTTPS por defecto) y pruébalo ahí — así verás el comportamiento real que tendrán tus visitantes.

---

## 7. Estructura de carpetas

```
├── index.html                # Punto de entrada HTML
├── package.json               # Dependencias y scripts (dev, build, preview)
├── vite.config.js             # Configuración de Vite + plugin PWA (manifest, service worker)
├── tailwind.config.js         # Paleta de colores y configuración de Tailwind
├── postcss.config.js          # Necesario para que Tailwind procese los estilos
├── public/                    # Archivos estáticos que se copian tal cual al build
│   ├── favicon.svg            # Ícono de la pestaña del navegador
│   ├── pwa-192x192.png        # Ícono de la PWA (tamaño pequeño)
│   └── pwa-512x512.png        # Ícono de la PWA (tamaño grande)
└── src/
    ├── main.jsx                # Punto de entrada de React
    ├── App.jsx                 # Ensambla todas las secciones de la página
    ├── index.css                # Estilos globales + directivas de Tailwind
    ├── data/
    │   └── portfolioData.js    # ⭐ TODO tu contenido editable vive aquí
    ├── hooks/
    │   └── useDarkMode.js       # Lógica del modo claro/oscuro
    ├── components/              # Un componente por sección de la página
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── About.jsx
    │   ├── Skills.jsx
    │   ├── Projects.jsx
    │   ├── Experience.jsx
    │   ├── Contact.jsx
    │   ├── Footer.jsx
    │   ├── ThemeToggle.jsx
    │   └── InstallPWA.jsx       # Banner de instalación de la PWA
    └── assets/images/           # Imágenes de perfil y de proyectos
```

---

## 8. Cómo correr el proyecto localmente (resumen rápido)

```bash
npm install       # Instala dependencias (solo una vez)
npm run dev       # Modo desarrollo, con recarga automática
npm run build     # Genera la carpeta dist/ lista para producción
npm run preview   # Sirve localmente la carpeta dist/ generada, para probar el build final
```

---

## 9. Buenas prácticas

- **Optimiza tus imágenes** antes de subirlas: usa formatos livianos (JPG/WEBP para fotos, SVG para íconos) y comprímelas con herramientas como [squoosh.app](https://squoosh.app/). Imágenes muy pesadas hacen que tu portafolio cargue lento.
- **No subas archivos pesados** al repositorio (videos largos, PDFs grandes, etc.). Si necesitas mostrar un PDF (como tu hoja de vida), enlázalo desde un servicio externo (Google Drive, Dropbox) en vez de incluirlo en el proyecto.
- **Mantén el estilo de código**: usa comillas simples, indentación de 2 espacios y nombres de variables descriptivos, igual que el resto del proyecto.
- **No inventes datos falsos** en tus proyectos: describe con honestidad lo que hiciste y qué tecnologías usaste realmente.
- Revisa que todos los enlaces (`repoUrl`, `demoUrl`, redes sociales) funcionen antes de publicar tu portafolio.

---

## 10. Próximos pasos: Despliegue

> Instrucciones de despliegue en Render próximamente en clase.

Esta plantilla ya está lista para desplegarse como **sitio estático** en servicios como Render, Vercel o Netlify: solo necesitan ejecutar `npm run build` y servir el contenido de la carpeta `dist/`. Los detalles específicos del proceso de despliegue se explicarán más adelante en clase.

---

Hecho con React, Vite y Tailwind CSS 💙
