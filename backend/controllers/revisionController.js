const RevisionNote = require("../models/RevisionNote");
const UserProgress = require("../models/UserProgress");
const Problem = require("../models/Problem");

// Default sample notes if user has no saved notes yet
const sampleNotes = [
  {
    _id: "sample-1",
    title: "Dynamic Programming - 0/1 Knapsack Pattern",
    category: "DSA",
    tags: ["DP", "Arrays", "Optimization"],
    content: "Key choice: Include or Exclude item. Base case: capacity == 0 || index == 0. Use 2D table dp[n+1][W+1] or 1D array optimization.",
    codeSnippet: "dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);",
    createdAt: new Date(),
    lastRevisedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
  },
  {
    _id: "sample-2",
    title: "SQL Indexing & B+ Tree Search",
    category: "CoreCS",
    tags: ["DBMS", "Indexing", "Performance"],
    content: "Clustered index determines physical ordering (1 per table). Non-clustered indexes build secondary B+ trees pointing to row pointers.",
    codeSnippet: "CREATE INDEX idx_user_email ON users(email);",
    createdAt: new Date(),
    lastRevisedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
  },
];

// @route   GET /api/revision/vault
// @access  Private
const getVaultData = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch user's custom revision notes
    let notes = await RevisionNote.find({ userId }).sort({ updatedAt: -1 });

    if (notes.length === 0) {
      notes = sampleNotes;
    }

    // 2. Fetch user's bookmarked DSA problems
    const bookmarkedProgress = await UserProgress.find({ userId, bookmarked: true })
      .populate("problemId")
      .exec();

    const bookmarkedProblems = bookmarkedProgress
      .filter((p) => p.problemId)
      .map((p) => ({
        _id: p.problemId._id,
        title: p.problemId.title,
        topic: p.problemId.topic,
        difficulty: p.problemId.difficulty,
        companies: p.problemId.companies,
        url: p.problemId.url,
        solved: p.solved,
        bookmarkedAt: p.updatedAt,
      }));

    res.status(200).json({
      success: true,
      notes,
      bookmarkedProblems,
    });
  } catch (error) {
    console.error("Get Revision Vault Error:", error.message);
    res.status(500).json({ message: "Server error fetching revision vault" });
  }
};

// @route   POST /api/revision/note
// @access  Private
const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, category, tags, content, codeSnippet } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and Content are required" });
    }

    const newNote = await RevisionNote.create({
      userId,
      title,
      category: category || "General",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map(t => t.trim()) : [],
      content,
      codeSnippet: codeSnippet || "",
      lastRevisedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      data: newNote,
    });
  } catch (error) {
    console.error("Create Revision Note Error:", error.message);
    res.status(500).json({ message: "Server error creating revision note" });
  }
};

// @route   DELETE /api/revision/note/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    await RevisionNote.findOneAndDelete({ _id: id, userId });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("Delete Revision Note Error:", error.message);
    res.status(500).json({ message: "Server error deleting note" });
  }
};

module.exports = {
  getVaultData,
  createNote,
  deleteNote,
};
