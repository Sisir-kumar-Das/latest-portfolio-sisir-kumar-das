import { Router } from 'express';

import { chatRouter } from './chat.routes';
import { contactRouter } from './contact.routes';
import { githubRouter } from './github.routes';
import { healthRouter } from './health.routes';
import { profileRouter } from './profile.routes';
import { projectsRouter } from './projects.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/github', githubRouter);
apiRouter.use('/contact', contactRouter);
apiRouter.use('/chat', chatRouter);
