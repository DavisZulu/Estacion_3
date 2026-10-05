import { useState } from 'react'
import { profileData } from '../data/portfolioData'
import ThemeToggle from './ThemeToggle'

// Enlaces de ancla a cada sección de la página. Si agregas o quitas una
// sección en App.jsx, actualiza también este array.
const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="text-lg font-bold text-primary dark:text-primary-light">
          {profileData.name}
        </a>

        {/* Menú de escritorio */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary dark:text-slate-300 dark:hover:text-primary-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
        </div>

        {/* Botón de menú móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Abrir menú de navegación"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-700 dark:text-slate-200"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <ul className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 pb-4 md:hidden dark:border-slate-800 dark:bg-slate-900">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-primary/10 hover:text-primary dark:text-slate-300 dark:hover:text-primary-light"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
