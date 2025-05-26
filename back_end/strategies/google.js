import { Strategy } from "passport-google-oauth20";
import prisma from "../config/prisma.js";
import "dotenv/config";

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const strategyImplementation = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const user = await prisma.user.upsert({
      update: {},
      where: {
        id: profile.id,
      },
      create: {
        email: profile.emails[0].value,
        id: profile.id,
        name: profile.displayName,
      },
    });

    done(null, user);
  } catch (error) {
    done(null, false, { message: "Error occurred, please try again!" });
  }
};

const googleStrategy = new Strategy(options, strategyImplementation);

export default googleStrategy