import { Strategy, } from "passport-local";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import "dotenv/config";
import ErrorWithStatusCode from "../errors/errorstatus.js";
const options = { usernameField: "email" };
const strategyImplementation = async (email, password, done) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        const passwordHashToMatch = user !== null && typeof user.passwordhash === "string"
            ? user.passwordhash
            : process.env.DEFAULT_PASSWORD_HASH ?? "";
        const match = await bcrypt.compare(password, passwordHashToMatch);
        if (!user) {
            return done(new ErrorWithStatusCode("Invalid Credentials", 400), false);
        }
        if (!match) {
            return done(new ErrorWithStatusCode("Invalid Credentials", 400), false);
        }
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
};
const localStrategy = new Strategy(options, strategyImplementation);
export default localStrategy;
