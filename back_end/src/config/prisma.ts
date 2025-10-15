import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const determineConfig = () => {
  let db_url;
  if (process.env.NODE_ENV === "dev") {
    db_url = process.env.DEV_DB_CONNECTION_URL;
  } else if (process.env.NODE_ENV === "test") {
    db_url = process.env.TEST_DB_CONNECTION_URL;
  } else {
    db_url = process.env.PROD_DB_CONNECTION_URL;
  }
  return db_url;
};

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: determineConfig(),
    },
  },
});

export default prisma;
