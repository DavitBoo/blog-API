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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const post_1 = require("../models/post");
const label_1 = require("../models/label");
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const router = express_1.default.Router();
// Create post route
router.post("/posts", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenString = req.token; // because of TS types
    jsonwebtoken_1.default.verify(tokenString, "secretkey", (err, authData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        if (err) {
            console.error(err);
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ error: "Token has expired" });
            }
            else {
                res.status(401).send({ error: "Unauthorized" });
            }
        }
        else {
            //i think I wont need an else since it will stop in the error if there is one
            const { title, body, thumbnail, category, labels, published } = req.body;
            const newPost = new post_1.Post({ title, body, thumbnail, category, labels, published });
            yield newPost.save();
            res.json({
                message: "El post se ha creado",
                authData,
            });
            // res.status(201).send({ message: "Post created successfully" });
        }
    }));
}));
// Get all posts route
router.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const labelName = req.query.label;
        if (labelName) {
            const label = yield label_1.Label.findOne({ name: labelName });
            if (!label) {
                return res.status(404).json({ error: "Label not found" });
            }
            const posts = yield post_1.Post.find({ labels: label._id });
            return res.json(posts);
        }
        const posts = yield post_1.Post.find();
        return res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
// Get single post route
router.get("/posts/:postId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_1.Post.findById(req.params.postId);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
// Update post route
router.put("/posts/:id", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const tokenString = req.token;
    jsonwebtoken_1.default.verify(tokenString, "secretkey", (err, authData) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ error: "Token has expired" });
            }
            else {
                res.status(401).send({ error: "Unauthorized" });
            }
        }
        else {
            const { title, body, thumbnail, category, labels, published } = req.body;
            try {
                const updatedPost = yield post_1.Post.findByIdAndUpdate(id, { title, body, thumbnail, category, labels, published }, { new: true, runValidators: true });
                if (!updatedPost) {
                    res.status(404).json({ message: "Post not found" });
                    return;
                }
                res.json({
                    message: "El post se ha actualizado",
                    post: updatedPost,
                    authData,
                });
            }
            catch (error) {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }));
}));
router.delete("/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedPost = yield post_1.Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ deleted: id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the post" });
    }
}));
exports.default = router;
