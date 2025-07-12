const { sanitizeInput } = require("../utils/sanitize");
const { detectProfanity } = require("../utils/profanity");
const { behaviouralModeMap } = require("../utils/modeMap");
const {
  createBatchSummary,
  updateBatchSummary,
  finalizeBatchSummary
} = require("../utils/summary");
const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function runREXX({ review, sessionID, type = "text", summary = null }) {
  if (!sessionID) throw new Error("Missing sessionID");

  const wordCount = review.split(/\s+/).length;
  const maxTokens = Math.min(2000, 350 + Math.round(wordCount * 0.5));

  const input = sanitizeInput(review);
  let prompt;

  if (type === "voice") {
    prompt = \`Respond only with raw JSON...
    analyse the following customer voice transcript: "\${input}"...
    \`; // Truncated for brevity
  } else {
    prompt = \`Respond only with raw JSON...
    analyse the following customer message: "\${input}"...
    \`; // Truncated for brevity
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: maxTokens,
    response_format: { type: "json_object" }
  });

  const parsed = JSON.parse(response.choices[0].message.content);
  parsed.rexx_license_id = "ORG-XXXX-XX";
  parsed.rexx_version = "1.0";

  const shortHash = Buffer.from(\`\${sessionID}-\${Date.now()}-\${parsed.behavioural_mode_name}-\${parsed.intensity_of_emotion}\`)
    .toString("base64")
    .slice(0, 14)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "-");

  parsed.session_fingerprint = shortHash;
  parsed.compliance_vector = {
    refusal_visible: parsed.recommended_intervention?.toLowerCase().includes("refuse") || false,
    escalation_triggered: parsed.escalate === true,
    exit_path_required: parsed.recommended_intervention?.toLowerCase().includes("cancel") || false,
    emotional_breach_scored: parsed.emotional_contract_status === "broken" || parsed.severity === "high"
  };

  const profanityWarning = detectProfanity(review);
  if (profanityWarning) parsed.profanity_warning = profanityWarning;

  if (
    parsed.intensity_of_emotion >= 8 ||
    parsed.emotional_contract_status === "broken" ||
    parsed.behavioural_mode_name === "Betrayal Spike"
  ) {
    parsed.escalate = true;
    parsed.escalation_reason = "High emotional severity and trust breach";
  }

  const modeInfo = behaviouralModeMap[parsed.behavioural_mode_name];
  if (modeInfo) parsed.recommended_tone = modeInfo.recommended_tone;

  const workingSummary = summary || createBatchSummary();
  parsed.summary = finalizeBatchSummary(updateBatchSummary(workingSummary, parsed));

  return parsed;
}

module.exports = { runREXX };
