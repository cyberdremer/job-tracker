import { DeserializedUser } from "./user.ts"
import { PaginationOptions, PaginationParams } from "./pagination.ts"
declare global {
    namespace Express {
        export interface Request{
            user: DeserializedUser
            pagination?: PaginationParams 
        }
    }
}
