import rateLimit from "express-rate-limit";


export const rateLimiter = (maxRequest, time) => {
    return rateLimit({
        max : maxRequest,
        windowMs : time,
        message : "too many request, please try again later",
        standardHeaders : true,
        legacyHeaders : false,
    })
    
}

export default rateLimiter;