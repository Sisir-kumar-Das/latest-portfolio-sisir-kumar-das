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
    if (provider.name === 'mock') {
      return provider;
    }

    return {
      name: provider.name,
      isConfigured: () => true,
      async generate(params) {
        try {
          return await provider.generate(params);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Provider failure';
          console.warn(
            `Provider "${provider.name}" failed (${message}). Falling back to mock provider.`
          );
          return await mockProvider.generate(params);
        }
      },
    };
  }

  if (env.LLM_PROVIDER !== 'mock') {
    console.warn(
      `LLM provider "${env.LLM_PROVIDER}" is not configured. Falling back to the mock provider.`
    );
  }

  return mockProvider;
};

export * from './types';
