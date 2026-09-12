const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getVaultData, createNote, deleteNote } = require("../controllers/revisionController");

router.get("/vault", protect, getVaultData);
router.post("/note", protect, createNote);
router.delete("/note/:id", protect, deleteNote);

module.exports = router;
