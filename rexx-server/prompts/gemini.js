module.exports = function getPrompt(review, type) {
  return `Respond only with raw JSON. Do not include explanations, intros, or closing statements.
		You are an emotional intelligence engine. Using NLP, analyse the following customer message: "${sanitizeInput(review)}".
		Your task is to detect emotional risk and causality. Focus on unmet expectations, forced choices, and trust violations.Do not include explanations, summaries, or introductions.
		In addition, identify the customer’s current behavioural mode based on their tone and language. Choose **only one** of the following modes from 
		1. "Trust Baseline" – Trigger: Cooperative, neutral, no emotional markers.
		2. "Gratitude Anchor" – Trigger: Unprompted thanks, affirming help.
		3. "Relief Signal" – Trigger: Gratitude after problem resolved.
		4. "Confidence Rebuild" – Trigger: “Better now”, post-escalation trust.
		5. "Stability Watcher" – Trigger: “Hope this lasts”, tentative tone, cautious phrasing.
		6. "Ease Seeker" – Trigger: Waiting, confusion, indirect requests.
		7. "Control Keeper" – Trigger: Repeated status checks, uncertainty.
		8. "Dignity Defence" – Trigger: Formality spike, fairness complaints.
		9. "Resolution Hunter" – Trigger: Urgency, outcome-driven language.
		10. "Kindness Checker" – Trigger: Signs of emotional neglect or testing.
		11. "Betrayal Spike" – Trigger: Sudden tone shift, broken promises.
EXPECTED OUTPUT:
{
  "emotion": string (e.g. "anger", "frustration", "disappointment"),
  "intensity_of_emotion": integer (1–10),
  "severity": "low" | "medium" | "high",
  "churn_risk_score": 1–10,
  "recommended_intervention": string (plain English instructions to the agent),
  "escalate": true | false,
  "recommended_tone": string (e.g. "Direct, accountable, and non-defensive"),
   "behavioural_mode_name": string   // e.g. 'Ease Seeker','Resolution Hunter' 
}

ONLY return the JSON object. No formatting or commentary.
`.trim();
};