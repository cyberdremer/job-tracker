import { AiProvider } from "../classes/aiapi.js";
import { OpenAIStrategy } from "./openai.js";
let aiProviderStrategy;
aiProviderStrategy = new OpenAIStrategy();
const aiServicesProvider = new AiProvider(aiProviderStrategy);
export default aiServicesProvider;
