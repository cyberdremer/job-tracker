export class AiProvider {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    async generateEmbedding(text) {
        return this.strategy.generateEmbedding(text);
    }
    async generateResponse(text) {
        return this.strategy.generateResponse(text);
    }
}
