import express from 'express';
import { Comment } from '../models/comment';

const router = express.Router();


// Create comment route
router.post('/posts/:id/comments', async (req, res) => {
  const { username, email, commentContent } = req.body;
  // const postId = req.params.id;

  const newComment = new Comment({ username, email, commentContent /*, postId*/ });
  await newComment.save();

  res.status(201).send({ message: 'Comment created successfully' });
});

// Get all comments for a post route
router.get('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;

  // Try to find the comments for the post
  try {
    const comments = await Comment.find({ postId });
    res.json(comments);
  } catch (error) {
    // Handle the error
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  // Send the comments to the client
});

export default router;