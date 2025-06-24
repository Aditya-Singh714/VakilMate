const express = require("express");
const summarizeController = require("../controllers/summarizeController");
const router = express.Router();

router.post("/", summarizeController);

module.exports = router;
