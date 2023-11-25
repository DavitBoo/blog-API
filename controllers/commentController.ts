import express from 'express';
import { Comment } from '../models/comment';

const router = express.Router();

// Create comment route
router.post('/:postId', async (req, res) => {
  const { username, email, commentContent } = req.body;
  const postId = req.params.postId;

  const newComment = new Comment({ username, email, commentContent, postId });
  await newComment.save();

  res.status(201).send({ message: 'Comment created successfully' });
});

// Get all comments for a post route
router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId });
  res.send(comments);
});

export default router;