const CustomError = require('./../utils/customError')
const devError=(res,error)=>{
    res.status(error.statusCode).json({
        status:error.statusCode,
        mes:error.message,
        stackTrace:error.stack,
        error:error
    })

}
const prodError =(res,error)=>{
    if(error.isOperational){

        res.status(error.statusCode).json({
            status:error.statusCode,
            mes:error.message,
            
        })  
    }else{
        res.status(500).json({
            status:'error',
            mess:'something went wrong! please try again'
        })
    }
}
const castErrorHandler=(err)=>{
    const msg=`invalid vaue for ${err.path}:${err.value}`
       return new CustomError(msg,400)
}
const dupliacteKeyErrorHandler =(err)=>{
    const name = err.keyvalue.name
    const msg=`there is alreadt a movie with the name ${name}.please use another namde`
    return new CustomError(msg,404)
}
const handleExpresJwt= (err)=>{
    return new CustomError('jwt has expured',401)
}
const handleJwtError= (err)=>{
    return new CustomError(' invalid jwt please login again',401)
}
const ValidationErrorHandler =(err)=>{
    const errors =Object.values(err.errors).map(value=>value.message)
    const errorMessage=errors.join('. ')
    const msg=`invalid input data ${errorMessage}`
    return new CustomError(msg,400)
}
const errorHandler =(error,req,res,next)=>{
    error.statusCode=error.statusCode || 500;
    error.status=error.status || 'error';
    if(process.env.NODE_ENV === 'development'){
       devError(res,error)
    }else if(process.env.NODE_ENV === 'production'){
        if(error.name === 'CastError') error= castErrorHandler(error)
        if(error.code === 11000 ) error=dupliacteKeyErrorHandler(error)
         if(error.name === 'ValidationError') error = ValidationErrorHandler(error)
         if(error.name === 'TokenExpiredError') error = handleExpresJwt(error)
         if(error.name === 'JsonWebTokenError') error = handleJwtError(error)
        prodError(res,ererrorr)
    }
    
}

module.exports={errorHandler}