import "dotenv/config";
const frontendUrl = process.env.NODE_ENV === "dev"
    ? process.env.LOCAL_FRONTEND_URL
    : `${process.env.PRODUCTION_FRONTEND_URL +
        ":" +
        process.env.PRODUCTION_FRONTEND_PORT}`;
export default frontendUrl;
