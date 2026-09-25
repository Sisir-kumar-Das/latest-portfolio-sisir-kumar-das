import { env } from '../config/env';

import type { LlmProvider } from './types';

const getContent = (userMessage: string, context?: string): string =>
  context ? `${userMessage}\n\nContext:\n${context}` : userMessage;

export const anthropicProvider: LlmProvider = {
  name: 'anthropic',
  isConfigured() {
    return Boolean(env.ANTHROPIC_API_KEY);
  },
  async generate({ systemPrompt, userMessage, context }) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: env.LLM_MODEL || 'claude-3-5-haiku-latest',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: getContent(userMessage, context) }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      content?: Array<{ type?: string; text?: string }>;
    };

    const content = data.content
      ?.filter((block) => block.type === 'text')
      .map((block) => block.text ?? '')
      .join('')
      .trim();

    if (!content) {
      throw new Error('Anthropic returned an empty response.');
    }

    return content;
  },
};
