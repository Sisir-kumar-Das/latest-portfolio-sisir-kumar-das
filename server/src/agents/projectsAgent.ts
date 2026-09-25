import { getLlmProvider } from '../providers';
import { getGithubStatsTool, getProjectsTool } from '../tools';

import type { Agent, AgentInput, AgentResult, Intent } from './types';

const systemPrompt =
  "You are Sisir's portfolio assistant focused on project storytelling. Use the provided project JSON to explain relevant work clearly, highlight impact, and mention technologies only when they help answer the question.";

const extractTechFilter = (message: string): string | undefined => {
  const normalized = message.toLowerCase();
  const knownTech = [
    'react',
    'node',
    'express',
    'mongodb',
    'aws',
    'gcp',
    'typescript',
    'redux',
    'tailwind',
    'langchain',
  ];

  return knownTech.find((tech) => normalized.includes(tech));
};

export const projectsAgent: Agent = {
  name: 'projects-agent',
  canHandle(intent: Intent) {
    return intent === 'projects';
  },
  async handle(input: AgentInput): Promise<AgentResult> {
    const tech = extractTechFilter(input.message);
    const projects = await getProjectsTool.run(tech ? { tech } : undefined);
    const includesGithub = input.message.toLowerCase().includes('github');
    const githubStats = includesGithub ? await getGithubStatsTool.run() : null;
    const provider = getLlmProvider();
    const reply = await provider.generate({
      systemPrompt,
      userMessage: input.message,
      context: JSON.stringify({
        projects,
        githubStats,
      }),
    });

    return {
      reply,
      agent: this.name,
      toolsUsed: includesGithub
        ? [getProjectsTool.name, getGithubStatsTool.name]
        : [getProjectsTool.name],
    };
  },
};
