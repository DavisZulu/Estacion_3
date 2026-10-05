import { profileData } from '../data/portfolioData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-500 sm:px-6 dark:border-slate-800 dark:text-slate-400">
      <p>
        © {year} {profileData.name}. Hecho con React, Vite y Tailwind CSS.
      </p>
    </footer>
  )
}
