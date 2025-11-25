const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, default: "Open" },
    effort: { type: Number, default: 0 },
    dueDate: { type: Date }   // <-- Correct field name
  },
  { timestamps: true }         // <-- Automatically adds createdAt + updatedAt
);

module.exports = mongoose.model("Issue", IssueSchema);
