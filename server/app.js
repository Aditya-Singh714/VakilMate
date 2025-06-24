const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const uploadRoute = require("./routes/uploadRoute");
const summarizeRoute = require("./routes/summarizeRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors({ origin: "https://vakil-mate.vercel.app" }));

app.use(express.json());

// Routes
app.use("/api/upload", uploadRoute);
app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () =>
  console.log(`🚀 VakilMate backend running on port ${PORT}`)
);
