import express from 'express';
const router = express.Router();

// Services
import { getAlbum, getAlbumTracks, getNewReleases, getSeveralAlbums } from '../../services/spotify/albumService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

// Middleware to handle authentication
router.use(verifyAccessToken);

// Get several album details by album ids, maximum 20
router.get('/', async (req, res) => {
    try {
        const { albumsIds, market } = req.query;
        const response = await getSeveralAlbums(albumsIds, market);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get new releases from spotify
router.get('/newReleases', async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const response = await getNewReleases(limit, offset);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get album details by album id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getAlbum(id);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get album tracks by album id
router.get('/:id/tracks', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getAlbumTracks(id);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
