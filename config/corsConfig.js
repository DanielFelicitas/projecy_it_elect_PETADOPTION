import cors from 'cors';

const configureCors = () => {
    return cors({ 
    // origin-- this just will tell that which origins can access api 
        origin : (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:3000',
                'http://localhost:5000',
                'https://petadoptionapi.vercel.app',
            ]
            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true)
            }else {
                callback(new Error('Not allowed'))
            }
        },
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : [
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders : ['X-Total-Count', 'Content-Range'],
        credentials : true, //enable support for cookiess
        preflightContinue : false,
        maxAge : 600, // cache pre fligth responses just to avoid sending options request mutilple times
        optionsSuccessStatus : 204,  
    })
}

export default configureCors;
