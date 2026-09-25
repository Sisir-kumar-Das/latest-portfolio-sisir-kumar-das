import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: ReactNode
}

function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="mb-8 max-w-3xl"
    >
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.32em] text-primary-2">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mt-3 text-base leading-7 text-muted sm:text-lg">{description}</div>
    </motion.div>
  )
}

export default SectionHeading
