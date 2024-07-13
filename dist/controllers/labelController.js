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
const label_1 = require("../models/label");
const router = express_1.default.Router();
// Create label
router.post("/label", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    // const postId = req.params.labelId;
    const newLabel = new label_1.Label({ name, description });
    yield newLabel.save();
    res.status(201).send({ message: "Label created successfully" });
}));
// Get all labels
router.get("/label", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const label = yield label_1.Label.find();
        return res.json(label);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
// Get a label
router.get("/label/:labelId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    try {
        const labels = yield label_1.Label.find({ labelId });
        res.json(labels);
    }
    catch (error) {
        // Handle the error
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
// Delete a label
router.delete("/label/:labelId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    try {
        const label = yield label_1.Label.findByIdAndDelete(labelId);
        if (!label) {
            return res.status(404).json({ error: "Label not found" });
        }
        res.status(200).send({ message: "Label deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
// Edit a label
router.put("/label/:labelId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const labelId = req.params.labelId;
    const { name, description } = req.body;
    try {
        const label = yield label_1.Label.findByIdAndUpdate(labelId, { name, description }, { new: true, runValidators: true });
        if (!label) {
            return res.status(404).json({ error: "Label not found" });
        }
        res.status(200).json(label);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
}));
exports.default = router;
