import { Router } from 'express';
import { AIService } from '../services/ai.service.js';
import { MemoryService } from '../services/memory.service.js';

const router = Router();

router.post('/chat', async (req, res) => {
  const { prompt, userId } = req.body;
  try {
    const context = await MemoryService.retrieveContext(prompt, userId || 'demo-user');
    const response = await AIService.generateResponse(prompt, context);
    res.json({ response, contextUsed: !!context });
  } catch (error) {
    res.status(500).json({ error: 'AI failed to respond' });
  }
});

export default router;
