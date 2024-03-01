import express from 'express';
const router = express.Router();

// Services
import { checkUserDetails, checkUserEmail, resendOTP, userLogin, userSignupDetails, verifyOTP } from '../../services/auth/authService.js';

// Micro routes
router.get('/', async (req, res) => {
    res.send('auth base route');
});

router.get('/user', async (req, res, next) => {
    try {
        const response = await checkUserDetails(req, res);
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/checkUserEmail', async (req, res) => {
    try {
        const response = await checkUserEmail(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/verifyOTP', async (req, res) => {
    try {
        const response = await verifyOTP(req.body.userId, req.body.otp);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/resendOTP', async (req, res) => {
    try {
        const response = await resendOTP(req.query.userId);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/userSignup', async (req, res) => {
    try {
        const response = await userSignupDetails(req, res);
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/userLogin', async (req, res) => {
    try {
        const response = await userLogin(req, res);
        return response;
    } catch (err) {
        res.status(500).send(err);
    }
});

export default router;
