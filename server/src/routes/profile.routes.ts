import { Router } from 'express';

import { getProfileTool } from '../tools';

export const profileRouter = Router();

profileRouter.get('/', async (_req, res, next) => {
  try {
    const data = await getProfileTool.run();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
