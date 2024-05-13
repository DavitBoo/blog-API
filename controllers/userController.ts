import express from "express";
import jwt, { SignCallback } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, IUser } from "../models/user";

interface JwtPayload {
  user: IUser; // Assuming UserType is the type of your user model
}

const router = express.Router();

// Create user route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists in the data base
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    //encrypt the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // console.log(hash);

    // Create a new user
    const newUser = new User({ username, password: hash });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login user route
router.post("/login", async (req, res) => {
  // const { username, password } = {username:'David', password:'password'};
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  jwt.sign({ user }, "secretkey", { expiresIn: 30 }, (err: Error | null, token?: string) => {
    res.json({
      token,
    });
  });
});

/*
router.post("/logout", async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .json({ message: "Logout successful" });
});
*/

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
