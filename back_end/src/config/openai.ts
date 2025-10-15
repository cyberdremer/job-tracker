import OpenAI from "openai";
import { AiApiStrategy } from "../interfaces/aiapi";
import "dotenv/config";


export class OpenAIStrategy implements AiApiStrategy {
  provider: OpenAI;
  constructor() {
    this.provider = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async generateResponse(text: string): Promise<string> {
    const response = await this.provider.responses.create({
      input: [
        {
          role: "system",
          content:
            "You will sumarize a job description and convert it to a useable object. If the input does not resemble a job description, then return a singular object with a parent named error, along with a child named message which contains the error message",
        },
        { role: "user", content: text },
      ],
      model: "o4-mini-2025-04-16",
    });
    return response.output_text;
  }
  async generateEmbedding(text: string): Promise<number[]> {
    const embedding = await this.provider.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      encoding_format: "float",
    });

    return embedding.data[0].embedding
  }
}

