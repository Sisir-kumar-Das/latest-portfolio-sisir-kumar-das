import { env } from '../config/env';

import type { LlmProvider } from './types';

const getContent = (userMessage: string, context?: string): string =>
  context ? `${userMessage}\n\nContext:\n${context}` : userMessage;

export const openaiProvider: LlmProvider = {
  name: 'openai',
  isConfigured() {
    return Boolean(env.OPENAI_API_KEY);
  },
  async generate({ systemPrompt, userMessage, context }) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.LLM_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: getContent(userMessage, context) },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('OpenAI returned an empty response.');
    }

    return content;
  },
};
