import express from 'express';
const router = express.Router();

// Services
import { verifyAccessToken } from '../../utils/jwt.js';
import { getFeaturedPlaylists } from '../../services/spotify/playlistService.js';

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

export default router;
