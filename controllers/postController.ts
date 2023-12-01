import express from "express";
import { Post } from "../models/post";

const router = express.Router();

// Create post route
router.post("/post", async (req, res) => {
  const { title, body, thumbnail, category, labels } = req.body;

  const newPost = new Post({ title, body, thumbnail, category, labels });
  await newPost.save();

  res.status(201).send({ message: "Post created successfully" });
});

// Get all posts route
router.get("posts/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

// Get single post route
router.get("posts/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

router.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  // code to update an article...
  res.json(req.body);
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  // code to delete an article...
  res.json({ deleted: id });
});

export default router;
