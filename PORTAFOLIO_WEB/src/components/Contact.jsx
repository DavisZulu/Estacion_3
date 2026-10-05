import { useState } from 'react'
import { contactData, socialLinks } from '../data/portfolioData'

// Formulario de contacto sin backend: al enviar, arma un enlace "mailto:" con
// los datos escritos por el visitante y abre el cliente de correo del usuario.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contacto desde el portafolio - ${form.name || 'Visitante'}`)
    const body = encodeURIComponent(`${form.message}\n\nCorreo de contacto: ${form.email}`)
    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contacto" className="scroll-mt-16 bg-slate-50 px-4 py-16 sm:px-6 dark:bg-slate-800/40">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Contacto</h2>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
        <p className="mt-4 text-slate-600 dark:text-slate-300">{contactData.availability}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-3xl gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              placeholder="tu-correo@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
              placeholder="Escribe tu mensaje..."
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Enviar mensaje
          </button>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Este formulario abre tu cliente de correo (no envía datos a ningún servidor).
          </p>
        </form>

        <div className="flex flex-col justify-center gap-4 text-left">
          <a href={`mailto:${contactData.email}`} className="flex items-center gap-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-light">
            📧 {contactData.email}
          </a>
          {contactData.phone && (
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200">📱 {contactData.phone}</p>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-light"
            >
              💼 LinkedIn
            </a>
          )}
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-slate-700 hover:text-primary dark:text-slate-200 dark:hover:text-primary-light"
          >
            💻 GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
