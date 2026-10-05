import { profileData, socialLinks } from '../data/portfolioData'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-[90vh] scroll-mt-16 flex-col-reverse items-center justify-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:gap-16"
    >
      <div className="max-w-xl text-center md:text-left">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary dark:text-primary-light">
          {profileData.title}
        </p>
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl dark:text-white">
          Hola, soy {profileData.name}
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{profileData.tagline}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              LinkedIn
            </a>
          )}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className={
              socialLinks.linkedin
                ? 'rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-primary-light dark:hover:text-primary-light'
                : 'rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
            }
          >
            GitHub
          </a>
          <a
            href={`mailto:${socialLinks.email}`}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-primary-light dark:hover:text-primary-light"
          >
            Correo
          </a>
        </div>
      </div>

      <img
        src={profileData.photo}
        alt={`Foto de perfil de ${profileData.name}`}
        className="h-48 w-48 rounded-full object-cover shadow-lg ring-4 ring-primary/20 sm:h-64 sm:w-64"
      />
    </section>
  )
}
