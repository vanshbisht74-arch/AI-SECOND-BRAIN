import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY || 'sk-dummy-key';

const isOpenRouter = apiKey.startsWith('sk-or-');

const openai = new OpenAI({
  apiKey: apiKey,
  baseURL: isOpenRouter ? "https://openrouter.ai/api/v1" : undefined,
  defaultHeaders: isOpenRouter ? {
    "HTTP-Referer": "https://nexus.ai",
    "X-Title": "NEXUS",
  } : undefined,
});

export class AIService {
  static async generateResponse(prompt: string, context?: string) {
    if (apiKey === 'sk-dummy-key') {
      return "AI functionality is currently in demo mode. Please provide an API key to enable full intelligence.";
    }

    try {
      const response = await openai.chat.completions.create({
        model: isOpenRouter ? "google/gemini-2.0-flash-001" : "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `You are NEXUS Intelligence, a premium digital second brain and personal knowledge OS.
            Your tone is professional, calm, and highly intelligent—reminiscent of Apple and Stripe.
            You help users organize their lives, study better, and retrieve information instantly.`
          },
          {
            role: "system",
            content: `CRITICAL CONTEXT FROM USER BRAIN:\n${context || 'No specific context provided.'}`
          },
          { role: "user", content: prompt }
        ],
        temperature: 0.3, // Lower temperature for more consistent, professional responses
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  static async generateEmbedding(text: string) {
    if (apiKey === 'sk-dummy-key') return new Array(1536).fill(0);

    try {
      const response = await openai.embeddings.create({
        model: isOpenRouter ? "openai/text-embedding-3-small" : "text-embedding-3-small",
        input: text.replace(/\n/g, ' '),
      });
      return response.data[0].embedding;
    } catch (error) {
      console.error('Embedding Error:', error);
      return new Array(1536).fill(0);
    }
  }

  static async generateDailyDigest(userId: string, data: any) {
    const prompt = `Generate a high-level executive daily digest for the user based on these activities: ${JSON.stringify(data)}.
    Format it with sections: "The Big Picture", "Key Achievements", and "Focus for Tomorrow".
    Maintain a premium, encouraging, and minimal tone.`;

    return this.generateResponse(prompt);
  }
}
