import { profile } from '../data/profile.data';

import type { Tool } from './types';

export const getProfileTool: Tool<void, typeof profile> = {
  name: 'getProfile',
  description: "Returns Sisir's portfolio profile data.",
  async run() {
    return profile;
  },
};
