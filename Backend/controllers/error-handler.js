const errorHandler= async(error,req,res,next)=>{
    error.statusCode= error.statusCode || 500;
    error.message = error.message || "error"
    res.status(error.statusCode).json({
        error: error.status,
        message : error.message,
        stackStrace : error.stack,
        error : error
    })
    next();
}

module.exports = errorHandler