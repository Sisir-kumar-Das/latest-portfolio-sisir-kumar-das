import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'
import type { Profile } from '../../types/profile'

interface HeroProps {
  profile: Profile
  profileStatus: string
  onOpenConcierge: () => void
}

function Hero({ profile, profileStatus, onOpenConcierge }: HeroProps) {
  const headline = useMemo(
    () => `${profile.name} — ${profile.title}`,
    [profile.name, profile.title],
  )
  const [typedHeadline, setTypedHeadline] = useState('')

  useEffect(() => {
    let frame = 0
    const intervalId = window.setInterval(() => {
      frame += 1
      setTypedHeadline(headline.slice(0, frame))

      if (frame >= headline.length) {
        window.clearInterval(intervalId)
      }
    }, 28)

    return () => window.clearInterval(intervalId)
  }, [headline])

  const socialLinks = [
    { href: profile.github, label: 'GitHub', icon: Github },
    { href: profile.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: `mailto:${profile.email}`, label: 'Email', icon: Mail },
  ]

  return (
    <section id="hero" className="section-shell overflow-hidden pt-8 sm:pt-10">
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-300" />
              <span className="size-3 rounded-full bg-emerald-400" />
            </div>
            <Badge tone="accent">developer.console</Badge>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <p className="terminal-line">$ whoami</p>
              <h1 className="min-h-[72px] text-4xl font-semibold leading-tight tracking-tight text-white sm:min-h-[96px] sm:text-5xl">
                {typedHeadline}
                <span className="ml-1 inline-block h-10 w-0.5 animate-pulse bg-primary-2 align-middle" />
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted">{profile.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-2 px-5 py-3 font-medium text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowRight size={18} />
              </a>
              <button
                type="button"
                onClick={onOpenConcierge}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/10"
              >
                <Sparkles size={18} />
                Chat with my AI Concierge
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-2/80 px-4 py-2 text-sm text-muted hover:border-primary/30 hover:text-white"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="grid gap-4"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-primary-2">
                  live status
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">{profileStatus}</p>
              </div>
              <Badge tone="success">online-ready</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-primary-2">
              location
            </p>
            <div className="mt-4 flex items-center gap-3 text-white">
              <span className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-semibold">{profile.location}</p>
                <p className="text-sm text-muted">Shipping MERN systems from Bangalore</p>
              </div>
            </div>
          </Card>

          <Card className="grid gap-4 p-6 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { label: 'Production apps', value: '10+' },
              { label: 'Cloud cost reduction', value: '22%' },
              { label: 'Delivery speed-up with AI tools', value: '30%+' },
            ].map((metric) => (
              <div key={metric.label}>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
