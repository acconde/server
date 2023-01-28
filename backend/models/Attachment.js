import { Schema, model } from "mongoose";

const AttachmentSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  name: String,
  src: String,
  type: String,
  size: Number
});

export default model('Attachment', AttachmentSchema);
