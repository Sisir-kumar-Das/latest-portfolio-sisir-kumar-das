import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env';
import { apiRouter } from './routes';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (curl, health checks) that send no Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      // Check configured origins
      if (env.CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }

      // Support local dev on any port (localhost / 127.0.0.1)
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
        callback(null, true);
        return;
      }

      // Support preview and production deployments on Vercel
      if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : 'Internal server error';
  const status =
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    typeof error.status === 'number'
      ? error.status
      : 500;

  res.status(status).json({ error: message });
});
