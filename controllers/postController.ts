import express from 'express';
import { Post } from '../models/post';

const router = express.Router();

// Create post route
router.post('/', async (req, res) => {
  const { title, body, thumbnail, category, labels } = req.body;

  const newPost = new Post({ title, body, thumbnail, category, labels });
  await newPost.save();

  res.status(201).send({ message: 'Post created successfully' });
});

// Get all posts route
router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});

// Get single post route
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }

  res.json(post);
});

export default router;