import express from "express";
import Idea from "../models/Idea.js";

const router = express.Router();

// GET - all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - create idea
router.post("/", async (req, res) => {
  try {
    const { title, description, author } = req.body;
    const newIdea = new Idea({ title, description, author });
    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - upvote
router.put("/:id/upvote", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    idea.upvotes += 1;
    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - remove idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json({ message: "Idea deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - add comment
router.post("/:id/comments", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    idea.comments.push({ text: req.body.text, author: req.body.author });
    await idea.save();
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;