const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAnalyticsDiagnostics } = require("../controllers/analyticsController");

router.get("/diagnostics", protect, getAnalyticsDiagnostics);

module.exports = router;
