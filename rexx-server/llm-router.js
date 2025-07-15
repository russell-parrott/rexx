const { OpenAI } = require("openai");
const fetch = require("node-fetch");

const prompt = `You are REXX, an emotional intelligence engine... [FULL PROMPT OMITTED FOR BREVITY — use full canonical prompt here]`;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function sanitizeInput(text) {
  return text.replace(/[\"`{}\\]/g, "[REDACTED]").trim();
}

function detectProfanity(text) {
  const lower = text.toLowerCase();
  const strong = ["fuck", "fucking", "bastard", "asshole"];
  const detected = strong.filter(word => lower.includes(word));
  if (detected.length === 0) return null;
  return { level: "strong", detected, recommended_tone: "caution" };
}

async function routeLLM({ review, type = "text", provider = "openai" }) {
  const input = sanitizeInput(review);
  const fullPrompt = `${prompt}\nMessage: "${input}"`;

  let raw;

  if (provider === "openai") {
    const res = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0.2,
      max_tokens: 600,
      response_format: { type: "json_object" }
    });
    raw = JSON.parse(res.choices[0].message.content);

  } else if (provider === "claude") {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 600,
        temperature: 0,
        messages: [{ role: "user", content: fullPrompt }]
      })
    });
    const data = await res.json();
    raw = JSON.parse(data.content[0].text);

  } else if (provider === "gemini") {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 600 }
      })
    });
    const data = await res.json();
    raw = JSON.parse(data.candidates[0].content.parts[0].text);

  } else if (provider === "mistral") {
    const res = await fetch("https://api.together.xyz/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct",
        messages: [{ role: "user", content: fullPrompt }],
        temperature: 0,
        max_tokens: 600
      })
    });
    const data = await res.json();
    raw = JSON.parse(data.choices[0].message.content);

  } else if (provider === "cohere") {
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command-r-plus",
        temperature: 0.2,
        message: fullPrompt
      })
    });
    const data = await res.json();
    raw = JSON.parse(data.text);

  } else {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const profanity = detectProfanity(review);
  if (profanity) raw.profanity_warning = profanity;
  if (raw.intensity_of_emotion >= 8 || raw.severity === "high" || raw.churn_risk_score >= 8) {
    raw.escalate = true;
    raw.escalation_reason = "High emotional intensity or trust breach.";
  }

  return raw;
}

module.exports = { routeLLM };