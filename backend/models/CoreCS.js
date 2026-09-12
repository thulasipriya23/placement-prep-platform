const mongoose = require("mongoose");

const coreCSSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["OS", "DBMS", "CN", "OOPs", "LLD", "HLD", "Quant", "Logical", "Verbal"],
    },
    section: {
      type: String,
      required: true,
      enum: ["CoreCS", "SystemDesign", "Aptitude"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    summary: {
      type: String,
      required: true,
    },
    keyConcepts: [
      {
        type: String,
      },
    ],
    formulas: [
      {
        title: String,
        formula: String,
        description: String,
      },
    ],
    codeSnippet: {
      type: String,
      default: "",
    },
    interviewQuestions: [
      {
        question: String,
        answer: String,
        code: String,
        companies: [String],
      },
    ],
    quizQuestions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number, // Index of option 0-3
        explanation: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CoreCS", coreCSSchema);
