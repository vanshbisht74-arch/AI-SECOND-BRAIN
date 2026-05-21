import { Router } from 'express';
import prisma from '../lib/prisma.js';
import multer from 'multer';
import { AIService } from '../services/ai.service.js';
import fs from 'fs';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  const { userId } = req.query;
  const docs = await prisma.document.findMany({
    where: { userId: String(userId || 'demo-user') },
    orderBy: { createdAt: 'desc' }
  });
  res.json(docs);
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    // Read file content for small text-based files
    let content = '';
    if (file.mimetype === 'text/plain') {
      content = fs.readFileSync(file.path, 'utf-8');
    } else {
      content = `Extracted metadata from ${file.originalname} (${file.size} bytes).`;
    }

    // Generate AI Summary for the document
    const summary = await AIService.generateResponse(
      `Summarize the following document content or metadata and provide 3 key insights: ${content.substring(0, 2000)}`,
      'Context: User uploaded a new document to their NEXUS brain.'
    );

    const doc = await prisma.document.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        url: `/uploads/${file.filename}`,
        content: content || summary,
        userId: userId || 'demo-user',
      }
    });

    res.status(201).json({ ...doc, aiInsight: summary });
  } catch (error) {
    console.error('Document Upload Error:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

router.get('/:id/insights', async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return res.status(404).json({ error: 'Document not found' });

    const insight = await AIService.generateResponse(
      `Analyze this document and generate a study quiz (3 MCQs) based on it: ${doc.content?.substring(0, 3000)}`
    );

    res.json({ insight });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate insights' });
  }
});

export default router;
