// models/claude.js

const { Anthropic } = require("@anthropic-ai/sdk");
const getPrompt = require("../prompts/claude.js");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function runClaude(review, type) {
  const prompt = getPrompt(review, type);

  const completion = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    messages: [
      { role: "user", content: prompt }
    ],
    temperature: 0,
    max_tokens: 1000
  });

  const text = completion.content[0]?.text || completion.content;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Claude JSON parse error:", err);
    throw new Error("Invalid JSON from Claude");
  }
}

module.exports = { runClaude };

