import prisma from "./prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import "dotenv/config";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "dev" ? false : true,
    sameSite: process.env.NODE_ENV === "dev" ? "lax" : "none",
    httpOnly: process.env.NODE_ENV === "dev" ? false : true,
  },

  resave: true,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdFunction: undefined,
    dbRecordIdIsSessionId: true,
    logger: console,
    enableConcurrentSetInvocationsForSameSessionID: true,
    enableConcurrentTouchInvocationsForSameSessionID: true,
  }),
});

export default sessionConfig;
