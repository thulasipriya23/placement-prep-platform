const mongoose = require("mongoose");

const revisionNoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["DSA", "CoreCS", "SystemDesign", "Aptitude", "HR", "General"],
      default: "General",
    },
    tags: [
      {
        type: String,
      },
    ],
    content: {
      type: String,
      required: true,
    },
    codeSnippet: {
      type: String,
      default: "",
    },
    lastRevisedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RevisionNote", revisionNoteSchema);
