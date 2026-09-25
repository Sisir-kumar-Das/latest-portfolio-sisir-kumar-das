import { Router } from 'express';

import { getGithubStatsTool } from '../tools';

export const githubRouter = Router();

githubRouter.get('/stats', async (_req, res, next) => {
  try {
    const data = await getGithubStatsTool.run();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
