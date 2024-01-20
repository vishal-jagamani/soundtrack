import express from 'express';
const router = express.Router();

// Services
import { demo } from '../services/demoService.js';

// Micro routes
router.get('/demoEndpoint', async (req, res) => {
    try {
        const response = await demo(req.query.demo);
        res.status(response?.statusCode).send(response?.response);
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
