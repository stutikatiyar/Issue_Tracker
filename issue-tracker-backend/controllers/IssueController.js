const Issue = require("../models/Issue");

// GET all issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error("GET ISSUES ERROR:", err);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
};

// GET single issue
exports.getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (err) {
    console.error("GET ISSUE ERROR:", err);
    res.status(500).json({ message: "Failed to fetch issue" });
  }
};

// CREATE new issue
exports.createIssue = async (req, res) => {
  try {
    const issue = new Issue({
      title: req.body.title,
      owner: req.body.owner,
      status: req.body.status,
      effort: req.body.effort,
      dueDate: req.body.dueDate,
    });

    const saved = await issue.save();
    res.json(saved);

  } catch (err) {
    console.error("CREATE ISSUE ERROR:", err);
    res.status(500).json({ error: "Failed to create issue" });
  }
};

// UPDATE
exports.updateIssue = async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        owner: req.body.owner,
        status: req.body.status,
        effort: req.body.effort,
        dueDate: req.body.dueDate,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: "Failed to update issue" });
  }
};

// DELETE
exports.deleteIssue = async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Failed to delete issue" });
  }
};
