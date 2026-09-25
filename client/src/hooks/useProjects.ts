import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { fallbackProjects } from '../lib/fallbackData'
import type { Project } from '../types/project'

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizeProjects = (payload: unknown): Project[] => {
  const candidate =
    payload && typeof payload === 'object' && 'projects' in payload
      ? (payload as { projects: unknown }).projects
      : payload

  if (!Array.isArray(candidate)) {
    throw new Error('Unexpected projects response shape.')
  }

  // The API doesn't send a stable `id` field, so derive one from the name
  // for React keys and any future deep-linking.
  return (candidate as Array<Omit<Project, 'id'> & { id?: string; name: string }>).map(
    (project) => ({
      ...project,
      id: project.id ?? slugify(project.name),
    })
  )
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects', { signal: controller.signal })
        const nextProjects = normalizeProjects(response.data)
        setProjects(nextProjects)
        setIsFallback(false)
        setError(null)
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setProjects(fallbackProjects)
        setIsFallback(true)
        setError('Unable to reach /api/projects right now.')
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProjects()

    return () => controller.abort()
  }, [])

  return { projects, isLoading, error, isFallback }
}
