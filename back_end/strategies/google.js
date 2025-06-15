import { Strategy } from "passport-google-oauth20";
import prisma from "../config/prisma.js";
import "dotenv/config";

const callbackURL =
  process.env.NODE_ENV === "dev"
    ? process.env.GOOGLE_CALLBACK_DEV_URL
    : process.env.GOOGLE_CALLBACK_PROD_URL;

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: callbackURL,
};

const strategyImplementation = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        email: profile.emails[0].value,
      },
      update: {},
      create: {
        email: profile.emails[0].value,
        fullname: profile.displayName,
        passwordhash: null,
      },
    });

    done(null, user);
  } catch (error) {
    done(null, false, { message: error.message });
  }
};

const googleStrategy = new Strategy(options, strategyImplementation);

export default googleStrategy;
