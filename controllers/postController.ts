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
  const posts = await Post.find();
  res.send(posts);
});

// Get single post route
router.get("posts/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  res.json(post);
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
