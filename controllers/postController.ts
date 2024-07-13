import express, { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

import { Post } from "../models/post";
import { Label } from "../models/label";
import verifyToken from "../middleware/verifyToken";

const router = express.Router();

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

// Create post route
router.post("/posts", verifyToken, async (req, res) => {
  const tokenString = (req as CustomRequest).token as string; // because of TS types
  jwt.verify(tokenString, "secretkey", async (err, authData) => {
    console.log(req.body);
    if (err) {
      console.error(err);
      if (err.name === "TokenExpiredError") {
        res.status(401).send({ error: "Token has expired" });
      } else {
        res.status(401).send({ error: "Unauthorized" });
      }
    } else {
      //i think I wont need an else since it will stop in the error if there is one
      const { title, body, thumbnail, category, labels, published } = req.body;
      const newPost = new Post({ title, body, thumbnail, category, labels, published });
      await newPost.save();

      res.json({
        message: "El post se ha creado",
        authData,
      });

      // res.status(201).send({ message: "Post created successfully" });
    }
  });
});

// Get all posts route
router.get("/posts", async (req, res) => {
  try {
    const labelName = req.query.label;
    if (labelName) {
      const label = await Label.findOne({ name: labelName });

      if (!label) {
        return res.status(404).json({ error: "Label not found" });
      }

      const posts = await Post.find({ labels: label._id });
      return res.json(posts);
    }

    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

// Get single post route
router.get("/posts/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

// Update post route
router.put("/posts/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const tokenString = (req as CustomRequest).token as string;

  jwt.verify(tokenString, "secretkey", async (err, authData) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        res.status(401).send({ error: "Token has expired" });
      } else {
        res.status(401).send({ error: "Unauthorized" });
      }
    } else {
      const { title, body, thumbnail, category, labels, published } = req.body;

      try {
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, body, thumbnail, category, labels, published },
          { new: true, runValidators: true }
        );

        if (!updatedPost) {
          res.status(404).json({ message: "Post not found" });
          return;
        }

        res.json({
          message: "El post se ha actualizado",
          post: updatedPost,
          authData,
        });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });
});

router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    res.status(200).json({ deleted: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the post" });
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

export default router;
