import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import "dotenv/config";

const options = { usernameField: "email" };

const strategyImplementation = async (email, password, done) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        email: email,
      },
    });
    const passwordHashToMatch = !user
      ? process.env.DEFAULT_PASSWORD_HASH
      : user.passwordhash;
    const match = await bcrypt.compare(password, passwordHashToMatch);
    if (!user) {
      return done(null, false, { message: "Invalid Credentials" });
    }
    if (!match) {
      return done(null, false, { message: "Invalid Credentials" });
    }

    return done(null, user);
  } catch (error) {
    done(error);
  }
};


const localStrategy = new Strategy(options, strategyImplementation);

export default localStrategy;
