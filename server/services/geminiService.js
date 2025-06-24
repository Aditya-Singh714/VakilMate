const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

// Initialize Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function getLegalSummary(text) {
  try {
    // Prompt Gemini to summarize your legal content
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash", // as per docs :contentReference[oaicite:3]{index=3}
      contents: `Summarize and simplify this Indian legal document with bullet points:\n\n${text}`,
    });

    // Extract summary from response
    const summary = result.text; // `text` property contains the generated summary
    return summary;
  } catch (err) {
    console.error("Gemini error:", err.message);
    throw err;
  }
}

module.exports = getLegalSummary;
