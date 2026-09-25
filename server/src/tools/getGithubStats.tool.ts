import { env } from '../config/env';

import type { Tool } from './types';

type GithubStats = {
  available: boolean;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string | null;
  htmlUrl: string | null;
  bio: string | null;
};

const fallbackStats = (): GithubStats => ({
  available: false,
  publicRepos: 0,
  followers: 0,
  following: 0,
  avatarUrl: null,
  htmlUrl: null,
  bio: null,
});

export const getGithubStatsTool: Tool<void, GithubStats> = {
  name: 'getGithubStats',
  description: "Fetches Sisir's public GitHub profile statistics.",
  async run() {
    try {
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'sisir-portfolio-server',
      };

      if (env.GITHUB_TOKEN) {
        headers.Authorization = `token ${env.GITHUB_TOKEN}`;
      }

      const response = await fetch('https://api.github.com/users/Sisir-kumar-Das', { headers });

      if (!response.ok) {
        throw new Error(`GitHub API responded with ${response.status}`);
      }

      const data = (await response.json()) as {
        public_repos?: number;
        followers?: number;
        following?: number;
        avatar_url?: string;
        html_url?: string;
        bio?: string | null;
      };

      return {
        available: true,
        publicRepos: data.public_repos ?? 0,
        followers: data.followers ?? 0,
        following: data.following ?? 0,
        avatarUrl: data.avatar_url ?? null,
        htmlUrl: data.html_url ?? null,
        bio: data.bio ?? null,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown GitHub API error';
      console.warn(`Failed to fetch GitHub stats: ${message}`);
      return fallbackStats();
    }
  },
};
