import { Schema, Types, model } from "mongoose";

const ConversationSchema = new Schema({
  users: [{type: Types.ObjectId, ref: 'User'}],
  isGroup: Boolean,
  name: String,
  image: String,
  admin: {type: Types.ObjectId},
  createdAt: {type: Date, default: Date.now}
});

export default model('Conversation', ConversationSchema);
