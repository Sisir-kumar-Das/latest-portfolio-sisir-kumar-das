import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '../../types/project'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

interface ProjectsProps {
  projects: Project[]
  projectsStatus: string
  isUsingFallback: boolean
}

function Projects({ projects, projectsStatus, isUsingFallback }: ProjectsProps) {
  return (
    <section id="projects" className="section-shell">
      <SectionHeading
        eyebrow="Selected Projects"
        title="A mix of shipped MERN product work and AI-native interface experiments."
        description="The cards below are hydrated from the portfolio API when available, but remain presentable even when the backend is offline during local development."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge tone={isUsingFallback ? 'warning' : 'success'}>
          {isUsingFallback ? 'fallback data active' : 'live API data active'}
        </Badge>
        <p className="text-sm text-muted">{projectsStatus}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Card
              className={`h-full p-6 sm:p-7 ${project.featured ? 'border-primary/30 bg-gradient-to-br from-primary/10 via-surface-2/90 to-primary-2/10' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold text-white">{project.name}</h3>
                    {project.featured ? <Badge tone="accent">featured</Badge> : null}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                    {project.description}
                  </p>
                </div>

                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.name} on GitHub`}
                    className="rounded-2xl border border-white/10 bg-white/5 p-3 text-muted hover:border-primary/30 hover:text-white"
                  >
                    <Github size={18} />
                  </a>
                ) : (
                  <span className="rounded-2xl border border-white/10 bg-white/5 p-3 text-primary-2">
                    <ArrowUpRight size={18} />
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.tech.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
                {project.highlights.map((highlight) => (
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

export default Projects
