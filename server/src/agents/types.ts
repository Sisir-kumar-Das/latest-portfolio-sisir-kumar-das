export type Intent = 'profile' | 'projects' | 'contact' | 'general';

export type AgentInput = {
  message: string;
  sessionId: string;
};

export type AgentResult = {
  reply: string;
  agent: string;
  toolsUsed: string[];
};

export interface Agent {
  name: string;
  canHandle(intent: Intent): boolean;
  handle(input: AgentInput): Promise<AgentResult>;
}
