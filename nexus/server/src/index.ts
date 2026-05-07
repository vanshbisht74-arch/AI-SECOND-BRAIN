import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import noteRoutes from './routes/notes.js';
import aiRoutes from './routes/ai.js';
import prodRoutes from './routes/productivity.js';
import docRoutes from './routes/documents.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/productivity', prodRoutes);
app.use('/api/documents', docRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NEXUS API' });
});

app.listen(PORT, () => {
  console.log(`NEXUS Server running on port ${PORT}`);
});

export { app, prisma };
