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
const router = express_1.default.Router();
// Create comment route
router.post('/posts/:id/comments/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, commentContent } = req.body;
    const postId = req.params.postId;
    const newComment = new comment_1.Comment({ username, email, commentContent, postId });
    yield newComment.save();
    res.status(201).send({ message: 'Comment created successfully' });
}));
// Get all comments for a post route
router.get('/posts/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = router;
