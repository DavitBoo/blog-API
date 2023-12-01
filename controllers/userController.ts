import express from "express";
import { User } from "../models/user";


const router = express.Router();

// Create user route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  await newUser.save();

  res.status(201).send({ message: "User created successfully" });
});

// Login user route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(error.status || 500).json({ error: error.message });
    return;
  }
});

export default router;
