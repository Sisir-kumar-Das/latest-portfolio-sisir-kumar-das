import { Router } from 'express';

import { isDbConnected } from '../config/db';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    db: isDbConnected(),
  });
});
