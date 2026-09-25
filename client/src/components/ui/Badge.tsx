import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'default' | 'accent' | 'success' | 'warning'
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  default: 'border-white/10 bg-white/5 text-muted',
  accent: 'border-primary/30 bg-primary/15 text-primary-2',
  success: 'border-success/30 bg-success/15 text-success',
  warning: 'border-warning/30 bg-warning/15 text-warning',
}

function Badge({ children, tone = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide ${toneClasses[tone]}`}
    >
      {children}
    </span>
  )
}

export default Badge
