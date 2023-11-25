import mongoose, { Schema, Document } from 'mongoose';

const labelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, optional: true },
});

export interface ILabel extends Document {
  _id: string;
  name: string;
  description: string;
}

export const Label = mongoose.model<ILabel>('Label', labelSchema);