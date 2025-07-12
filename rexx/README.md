# REXX Server – Structural Trust & Emotional Signal Engine

This server provides a compliant implementation of the REXX doctrine: Refusal, Escalation, Exit, and Cross-Accountability.

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your `.env` file

```env
OPENAI_API_KEY=your_openai_key_here
PORT=3000
```

### 3. Start the server

```bash
node index.js
```

Server will run at: `http://localhost:3000`

## 📡 API Usage

### POST /chat

Send a customer message for emotional signal analysis.

```json
{
  "review": "Cancel everything. I’m done.",
  "sessionID": "user-123",
  "type": "text",
  "summary": null
}
```

Returns structured JSON with:
- Emotional state
- Contract status
- Behavioural mode
- Compliance vector
- Summary block

## 🧱 Structure

- `/routes/chat.js` — POST endpoint logic
- `/core/rexxProcessor.js` — Main logic and prompt
- `/utils/` — Sanitisation, profanity filter, modes, summaries

## 🔐 REXX Compliance

This code reflects the REXX v1.0 schema.  
To claim compliance, use only under license and include a valid `rexx_license_id` in outputs.

For licensing: parrott.russell@gmail.com
