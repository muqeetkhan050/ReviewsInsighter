const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");


router.post("/", async (req, res) => {
  const { reviews } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const text = reviews.map((r) => r.text).join("\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `Summarize these reviews:\n${text}` },
        ],
      }),
    });

    const result = await response.json();
    res.json({ summary: result.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "Error summarizing reviews" });
  }
});

module.exports = router;