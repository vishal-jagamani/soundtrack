import { Spotify_Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET } from './spotifyService.js';

// Function to get several artists details by artist ids
export const getSeveralAlbums = async (albumsIds, market) => {
    try {
        if (!albumsIds) return { statusCode: 200, data: { status: false, message: 'Album ids not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/albums?ids=${albumsIds}${market ? `&market=${market}` : ``}`;
            const response = await spotifyGET(url);
            const data = response?.albums?.map((item) => {
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
