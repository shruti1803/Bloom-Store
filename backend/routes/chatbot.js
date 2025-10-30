const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Use the correct model name for your SDK version
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

router.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello!";
    const prompt = `
You are Bloom's chatbot 💐 — a friendly thrift store assistant.
Keep replies short, kind, and conversational.

User: ${userMessage}
Bloom:`;

    const result = await model.generateContent(prompt);

    res.json({
      reply: result.response.text(),
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      message: "Gemini Error",
      details: error.message,
    });
  }
});

module.exports = router;
