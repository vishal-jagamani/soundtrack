import CryptoJS from 'crypto-js';
import queryString from 'querystring';
import { Secrets, Spotify_Config, Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET, storeUserAccessTokenFromCode } from './spotifyService.js';
import { forEachLimit } from 'async';

// Function to link the user's spotify account to app and get user's spotify functionality access
export const linkSpotifyAccount = async (req, res) => {
    try {
        let { userId } = req?.query;
        if (userId) {
            userId = parseInt(userId);
            const state = CryptoJS?.AES?.encrypt(JSON.stringify({ userId: parseInt(userId) }), Secrets?.CRYPTOJS_SECRET)?.toString();
            const queryParams = queryString?.stringify({
                response_type: 'code',
                client_id: Secrets?.SPOTIFY_CLIENT_ID,
                scope: Spotify_Config?.User_Scope,
                redirect_uri: `${Config?.Base_URL}${Spotify_Config?.OAuth_Redirect_URI}`,
                // redirect_uri: `http://localhost:8020/spotify/oauthCallback`,
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
export const oauthCallback = async (req, res) => {
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
                return res?.redirect(`${Config?.UX_Base_URL}?spotifyAccess=true`);
            } else {
                // User access denied
                return res?.redirect(`${Config?.UX_Base_URL}?spotifyAccess=false`);
            }
        } else {
            return res?.redirect(`${Config?.UX_Base_URL}?spotifyAccess=false&state=false`);
        }
    } catch (err) {
        console.log('Error in userService.oauthCallback service', err);
        return res?.status(500)?.send({ status: false, message: 'Error in service' });
    }
};

// Function to verify the oauth state details
const verifyOAuthState = async (state) => {
    try {
        const stateDetails = CryptoJS.AES.decrypt(state, Secrets?.CRYPTOJS_SECRET)?.toString(CryptoJS?.enc?.Utf8);
        return { status: true, data: JSON.parse(stateDetails) };
    } catch (err) {
        console.log('OAuth state error');
        return { status: false, message: 'OAuth state error' };
    }
};

// Function to search items from spotify
export const spotifySearch = async (details) => {
    try {
        let { userId, searchText, searchItems, limit, offset } = details;
        searchItems = searchItems ? searchItems : Spotify_Config?.Search_Items_Type;
        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;
        const url = `${Spotify_Config?.API_Base_URL}/search?q=${searchText}&type=${searchItems}&limit=${limit}&offset=${offset}`;
        const response = await spotifyGET(url);
        const formattedData = await formatSpotifySearchData(response?.data);
        return formattedData;
    } catch (err) {
        console.log('Error in userService.spotifySearch service', err);
        return { status: false, message: 'Error in service' };
    }
};

export const formatSpotifySearchData = async (rawData) => {
    try {
        if (rawData) {
            rawData = JSON.parse(JSON.stringify(rawData));
            const data = {};
            await forEachLimit(Object.values(rawData), 1, async (item) => {
                try {
                    if (item && item?.items && item?.items?.length && item?.items?.[0]?.type) {
                        const type = item?.items?.[0]?.type;
                        const result = {
                            href: item?.href,
                            totalCount: item?.total,
                            limit: item?.limit,
                            offset: item?.offset,
                            previous: item?.previous,
                        };
                        const items = item?.items?.map((val) => {
                            return Object.keys(val).reduce((newObj, key) => {
                                if (Spotify_Response_Mapping?.Search?.[type]?.[key]) {
                                    newObj[Spotify_Response_Mapping?.Search?.[type]?.[key]] = val[key];
                                }
                                return newObj;
                            }, {});
                        });
                        result.items = items;
                        data[`${type}s`] = result;
                    }
                } catch (err) {
                    console.log('Error in userService.formatSpotifySearchData async.forEachLimit service', err);
                }
            });
            return { status: true, message: 'Spotify search data', data };
        } else {
            return { status: true, message: 'Raw data not found' };
        }
    } catch (err) {
        console.log('Error in userService.formatSpotifySearchData service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function to get spotify user profile by user id
export const getUserProfile = async (id) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'User id not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/users/${id}`;
            const response = await spotifyGET(url);
            const data = Object.keys(response?.data).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.User?.[key]) {
                    newObj[Spotify_Response_Mapping?.User?.[key]] = response?.data?.[key];
                }
                return newObj;
            }, {});
            return { statusCode: 200, data: { status: true, message: 'User profile', data } };
        }
    } catch (err) {
        console.log('Error in userService.getUserProfile service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

// Function to check whether spotify user follows playlist or not by playlist and user id
export const checkUserFollowsPlaylist = async (id, playlistId) => {
    try {
        if (!(id && playlistId)) return { statusCode: 200, data: { status: false, message: 'User id not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/playlists/${playlistId}/followers/contains?ids=${id}`;
            const response = await spotifyGET(url);
            return {
                statusCode: 200,
                data: { status: true, message: 'User profile', data: response?.data && response?.data.length ? response?.data?.[0] : null },
            };
        }
    } catch (err) {
        console.log('Error in userService.getUserProfile service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};
