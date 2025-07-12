const behaviouralModeMap = {
  "Ease Seeker": {
    description: "Customer signals a desire for simplicity, clarity, or minimal effort.",
    trigger_logic: "Keywords around waiting, confusion, or speed.",
    recommended_tone: "Keep it smooth, remove friction.",
    severity_threshold: 5,
    icon_tag: "⏩"
  },
  "Control Keeper": {
    description: "Customer feels loss of control or uncertainty.",
    trigger_logic: "Multiple follow-ups, demands for confirmation.",
    recommended_tone: "Offer options, reaffirm authority.",
    severity_threshold: 6,
    icon_tag: "🎛️"
  },
  "Dignity Defence": {
    description: "Customer tone indicates they feel dismissed or disrespected.",
    trigger_logic: "Formality spike, fairness complaints.",
    recommended_tone: "Acknowledge emotion, respect status.",
    severity_threshold: 7,
    icon_tag: "🛡️"
  },
  "Resolution Hunter": {
    description: "Customer is focused on outcome, not process.",
    trigger_logic: "Mentions urgency or escalation.",
    recommended_tone: "Go straight to the fix.",
    severity_threshold: 6,
    icon_tag: "🎯"
  },
  "Kindness Checker": {
    description: "Customer is scanning for care.",
    trigger_logic: "Mentions being ignored or uncared for.",
    recommended_tone: "Show warmth, confirm effort.",
    severity_threshold: 5,
    icon_tag: "💗"
  },
  "Betrayal Spike": {
    description: "Customer shows sharp tone shift due to broken trust.",
    trigger_logic: "Sudden emotional shift or accusations.",
    recommended_tone: "Own the failure, rebuild trust.",
    severity_threshold: 9,
    icon_tag: "⚠️"
  }
};

module.exports = { behaviouralModeMap };
