import { Schema, model, models } from 'mongoose';

export interface ChatLogDocument {
  sessionId: string;
  message: string;
  reply: string;
  agent: string;
  toolsUsed: string[];
  createdAt: Date;
}

const chatLogSchema = new Schema<ChatLogDocument>({
  sessionId: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  reply: {
    type: String,
    required: true,
    trim: true,
  },
  agent: {
    type: String,
    required: true,
    trim: true,
  },
  toolsUsed: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ChatLog = models.ChatLog || model<ChatLogDocument>('ChatLog', chatLogSchema);
