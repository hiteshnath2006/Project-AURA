require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { securityMiddleware } = require('./middleware/security');
const LiaisonAgent = require('./agents/LiaisonAgent');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API Route for Agent Processing
app.post('/api/analyze', securityMiddleware, async (req, res) => {
    try {
        const { scrubbedQuery, profileData } = req.body;
        const result = await LiaisonAgent.processQuery(scrubbedQuery, profileData);
        res.json(result);
    } catch (error) {
        console.error("Agent Processing Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Serve frontend in production (Docker container)
app.use(express.static(path.join(__dirname, 'public')));
app.get(/^.*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`AURA Backend Server running on port ${PORT}`);
});
