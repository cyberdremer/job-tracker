export class CloudStorage {
    strategy;
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    async uploadFile(file, publicId) {
        return this.strategy.uploadFile(file, publicId);
    }
    async deleteFile(publicId) {
        return this.strategy.deleteFile(publicId);
    }
}
