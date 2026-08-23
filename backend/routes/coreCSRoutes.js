const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTopics,
  getTopicById,
  submitQuiz,
  aiExplain,
} = require("../controllers/coreCSController");

router.get("/topics", protect, getTopics);
router.get("/topic/:id", protect, getTopicById);
router.post("/submit-quiz", protect, submitQuiz);
router.post("/ai-explain", protect, aiExplain);

module.exports = router;
