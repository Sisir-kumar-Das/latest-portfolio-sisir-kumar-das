import { env } from '../config/env';

import type { LlmProvider } from './types';

const getContent = (userMessage: string, context?: string): string =>
  context ? `${userMessage}\n\nContext:\n${context}` : userMessage;

export const groqProvider: LlmProvider = {
  name: 'groq',
  isConfigured() {
    return Boolean(env.GROQ_API_KEY);
  },
  async generate({ systemPrompt, userMessage, context }) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.LLM_MODEL || 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: getContent(userMessage, context) },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('Groq returned an empty response.');
    }

    return content;
  },
};
