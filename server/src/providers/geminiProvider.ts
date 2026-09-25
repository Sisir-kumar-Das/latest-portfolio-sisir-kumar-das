import { env } from '../config/env';

import type { LlmProvider } from './types';

const getPrompt = (systemPrompt: string, userMessage: string, context?: string): string =>
  [systemPrompt, '', userMessage, context ? `Context:\n${context}` : ''].filter(Boolean).join('\n');

export const geminiProvider: LlmProvider = {
  name: 'gemini',
  isConfigured() {
    return Boolean(env.GEMINI_API_KEY);
  },
  async generate({ systemPrompt, userMessage, context }) {
    const model = env.LLM_MODEL || 'gemini-1.5-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: getPrompt(systemPrompt, userMessage, context) }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini request failed with status ${response.status}`);
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };

    const content = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim();

    if (!content) {
      throw new Error('Gemini returned an empty response.');
    }

    return content;
  },
};
