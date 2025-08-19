export interface AiApiStrategy {
  generateResponse(text: string): Promise<string>;
  generateEmbedding(text: string): Promise<number[]>;
}
