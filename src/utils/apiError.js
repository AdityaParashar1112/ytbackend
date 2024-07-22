class apiError extends Error{
   
    constructor(statusCode,message="something went wrong",stackTrace,errro=[]){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.stackTrace = this.stackTrace;
        this.error = error
    }
}





export {apiError};