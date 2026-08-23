const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { analyzeProject } = require("../controllers/projectAnalyzerController");

router.post("/analyze", protect, analyzeProject);

module.exports = router;
