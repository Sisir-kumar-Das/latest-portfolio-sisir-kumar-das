import { getLlmProvider } from '../providers';
import { getProfileTool } from '../tools';

import type { Agent, AgentInput, AgentResult, Intent } from './types';

const systemPrompt =
  "You are Sisir's portfolio assistant answering questions about his background. Use the provided JSON context to give a concise, natural, recruiter-friendly response grounded in the data.";

export const profileAgent: Agent = {
  name: 'profile-agent',
  canHandle(intent: Intent) {
    return intent === 'profile';
  },
  async handle(input: AgentInput): Promise<AgentResult> {
    const profile = await getProfileTool.run();
    const provider = getLlmProvider();
    const reply = await provider.generate({
      systemPrompt,
      userMessage: input.message,
      context: JSON.stringify(profile),
    });

    return {
      reply,
      agent: this.name,
      toolsUsed: [getProfileTool.name],
    };
  },
};
