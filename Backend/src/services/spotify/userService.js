import cryptojs from 'crypto-js';
import queryString from 'querystring';
import { Secrets, Spotify_Config, config } from '../../../config/config.js';
import { storeUserAccessTokenFromCode } from './spotifyService.js';
import { findOne } from '../mongodbService.js';
import axios from 'axios';

// Function to link the user's spotify account to app and get user's spotify functionality access
const linkSpotifyAccount = async (req, res) => {
    try {
        let { userId } = req?.query;
        if (userId) {
            userId = parseInt(userId);
            const state = cryptojs?.AES?.encrypt(JSON.stringify({ userId: parseInt(userId) }), Secrets?.CRYPTOJS_SECRET)?.toString();
            const queryParams = queryString?.stringify({
                response_type: 'code',
                client_id: Secrets?.SPOTIFY_CLIENT_ID,
                scope: Spotify_Config?.User_Scope,
                // redirect_uri: `${config?.Base_URL}${Spotify_Config?.OAuth_Redirect_URI}`,
                redirect_uri: `http://localhost:8020/spotify/oauthCallback`,
                state: encodeURIComponent(state),
            });
            const redirectURL = `${Spotify_Config?.OAuth_URL}?${queryParams}`;
            res?.set(req?.headers);
            return res?.status(200)?.send({ status: true, message: 'Redirect URL', redirectURL });
        } else {
            return res?.status(200)?.send({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.log('Error in userService.linkSpotifyAccount service', err);
        return res?.status(500)?.send({ status: false, message: 'Error in service' });
    }
};

// Function which will be oauth callback from spotify on user's access approved or denied
const oauthCallback = async (req, res) => {
    try {
        const { state, code, error } = req?.query;
        console.log('State', state);
        const decodedState = decodeURIComponent(state);
        const stateDetails = await verifyOAuthState(decodedState);
        if (stateDetails && stateDetails?.status) {
            if (code) {
                // User access approved
                // Store the user access and refresh token from code and store in db
                const storeUserAccessToken = await storeUserAccessTokenFromCode(stateDetails?.data, code);
                return res?.redirect(`${config?.UX_Base_URL}?spotifyAccess=true`);
            } else {
                // User access denied
                return res?.redirect(`${config?.UX_Base_URL}?spotifyAccess=false`);
            }
        } else {
            return res?.redirect(`${config?.UX_Base_URL}?spotifyAccess=false&state=false`);
        }
    } catch (err) {
        console.log('Error in userService.oauthCallback service', err);
        return res?.status(500)?.send({ status: false, message: 'Error in service' });
    }
};

const verifyOAuthState = async (state) => {
    try {
        const stateDetails = cryptojs?.AES?.decrypt(state, Secrets?.CRYPTOJS_SECRET)?.toString(cryptojs?.enc?.Utf8);
        return { status: true, data: JSON?.parse(stateDetails) };
    } catch (err) {
        console.log('OAuth state error');
        return { status: false, message: 'OAuth state error' };
    }
};

// Function to search items from spotify
export const spotifySearch = async (details) => {
    try {
        let { userId, searchText, searchItems, limit, offset } = details;
        const tokenDetails = await findOne('Spotify', { _id: 'Spotify_Access_Token' });
        if (tokenDetails) {
            searchItems = searchItems ? searchItems : Spotify_Config?.Search_Items_Type;
            limit = limit ? parseInt(limit) : 10;
            offset = offset ? parseInt(offset) : 0;
            const url = `${Spotify_Config?.API_Base_URL}/search?q=${searchText}&type=${searchItems}&limit=${limit}&offset=${offset}`;
            const options = { url, method: 'GET', headers: { Authorization: `Bearer ${tokenDetails?.Access_Token}` } };
            const response = await axios(options);
            return response?.data;
        } else {
            return { status: false, message: 'Spotify access token not found' };
        }
    } catch (err) {
        console.log('Error in userService.spotifySearch service', err);
        return { status: false, message: 'Error in service' };
    }
};

export { linkSpotifyAccount, oauthCallback, verifyOAuthState };
