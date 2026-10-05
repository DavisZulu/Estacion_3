import { skillsData } from '../data/portfolioData'

export default function Skills() {
  return (
    <section id="habilidades" className="scroll-mt-16 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Habilidades</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skillsData.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="text-3xl">{skill.icon}</span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
