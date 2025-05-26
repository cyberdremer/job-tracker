class ErrorWithStatusCode extends Error {
    constructor(message, status){
        super(message);
        this.status = status
    }
    
}


export default ErrorWithStatusCode