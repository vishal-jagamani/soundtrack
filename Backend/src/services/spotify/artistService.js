import { Spotify_Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET } from './spotifyService.js';

// Function to get several artists details by artist ids
const getSeveralArtists = async (artistIds) => {
    try {
        const url = `${Spotify_Config?.API_Base_URL}/artists?ids=${artistIds}`;
        const response = await spotifyGET(url);
        const data = response?.artists?.map((item) => {
            return Object.keys(item).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Artist?.[key]) {
                    newObj[Spotify_Response_Mapping?.Artist?.[key]] = item[key];
                }
                return newObj;
            }, {});
        });
        return { status: true, message: 'Artists data', data };
    } catch (err) {
        console.log('Error in artistService.getSeveralArtists service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Function to get the artist details by artist id
const getArtist = async (id) => {
    try {
        const url = `${Spotify_Config?.API_Base_URL}/artists/${id}`;
        const response = await spotifyGET(url);
        const data = Object.keys(response?.data).reduce((newObj, key) => {
            if (Spotify_Response_Mapping?.Artist?.[key]) {
                newObj[Spotify_Response_Mapping?.Artist?.[key]] = response?.data?.[key];
            }
            return newObj;
        }, {});
        return { status: true, message: 'Artist data', data };
    } catch (err) {
        console.log('Error in artistService.getArtist service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Get artist albums by artist id
const getArtistAlbums = async (id, market, limit, offset) => {
    try {
        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;
        const url = `${Spotify_Config?.API_Base_URL}/artists/${id}/albums?limit=${limit}&offset=${offset}${market ? `&market=${market}` : ``}`;
        const response = await spotifyGET(url);
        return { status: true, message: 'Artist albums', data: response?.data };
    } catch (err) {
        console.log('Error in artistService.getArtistAlbums service', err);
        return { status: false, message: 'Error in service' };
    }
};

// Get artist top tracks by artist id
const getArtistTopTracks = async (id, market) => {
    try {
        market = market ? market : 'IN';
        const url = `${Spotify_Config?.API_Base_URL}/artists/${id}/top-tracks?market=${market}`;
        const response = await spotifyGET(url);
        const data = response?.data?.tracks?.map((item) => {
            return Object.keys(item).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Track?.[key]) {
                    newObj[Spotify_Response_Mapping?.Track?.[key]] = item[key];
                }
                return newObj;
            }, {});
        });
        return { status: true, message: 'Artist top tracks', data };
    } catch (err) {
        console.log('Error in artistService.getArtistTopTracks service', err);
        return { status: false, message: 'Error in service' };
    }
};

const getArtistSimilarArtists = async (id) => {
    try {
        const url = `${Spotify_Config?.API_Base_URL}/artists/${id}/related-artists`;
        const response = await spotifyGET(url);
        return { status: true, message: `Artist's similar artists`, data: response?.data?.artists };
    } catch (err) {
        console.log('Error in artistService.getArtistSimilarArtists service', err);
        return { status: false, message: 'Error in service' };
    }
};

export { getArtist, getArtistAlbums, getArtistSimilarArtists, getArtistTopTracks, getSeveralArtists };
