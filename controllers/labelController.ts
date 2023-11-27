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
// router.get('/:postId', async (req, res) => {
//     const postId = req.params.postId;
//     const labels = await Label.find({ postId });
//     res.send(labels);
//   });

export default router;