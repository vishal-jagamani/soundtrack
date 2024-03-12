import { Spotify_Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET } from './spotifyService.js';

// Get featured playlist from spotify
export const getFeaturedPlaylists = async (locale, limit, offset) => {
    try {
        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;
        const url = `${Spotify_Config?.API_Base_URL}/browse/featured-playlists?limit=${limit}&offset=${offset}${locale ? `&locale=${locale}` : ``}`;
        const response = await spotifyGET(url);
        const playlists = response?.data?.playlists?.items?.map((item) => {
            return Object.keys(item).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Playlist?.[key]) {
                    newObj[Spotify_Response_Mapping?.Playlist?.[key]] = item[key];
                }
                return newObj;
            }, {});
        });
        const data = { limit, offset, total: response?.data?.playlists?.total, previous: response?.data?.playlists?.previous, playlists };
        return { statusCode: 200, data: { status: true, message: 'Featured playlists', data } };
    } catch (err) {
        console.log('Error in playlistService.getFeaturedPlaylists service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

// Get playlist details from spotify by playlist id
export const getPlaylist = async (id, market, fields, additionalTypes) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'Playlist id not found' } };
        else {
            let url = `${Spotify_Config?.API_Base_URL}/playlists/${id}${market ? `?market=${market}` : ``}`;
            fields ? (url += `&fields=${fields}`) : null;
            additionalTypes ? (url += `&additional_types=${additionalTypes}`) : null;
            const response = await spotifyGET(url);
            const data = Object.keys(response?.data).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Playlist?.[key]) {
                    newObj[Spotify_Response_Mapping?.Playlist?.[key]] = response?.data?.[key];
                }
                return newObj;
            }, {});
            return { statusCode: 200, data: { status: true, message: 'Album data', data } };
        }
    } catch (err) {
        console.log('Error in playlistService.getPlaylist service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};
