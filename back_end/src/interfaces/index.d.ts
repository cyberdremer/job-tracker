import { DeserializedUser } from "./user"
declare global {
    namespace Express {
        export interface Request{
            user: DeserializedUser 
        }
    }
}
