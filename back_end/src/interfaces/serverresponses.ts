export interface SuccessfullServerResponse<T = undefined> {
    data: {
        message: string;
        status: number;
        object?: T
    }
}