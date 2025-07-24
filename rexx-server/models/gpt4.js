// models/gpt4.js

const { OpenAI } = require("openai");
const getPrompt = require("../prompts/gpt4.js");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function runGPT4(review, type) {
  const prompt = getPrompt(review, type);

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are REXX." },
      { role: "user", content: prompt }
    ],
    temperature: 0,
    response_format: "json"
  });

  const text = completion.choices[0]?.message?.content;
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("GPT-4 JSON parse error:", err);
    throw new Error("Invalid JSON from GPT-4");
  }
}

module.exports = { runGPT4 };
