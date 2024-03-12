import queryString from 'querystring';
import { Spotify_Config, Spotify_Response_Mapping } from '../../../config/config.js';
import { spotifyGET } from './spotifyService.js';

//* Function to get track details from spotify by track id
export const getTrack = async (id) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'Track id not found' } };
        else {
            const url = `${Spotify_Config?.API_Base_URL}/tracks/${id}`;
            const response = await spotifyGET(url);
            const data = Object.keys(response?.data).reduce((newObj, key) => {
                if (Spotify_Response_Mapping?.Track?.[key]) {
                    newObj[Spotify_Response_Mapping?.Track?.[key]] = response?.data?.[key];
                }
                return newObj;
            }, {});
            return { statusCode: 200, data: { status: true, message: 'Track data', data } };
        }
    } catch (err) {
        console.log('Error in trackService.getTrack service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};

export const getTrackRecommendations = async (id, limit, offset) => {
    try {
        if (!id) return { statusCode: 200, data: { status: false, message: 'Track id not found' } };
        else {
            limit = limit ? parseInt(limit) : 10;
            offset = offset ? parseInt(offset) : 0;
            const trackURL = `${Spotify_Config?.API_Base_URL}/tracks/${id}`;
            const trackData = await spotifyGET(trackURL);
            const artistURL = `${Spotify_Config?.API_Base_URL}/artists/${trackData?.data?.artists?.[0]?.id}`;
            const artistData = await spotifyGET(artistURL);
            const seeds = {
                seed_tracks: id,
                ...(trackData?.data?.artists && trackData?.data?.artists?.length
                    ? {
                          seed_artists: trackData?.data?.artists
                              ?.slice(0, 5)
                              ?.map((item) => item?.id)
                              ?.join(','),
                      }
                    : {}),
                ...(artistData?.data?.genres && artistData?.data?.genres?.length
                    ? { seed_genres: artistData?.data?.genres?.slice(0, 5)?.join(',') }
                    : {}),
            };
            const url = `${Spotify_Config?.API_Base_URL}/recommendations?limit=${limit}&offset=${offset}&${queryString?.stringify(seeds)}`;
            const response = await spotifyGET(url);
            return { statusCode: 200, data: { status: true, message: 'Recommended tracks', data: response?.data } };
        }
    } catch (err) {
        console.log('Error in trackService.getTrack service', err);
        return { statusCode: 500, data: { status: false, message: 'Error in service' } };
    }
};
