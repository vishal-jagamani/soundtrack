import { Spotify_Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET } from './spotifyService.js';

// Function to get new releases from spotify
export const getNewReleases = async (limit, offset) => {
    try {
        limit = limit ? parseInt(limit) : 10;
        offset = offset ? parseInt(offset) : 0;
        const url = `${Spotify_Config?.API_Base_URL}/browse/new-releases?limit=${limit}&offset=${offset}`;
        const response = await spotifyGET(url);
        const albums = response?.data?.albums?.items?.map((item) => {
            return Object.keys(item).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Search?.album?.[key]) {
                    newObj[Spotify_Response_Mapping?.Search?.album?.[key]] = item[key];
                }
                return newObj;
            }, {});
        });
        const data = { limit, offset, total: response?.data?.albums?.total, previous: response?.data?.albums?.previous, albums };
        return { statusCode: 200, data: { status: true, message: 'New releases', data } };
    } catch (err) {
        console.log('Error in albumService.getNewReleases service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

// Function to get several artists details by artist ids
export const getSeveralAlbums = async (albumsIds, market) => {
    try {
        if (!albumsIds) return { statusCode: 200, data: { status: false, message: 'Album ids not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/albums?ids=${albumsIds}${market ? `&market=${market}` : ``}`;
            const response = await spotifyGET(url);
            const data = response?.data?.albums?.map((item) => {
                return Object.keys(item).reduce((newObj, key) => {
                    if (Spotify_Response_Mapping?.Album?.[key]) {
                        newObj[Spotify_Response_Mapping?.Album?.[key]] = item[key];
                    }
                    return newObj;
                }, {});
            });
            return { statusCode: 200, data: { status: true, message: 'Artists data', data } };
        }
    } catch (err) {
        console.log('Error in albumService.getSeveralAlbums service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

// Function to get the album details by album id
export const getAlbum = async (id) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'Album id not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/albums/${id}`;
            const response = await spotifyGET(url);
            const data = Object.keys(response?.data).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Album?.[key]) {
                    newObj[Spotify_Response_Mapping?.Album?.[key]] = response?.data?.[key];
                }
                return newObj;
            }, {});
            return { statusCode: 200, data: { status: true, message: 'Album data', data } };
        }
    } catch (err) {
        console.log('Error in albumService.getAlbum service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

//* Function to get the album tracks
export const getAlbumTracks = async (id) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'Album id not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/albums/${id}/tracks`;
            const response = await spotifyGET(url);
            const tracks = response?.data?.items?.map((item) => {
                return Object.keys(item).reduce((newObj, key) => {
                    if (Spotify_Response_Mapping?.Track?.[key]) {
                        newObj[Spotify_Response_Mapping?.Track?.[key]] = item[key];
                    }
                    return newObj;
                }, {});
            });
            const data = {
                limit: response?.data?.limit,
                offset: response?.data?.offset,
                total: response?.data?.total,
                previous: response?.data?.previous,
                tracks,
            };
            return { statusCode: 200, data: { status: true, message: 'Album tracks data', data } };
        }
    } catch (err) {
        console.log('Error in albumService.getAlbum service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};
