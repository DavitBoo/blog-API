import mongoose, { Schema, Document } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export interface IUser extends Document {
  username: string;
  password: string;
}

export const User = mongoose.model<IUser>('User', userSchema);