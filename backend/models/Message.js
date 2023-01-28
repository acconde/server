import { Schema, Types, model } from "mongoose";

const MessageSchema = new Schema({
  conversationId: Types.ObjectId,
  user: {type: Types.ObjectId, ref: 'User'},
  text: String,
  image: String,
  file: String,
  fileName: String,
  seenBy: [{type: Types.ObjectId}],
  createdAt: {type: Date, default: Date.now},
});

export default model('Message', MessageSchema);
