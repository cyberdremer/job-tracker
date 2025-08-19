import passport from "passport";
import prisma from "./prisma.js";
import localStrategy from "../strategies/local.js";
import googleStrategy from "../strategies/google.js";
passport.use(localStrategy);
passport.use(googleStrategy);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
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
    }
    catch (err) {
        done(err);
    }
});
export default passport;
