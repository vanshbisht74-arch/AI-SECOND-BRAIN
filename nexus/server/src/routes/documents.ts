import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const router = Router();
const prisma = new PrismaClient();
const upload = multer({ dest: 'uploads/' });

// Get all documents for a user
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const docs = await prisma.document.findMany({ where: { userId: String(userId) } });
  res.json(docs);
});

// Upload a document
router.post('/upload', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Simulated OCR / Text Extraction
    const simulatedContent = `Extracted text from ${file.originalname}: This document discusses the core principles of Nexus, focusing on how a digital second brain can enhance human productivity and memory retention...`;

    const doc = await prisma.document.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        url: `/uploads/${file.filename}`,
        content: simulatedContent,
        userId: userId || 'demo-user',
      }
    });

    res.status(201).json(doc);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process document' });
  }
});

export default router;
