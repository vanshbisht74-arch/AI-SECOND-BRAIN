import { PrismaClient } from '@prisma/client';
import { AIService } from './ai.service.js';

const prisma = new PrismaClient();

export class MemoryService {
  static async retrieveContext(query: string, userId: string) {
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
