const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

module.exports = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);
    const ext = path.extname(req.file.originalname).toLowerCase();
    let textContent = "";

    if (ext === ".pdf") {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const parsed = await pdfParse(dataBuffer);
        textContent = parsed.text;
      } catch (pdfError) {
        console.error("❌ PDF parse error:", pdfError.message);
        return res.status(400).json({ error: "Failed to parse PDF file" });
      }
    } else if (ext === ".docx") {
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      textContent = result.value;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    fs.unlinkSync(filePath);
    res.json({ text: textContent });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Failed to parse file" });
  }
};
