export type SupportedLlmProvider = 'mock' | 'openai' | 'groq' | 'gemini' | 'anthropic';

const parsePort = (value: string | undefined): number => {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return 5000;
  }

  return parsed;
};

const normalizeProvider = (value: string | undefined): SupportedLlmProvider => {
  const provider = value?.trim().toLowerCase();

  switch (provider) {
    case 'openai':
    case 'groq':
    case 'gemini':
    case 'anthropic':
    case 'mock':
      return provider;
    default:
      return 'mock';
  }
};

export const env = {
  PORT: parsePort(process.env.PORT),
  // Comma-separated list supported so both the local Vite dev origin and a
  // deployed frontend origin (e.g. Vercel) can be allowed simultaneously.
  CLIENT_ORIGINS: (process.env.CLIENT_ORIGIN?.trim() || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  MONGODB_URI: process.env.MONGODB_URI?.trim() || '',
  LLM_PROVIDER: normalizeProvider(process.env.LLM_PROVIDER),
  OPENAI_API_KEY: process.env.OPENAI_API_KEY?.trim() || '',
  GROQ_API_KEY: process.env.GROQ_API_KEY?.trim() || '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY?.trim() || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY?.trim() || '',
  LLM_MODEL: process.env.LLM_MODEL?.trim() || '',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN?.trim() || '',
} as const;
