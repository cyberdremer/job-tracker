import passport from "passport";
import prisma from "./prisma.js";
import localStrategy from "../strategies/local.js";
import googleStrategy from "../strategies/google.js";
import { DeserializedUser } from "../interfaces/user.js";
passport.use(localStrategy);
passport.use(googleStrategy);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user: DeserializedUser  = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        fullname: true,
        id: true,
        email: true,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
