import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv?.config();

export const Config = {
    config: 'config',
    demoAPIURL: 'https://catfact.ninja',
    Base_URL: process?.env?.SOUNDTRACK_BASE_URL,
    UX_Base_URL: process?.env?.SOUNDTRACK_UX_BASE_URL,
    Email_Config: {
        OTP_Verification_Email_Body: `<p>Hello,</p>
        <p>Thank you for choosing Soundtrack! To complete your registration, use the following OTP:</p>
        
        <h2>[otp]</h2>
        
        <p>This OTP is valid for 3 minutes. If you did not request this, please ignore this email.</p>
        
        <p>Best regards,<br/>Soundtrack</p>`,
        Support_Email_Address: process?.env?.SUPPORT_EMAIL,
        Support_Email_Address_Password: process?.env?.SUPPORT_EMAIL_PASSWORD,
    },
    Access_Token_Expiry_Time: 3600,
    Refresh_Token_Expiry_Time: 604800,
    JWT_Access_Token_Expiry_Time: '15m',
    JWT_Refresh_Token_Expiry_Time: '7d',
};

export const Secrets = {
    CRYPTOJS_SECRET: process?.env?.CRYPTOJS_SECRET,
    JWT_ACCESS_TOKEN: process?.env?.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process?.env?.JWT_REFRESH_TOKEN,
    SPOTIFY_CLIENT_ID: process?.env?.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process?.env?.SPOTIFY_CLIENT_SECRET,
};

export const MonogoDB_Config = {
    MONGODB_DATABASE: process?.env?.MONGODB_DATABASE,
    MONGODB_CONNECTION_STRING: process?.env?.MONGODB_CONNECTION_STRING,
};

export const Spotify_Config = {
    OAuth_URL: 'https://accounts.spotify.com/authorize',
    OAuth_Redirect_URI: process?.env?.SPOTIFY_OAUTH_REDIRECT_URI,
    User_Scope: 'user-read-private user-read-email',
    API_TOKEN_URL: 'https://accounts.spotify.com/api/token',
    API_Base_URL: 'https://api.spotify.com/v1',
    Search_Items_Type: 'artist,track,playlist,album',
    // Search_Items_Type: 'artist,track,playlist,album,show,episode,audiobook',
};

export const Spotify_Response_Mapping = {
    Artist: {
        id: 'id',
        uri: 'uri',
        name: 'name',
        type: 'type',
        popularity: 'popularity',
        followers: 'followers',
        href: 'href',
        external_urls: 'externalURLs',
        images: 'images',
        genres: 'genres',
    },
    Album: {
        id: 'id',
        uri: 'uri',
        name: 'name',
        type: 'type',
        album_type: 'albumType',
        popularity: 'popularity',
        label: 'label',
        release_date: 'releaseDate',
        release_date_precision: 'releaseDatePrecision',
        total_tracks: 'totalTracks',
        href: 'href',
        genres: 'genres',
        images: 'images',
        artists: 'artists',
        available_markets: 'availableMarkets',
        copyrights: 'copyrights',
        external_ids: 'externalIds',
        external_urls: 'externalURLs',
        tracks: 'tracks',
    },
    Track: {
        id: 'id',
        uri: 'uri',
        name: 'name',
        type: 'type',
        popularity: 'popularity',
        disc_number: 'discNumber',
        track_number: 'trackNumber',
        duration_ms: 'durationMs',
        preview_url: 'previewURL',
        href: 'href',
        external_urls: 'externalURLs',
        images: 'images',
        artists: 'artists',
        album: 'album',
    },
    Playlist: {
        id: 'id',
        uri: 'uri',
        name: 'name',
        type: 'type',
        description: 'description',
        owner: 'owner',
        primary_color: 'primaryColor',
        public: 'public',
        collaborative: 'collaborative',
        snapshot_id: 'snapshotId',
        external_urls: 'externalURLs',
        images: 'images',
        tracks: 'tracks',
    },
    User: {
        id: 'id',
        uri: 'uri',
        display_name: 'name',
        type: 'type',
        href: 'href',
        followers: 'followers',
        external_urls: 'externalURLs',
        images: 'images',
    },
    Search: {
        album: {
            id: 'id',
            uri: 'uri',
            name: 'name',
            type: 'type',
            total_tracks: 'totalTracks',
            release_date: 'releaseDate',
            href: 'href',
            external_urls: 'externalURLs',
            images: 'images',
        },
        artist: {
            id: 'id',
            uri: 'uri',
            name: 'name',
            type: 'type',
            popularity: 'popularity',
            followers: 'followers',
            href: 'href',
            external_urls: 'externalURLs',
            images: 'images',
        },
        track: {
            id: 'id',
            uri: 'uri',
            name: 'name',
            type: 'type',
            popularity: 'popularity',
            disc_number: 'discNumber',
            track_number: 'trackNumber',
            duration_ms: 'durationMs',
            preview_url: 'previewURL',
            href: 'href',
            external_urls: 'externalURLs',
            images: 'images',
        },
        playlist: {
            id: 'id',
            uri: 'uri',
            name: 'name',
            type: 'type',
            description: 'description',
            tracks: 'tracks',
            collaborative: 'collaborative',
            primary_color: 'primaryColor',
            snapshot_id: 'snapshotId',
            href: 'href',
            external_urls: 'externalURLs',
            owner: 'owner',
            images: 'images',
        },
    },
};

export const Error_Responses = {
    Missing_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Missing authentication token',
                resolution: 'Please include a valid authentication token in the request headers to access the requested resource.',
            },
        },
    },
    Refresh_Token_Expired: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Refresh token expired',
                resolution: 'Please request a new access token using valid credentials to access the requested resource.',
            },
        },
    },
    Invalid_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Invalid authentication token',
                resolution: 'Please ensure the provided authentication token is valid and try again. If the issue persists, obtain a new token.',
            },
        },
    },
    Expired_Token: {
        error: {
            code: 401,
            message: 'Unauthorized',
            details: {
                reason: 'Expired authentication token',
                resolution:
                    'The authentication token has expired. Please obtain a new token and use it in the request headers to access the requested resource.',
            },
        },
    },
};
