import express from 'express';
const router = express.Router();

// Services
import { getFeaturedPlaylists, getPlaylist } from '../../services/spotify/playlistService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

// Middleware to handle authentication
router.use(verifyAccessToken);

// Get featured playlist from spotify
router.get('/featured', async (req, res) => {
    try {
        const { locale, limit, offset } = req.query;
        const response = await getFeaturedPlaylists(locale, limit, offset);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get playlist details from spotify by playlist id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { market, fields, additional_types } = req.query;
        const response = await getPlaylist(id, market, fields, additional_types);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
