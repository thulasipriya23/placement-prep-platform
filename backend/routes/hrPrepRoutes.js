const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getHRQuestions, evaluateHRResponse } = require("../controllers/hrPrepController");

router.get("/questions", protect, getHRQuestions);
router.post("/evaluate", protect, evaluateHRResponse);

module.exports = router;
