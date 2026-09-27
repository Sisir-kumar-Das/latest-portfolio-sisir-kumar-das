import { fallbackProfile, fallbackProjects } from './fallbackData'

export interface ClientFallbackResult {
  reply: string
  agent: string
  toolsUsed?: string[]
}

const formatList = (items: string[]) => items.join(', ')

export function generateClientFallbackReply(userMessage: string): ClientFallbackResult {
  const normalized = userMessage.toLowerCase().trim()

  // 1. Contact / Hire / Email
  if (
    normalized.includes('hire') ||
    normalized.includes('email') ||
    normalized.includes('contact') ||
    normalized.includes('reach') ||
    normalized.includes('collaborate') ||
    normalized.includes('work together')
  ) {
    return {
      agent: 'Offline Concierge (Local)',
      toolsUsed: ['localContactInfo'],
      reply: `You can reach Sisir directly via email at [${fallbackProfile.email}](mailto:${fallbackProfile.email}) or connect on [LinkedIn](${fallbackProfile.linkedin}) and [GitHub](${fallbackProfile.github}).\n\nHe is currently based in ${fallbackProfile.location} and open to exciting software engineering opportunities!`,
    }
  }

  // 2. Projects / GitHub
  if (
    normalized.includes('project') ||
    normalized.includes('github') ||
    normalized.includes('repo') ||
    normalized.includes('built') ||
    normalized.includes('dev tinder') ||
    normalized.includes('concierge')
  ) {
    const projectSummaries = fallbackProjects
      .map(
        (p) =>
          `• **${p.name}**: ${p.description}\n  *Technologies:* ${formatList(p.tech)}`
      )
      .join('\n\n')

    return {
      agent: 'Offline Concierge (Local)',
      toolsUsed: ['localProjects'],
      reply: `Here are Sisir's key featured projects:\n\n${projectSummaries}\n\nYou can also explore all 30+ repositories on his [GitHub Profile](${fallbackProfile.github}).`,
    }
  }

  // 3. Skills / Tech Stack
  if (
    normalized.includes('skill') ||
    normalized.includes('tech stack') ||
    normalized.includes('stack') ||
    normalized.includes('technologies') ||
    normalized.includes('language') ||
    normalized.includes('database') ||
    normalized.includes('framework')
  ) {
    const skillsList = fallbackProfile.skills
      .map((cat) => `• **${cat.category}:** ${formatList(cat.items)}`)
      .join('\n')

    return {
      agent: 'Offline Concierge (Local)',
      toolsUsed: ['localSkills'],
      reply: `Here is a breakdown of Sisir's technical expertise:\n\n${skillsList}\n\nHe specializes in building scalable MERN web applications with TypeScript, cloud deployments (AWS/GCP), and modern AI agent integrations.`,
    }
  }

  // 4. Experience / Background / About / Who is Sisir
  if (
    normalized.includes('experience') ||
    normalized.includes('background') ||
    normalized.includes('about') ||
    normalized.includes('who is') ||
    normalized.includes('who are you') ||
    normalized.includes('resume') ||
    normalized.includes('cognizant') ||
    normalized.includes('career')
  ) {
    const currentRole = fallbackProfile.experience[0]
    return {
      agent: 'Offline Concierge (Local)',
      toolsUsed: ['localProfile'],
      reply: `**${fallbackProfile.name}** is a ${fallbackProfile.title} based in ${fallbackProfile.location}.\n\n${fallbackProfile.summary}\n\nCurrently, he is working at **${currentRole.company}** as a **${currentRole.role}** (${currentRole.period}), where he has delivered major initiatives like legacy app modernizations, an AWS to GCP migration cutting costs by 22%, and high-concurrency booking systems.`,
    }
  }

  // 5. Greetings
  if (
    normalized.includes('hi') ||
    normalized.includes('hello') ||
    normalized.includes('hey') ||
    normalized === 'sup' ||
    normalized === 'yo'
  ) {
    return {
      agent: 'Offline Concierge (Local)',
      toolsUsed: [],
      reply: `Hi there! 👋 I'm Sisir's portfolio concierge.\n\nI can tell you all about his **projects** (like DEV Tinder and this AI Concierge), his **skills** (React, Node, TypeScript, AWS, GCP), his **experience at Cognizant**, or how to **get in touch**.\n\nWhat would you like to know?`,
    }
  }

  // Default fallback
  return {
    agent: 'Offline Concierge (Local)',
    toolsUsed: ['localSnapshot'],
    reply: `I'm Sisir's portfolio concierge! I can answer questions about his background, 10+ production applications, technical stack (MERN, TypeScript, AWS/GCP), and contact options.\n\nFeel free to ask something like *"Tell me about your projects"*, *"What are your core skills?"*, or *"How can I contact Sisir?"*.`,
  }
}
