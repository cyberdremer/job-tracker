import { DeserializedUser } from "./user.ts"
declare global {
    namespace Express {
        export interface Request{
            user: DeserializedUser 
        }
    }
}
