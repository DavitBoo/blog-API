import express from 'express';
import { User } from '../models/user';

const router = express.Router();

// Create user route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({ username, password });
  await newUser.save();

  res.status(201).send({ message: 'User created successfully' });
});

// Login user route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

});

export default router;