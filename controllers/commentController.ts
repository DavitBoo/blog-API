import express from "express";
import { Comment } from "../models/comment";
import { Post } from "../models/post";


const router = express.Router();

// Create comment route
router.post("/posts/:id/comments", async (req, res) => {
  const { username, email, commentContent } = req.body;
  const postId = req.params.id;

  const newComment = new Comment({ username, email, commentContent, postId });
  await newComment.save();

  const post = await Post.findById(postId);
  post?.comments.push(newComment._id);
  await post?.save();

  res.status(201).send({ message: "Comment created successfully" });
});

// Get all comments for a post route
router.get("/posts/:id/comments", async (req, res) => {
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


// edit comment 
router.post('/posts/:id/comments/:commentId', async(req, res) => {
  // const postId = req.params.id;
  const commentId = req.params.commentId
  const { commentContent, username, email } = req.body;


  try {
    // const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }

    if (commentContent) comment.commentContent = commentContent;
    // if (username) comment.username = username;
    // if (email) comment.email = email;

    await comment.save(); 

  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
})

// edit comment
router.put('/posts/:id/comments/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  const { commentContent } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).send({ message: 'Comment not found' });
    }

    if (commentContent) comment.commentContent = commentContent;

    await comment.save();

    res.send({ message: 'Comment updated successfully', comment });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});


// delete comment 
router.delete('/posts/:id/comments/:commentId', async(req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const commentIndex = post.comments.indexOf(commentId);
    await Comment.findByIdAndDelete(commentId);

    post.comments.splice(commentIndex, 1);

    await post.save();

    res.send({ message: 'Comment deleted successfully' });

  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
})

export default router;
