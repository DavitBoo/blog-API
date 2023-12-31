import mongoose, { Schema, Document } from "mongoose";

const commentSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, optional: true },
  commentContent: { type: String, required: true },
  timestamp: { type: Date, required: true },
  userAvatar: { type: String, default: "default-avatar.png" },
  //answers: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], // IDs of replies
  votes: { type: Number, default: 0 },
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
}

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
