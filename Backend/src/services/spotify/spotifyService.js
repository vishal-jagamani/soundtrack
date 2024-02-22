import axios from 'axios';
import queryString from 'querystring';
import { Secrets, Spotify_Config } from '../../../config/config.js';
import { findOne, findOneAndUpdate, updateOne } from '../mongodbService.js';

// Get user access token from code after oauth access by user
const storeUserAccessTokenFromCode = async (stateDetails, code) => {
    try {
        if (code) {
            const { userId, name, email } = stateDetails;
            const postData = queryString?.stringify({
                grant_type: 'authorization_code',
                redirect_uri: `${Config?.Base_URL}${Spotify_Config?.OAuth_Redirect_URI}`,
                // redirect_uri: `http://localhost:8020/spotify/oauthCallback`,
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

// Function to get the spotify access token from db
const getSpotifyAccessToken = async () => {
    try {
        const tokenDetails = await findOne('Spotify', { _id: 'Spotify_Access_Token' });
        if (tokenDetails) {
            return tokenDetails?.expiryTime > Math.floor(Date.now() / 1000)
                ? { status: true, message: 'Access token found', accessToken: tokenDetails?.accessToken }
                : await refreshSpotifyAccessToken();
        } else {
            // No token, create and add new one
            const data = await refreshSpotifyAccessToken();
            return data;
        }
    } catch (err) {
        console.log('Error in spotifyService.refreshSpotifyAccessToken service', err);
        throw err;
    }
};

// Function the refresh the spotify access token from client credentials
const refreshSpotifyAccessToken = async () => {
    try {
        const options = {
            url: Spotify_Config?.API_TOKEN_URL,
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${new Buffer.from(Secrets?.SPOTIFY_CLIENT_ID + ':' + Secrets?.SPOTIFY_CLIENT_SECRET).toString('base64')}`,
            },
            data: {
                grant_type: 'client_credentials',
            },
            json: true,
        };
        const response = await axios(options);
        const updateQuery = {
            $set: {
                _id: 'Spotify_Access_Token',
                accessToken: response?.data?.access_token,
                expiryTime: Math.floor(Date.now() / 1000) + response?.data?.expires_in,
            },
        };
        await updateOne('Spotify', updateQuery, { _id: 'Spotify_Access_Token' }, { upsert: true });
        return { status: true, message: 'Spotify access token refreshed', accessToken: response?.data?.access_token };
    } catch (err) {
        console.log('Error in spotifyService.refreshSpotifyAccessToken service', err);
        throw err;
    }
};

// Function to make the spotify get call
const spotifyGET = async (url) => {
    try {
        const tokenDetails = await getSpotifyAccessToken();
        if (tokenDetails && tokenDetails?.status) {
            const options = {
                url,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenDetails?.accessToken}`,
                },
            };
            const response = await axios(options);
            return { status: true, data: response?.data };
        } else {
            return { status: true, message: 'Spotify access token not found' };
        }
    } catch (err) {
        console.log('Error in spotifyService.spotifyGET service', err);
        throw err;
    }
};

// Function to make the spotify post call
const spotifyPOST = async (url, body) => {
    try {
        const tokenDetails = await getSpotifyAccessToken();
        if (tokenDetails && tokenDetails?.status) {
            const options = {
                url,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenDetails?.accessToken}`,
                },
                data: body,
            };
            const response = await axios(options);
            return { status: true, data: response?.data };
        } else {
            return { status: true, message: 'Spotify access token not found' };
        }
    } catch (err) {
        console.log('Error in spotifyService.spotifyPOST service', err);
        throw err;
    }
};

export { getSpotifyAccessToken, refreshSpotifyAccessToken, spotifyGET, spotifyPOST, storeUserAccessTokenFromCode };
