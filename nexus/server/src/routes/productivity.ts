import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/tasks', async (req, res) => {
  const { userId } = req.query;
  const tasks = await prisma.task.findMany({ where: { userId: String(userId) } });
  res.json(tasks);
});

router.post('/tasks', async (req, res) => {
  const { title, description, userId } = req.body;
  const task = await prisma.task.create({ data: { title, description, userId } });
  res.status(201).json(task);
});

export default router;
