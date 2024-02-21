import axios from 'axios';
import queryString from 'querystring';
import { Secrets, Spotify_Config, config } from '../../../config/config.js';
import { findOneAndUpdate } from '../mongodbService.js';

// Get user access token from code after oauth access by user
const storeUserAccessTokenFromCode = async (stateDetails, code) => {
    try {
        if (code) {
            const { userId, name, email } = stateDetails;
            // const postData = new URLSearchParams();
            const postData = queryString?.stringify({
                grant_type: 'authorization_code',
                // redirect_uri: `${config?.Base_URL}${Spotify_Config?.OAuth_Redirect_URI}`,
                redirect_uri: `http://localhost:8020/spotify/oauthCallback`,
                code,
            });
            // postData?.append('redirect_uri', 'http://localhost:8020/user/spotifyOAuthCallback');
            // postData?.append('redirect_uri', 'http://localhost:8020/user/spotifyOAuthCallback');
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

export { storeUserAccessTokenFromCode };
