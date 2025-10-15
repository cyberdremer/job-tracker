import express from "express";
import cors from "cors";
import topLevelRouter from "./routes/toplevel.js";
import errorMiddleware from "./middleware/error.js";
import sessionConfig from "./config/session.js";
import passport from "./config/passport.js";
import "dotenv/config";
const corsConfig = cors({
    credentials: true,
    origin: process.env.NODE_ENV === "dev"
        ? "http://localhost:5173"
        : process.env.ORIGIN_URL,
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
});
const app = express();
if (process.env.NODE_ENV === "prod") {
    app.set("trust proxy", 1);
}
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());
app.use(topLevelRouter);
app.use(errorMiddleware);
app.listen(process.env.NODE_ENV === "dev" ? process.env.DEV_PORT : process.env.PORT, () => {
    console.log(`Listening on port ${process.env.NODE_ENV === "dev" ? process.env.DEV_PORT : process.env.PORT}`);
});
