// Import necessary modules
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Create Express app
const app = express();

// Get current file and directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(express.static(join(__dirname, '/'))); // Serve static files from the '/' directory

// Load environment variables from .env file
dotenv?.config();

// Set the port for the server
const PORT = process.env.PORT || 8080;

// Micro routes
import authRoutes from './src/routes/auth/authRoutes.js';
import demoRoutes from './src/routes/demoRoutes.js';
import spotifyRoutes from './src/routes/spotify/spotifyRoutes.js';
import { generateNewAccessToken, generateNewRefreshToken } from './src/utils/jwt.js';
// Add rest of your micro routes here

// Use micro routes
app.use('/demo', demoRoutes);
app.use('/auth', authRoutes);
app.use('/spotify', spotifyRoutes);
// Add rest of micro routes to put use in here1

// Test endpoint
app.get('/testEndpoint', (req, res) => {
    res.send('Soundtrack service test endpoint');
});

app.get('/getAccessToken', async (req, res) => {
    const accessToken = await generateNewAccessToken({ id: 1, name: 'Vishal', accessToken: true });
    const refreshToken = await generateNewRefreshToken({ id: 1, name: 'Vishal', accessToken: true });
    res.send({ accessToken, refreshToken });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: { message: err?.message, description: err?.stack } });
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
    res.status(404).json({
        error: {
            code: 404,
            message: 'Not Found',
            description: 'The requested resource was not found on the server.',
            suggestedAction: 'Check the resource URL or verify that the resource exists.',
        },
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Soundtrack server is running on port ${PORT}`);
});
