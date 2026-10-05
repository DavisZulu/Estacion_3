import { aboutData } from '../data/portfolioData'

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-16 bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-800/40">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sobre mí</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
        <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {aboutData.paragraph}
        </p>
      </div>
    </section>
  )
}
