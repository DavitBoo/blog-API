import express, { NextFunction, Request, Response } from "express";
import { Jwt } from "jsonwebtoken";

import { User } from "./models/user";

import userRouter from "./controllers/userController";
import postRouter from "./controllers/postController";
import commentRouter from "./controllers/commentController";
import labelRouter from "./controllers/labelController";
import apicache from 'apicache';

import cors from "cors";
require("dotenv").config();

const app = express();

let cache = apicache.middleware;
app.use(cache('5 minutes', {
  maxAge: 300,
}));

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

//set up mongoose
import mongoose from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
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
  res.json("Bienvenido a la API de mi blog!!!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
