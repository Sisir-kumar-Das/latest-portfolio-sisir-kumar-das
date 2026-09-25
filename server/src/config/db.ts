import mongoose from 'mongoose';

import { env } from './env';

let dbConnected = false;

mongoose.connection.on('connected', () => {
  dbConnected = true;
  console.log('MongoDB connected.');
});

mongoose.connection.on('disconnected', () => {
  dbConnected = false;
  console.warn('MongoDB disconnected. Persistence features are running in degraded mode.');
});

mongoose.connection.on('error', (error) => {
  dbConnected = false;
  console.warn(`MongoDB error: ${error.message}`);
});

export const connectDB = async (): Promise<void> => {
  if (!env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Running without database persistence.');
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown MongoDB connection error';
    dbConnected = false;
    console.warn(`Failed to connect to MongoDB. Running without persistence. ${message}`);
  }
};

export const isDbConnected = (): boolean => dbConnected;
