const getLegalSummary = require("../services/geminiService");

module.exports = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  console.log(text);
  try {
    const summary = await getLegalSummary(text);
    res.json({ summary });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
