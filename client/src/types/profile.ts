export interface SkillCategory {
  category: string
  items: string[]
}

export interface ExperienceItem {
  company: string
  location: string
  role: string
  period: string
  highlights: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  location: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  github: string
  linkedin: string
  summary: string
  skills: SkillCategory[]
  experience: ExperienceItem[]
  education: EducationItem[]
}
