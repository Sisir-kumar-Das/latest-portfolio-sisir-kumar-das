import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Send } from 'lucide-react'
import { api } from '../../lib/api'
import type { Profile } from '../../types/profile'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

interface ContactProps {
  profile: Profile
}

function Contact({ profile }: ContactProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      await api.post('/contact', formState)
      setStatus({
        type: 'success',
        message: "Message sent. Sisir's backend accepted the contact request.",
      })
      setFormState({ name: '', email: '', message: '' })
    } catch {
      setStatus({
        type: 'error',
        message:
          "Couldn't reach the contact endpoint right now. Please make sure the backend is running, or email Sisir directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Want to build something fast, reliable, and a little bit AI-native?"
        description="Use the contact form when the backend is online, or reach out directly through email, GitHub, or LinkedIn."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(320px,0.75fr)_minmax(0,1.1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-2">
              direct links
            </p>
            <div className="mt-6 space-y-4 text-sm text-muted sm:text-base">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/25 hover:text-white"
              >
                <Mail size={18} />
                {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/25 hover:text-white"
              >
                <Github size={18} />
                {profile.github}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 hover:border-primary/25 hover:text-white"
              >
                <Linkedin size={18} />
                {profile.linkedin}
              </a>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card className="p-6 sm:p-7">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm text-muted">
                Name
                <input
                  required
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, name: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-bg/70 px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary/40"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted">
                Email
                <input
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, email: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-bg/70 px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary/40"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted">
                Message
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, message: event.target.value }))
                  }
                  className="rounded-2xl border border-white/10 bg-bg/70 px-4 py-3 text-white outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-primary/40"
                  placeholder="Tell me about the product, migration, or AI workflow you want to build."
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-2 px-5 py-3 font-medium text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>

                {status ? (
                  <p
                    className={`text-sm ${status.type === 'success' ? 'text-success' : 'text-warning'}`}
                  >
                    {status.message}
                  </p>
                ) : null}
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
