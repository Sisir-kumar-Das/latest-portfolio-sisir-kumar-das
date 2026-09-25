import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { fallbackProfile } from '../lib/fallbackData'
import type { Profile, SkillCategory } from '../types/profile'

// The API's `skills` shape is a plain object keyed by category
// (see server/src/data/profile.data.ts) — map it to the array-of-categories
// shape the UI renders, using the same labels the fallback data uses.
const SKILL_CATEGORY_LABELS: Record<string, string> = {
  languages: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  databases: 'Databases',
  cloud: 'Cloud & DevOps',
  aiTools: 'AI Tools',
  testing: 'Testing',
}

const toSkillCategories = (skills: unknown): SkillCategory[] => {
  if (Array.isArray(skills)) {
    return skills as SkillCategory[]
  }

  if (!skills || typeof skills !== 'object') {
    return []
  }

  return Object.entries(skills as Record<string, unknown>)
    .filter((entry): entry is [string, string[]] => Array.isArray(entry[1]) && entry[1].length > 0)
    .map(([key, items]) => ({ category: SKILL_CATEGORY_LABELS[key] ?? key, items }))
}

interface RawEducationEntry {
  degree: string
  institution?: string
  school?: string
  period?: string
  year?: string
  location?: string
}

const normalizeProfile = (payload: unknown, apiLocation: string): Profile => {
  const candidate =
    payload && typeof payload === 'object' && 'profile' in payload
      ? (payload as { profile: unknown }).profile
      : payload

  if (
    !candidate ||
    typeof candidate !== 'object' ||
    !('name' in candidate) ||
    !('skills' in candidate)
  ) {
    throw new Error('Unexpected profile response shape.')
  }

  const raw = candidate as Record<string, unknown>
  const social = (raw.social as { github?: string; linkedin?: string } | undefined) ?? {}
  const education = Array.isArray(raw.education)
    ? (raw.education as RawEducationEntry[]).map((entry) => ({
        degree: entry.degree,
        institution: entry.institution ?? entry.school ?? '',
        period: entry.period ?? entry.year ?? '',
        location: entry.location ?? apiLocation,
      }))
    : []

  return {
    ...(raw as unknown as Profile),
    github: (raw.github as string | undefined) ?? social.github ?? '',
    linkedin: (raw.linkedin as string | undefined) ?? social.linkedin ?? '',
    skills: toSkillCategories(raw.skills),
    education,
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(fallbackProfile)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile', { signal: controller.signal })
        const apiLocation =
          response.data && typeof response.data === 'object' && 'location' in response.data
            ? String((response.data as { location: unknown }).location)
            : fallbackProfile.location
        const nextProfile = normalizeProfile(response.data, apiLocation)
        setProfile(nextProfile)
        setIsFallback(false)
        setError(null)
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setProfile(fallbackProfile)
        setIsFallback(true)
        setError('Unable to reach /api/profile right now.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProfile()

    return () => controller.abort()
  }, [])

  return { profile, isLoading, error, isFallback }
}
