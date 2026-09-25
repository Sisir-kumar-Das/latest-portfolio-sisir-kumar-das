import { Schema, model, models } from 'mongoose';

export interface ContactMessageDocument {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const contactMessageSchema = new Schema<ContactMessageDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ContactMessage =
  models.ContactMessage || model<ContactMessageDocument>('ContactMessage', contactMessageSchema);
