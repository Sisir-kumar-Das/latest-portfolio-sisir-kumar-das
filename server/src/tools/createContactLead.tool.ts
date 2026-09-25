import { ZodError, z } from 'zod';

import { isDbConnected } from '../config/db';
import { ContactMessage } from '../models/ContactMessage';

import type { Tool } from './types';

export type ContactLeadInput = {
  name: string;
  email: string;
  message: string;
};

type ContactLeadResult = {
  success: true;
  persisted: boolean;
};

const contactLeadSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('A valid email address is required.'),
  message: z.string().trim().min(1, 'Message is required.'),
});

export const createContactLeadTool: Tool<ContactLeadInput, ContactLeadResult> = {
  name: 'createContactLead',
  description: 'Validates and stores a portfolio contact lead.',
  async run(args) {
    const validated = contactLeadSchema.parse(args);

    if (!isDbConnected()) {
      console.warn('Skipping contact lead persistence because the database is not connected.');
      return { success: true, persisted: false };
    }

    await ContactMessage.create(validated);

    return { success: true, persisted: true };
  },
};

export const isContactLeadValidationError = (error: unknown): error is ZodError =>
  error instanceof ZodError;
