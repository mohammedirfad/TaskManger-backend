class ErrorHandlers extends Error{
    
    constructor(message,statusCode){
        super(message);
        console.log(this.message,"mm");

        console.log(message,"kkkkkkkkkkkkkkkkkk");

        this.statusCode = statusCode;
        console.log(statusCode,"ss");
        
        Error.captureStackTrace(this,this.constructor);

    }

}

export default ErrorHandlers;