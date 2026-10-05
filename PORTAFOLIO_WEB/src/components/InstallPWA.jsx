import { useEffect, useState } from 'react'

const DISMISSED_KEY = 'pwa-install-dismissed'

// Detecta si la app ya corre como PWA instalada (standalone), tanto en
// navegadores basados en Chromium como en Safari/iOS.
function isRunningStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
  )
}

// Banner flotante que ofrece instalar el portafolio como app.
// Se apoya en el evento "beforeinstallprompt", que el navegador dispara
// solo cuando el sitio cumple los requisitos de una PWA instalable
// (manifest válido, service worker registrado y HTTPS).
export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isRunningStandalone() || localStorage.getItem(DISMISSED_KEY) === 'true') {
      return
    }

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
      setVisible(true)
    }

    const handleAppInstalled = () => {
      setVisible(false)
      setDeferredPrompt(null)
      localStorage.setItem(DISMISSED_KEY, 'true')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setVisible(false)
  }

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem(DISMISSED_KEY, 'true')
  }

  if (!visible) return null

  return (
    <div className="animate-slide-up fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] max-w-sm rounded-xl border border-primary/20 bg-white p-4 shadow-xl sm:w-full dark:border-primary/40 dark:bg-slate-800">
      <div className="flex items-start gap-3">
        <span className="text-2xl">📲</span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Instala
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Accede más rápido, incluso sin conexión.
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleInstallClick}
              className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Instalar
            </button>
            <button
              onClick={handleDismiss}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
            >
              Ahora no
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Cerrar banner de instalación"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
