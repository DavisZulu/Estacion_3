import { projectsData } from '../data/portfolioData'

export default function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-16 bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-800/40">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Proyectos</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />

        <div className="mt-10 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
            >
              <img src={project.image} alt={project.title} className="h-44 w-full object-cover" />

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-dark dark:bg-primary/20 dark:text-primary-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-primary hover:underline dark:text-primary-light"
                    >
                      Repositorio →
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-slate-600 hover:underline dark:text-slate-300"
                    >
                      Demo en vivo →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
