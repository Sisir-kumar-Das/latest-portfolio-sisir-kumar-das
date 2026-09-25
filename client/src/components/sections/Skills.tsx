import { motion } from 'framer-motion'
import type { SkillCategory } from '../../types/profile'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import SectionHeading from '../ui/SectionHeading'

interface SkillsProps {
  skills: SkillCategory[]
}

const spanMap: Record<string, string> = {
  Frontend: 'md:col-span-2',
  'Cloud & DevOps': 'md:col-span-2',
  Databases: 'xl:col-span-2',
}

function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="section-shell">
      <SectionHeading
        eyebrow="Skills Matrix"
        title="A production-ready stack across frontend, APIs, data, cloud, and AI tooling."
        description="The interface leans into a bento-grid layout so every category feels like part of the same system rather than a static resume list."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((group, index) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className={spanMap[group.category] ?? ''}
          >
            <Card className="h-full p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{group.category}</h3>
                <span className="size-2 rounded-full bg-primary-2 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
