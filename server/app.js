const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

console.log("VakilMate backend starting...");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("❌ No file uploaded.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);
    const ext = path.extname(req.file.originalname).toLowerCase();
    let textContent = "";

    console.log("✅ File received:", req.file.originalname);
    console.log("📦 File stored at:", filePath);
    console.log("🔍 File extension:", ext);

    if (ext === ".pdf") {
      console.log("📄 Parsing PDF...");
      const dataBuffer = fs.readFileSync(filePath);
      const parsed = await pdfParse(dataBuffer);
      textContent = parsed.text;
      console.log("✅ PDF parsing complete.");
    } else if (ext === ".docx") {
      console.log("📝 Parsing DOCX...");
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      textContent = result.value;
      console.log("✅ DOCX parsing complete.");
    } else {
      console.log("❌ Unsupported file format.");
      return res.status(400).json({ error: "Unsupported file format" });
    }

    fs.unlinkSync(filePath);
    console.log("🧹 Temporary file deleted.");
    res.json({ text: textContent });
  } catch (err) {
    console.error("🚨 Error processing file:", err.message);
    res.status(500).json({ error: "Failed to parse file" });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
