import prisma from "../config/prisma";
import pgvector from "pgvector";

const tableNames = new Set(["Resume", "JobEntry"]);

const insertEmbeddingHelper = async (
  tableName: string,
  embedding: number[],
  recordId: number
): Promise<number> => {
  if (!tableNames.has(tableName)) {
    throw new Error("Table given does not exist!");
  }

  return await prisma.$executeRawUnsafe(
  `UPDATE "${tableName}" SET embedding = '[${embedding}]'::vector WHERE id = ${recordId}`
);
};

const insertEmbeddingIntoTable = async (
  embedding: number[],
  tableName: string,
  recordId: number
) => {
  try {
    const insertResult = insertEmbeddingHelper(tableName, embedding, recordId);
    return insertResult;
  } catch (error) {
    throw error;
  }
};

export { insertEmbeddingIntoTable };
