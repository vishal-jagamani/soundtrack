import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv?.config();

export const config = {
    config: 'config',
    demoAPIURL: 'https://catfact.ninja',
    Base_URL: process?.env?.SOUNDTRACK_BASE_URL,
    UX_Base_URL: process?.env?.SOUNDTRACK_UX_BASE_URL,
    Email_Config: {
        OTP_Verification_Email_Body: `<p>Hello,</p>
        <p>Thank you for choosing Soundtrack! To complete your registration, use the following OTP:</p>
        
        <h2>[otp]</h2>
        
        <p>This OTP is valid for 3 minutes. If you did not request this, please ignore this email.</p>
        
        <p>Best regards,<br/>Soundtrack</p>`,
        Support_Email_Address: process?.env?.SUPPORT_EMAIL,
        Support_Email_Address_Password: process?.env?.SUPPORT_EMAIL_PASSWORD,
    },
};

export const Secrets = {
    CRYPTOJS_SECRET: process?.env?.CRYPTOJS_SECRET,
    JWT_ACCESS_TOKEN: process?.env?.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process?.env?.JWT_REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID: process?.env?.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process?.env?.SPOTIFY_CLIENT_SECRET,
};

export const MonogoDB_Config = {
    MONGODB_DATABASE: process?.env?.MONGODB_DATABASE,
    MONGODB_CONNECTION_STRING: process?.env?.MONGODB_CONNECTION_STRING,
};

export const Spotify_Config = {
    OAuth_URL: 'https://accounts.spotify.com/authorize',
    User_Scope: 'user-read-private user-read-email',
    API_TOKEN_URL: 'https://accounts.spotify.com/api/token',
};

export const Error_Responses = {
    Missing_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Missing authentication token',
                resolution: 'Please include a valid authentication token in the request headers to access the requested resource.',
            },
        },
    },
    Invalid_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Invalid authentication token',
                resolution: 'Please ensure the provided authentication token is valid and try again. If the issue persists, obtain a new token.',
            },
        },
    },
    Expired_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Expired authentication token',
                resolution:
                    'The authentication token has expired. Please obtain a new token and use it in the request headers to access the requested resource.',
            },
        },
    },
};