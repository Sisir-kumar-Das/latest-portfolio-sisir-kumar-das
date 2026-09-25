import { profile } from '../data/profile.data';

import type { LlmProvider } from './types';

type ParsedContext = Record<string, unknown> | unknown[] | string | number | boolean | null;

const safeParseContext = (context?: string): ParsedContext => {
  if (!context) {
    return null;
  }

  try {
    return JSON.parse(context) as ParsedContext;
  } catch {
    return context;
  }
};

const formatList = (values: string[]): string => values.join(', ');

const summarizeProfile = () => {
  const topExperience = profile.experience[0];

  return [
    `${profile.name} is a ${profile.title} based in ${profile.location}.`,
    `${profile.summary}`,
    `Core strengths include ${formatList(profile.skills.languages)}, ${formatList(profile.skills.frontend)}, and ${formatList(profile.skills.backend)}.`,
    topExperience
      ? `Most recently, ${profile.name} has been working as ${topExperience.role} at ${topExperience.company}.`
      : '',
  ]
    .filter(Boolean)
    .join(' ');
};

const summarizeProjects = (projects: Array<Record<string, unknown>>) => {
  if (projects.length === 0) {
    return "I couldn't find a project matching that filter, but I can still walk you through Sisir's broader portfolio if you'd like.";
  }

  const bullets = projects
    .slice(0, 3)
    .map((project) => {
      const name = typeof project.name === 'string' ? project.name : 'Untitled project';
      const description =
        typeof project.description === 'string' ? project.description : 'A portfolio project.';
      const tech = Array.isArray(project.tech)
        ? project.tech.filter((item): item is string => typeof item === 'string')
        : [];

      return `• ${name}: ${description}${tech.length ? ` Tech: ${formatList(tech)}.` : ''}`;
    })
    .join('\n');

  return `Here are the most relevant projects:\n${bullets}`;
};

const summarizeGithub = (context: Record<string, unknown>) => {
  if (context.available !== true) {
    return "I couldn't reach GitHub live right now, but Sisir's portfolio still includes project details and his GitHub profile link for follow-up.";
  }

  const publicRepos = typeof context.publicRepos === 'number' ? context.publicRepos : 0;
  const followers = typeof context.followers === 'number' ? context.followers : 0;
  const following = typeof context.following === 'number' ? context.following : 0;
  const bio = typeof context.bio === 'string' && context.bio ? context.bio : 'No public bio is set.';

  return `Live GitHub snapshot: ${publicRepos} public repos, ${followers} followers, and following ${following} accounts. Bio: ${bio}`;
};

const summarizeProjectsWithGithub = (
  projects: Array<Record<string, unknown>>,
  githubStats?: Record<string, unknown> | null
) => {
  const projectSummary = summarizeProjects(projects);

  if (!githubStats) {
    return projectSummary;
  }

  return `${projectSummary}\n\n${summarizeGithub(githubStats)}`;
};

const summarizeContact = (context: Record<string, unknown>) => {
  const persisted =
    typeof context.persisted === 'boolean'
      ? context.persisted
      : typeof context.success === 'boolean'
        ? false
        : false;

  return persisted
    ? "Thanks — I've captured your contact request and stored it for follow-up."
    : "Thanks — I've captured your contact request. The database isn't connected right now, so it wasn't persisted, but the message flow still worked.";
};

export const mockProvider: LlmProvider = {
  name: 'mock',
  isConfigured() {
    return true;
  },
  async generate({ systemPrompt, userMessage, context }) {
    const parsedContext = safeParseContext(context);
    const lowerMessage = userMessage.toLowerCase();

    if (
      systemPrompt.toLowerCase().includes('handling inbound contact requests') &&
      lowerMessage.includes('has not shared an email address yet')
    ) {
      return `I'd be happy to help Sisir follow up. Please share your email address and a quick note about what you'd like to discuss, and I can capture it for him.`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hi! I'm Sisir's portfolio assistant. I can help with background, projects, GitHub activity, or passing along a contact request. ${summarizeProfile()}`;
    }

    if (Array.isArray(parsedContext)) {
      return summarizeProjects(parsedContext.filter((item): item is Record<string, unknown> => Boolean(item)));
    }

    if (parsedContext && typeof parsedContext === 'object') {
      const record = parsedContext as Record<string, unknown>;

      if ('projects' in record && 'githubStats' in record) {
        const projects = Array.isArray(record.projects)
          ? record.projects.filter((item): item is Record<string, unknown> => Boolean(item))
          : [];
        const githubStats =
          record.githubStats && typeof record.githubStats === 'object'
            ? (record.githubStats as Record<string, unknown>)
            : null;

        return summarizeProjectsWithGithub(projects, githubStats);
      }

      if ('projects' in record || 'skills' in record || 'experience' in record) {
        return summarizeProfile();
      }

      if ('publicRepos' in record || 'followers' in record || 'available' in record) {
        return summarizeGithub(record);
      }

      if ('success' in record || 'persisted' in record) {
        return summarizeContact(record);
      }
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return summarizeProfile();
    }

    return `I'm here to help visitors learn about Sisir's background, projects, and availability. ${summarizeProfile()}`;
  },
};
