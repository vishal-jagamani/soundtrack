import express from 'express';
const router = express.Router();

// Services
import { linkSpotifyAccount, oauthCallback, spotifySearch } from '../../services/spotify/userService.js';
import { verifyAccessToken } from '../../utils/jwt.js';

// Middleware to handle authentication
// router.use(verifyAccessToken);

// Micro routes
router.get('/linkSpotifyAccount', async (req, res) => {
    try {
        const response = await linkSpotifyAccount(req, res);
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/oauthCallback', async (req, res) => {
    try {
        const response = await oauthCallback(req, res);
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/search', async (req, res) => {
    try {
        const response = await spotifySearch(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
