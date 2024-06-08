"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_1 = require("../models/comment");
const post_1 = require("../models/post");
const router = express_1.default.Router();
// Create comment route
router.post("/posts/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, commentContent } = req.body;
    const postId = req.params.id;
    const newComment = new comment_1.Comment({ username, email, commentContent, postId });
    yield newComment.save();
    const post = yield post_1.Post.findById(postId);
    post === null || post === void 0 ? void 0 : post.comments.push(newComment._id);
    yield (post === null || post === void 0 ? void 0 : post.save());
    res.status(201).send({ message: "Comment created successfully" });
}));
// Get all comments for a post route
router.get("/posts/:id/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    // Try to find the comments for the post
    try {
        const comments = yield comment_1.Comment.find({ postId });
        res.json(comments);
    }
    catch (error) {
        // Handle the error
        res.status(500).json({ error: "Internal server error" });
        return;
    }
    // Send the comments to the client
}));
// edit comment 
router.post('/posts/:id/comments/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const postId = req.params.id;
    const commentId = req.params.commentId;
    const { commentContent, username, email } = req.body;
    try {
        // const post = await Post.findById(postId);
        const comment = yield comment_1.Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        if (commentContent)
            comment.commentContent = commentContent;
        // if (username) comment.username = username;
        // if (email) comment.email = email;
        yield comment.save();
    }
    catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}));
// edit comment
router.put('/posts/:id/comments/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const { commentContent } = req.body;
    try {
        const comment = yield comment_1.Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        if (commentContent)
            comment.commentContent = commentContent;
        yield comment.save();
        res.send({ message: 'Comment updated successfully', comment });
    }
    catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}));
// delete comment 
router.delete('/posts/:id/comments/:commentId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const commentId = req.params.commentId;
    try {
        const post = yield post_1.Post.findById(postId);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        const commentIndex = post.comments.indexOf(commentId);
        yield comment_1.Comment.findByIdAndDelete(commentId);
        post.comments.splice(commentIndex, 1);
        yield post.save();
        res.send({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
}));
exports.default = router;
