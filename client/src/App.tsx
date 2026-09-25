import { useState } from 'react'
import ConciergeWidget from './components/concierge/ConciergeWidget'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Experience from './components/sections/Experience'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import { useProfile } from './hooks/useProfile'
import { useProjects } from './hooks/useProjects'

function App() {
  const [isConciergeOpen, setIsConciergeOpen] = useState(false)
  const profileState = useProfile()
  const projectState = useProjects()

  const profileStatus = profileState.isLoading
    ? 'Syncing live profile data from /api/profile...'
    : profileState.error
      ? 'Profile API unavailable — showing the built-in resume snapshot.'
      : 'Live profile data connected.'

  const projectStatus = projectState.isLoading
    ? 'Syncing featured work from /api/projects...'
    : projectState.error
      ? 'Projects API unavailable — showing the embedded project seed data.'
      : 'Live project data connected.'

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(34,211,238,0.12),_transparent_22%),linear-gradient(rgba(255,255,255,0.02)_1px,_transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,_transparent_1px)] bg-[size:auto,auto,64px_64px,64px_64px]" />
      <Navbar onOpenConcierge={() => setIsConciergeOpen(true)} />

      <main className="container-shell relative z-10 flex flex-col gap-8 pb-24 pt-8 sm:pt-12 lg:pt-16">
        <Hero
          profile={profileState.profile}
          profileStatus={profileStatus}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />
        <About profile={profileState.profile} profileStatus={profileStatus} />
        <Skills skills={profileState.profile.skills} />
        <Experience experiences={profileState.profile.experience} />
        <Projects
          projects={projectState.projects}
          projectsStatus={projectStatus}
          isUsingFallback={projectState.isFallback}
        />
        <Contact profile={profileState.profile} />
      </main>

      <Footer />
      <ConciergeWidget
        isOpen={isConciergeOpen}
        onToggle={() => setIsConciergeOpen((open) => !open)}
        onOpen={() => setIsConciergeOpen(true)}
      />
    </div>
  )
}

export default App
