const asyncErrorHandler=(func)=>{
    return () =>{
        func(req,res,next).catch(err=>next(err))
    }
}

module.exports= asyncErrorHandler