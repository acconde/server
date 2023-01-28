import { Schema, Types, model } from "mongoose";

const NoteSchema = new Schema({
  text: String,
  user: {type: Types.ObjectId, ref: 'User'},
  project: {type: Types.ObjectId, ref: 'Project'}
});

export default model('Note', NoteSchema);
