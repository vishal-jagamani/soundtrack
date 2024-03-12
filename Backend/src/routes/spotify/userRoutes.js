import express from 'express';
const router = express.Router();

// Services
import { checkUserFollowsPlaylist, getUserProfile } from '../../services/spotify/userService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

// Middleware to handle authentication
router.use(verifyAccessToken);

// Get user profile details from spotify by user id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getUserProfile(id);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Check whether spotify user follows playlist or not by playlist and user id
router.get('/:id/followsPlaylist', async (req, res) => {
    try {
        const { id } = req.params;
        const { playlistId } = req.query;
        const response = await checkUserFollowsPlaylist(id, playlistId);
        res.status(response?.statusCode).send(response?.data);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
