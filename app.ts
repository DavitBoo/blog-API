import express from "express";

import { User } from "./models/user";

import userRouter from "./controllers/userController";
import postRouter from "./controllers/postController";
import commentRouter from "./controllers/commentController";
import labelRouter from "./controllers/labelController";

import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

//set up mongoose
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

if (!process.env.MONGODB_URI) {
  throw new Error("Missing mongo URI environment variable");
}

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
  console.log("connection to DB success");
}

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
app.use("/api", labelRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de mi blog!!!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
