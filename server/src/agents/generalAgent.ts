import { getLlmProvider } from '../providers';

import type { Agent, AgentInput, AgentResult, Intent } from './types';

const systemPrompt =
  "You are Sisir's friendly portfolio concierge. Greet visitors warmly, explain you can answer questions about background, projects, GitHub activity, and contact options, and keep answers concise but helpful.";

export const generalAgent: Agent = {
  name: 'general-agent',
  canHandle(intent: Intent) {
    return intent === 'general';
  },
  async handle(input: AgentInput): Promise<AgentResult> {
    const provider = getLlmProvider();
    const reply = await provider.generate({
      systemPrompt,
      userMessage: input.message,
    });

    return {
      reply,
      agent: this.name,
      toolsUsed: [],
    };
  },
};
