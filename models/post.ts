import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

const postSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  thumbnail: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  timestamp: { type: Date, default: Date.now() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  labels: [{ type: String }],
  published: { type: Boolean, required: true, default: false },
});

export interface IPost extends Document {
  _id: string;
  title: string;
  body: string;
  thumbnail: string;
  comments: Array<string>; // IDs of comments
  timestamp: Date;
  author: IUser; // User object
  labels: Array<string>;
  published: boolean;
}

export const Post = mongoose.model<IPost>("Post", postSchema);
