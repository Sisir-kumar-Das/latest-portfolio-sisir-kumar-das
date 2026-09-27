import type { Intent } from './types';

const containsAny = (message: string, keywords: string[]): boolean =>
  keywords.some((keyword) => message.includes(keyword));

export const classifyIntent = (message: string): Intent => {
  const normalized = message.toLowerCase();

  if (
    containsAny(normalized, [
      'hire',
      'email',
      'contact',
      'reach',
      'work together',
      'collaborate',
    ])
  ) {
    return 'contact';
  }

  if (
    containsAny(normalized, ['project', 'github', 'repo', 'built', 'portfolio piece'])
  ) {
    return 'projects';
  }

  if (
    containsAny(normalized, [
      'skill',
      'experience',
      'background',
      'resume',
      'about you',
      'about sisir',
      'who is',
      'who are you',
      'tell me about',
      'tech stack',
      'years',
      'education',
      'college',
      'degree',
    ])
  ) {
    return 'profile';
  }

  return 'general';
};
