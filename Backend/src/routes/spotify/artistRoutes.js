import express from 'express';
const router = express.Router();

// Services
import { getArtist, getArtistAlbums, getArtistSimilarArtists, getArtistTopTracks, getSeveralArtists } from '../../services/spotify/artistService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

// Middleware to handle authentication
router.use(verifyAccessToken);

// Get several artists details by artist ids, maximum 100
router.get('/', async (req, res) => {
    try {
        const { artistIds } = req.query;
        const response = await getSeveralArtists(artistIds);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get artist details by artist id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getArtist(id);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get artist albums by artist id
router.get('/:id/albums', async (req, res) => {
    try {
        const { id } = req.params;
        const { market, limit, offset } = req.query;
        const response = await getArtistAlbums(id, market, limit, offset);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get artist top tracks by artist id
router.get('/:id/topTracks', async (req, res) => {
    try {
        const { id } = req.params;
        const { market } = req.query;
        const response = await getArtistTopTracks(id, market);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get artist similar artists by artist id
router.get('/:id/similarArtists', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getArtistSimilarArtists(id);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
