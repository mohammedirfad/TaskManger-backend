

const asyncError = (theFunc) => (req,res,next)  =>{
    console.log("async ");

    Promise.resolve(theFunc(req,res,next)).catch(next)
}

export default asyncError;  