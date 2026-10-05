import { experienceData } from '../data/portfolioData'

const typeLabels = {
  work: 'Experiencia',
  education: 'Educación',
}

export default function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-16 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Experiencia y Educación</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
      </div>

      <ol className="mx-auto mt-12 max-w-2xl border-l-2 border-primary/30 pl-6">
        {experienceData.map((item) => (
          <li key={item.id} className="relative mb-10 last:mb-0">
            <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-primary" />

            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                item.type === 'work'
                  ? 'bg-primary/10 text-primary-dark dark:bg-primary/20 dark:text-primary-light'
                  : 'bg-secondary/10 text-secondary-dark dark:bg-secondary/20 dark:text-secondary-light'
              }`}
            >
              {typeLabels[item.type]}
            </span>

            <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.role}</h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {item.place} · {item.period}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
