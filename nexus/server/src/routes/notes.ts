import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const { userId } = req.query;
  const notes = await prisma.note.findMany({
    where: { userId: String(userId) },
    orderBy: { updatedAt: 'desc' }
  });
  res.json(notes);
});

router.post('/', async (req, res) => {
  const { title, content, userId, folder, tags } = req.body;
  try {
    const note = await prisma.note.create({
      data: { title, content, userId, folder, tags: tags || [] }
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create note' });
  }
});

export default router;
