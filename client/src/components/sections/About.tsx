import { motion } from 'framer-motion'
import { Bot, BriefcaseBusiness, GraduationCap, Rocket } from 'lucide-react'
import type { Profile } from '../../types/profile'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

interface AboutProps {
  profile: Profile
  profileStatus: string
}

function About({ profile, profileStatus }: AboutProps) {
  const education = profile.education[0]
  const signals = [
    {
      icon: BriefcaseBusiness,
      label: 'Greenfield delivery',
      value: '4 products built from the ground up',
    },
    {
      icon: Rocket,
      label: 'Migration & expansion',
      value: '3 major modernization tracks shipped',
    },
    {
      icon: Bot,
      label: 'AI-assisted execution',
      value: 'Copilot + Claude boosting delivery by 30%+',
    },
  ]

  return (
    <section id="about" className="section-shell">
      <SectionHeading
        eyebrow="Profile Snapshot"
        title="A MERN engineer tuned for delivery, migration, and product reliability."
        description="This single-page portfolio stays API-first: it hydrates from the backend when available and falls back to a built-in resume snapshot when the API is offline."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <Card className="h-full p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-2">
              summary.log
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-200">{profile.summary}</p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-muted">
              {profileStatus}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="grid gap-6"
        >
          <Card className="p-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-2">
              signal board
            </p>
            <div className="mt-5 space-y-4">
              {signals.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-bg/60 p-4 transition-colors duration-200 hover:border-primary/25"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-1 rounded-xl border border-white/10 bg-white/5 p-2 text-primary-2">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-medium text-white">{label}</p>
                      <p className="mt-1 text-sm leading-6 text-muted">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary-2">
              education
            </p>
            {education ? (
              <div className="mt-5 flex items-start gap-3">
                <span className="rounded-xl border border-white/10 bg-white/5 p-3 text-primary-2">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">{education.degree}</p>
                  <p className="mt-1 text-sm text-muted">
                    {education.institution} · {education.location}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                    {education.period}
                  </p>
                </div>
              </div>
            ) : null}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default About
