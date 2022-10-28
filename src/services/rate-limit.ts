
import { rateLimit } from 'express-rate-limit';

const env = process.env.NODE_ENV || 'dev';
const rateLimitRequest = Number(process.env.RATE_LIMIT_TIME) || 60;
const rateLimitTime = Number(process.env.RATE_LIMIT_REQUEST) || 100;

export const getApiLimiter = () => {
    if (env === 'production') { 
        return rateLimit({ 
            windowMs: rateLimitTime * 60 * 1000, // 15 minutes
            max: rateLimitRequest, // limit each IP to 30 requests per windowMs
            message: 'Too many accounts created from this IP, please try again after an hour',
            standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        });
    };
    
    return rateLimit({
        windowMs: rateLimitTime * 60 * 1000, // 15 minutes
        max: rateLimitRequest, // limit each IP to 30 requests per windowMs
        message: 'Too many accounts created from this IP, please try again after an hour',
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });
};
