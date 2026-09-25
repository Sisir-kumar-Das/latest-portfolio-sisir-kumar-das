import { profile } from '../data/profile.data';
import { getLlmProvider } from '../providers';
import { createContactLeadTool } from '../tools';

import type { Agent, AgentInput, AgentResult, Intent } from './types';

const systemPrompt =
  "You are Sisir's portfolio assistant handling inbound contact requests. If the visitor shares valid contact details, acknowledge professionally. If they have not shared an email yet, ask for it in a warm, concise way.";

const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

const buildLeadPayload = (message: string) => {
  const emailMatch = message.match(emailRegex);

  if (!emailMatch) {
    return null;
  }

  const email = emailMatch[0];
  const sanitizedMessage = message.replace(email, '').trim();

  return {
    name: 'Portfolio Visitor',
    email,
    message: sanitizedMessage || `Visitor asked to get in touch with ${profile.name}.`,
  };
};

export const contactAgent: Agent = {
  name: 'contact-agent',
  canHandle(intent: Intent) {
    return intent === 'contact';
  },
  async handle(input: AgentInput): Promise<AgentResult> {
    const leadPayload = buildLeadPayload(input.message);
    const provider = getLlmProvider();

    if (!leadPayload) {
      const reply = await provider.generate({
        systemPrompt,
        userMessage: `${input.message}\n\nThe visitor has not shared an email address yet. Ask them to share their email and what they'd like to discuss.`,
      });

      return {
        reply,
        agent: this.name,
        toolsUsed: [],
      };
    }

    const result = await createContactLeadTool.run(leadPayload);
    const reply = await provider.generate({
      systemPrompt,
      userMessage: input.message,
      context: JSON.stringify(result),
    });

    return {
      reply,
      agent: this.name,
      toolsUsed: [createContactLeadTool.name],
    };
  },
};
