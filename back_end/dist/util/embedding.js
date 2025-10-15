import prisma from "../config/prisma.js";
const tableNames = new Set(["Resume", "JobEntry"]);
const insertEmbeddingHelper = async (tableName, embedding, recordId) => {
    try {
        if (!tableNames.has(tableName)) {
            throw new Error("Table given does not exist!");
        }
        const templateString = `UPDATE "${tableName}" SET embedding = $1 WHERE id = $2`;
        const result = await prisma.$executeRawUnsafe(templateString, embedding, recordId);
        return result;
    }
    catch (error) {
        throw error;
    }
};
const insertEmbeddingIntoTable = async (embedding, tableName, recordId) => {
    try {
        const insertResult = insertEmbeddingHelper(tableName, embedding, recordId);
        return insertResult;
    }
    catch (error) {
        throw error;
    }
};
export { insertEmbeddingIntoTable };
