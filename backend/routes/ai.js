const router = require('express').Router();
const auth = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Explain code snippet
router.post('/explain', auth, async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code) {
      return res.status(400).json({ message: 'Code is required for explanation.' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.status(500).json({ message: 'Gemini API Key is not configured on the server. Please add it to your .env file.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert programming tutor. Please explain the following ${language || ''} code snippet clearly and concisely. Break down what it does, and if applicable, mention its time/space complexity or any potential edge cases.\n\nCode:\n${code}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ explanation: text });
  } catch (err) {
    console.error('AI Error:', err);
    res.status(500).json({ error: 'Failed to generate AI explanation.' });
  }
});

module.exports = router;
