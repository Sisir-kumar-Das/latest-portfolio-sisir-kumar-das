export interface LlmProvider {
  name: string;
  isConfigured(): boolean;
  generate(input: {
    systemPrompt: string;
    userMessage: string;
    context?: string;
  }): Promise<string>;
}
