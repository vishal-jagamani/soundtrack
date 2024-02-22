import axios from 'axios';
import queryString from 'querystring';
import { Secrets, Spotify_Config } from '../../../config/config.js';
import { findOne, findOneAndUpdate } from '../mongodbService.js';

// Get user access token from code after oauth access by user
const storeUserAccessTokenFromCode = async (stateDetails, code) => {
    try {
        if (code) {
            const { userId, name, email } = stateDetails;
            const postData = queryString?.stringify({
                grant_type: 'authorization_code',
                // redirect_uri: `${config?.Base_URL}${Spotify_Config?.OAuth_Redirect_URI}`,
                redirect_uri: `http://localhost:8020/spotify/oauthCallback`,
                code,
            });
            const options = {
                url: `${Spotify_Config?.API_TOKEN_URL}`,
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic ' + new Buffer.from(Secrets?.SPOTIFY_CLIENT_ID + ':' + Secrets?.SPOTIFY_CLIENT_SECRET)?.toString('base64'),
                },
                data: postData,
            };
            const data = await axios(options);
            if (data && data?.data?.access_token && data?.data?.refresh_token) {
                const { access_token, token_type, scope, expires_in, refresh_token } = data?.data;
                const updateQuery = {
                    $set: {
                        spotifyData: {
                            accessToken: access_token,
                            tokenType: token_type,
                            accessTokenExpiresIn: expires_in,
                            scope,
                            refreshToken: refresh_token,
                            spotifyAccountAccess: true,
                            createdAt: Math.floor(Date.now() / 1000),
                            modifiedAt: Math.floor(Date.now() / 1000),
                        },
                    },
                };
                const updateUserDetails = await findOneAndUpdate('User', { userId }, updateQuery);
                if (updateUserDetails) {
                    return { status: true, message: 'User access token stored' };
                } else {
                    return { status: false, message: 'User access token not stored' };
                }
            } else {
                return { status: false, message: 'User access token not stored' };
            }
        } else {
            return { status: false, message: 'Code not found' };
        }
    } catch (err) {
        console.log('Error in spotifyService.storeUserAccessTokenFromCode service', err);
        throw err;
    }
};

// Function to refresh the spotify access token from client credentials
const getSpotifyAccessToken = async () => {
    try {
        const tokenDetails = await findOne('Spotify', { _id: 'Spotify_Access_Token' });
        if (tokenDetails) {
        } else {
            // No token, create and add new one
        }
    } catch (err) {
        console.log('Error in spotifyService.refreshSpotifyAccessToken service', err);
        throw err;
    }
};

// Function to refresh the access token from refresh token
const refreshSpotifyUserAccessToken = async (refreshToken) => {
    try {
        if (refreshToken) {
        } else {
            return { status: false, message: 'Refresh token not found' };
        }
    } catch (err) {
        console.log('Error in spotifyService.refreshSpotifyAccessToken service', err);
        throw err;
    }
};

export { getSpotifyAccessToken, refreshSpotifyUserAccessToken, storeUserAccessTokenFromCode };
