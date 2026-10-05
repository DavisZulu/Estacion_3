import { useDarkMode } from '../hooks/useDarkMode'

// Botón para alternar entre modo claro y modo oscuro.
export default function ThemeToggle() {
  const { theme, toggleTheme } = useDarkMode()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Cambiar tema claro/oscuro"
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-primary/10 dark:hover:bg-white/10"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
