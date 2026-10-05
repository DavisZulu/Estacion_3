import { useEffect, useState } from 'react'

const STORAGE_KEY = 'theme-preference'

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  // Si el estudiante no ha elegido nunca, respeta la preferencia del sistema operativo.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Hook simple para alternar entre modo claro/oscuro usando la clase "dark"
// en <html> (requerido por darkMode: 'class' en tailwind.config.js).
export function useDarkMode() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
