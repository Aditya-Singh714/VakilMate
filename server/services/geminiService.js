const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

async function getLegalSummary(text) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `📜 Summarize and simplify the following Indian legal document using bullet points. 
Include proper citations and references to relevant sections of law or case laws wherever applicable.\n\n${text}`,
            },
          ],
        },
      ],
    });

    const summary = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!summary) throw new Error("No summary returned from Gemini");

    return summary;
  } catch (err) {
    console.error("Gemini error:", err.message);
    throw err;
  }
}

module.exports = getLegalSummary;
