// models/mistral.js

const { ChatOpenAI } = require("@langchain/openai");
const getPrompt = require("../prompts/mistral.js");

const mistral = new ChatOpenAI({
  openAIApiKey: process.env.MISTRAL_API_KEY,
  modelName: "open-mistral-7b",
  temperature: 0
});

async function runMistral(review, type) {
  const prompt = getPrompt(review, type);

  try {
    const result = await mistral.invoke(prompt);
    return JSON.parse(result.content);
  } catch (err) {
    console.error("Mistral JSON parse error:", err);
    throw new Error("Invalid JSON from Mistral");
  }
}

module.exports = { runMistral };
