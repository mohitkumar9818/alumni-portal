const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { GoogleGenerativeAI } = require("@google/generative-ai");

router.post('/chat', protect, async (req, res) => {
    try {
        const { message } = req.body;

        // 1. Clean the key
        const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";

        if (!apiKey) {
            return res.status(500).json({ error: 'API Key missing in .env' });
        }

        // 2. Initialize
        const genAI = new GoogleGenerativeAI(apiKey);

        // 3. USE A MODEL FROM YOUR LIST (The Fix!)
        // We switched to 'gemini-2.5-flash' because it appeared in your successful test.
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 4. Send Message
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        return res.json({
            message: text,
            timestamp: new Date()
        });

    } catch (error) {
        console.error("❌ GEMINI ERROR:", error.message);
        return res.status(500).json({
            error: "AI Service Error",
            details: error.message
        });
    }
});

module.exports = router;