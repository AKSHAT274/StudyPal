const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message; // Get user message from frontend
    const chatSession = model.startChat({
      history: [{ role: "user", parts: [{ text: userMessage }] }],
    });

    const result = await chatSession.sendMessage(userMessage);
    const geminiResponse = result.response.text();

    res.json({ response: geminiResponse });
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    res.status(500).json({ error: "Failed to get response from Gemini" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
