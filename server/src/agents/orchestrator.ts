import { classifyIntent } from './classifyIntent';
import { contactAgent } from './contactAgent';
import { generalAgent } from './generalAgent';
import { profileAgent } from './profileAgent';
import { projectsAgent } from './projectsAgent';
import type { Agent, AgentInput, AgentResult } from './types';

const agents: Agent[] = [contactAgent, projectsAgent, profileAgent, generalAgent];

export const runOrchestrator = async (input: AgentInput): Promise<AgentResult> => {
  try {
    const intent = classifyIntent(input.message);
    const agent = agents.find((candidate) => candidate.canHandle(intent)) ?? generalAgent;

    return await agent.handle(input);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown orchestration error';
    console.warn(`Orchestrator fallback triggered: ${message}`);

    return {
      reply:
        "Sorry — something went wrong on my side. Please try again, and I can still help with Sisir's background, projects, or contact details.",
      agent: 'general',
      toolsUsed: [],
    };
  }
};
