// models/gemini.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const getPrompt = require("../prompts/gemini.js");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runGemini(review, type) {
  const prompt = getPrompt(review, type);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini JSON parse error:", err);
    throw new Error("Invalid JSON from Gemini");
  }
}

module.exports = { runGemini };
