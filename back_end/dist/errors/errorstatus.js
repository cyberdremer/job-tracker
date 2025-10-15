class ErrorWithStatusCode extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export default ErrorWithStatusCode;
