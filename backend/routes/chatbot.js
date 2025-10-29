const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // ✅ Correct structure for latest SDK
    const result = await model.generateContent(message);
    const response = result.response.text();

    res.json({ response });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      error: "AI service unavailable right now.",
    });
  }
});

module.exports = router;
