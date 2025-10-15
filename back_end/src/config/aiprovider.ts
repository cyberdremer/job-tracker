import { AiProvider } from "../classes/aiapi";
import { AiApiStrategy } from "../interfaces/aiapi";
import { OpenAIStrategy } from "./openai";

let aiProviderStrategy: AiApiStrategy;
aiProviderStrategy = new OpenAIStrategy();

const aiServicesProvider = new AiProvider(aiProviderStrategy);

export default aiServicesProvider;
