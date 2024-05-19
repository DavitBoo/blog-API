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

//parece que funciona pero creo que debería establecer el Cache-control en el header
// ! generaba error con la verificación del token. Al expirar el token antes me estaba volviendo loco haciendo pruebas
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));

const port = process.env.PORT || 3000;

app.use(express.json());


// ! using cors in this way I am allowing conections from everywhere, usefull for development, but not for producto
app.use(cors());

//! in close future replace for something like:
// app.use(cors({
//   origin: 'https://tu-dominio.com'  
// }));

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
