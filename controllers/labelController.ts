import express from "express";
import { Label } from "../models/label";

const router = express.Router();
// Create label
router.post("/:labelId", async (req, res) => {
    const { name, description } = req.body;
    const postId = req.params.labelId;

    const newLabel = new Label({ name, description });
    await newLabel.save();

    res.status(201).send({ message: "Label created successfully" });
});

// Get all labels
router.get('/:labelId', async (req, res) => {
    const postId = req.params.labelId;
    try {
        const labels = await Label.find({ postId });
        res.json(labels);
    } catch (error: any) {
        // Handle the error
        res.status(error.status || 500).json({ error: error.message });
        return;
      }
  });

export default router;