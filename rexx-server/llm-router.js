// llm-router.js
const { runGPT4 } = require("./models/gpt4.js");
const { runClaude } = require("./models/claude.js");
const { runGemini } = require("./models/gemini.js");
const { runMistral } = require("./models/mistral.js");
const { runCohere } = require("./models/cohere.js");
const { validateREXX } = require("./validator.js");
const { detectProfanity, behaviouralModeMap, sanitizeInput } = require("./utils");


async function routeLLM({ review, type, provider }) {
	let result;
	let modelUsed = provider.toLowerCase();
	review = sanitizeInput(review)
	switch (modelUsed) {
		case "openai":
			result = await runGPT4(review, type);
			break;
		case "claude":
			result = await runClaude(review, type);
			break;
		case "gemini":
			result = await runGemini(review, type);
			break;
		case "mistral":
			result = await runMistral(review, type);
			break;
		case "cohere":
			result = await runCohere(review, type);
			break;
		default:
			throw new Error("Unsupported provider: " + provider);
	}

	const profanity = detectProfanity(review);
	if (profanity) {
		result.profanity_flag = true;
		result.profanity_level = profanity.level;
		result.detected_profanity = profanity.detected;
		result.recommended_tone = profanity.recommended_tone;
	} else {
		result.profanity_flag = false;
	}
	
	if ( result.intensity_of_emotion >= 8 || result.behavioural_mode_name === "Betrayal Spike"){
		result.escalate = true;
		result.escalation_reason = "High emotional severity and trust breach";
	}

	if (
  result.escalate === true &&
  result.severity === "high"
) {
  result.compliance_relevant = true;
} else if (
  ["Betrayal Spike", "Broken Promise"].includes(result.behavioural_mode) &&
  result.intensity_of_emotion >= 8
) {
  result.compliance_relevant = true;
} else if (
  result.recommended_intervention.toLowerCase().startsWith("own the failure")
) {
  result.compliance_relevant = true;
} else {
   result.compliance_relevant = false;
}

	const modeName = result.behavioural_mode_name;
	const modeInfo = behaviouralModeMap[modeName];
	if (modeInfo) {
		result.recommended_tone =  modeInfo.recommended_tone;		  
	}
	
	const { isValid, missing } = validateREXX(result);	
		
	return {
		model_used: modelUsed,
		output: result,
		schema_status: isValid ? "valid" : "partial",
		...(isValid ? {} : { missing_fields: missing })
	};
}

module.exports = { routeLLM };
