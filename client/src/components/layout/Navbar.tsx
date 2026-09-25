const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  onOpenConcierge: () => void
}

function Navbar({ onOpenConcierge }: NavbarProps) {
  return (
    <header className="sticky top-4 z-30 px-4 sm:px-6 lg:px-8">
      <div className="container-shell">
        <nav className="glass-panel flex flex-col gap-4 rounded-2xl px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <a href="#hero" className="flex items-center gap-3 text-sm text-white">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary-2 font-mono text-xs font-semibold text-white shadow-[0_0_35px_rgba(99,102,241,0.35)]">
              SDK
            </span>
            <span>
              <span className="block font-semibold tracking-tight">Sisir Kumar Das</span>
              <span className="block text-xs text-muted">Full-Stack Software Engineer (MERN)</span>
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-muted hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onOpenConcierge}
              className="rounded-full bg-gradient-to-r from-primary to-primary-2 px-4 py-2 font-medium text-white shadow-[0_8px_30px_rgba(99,102,241,0.35)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              AI Concierge
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
