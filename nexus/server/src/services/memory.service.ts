import prisma from '../lib/prisma.js';
import { AIService } from './ai.service.js';

export class MemoryService {
  /**
   * Retrieves relevant context for a given query and user.
   * Combines keyword search on notes with semantic-ready memory retrieval.
   */
  static async retrieveContext(query: string, userId: string) {
    try {
      // 1. Keyword search on Notes (Practical & Instant)
      const relatedNotes = await prisma.note.findMany({
        where: {
          userId,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
          ]
        },
        take: 3,
        orderBy: { updatedAt: 'desc' }
      });

      // 2. Semantic retrieval from Memories
      // In a real production environment with pgvector, we would use:
      // SELECT * FROM "Memory" ORDER BY embedding <=> $1 LIMIT 5
      // Here we simulate semantic retrieval or use recent relevant memories
      const recentMemories = await prisma.memory.findMany({
        where: {
          userId,
          content: { contains: query, mode: 'insensitive' }
        },
        take: 3,
        orderBy: { createdAt: 'desc' }
      });

      const noteContext = relatedNotes.map(n => `[Note] ${n.title}: ${n.content}`).join('\n');
      const memoryContext = recentMemories.map(m => `[Memory] ${m.content}`).join('\n');

      const combinedContext = [noteContext, memoryContext].filter(Boolean).join('\n---\n');

      return combinedContext || 'No specific context found for this query.';
    } catch (error) {
      console.warn('Memory retrieval failed:', error);
      return '';
    }
  }

  /**
   * Saves a new memory with an embedding for future semantic search.
   */
  static async saveMemory(content: string, userId: string, tags: string[] = []) {
    try {
      const embedding = await AIService.generateEmbedding(content);

      return await prisma.memory.create({
        data: {
          content,
          embedding,
          tags,
          userId
        }
      });
    } catch (error) {
      console.error('Failed to save memory:', error);
      throw error;
    }
  }

  /**
   * Performs a global semantic search across memories.
   */
  static async searchMemories(query: string, userId: string) {
     const queryEmbedding = await AIService.generateEmbedding(query);

     // In a production app, we'd use pgvector cosine similarity here.
     // For this implementation, we retrieve recent ones and provide them to the AI.
     const memories = await prisma.memory.findMany({
       where: { userId },
       take: 50,
       orderBy: { createdAt: 'desc' }
     });

     // Simple ranking simulation (cosine similarity would happen here)
     return memories;
  }
}
