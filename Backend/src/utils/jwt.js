import jwt from 'jsonwebtoken';
import { Error_Responses, Secrets, Config } from '../../config/config.js';

const generateNewAccessToken = async (data) => {
    try {
        const accessToken = jwt.sign(data, Secrets?.JWT_ACCESS_TOKEN, { expiresIn: Config?.JWT_Access_Token_Expiry_Time });
        return { status: true, accessToken, expiresIn: '1m' };
    } catch (err) {
        console.log('Error in authenticationService.generateNewAccessToken service', err);
        throw err;
    }
};

const generateNewRefreshToken = async (data) => {
    try {
        const refreshToken = jwt.sign(data, Secrets?.JWT_REFRESH_TOKEN, { expiresIn: Config?.JWT_Refresh_Token_Expiry_Time });
        return { status: true, refreshToken, expiresIn: '7d' };
    } catch (err) {
        console.log('Error in authenticationService.generateNewRefreshToken service', err);
        throw err;
    }
};

const validateAccessToken = async (accessToken) => {
    try {
        const validateResult = jwt.verify(accessToken, Secrets?.JWT_ACCESS_TOKEN);
        return { status: true, validateResult };
    } catch (err) {
        if (err && err?.name && err?.name === 'TokenExpiredError') {
            return { status: false, error: 'Expired' };
        } else if (err && err?.name && err?.name === 'JsonWebTokenError') {
            return { status: false, error: 'Invalid' };
        } else {
            console.log('Error in authenticationService.validateAccessToken service', err);
            return { status: false, error: 'Invalid' };
        }
    }
};

const verifyAccessToken = async (req, res, next) => {
    try {
        const accessToken = req?.headers?.authorization?.split?.(' ')?.[1];
        if (accessToken) {
            const validateResult = await validateAccessToken(accessToken);
            if (validateResult && validateResult?.status) {
                // Token is valid, continue to the next middleware
                next();
            } else {
                if (validateResult?.error == 'Expired') {
                    // Token has expired, attempt to refresh
                    const refreshedToken = await generateNewAccessToken(accessToken);
                    // Set X-Token-Refreshed header in the response
                    res.setHeader('X-Token-Refreshed', true);
                    req.headers.authorization = `Bearer ${refreshedToken?.accessToken}`;
                    next();
                } else {
                    // Invalid token for reasons other than expiration
                    res.status(401).send(Error_Responses?.Invalid_Token);
                }
            }
        } else {
            // Token is missing
            res.status(401).send(Error_Responses?.Missing_Token);
        }
    } catch (err) {
        console.log('Error in authenticationService.verifyAccessToken service', err);
        throw err;
    }
};

export { generateNewAccessToken, generateNewRefreshToken, validateAccessToken, verifyAccessToken };
