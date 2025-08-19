import { AiApiStrategy } from "../interfaces/aiapi.js";

export class AiProvider {
  private strategy: AiApiStrategy;

  constructor(strategy: AiApiStrategy) {
    this.strategy = strategy;
  }
  setStrategy(strategy: AiApiStrategy) {
    this.strategy = strategy;
  }

  async generateEmbedding(text: string): Promise<number[]> {
    return this.strategy.generateEmbedding(text);
  }

  async generateResponse(text: string): Promise<string> {
    return this.strategy.generateResponse(text)
  }
}
