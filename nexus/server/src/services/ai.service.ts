import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || 'sk-dummy-key';

const openai = new OpenAI({
  apiKey: apiKey,
});

export class AIService {
  static async generateResponse(prompt: string, context?: string) {
    if (!process.env.OPENAI_API_KEY) {
      return "AI functionality is currently in demo mode. Please provide an API key to enable full intelligence.";
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: "You are NEXUS Intelligence, a premium digital second brain assistant."
          },
          {
            role: "system",
            content: `Context: ${context || 'No specific context provided.'}`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async generateEmbedding(text: string) {
    if (!process.env.OPENAI_API_KEY) return new Array(1536).fill(0);

    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Embedding Error:', error);
      return new Array(1536).fill(0);
    }
  }
}
