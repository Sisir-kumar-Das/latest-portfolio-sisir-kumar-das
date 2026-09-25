import { env } from '../config/env';

import { anthropicProvider } from './anthropicProvider';
import { geminiProvider } from './geminiProvider';
import { groqProvider } from './groqProvider';
import { mockProvider } from './mockProvider';
import { openaiProvider } from './openaiProvider';
import type { LlmProvider } from './types';

const providers: Record<string, LlmProvider> = {
  mock: mockProvider,
  openai: openaiProvider,
  groq: groqProvider,
  gemini: geminiProvider,
  anthropic: anthropicProvider,
};

export const getLlmProvider = (): LlmProvider => {
  const provider = providers[env.LLM_PROVIDER];

  if (provider && provider.isConfigured()) {
    return provider;
  }

  if (env.LLM_PROVIDER !== 'mock') {
    console.warn(
      `LLM provider "${env.LLM_PROVIDER}" is not configured. Falling back to the mock provider.`
    );
  }

  return mockProvider;
};

export * from './types';
