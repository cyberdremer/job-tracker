interface SuccessfullServerResponse<T = undefined> {
  message: string;
  status: number;
  object?: T;
}

interface ServerErrorResponse {
  message: string;
  status: number;
}

export interface ServerResponse<T = undefined> {
  data?: SuccessfullServerResponse<T>;
  error?: ServerErrorResponse;
}
