# REXX Server

REXX is an emotional compliance engine that exposes broken trust, triggers structural escalation, and returns clear instructions from a single customer message. It doesn’t guess. It proves.

This Node.js server supports **multiple LLMs**, selectable at runtime via API call. It is open source, self-contained, and schema-locked.

---

## 🔧 Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_ORG/rexx-server.git
cd rexx-server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API keys:**
```bash
cp .env.example .env
# Edit .env with your provider keys
```

4. **Start the server:**
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

---

## 📥 POST /chat

**URL:** `http://localhost:3000/chat`

**Method:** `POST`

**Body (JSON):**
```json
{
  "review": "I’m still waiting. Cancel the account now.",
  "sessionID": "abc123",
  "type": "text",
  "provider": "openai"
}
```

**provider** can be one of:
- `openai`
- `claude`
- `gemini`
- `mistral`
- `cohere`

---

## ✅ Output (REXX JSON)

```json
{
  "success": true,
  "data": {
    "emotion": "anger",
    "intensity_of_emotion": 10,
    "severity": "high",
    "churn_risk_score": 10,
    "recommended_intervention": "Cancel immediately. Do not ask for more information.",
    "recommended_tone": "Direct and accountable",
    "escalate": true,
    "escalation_reason": "High emotional intensity or trust breach.",
    "profanity_warning": {
      "level": "strong",
      "detected": ["fuck"],
      "recommended_tone": "caution"
    }
  }
}
```

---

## 🛠 Environment Variables

`.env.example` includes:
```env
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=
TOGETHER_API_KEY=
COHERE_API_KEY=
PORT=3000
```
You only need to fill in the API key(s) for the provider(s) you intend to use.

---

## 🧱 LLM Enforcement

Every LLM receives the full canonical REXX prompt:
- Detects emotional breach
- Flags escalation
- Never softens or guesses
- Always returns strict JSON

If the LLM fails to return a valid object, the server rejects the response.

---

## 📜 License

MIT. See LICENSE file.

Use it, fork it, enforce it. Just don’t dilute or relabel the schema.

---

## 🧠 About REXX

REXX is not a chatbot, wrapper, or sentiment tagger. It is a refusal engine.
It makes structural harm visible — and leaves no excuse not to act.

Built for systems that say they care.

---
