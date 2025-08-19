import { Strategy, } from "passport-google-oauth20";
import prisma from "../config/prisma.js";
import "dotenv/config";
const callbackURL = process.env.NODE_ENV === "dev"
    ? process.env.GOOGLE_CALLBACK_DEV_URL
    : process.env.GOOGLE_CALLBACK_PROD_URL;
const options = {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: callbackURL,
};
const strategyImplementation = async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        if (!email) {
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
    }
    catch (err) {
        done(null, false, { message: err instanceof Error ? err.message : "An error occurred during Google authentication" });
    }
};
const googleStrategy = new Strategy(options, strategyImplementation);
export default googleStrategy;
