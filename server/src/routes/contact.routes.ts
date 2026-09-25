import { Router } from 'express';

import { createContactLeadTool, isContactLeadValidationError } from '../tools';

export const contactRouter = Router();

contactRouter.post('/', async (req, res, next) => {
  try {
    const result = await createContactLeadTool.run(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (isContactLeadValidationError(error)) {
      const message = error.issues[0]?.message || 'Invalid contact request.';
      res.status(400).json({ error: message });
      return;
    }

    next(error);
  }
});
