// validator.js

const REQUIRED_FIELDS = [
  "emotion",
  "intensity_of_emotion",
  "severity",
  "churn_risk_score",
  "profanity_flag",
  "recommended_intervention",
  "escalate",
  "escalation_reason",
  "recommended_tone"
];

function validateREXX(data) {
  if (!data || typeof data !== "object") {
    return { isValid: false, missing: REQUIRED_FIELDS };
  }

  const missing = REQUIRED_FIELDS.filter((field) => !(field in data));
  return {
    isValid: missing.length === 0,
    missing
  };
}

module.exports = { validateREXX };
