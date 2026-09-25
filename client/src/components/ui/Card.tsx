import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-surface-2/80 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
