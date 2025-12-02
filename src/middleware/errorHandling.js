

export class APIError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.name = 'APIError' //set the type to API ERRROR
    }
}

export const asyncHandler = (fn) => (req, res, next) =>{
    Promise.resolve(fn(req,res,next)).catch(next)
}

export const globalErrorHandler = (err, req, res, next) => {
    console.error(err.stack)//log the errorr stackk
    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            status : 'Error',
            message : err.message
        })
    }else{
        return res.status(500).json({
            status : 'error',
            message : 'An unexpected error'
        })
    }

}
export default {globalErrorHandler, asyncHandler};