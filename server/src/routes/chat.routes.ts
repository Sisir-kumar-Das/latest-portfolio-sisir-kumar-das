import { randomUUID } from 'crypto';
import { Router } from 'express';

import { isDbConnected } from '../config/db';
import { ChatLog } from '../models/ChatLog';
import { runOrchestrator } from '../agents/orchestrator';

export const chatRouter = Router();

chatRouter.post('/', async (req, res, next) => {
  try {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const sessionId =
      typeof req.body?.sessionId === 'string' && req.body.sessionId.trim()
        ? req.body.sessionId.trim()
        : randomUUID();

    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    const result = await runOrchestrator({ message, sessionId });

    if (isDbConnected()) {
      ChatLog.create({
        sessionId,
        message,
        reply: result.reply,
        agent: result.agent,
        toolsUsed: result.toolsUsed,
      }).catch((error: unknown) => {
        const logMessage = error instanceof Error ? error.message : 'Unknown chat log error';
        console.warn(`Failed to persist chat log: ${logMessage}`);
      });
    }

    res.json({
      ...result,
      sessionId,
    });
  } catch (error) {
    next(error);
  }
});
