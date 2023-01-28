import { Schema, Types, model } from "mongoose";

const TodoSchema = new Schema({
  text: String,
  checked: Boolean,
  user: {type: Types.ObjectId, ref: 'User'},
  project: {type: Types.ObjectId, ref: 'Project'}
});

export default model('Todo', TodoSchema);
