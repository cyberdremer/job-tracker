import { AiProvider } from "../classes/aiapi.js";
import { AiApiStrategy } from "../interfaces/aiapi.js";
import { OpenAIStrategy } from "./openai.js";

let aiProviderStrategy: AiApiStrategy;
aiProviderStrategy = new OpenAIStrategy();

const aiServicesProvider = new AiProvider(aiProviderStrategy);

export default aiServicesProvider;
