import { profile } from '../data/profile.data';

import type { Tool } from './types';

type GetProjectsArgs = {
  tech?: string;
};

export const getProjectsTool: Tool<GetProjectsArgs | void, typeof profile.projects> = {
  name: 'getProjects',
  description: "Returns Sisir's portfolio projects, optionally filtered by technology.",
  async run(args) {
    const techFilter = args && 'tech' in args ? args.tech?.trim().toLowerCase() : undefined;

    if (!techFilter) {
      return profile.projects;
    }

    return profile.projects.filter((project) =>
      project.tech.some((tech) => tech.toLowerCase().includes(techFilter))
    );
  },
};
