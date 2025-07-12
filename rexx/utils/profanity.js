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

module.exports = { detectProfanity };
