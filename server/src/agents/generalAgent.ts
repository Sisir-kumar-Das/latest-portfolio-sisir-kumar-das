import { profile } from '../data/profile.data';
import { getLlmProvider } from '../providers';

import type { Agent, AgentInput, AgentResult, Intent } from './types';

const systemPrompt =
  "You are Sisir's friendly portfolio concierge. Greet visitors warmly, explain you can answer questions about his background, projects, GitHub activity, and contact options, and keep answers concise, helpful, and grounded in his profile.";

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
      context: JSON.stringify({
        name: profile.name,
        title: profile.title,
        summary: profile.summary,
        location: profile.location,
        skills: profile.skills,
        recentExperience: profile.experience[0],
      }),
    });

    return {
      reply,
      agent: this.name,
      toolsUsed: [],
    };
  },
};
