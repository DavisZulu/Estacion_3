import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Configuración de Vite + plugin PWA.
// El manifest y el service worker se generan automáticamente al hacer `npm run build`.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Permite probar el registro del service worker también en `npm run dev`.
      // El prompt real de instalación del navegador solo aparece de forma
      // confiable en `npm run build` + `npm run preview` o en un sitio con HTTPS.
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Mi Portafolio - Ingeniero de Software',
        short_name: 'Portafolio',
        description: 'Portafolio profesional de un estudiante/egresado de Ingeniería Informática',
        theme_color: '#2563EB',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
      },
    }),
  ],
})
