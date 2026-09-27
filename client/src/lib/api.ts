import axios from 'axios'

const resolveBaseUrl = (): string => {
  const raw = import.meta.env.VITE_API_BASE_URL?.trim()
  if (!raw) {
    return '/api'
  }

  const sanitized = raw.replace(/\/+$/, '')
  return sanitized.endsWith('/api') ? sanitized : `${sanitized}/api`
}

export const api = axios.create({
  baseURL: resolveBaseUrl(),
  // 60s timeout accommodates Render free-tier cold starts (~30-50s) and LLM latency
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

