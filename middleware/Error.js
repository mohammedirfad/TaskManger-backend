
import ErrorHandlers from '../utils/ErrorHandlers.js ';

export const ErrorHandle = (
    err,
    req,
    res,
    next
) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if(err.name = "CastError"){
        const message = 'Resource not found. Invalid:'+ err.path;
        err = new ErrorHandlers(message, 400);

    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue) } entered`;
        err = new ErrorHandlers(message, 400);
    }

    if(err.name === 'jsonWebTokenError'){
        const message = `JsonWebToken Is Invalid. Tru Again`;
        err = new ErrorHandlers(message, 400);
    }

    if(err.name ==="TokenExpiredError" ){
        const message = `JsonWeb Token Is Expired Tru Again`;
        err = new ErrorHandlers(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })


}