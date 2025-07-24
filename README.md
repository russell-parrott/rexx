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
REXX v1.0 — Structural Fidelity Across LLMs

REXX is a prompt-based tool you can run it on any LLM that accepts text input and returns structured output but not all models behave the same — yet.

To help individuals use REXX without needing technical fixes, we define two categories:

---

✅ REXX-Compatible

These models can run the REXX prompt and return meaningful emotional breach data.  Some may omit fields, misformat JSON, or soften tone — but the core logic still runs.

- Chat GPT (best match)
- Claude 3 (usable, sometimes verbose)
- Gemini 1.5 Pro (incomplete, often summarises)
- Cohere Command R+ (soft tone bias)
- Mistral (JSON issues, lower fidelity)

---

❌ REXX-Broken

Models in this category cannot currently return usable structured breach data from a single message without reformatting or intervention.
If you're using one of these, expect errors or empty fields.

(Currently none in this list — but reserved for models that fail completely.)

---

⚠️ A Note on Output Drift

Just because a model runs the prompt doesn't mean it returns all fields.
Some will miss recommended_tone, escalate, or escalation_reason.
Others may format answers in prose, not JSON.
That’s not your fault. That’s the model breaking the agreement.

We're tuning prompts per model to fix this. For now:

GPT-4o gives the best results

Others are usable, but may need inspection
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

