import OpenAI from "openai";
import "dotenv/config";
const AiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});



export default AiClient
