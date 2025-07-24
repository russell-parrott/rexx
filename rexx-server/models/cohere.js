// models/cohere.js

const { CohereClient } = require("cohere-ai");
const getPrompt = require("../prompts/cohere.js");

const cohere = new CohereClient({ apiKey: process.env.COHERE_API_KEY });

async function runCohere(review, type) {
  const prompt = getPrompt(review, type);

  const response = await cohere.generate({
    model: "command-r-plus",
    prompt,
    temperature: 0.2,
    max_tokens: 500,
    stop_sequences: ["\n\n"]
  });

  const text = response.generations[0]?.text;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Cohere JSON parse error:", err);
    throw new Error("Invalid JSON from Cohere");
  }
}

module.exports = { runCohere };
