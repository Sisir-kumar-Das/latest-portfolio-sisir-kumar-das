import { motion } from 'framer-motion'
import { Building2, CalendarRange, MapPin } from 'lucide-react'
import type { ExperienceItem } from '../../types/profile'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

interface ExperienceProps {
  experiences: ExperienceItem[]
}

function Experience({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="section-shell">
      <SectionHeading
        eyebrow="Experience Timeline"
        title="Recent work focused on modernization, scale, and measurable operational gains."
        description="A vertical timeline keeps the story crisp: secure the legacy surface, modernize the stack, then ship throughput improvements that show up in production."
      />

      <div className="relative ml-3 border-l border-white/10 pl-7 sm:ml-5 sm:pl-10">
        {experiences.map((experience, index) => (
          <motion.div
            key={`${experience.company}-${experience.role}`}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="relative pb-8 last:pb-0"
          >
            <span className="absolute -left-[38px] top-6 size-4 rounded-full border-4 border-bg bg-primary shadow-[0_0_0_4px_rgba(99,102,241,0.15)] sm:-left-[46px]" />
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{experience.role}</h3>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted">
                    <span className="inline-flex items-center gap-2">
                      <Building2 size={16} />
                      {experience.company}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin size={16} />
                      {experience.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarRange size={16} />
                      {experience.period}
                    </span>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-3 size-1.5 rounded-full bg-primary-2" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
