import { Router } from 'express';
import prisma from '../lib/prisma.js';

const router = Router();

// Get all notes for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const notes = await prisma.note.findMany({
    where: { userId: String(userId) },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(notes);
});

// Create a new note
router.post('/', async (req, res) => {
  const { title, content, userId, folder, tags } = req.body;

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
        folder,
        tags: tags || [],
      }
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

export default router;
