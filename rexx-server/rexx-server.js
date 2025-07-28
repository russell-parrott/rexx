require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { routeLLM } = require("./llm-router.js");

const app = express();
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { review, sessionID, client_id, type, provider } = req.body;

  if (!sessionID) {
    return res.status(400).json({ success: false, error: "Missing sessionID" });
  }

  try {
    	const output = await routeLLM({ review, type, provider });
    	output.timestamp = new Date();
    	output.sessionID = sessionID;
    	output.client_id = client_id	
	return res.status(200).json({ success: true, data: output });
  } catch (err) {
    console.error("REXX error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`REXX server listening on port ${PORT}`);
});
