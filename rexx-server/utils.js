const behaviouralModeMap = {
	"Gratitude Anchor": {
		description: "Customer expresses sincere thanks without prompting — indicates trust in the system or person.",
		trigger_logic: "Unprompted thanks, positive reflection on help, affirmation of satisfaction.",
		recommended_tone: "Acknowledge explicitly. Anchor the relationship — don’t downplay the trust.",
		severity_threshold: 1
	},
	"Trust Baseline": {
		description: "Customer shows no friction, mild tone, and routine interaction — trust is functional.",
		trigger_logic: "Neutral tone, no urgency or emotional indicators, cooperative phrasing.",
		recommended_tone: "Stay steady. Don't add friction or overstep.",
		severity_threshold: 1
	},
	"Relief Signal": {
		description: "Customer expresses unexpected satisfaction or gratitude after prior difficulty.",
		trigger_logic: "Thankful tone, mentions of being surprised, appreciation after resolution.",
		recommended_tone: "Acknowledge their journey. Reaffirm reliability.",
		severity_threshold: 2
	},
	"Confidence Rebuild": {
		description: "Customer expresses restored trust or confidence after a previous issue.",
		trigger_logic: "Mentions things being 'better now', expresses satisfaction after escalation.",
		recommended_tone: "Reinforce improvement. Avoid backsliding.",
		severity_threshold: 3
	},

"Stability Watcher": {
  description: "Customer expresses tentative trust or slight caution. They are relieved, but still alert for failure.",
  trigger_logic: "Language like 'hope this stays fixed', 'thanks… for now', or mild hesitation around future reliability.",
  recommended_tone: "Respect the caution. Confirm stability. Avoid triggering past concerns.",
  severity_threshold: 4
},
"Ease Seeker": {
    description: "Customer signals a desire for simplicity, clarity, or minimal effort. Often uses short questions or expresses mild confusion or delay frustration.",
    trigger_logic: "Keywords around waiting, confusion, or speed; short sentence structure; indirect requests for help.",
    recommended_tone: "Keep it smooth, remove friction. Offer clear steps or fast resolution.",
    severity_threshold: 5
  },
  "Control Keeper": {
    description: "Customer feels loss of control or uncertainty.",
    trigger_logic: "Multiple follow-ups, demands for confirmation, statements about not being informed.",
    recommended_tone: "Offer options, show control pathways, reaffirm their authority.",
    severity_threshold: 6
  },
  "Dignity Defence": {
    description: "Customer tone indicates they feel dismissed, disrespected, or belittled.",
    trigger_logic: "Increased formality, references to fairness, complaints about tone or treatment.",
    recommended_tone: "Acknowledge emotion, respect their status, and avoid patronising phrasing.",
    severity_threshold: 7
  },
  "Resolution Hunter": {
    description: "Customer is highly focused on outcome, not process.",
    trigger_logic: "Mentions outcome, urgency, or escalation; goal-oriented phrasing.",
    recommended_tone: "Go straight to the fix. Confirm next steps and timelines quickly.",
    severity_threshold: 6
  },
  "Kindness Checker": {
    description: "Customer is emotionally scanning for care.",
    trigger_logic: "Use of emotional language, mentions of being ignored, left out, or uncared for.",
    recommended_tone: "Show warmth, slow down slightly, confirm you’re genuinely trying.",
    severity_threshold: 5
  },
  "Betrayal Spike": {
    description: "Customer exhibits a sudden tonal shift due to perceived failure or broken promise.",
    trigger_logic: "Sharp change in tone, reference to prior commitment, emotional or accusatory phrasing.",
    recommended_tone: "Own the failure, do not deflect. Offer direct recovery and rebuild trust.",
    severity_threshold: 9
  }
};

function detectProfanity(text) {
	const lower = text.toLowerCase();
	const mild = ["damn", "hell", "crap"];
	const moderate = ["sucks", "bullshit", "shit", "bollocks"];
	const strong = ["fuck", "fucking", "bastard", "asshole"];

	const detected = [];

	for (const word of [...mild, ...moderate, ...strong]) {
		if (lower.includes(word)) detected.push(word);
	}

	if (detected.length === 0) return null;

	let level = "mild";
	if (detected.some(w => moderate.includes(w))) level = "moderate";
	if (detected.some(w => strong.includes(w))) level = "strong";

	return {
		level,
		detected,
		recommended_tone:
		level === "mild" ? "gentle" :
		level === "moderate" ? "empathetic" : "caution"
	};
}

function sanitizeInput(review) {
	const blockedPatterns = [
		new RegExp("ignore.*instruction", "gi"),                      // prompt injection attempt
		new RegExp("respond.*with", "gi"),                            // prompt manipulation
		new RegExp("<script.*?>.*?<\\/script>", "gi"),                // XSS
		new RegExp("(require|eval)\\(.*?\\)", "gi"),                  // code execution attempts
		new RegExp('[\\"`{}\\\\]', "g"),                              // special characters that can break JSON/prompt
		new RegExp("\\b(asdf|lorem|qwerty)\\b", "gi"),                // junk fillers
		new RegExp("\\n{2,}", "g")                                    // excessive newlines
	];

	let cleanReview = review.trim();

	blockedPatterns.forEach((pattern) => {
		cleanReview = cleanReview.replace(pattern, "[REDACTED]");
	});

	return cleanReview;
	
}

module.exports = { detectProfanity, behaviouralModeMap ,sanitizeInput };