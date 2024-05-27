import mongoose, { Schema, Document } from "mongoose";

const commentSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, optional: true },
  commentContent: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  userAvatar: { type: String, default: "default-avatar.png" },
  //answers: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // IDs of replies
  votes: { type: Number, default: 0 },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true }
});

export interface IComment extends Document {
  _id: string;
  username: string;
  email: string;
  commentContent: string;
  timestamp: Date;
  userAvatar: string;
  // answers: Array<string>; // IDs of replies
  votes: number;
  postId: string;
}

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
