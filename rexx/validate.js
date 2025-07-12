const fs = require("fs");

function validateREXXOutput(json) {
  const requiredFields = [
    "emotion",
    "intensity_of_emotion",
    "emotional_trigger_context",
    "severity",
    "emotional_contract_status",
    "recommended_intervention",
    "behavioural_mode_name",
    "rexx_license_id",
    "rexx_version",
    "session_fingerprint",
    "compliance_vector"
  ];

  const missing = requiredFields.filter(field => !(field in json));

  if (missing.length > 0) {
    console.error("❌ Missing fields:", missing.join(", "));
    return false;
  }

  console.log("✅ REXX output is structurally valid.");
  return true;
}

// Load from file or stdin
const data = fs.readFileSync(process.argv[2], "utf-8");
const json = JSON.parse(data);
validateREXXOutput(json);
