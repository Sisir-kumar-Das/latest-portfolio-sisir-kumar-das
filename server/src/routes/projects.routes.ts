import { Router } from 'express';

import { getProjectsTool } from '../tools';

export const projectsRouter = Router();

projectsRouter.get('/', async (req, res, next) => {
  try {
    const tech = typeof req.query.tech === 'string' ? req.query.tech : undefined;
    const data = await getProjectsTool.run(tech ? { tech } : undefined);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
