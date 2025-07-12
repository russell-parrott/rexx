const express = require("express");
const router = express.Router();
const { runREXX } = require("../core/rexxProcessor");

router.post("/chat", async (req, res) => {
  const { review, sessionID, type, summary } = req.body;
  try {
    const result = await runREXX({ review, sessionID, type, summary });
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error("REXX error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;