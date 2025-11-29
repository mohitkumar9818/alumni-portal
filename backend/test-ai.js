require('dotenv').config();
const axios = require('axios');

async function listModels() {
    const key = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
    console.log(`🔑 Testing Key: ${key.substring(0, 10)}...`);

    try {
        console.log("📡 Connecting to Google to list available models...");
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
        );

        console.log("\n✅ SUCCESS! Here are the models your key can use:");
        console.log("------------------------------------------------");
        const models = response.data.models;
        models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent')) {
                console.log(`Model Name: ${m.name.replace('models/', '')}`);
            }
        });
        console.log("------------------------------------------------");

    } catch (error) {
        console.error("\n❌ FAILED TO LIST MODELS");
        console.error("Error Message:", error.response?.data?.error?.message || error.message);
    }
}

listModels();