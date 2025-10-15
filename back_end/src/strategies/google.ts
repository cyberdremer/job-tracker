import {
  Profile,
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth20";
import prisma from "../config/prisma";
import "dotenv/config";

const callbackURL =
  process.env.NODE_ENV === "dev"
    ? process.env.GOOGLE_CALLBACK_DEV_URL
    : process.env.GOOGLE_CALLBACK_PROD_URL;

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: callbackURL,
};

const strategyImplementation = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  try {
    const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
    if(!email){
      throw new Error("No email found in Google profile");
    }
    const user = await prisma.user.upsert({
      where: {
        email: email,
      },
      update: {},
      create: {
        email: email,
        fullname: profile.displayName,
        passwordhash: null,
      },
    });

    done(null, user);
  } catch (err) {
    done(null, false, {message: err instanceof Error ? err.message : "An error occurred during Google authentication"});
  }
};

const googleStrategy = new Strategy(options, strategyImplementation);

export default googleStrategy;
