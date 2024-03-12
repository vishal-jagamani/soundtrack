import express from 'express';
const router = express.Router();

//* Services
import { getTrack, getTrackRecommendations } from '../../services/spotify/trackService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

//* Middleware to handle authentication
router.use(verifyAccessToken);

//* Get track details from spotify by track id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getTrack(id);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

//* Get track recommendation from spotify by root track details
router.get('/:id/recommendations', async (req, res) => {
    try {
        const { id } = req.params;
        const { limit, offset } = req.query;
        const response = await getTrackRecommendations(id, limit, offset);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
