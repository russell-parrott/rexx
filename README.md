# REXX v1.0 – The Emotional Compliance Layer

REXX detects emotional breach from a single customer message. It flags when trust is broken, when escalation is required, and what action must follow.

No CRM. No sentiment scoring. No performance theatre.
Just signal.

---

## 🚀 What REXX Does

REXX returns structured emotional breach data from one message:

```json
{
  "success": true,
  "data": {
    "emotion": "anger",
    "intensity_of_emotion": 10,
    "severity": "high",
    "churn_risk_score": 10,
    "profanity_flag": false,
    "recommended_intervention": "Confirm cancellation immediately. Acknowledge delay and absence of response. Do not request additional effort from the customer.",
    "escalate": true,
    "escalation_reason": "Maximum emotional intensity with explicit withdrawal and unacknowledged repeat contact",
    "recommended_tone": "Direct, accountable, and non-defensive. Apologise without excuse. Confirm resolution without delay."
  }
}
```

---

## ✅ Core Fields

| Field | Purpose |
|-------|---------|
| `emotion` | Detected emotional signal |
| `intensity_of_emotion` | Scale 1–10 |
| `severity` | "low", "moderate", or "high" |
| `churn_risk_score` | Scale 0–10 |
| `profanity_flag` | Boolean: tone breach detected |
| `recommended_intervention` | Direct action instruction |
| `escalate` | Boolean: requires escalation |
| `escalation_reason` | Structural cause for escalation |
| `recommended_tone` | Blunt tone guidance — no scripts |

---

## 🔍 What REXX Does NOT Do

- No mood tagging
- No CRM lookups
- No sentiment averages
- No empathy performance

REXX doesn’t guess. It proves.

---

## 🔧 How to Use REXX

- Input: One customer message (text or transcript)
- Output: JSON object with breach logic
- LLMs must strictly follow schema (see /prompt directory)
- Use output to drive escalation, refusal handling, or accountability

---

## 📌 Requirements

- LLM-compatible environment (e.g. GPT-4o, Claude, Mistral)
- Prompt-lock enforcement if hosted
- JSON validator (optional)
- No customer history needed

---

## 🛡️ Enforcement Reminder

If `escalate = true` and the system does nothing, that is not a miss. It’s a choice.

REXX doesn’t create accountability. It removes the excuse not to act.

---

## 📫 Contact

Built and maintained by [Russell Parrott](mailto:parrott.russell@gmail.com)  
Web: [https://github.com/russell-parrott/rexx](https://github.com/russell-parrott/rexx)

---

REXX v1.0 – Copyright © 2025 Russell Parrott. All Rights Reserved.

