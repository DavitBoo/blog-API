import express from "express";
import { Label } from "../models/label";

const router = express.Router();
// Create label
router.post("/label", async (req, res) => {
  const { name, description } = req.body;
  // const postId = req.params.labelId;

  const newLabel = new Label({ name, description });
  await newLabel.save();

  res.status(201).send({ message: "Label created successfully" });
});

// Get all labels
router.get("/label", async (req, res) => {
  try {
    const label = await Label.find();
    return res.json(label);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

// Get a label
router.get("/label/:labelId", async (req, res) => {
  const labelId = req.params.labelId;
  try {
    const labels = await Label.find({ labelId });
    res.json(labels);
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export default router;
