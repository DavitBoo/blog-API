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
    const labels = await Label.findById(labelId);
    res.json(labels);
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});


// Delete a label
router.delete("/label/:labelId", async (req, res) => {
  const labelId = req.params.labelId;
  try {
    const label = await Label.findByIdAndDelete(labelId);
    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }
    res.status(200).send({ message: "Label deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

// Edit a label
router.put("/label/:labelId", async (req, res) => {
  const labelId = req.params.labelId;
  const { name, description } = req.body;
  try {
    const label = await Label.findByIdAndUpdate(
      labelId,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!label) {
      return res.status(404).json({ error: "Label not found" });
    }
    res.status(200).json(label);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});


export default router;
