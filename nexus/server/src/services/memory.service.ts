import prisma from '../lib/prisma.js';
import { AIService } from './ai.service.js';

export class MemoryService {
  static async retrieveContext(query: string, userId: string) {
    try {
      const relatedNotes = await prisma.note.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ]
        },
        take: 5
      });

      return relatedNotes.map(n => `Note: ${n.title}\nContent: ${n.content}`).join('\n---\n');
    } catch (error) {
      console.warn('Memory retrieval failed (likely database not configured):', error);
      return '';
    }
  }

  static async saveMemory(content: string, userId: string) {
    const embedding = await AIService.generateEmbedding(content);

    return await prisma.memory.create({
      data: {
        content,
        embedding,
        userId
      }
    });
  }
}
