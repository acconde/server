import { Schema, Types, model } from "mongoose";

const ProjectSchema = new Schema({
  name: String,
  members: [{user: {type: Types.ObjectId, ref: 'User'}, role: Number}], // 1 = admin , 2 = member , 3 = pending
  image: String,
  archived: Boolean,
  calendar: [{type: {notes: [], date: Date}, default: undefined}],
  tasks: [{type: Types.ObjectId, ref: 'Task'}],
  history: [{title: String, createdAt: {type: Date, default: Date.now}}],
  createdAt: {type: Date, default: Date.now},
  mutedBy: {type: [{type: Types.ObjectId, ref: 'User'}], default: undefined}
}, {
  toJSON: {virtuals: true}
});

export default model('Project', ProjectSchema);
