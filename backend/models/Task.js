import { Schema, Types, model } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  board: Number,
  order: Number,
  endDate: Date,
  members: {type: [{type: Types.ObjectId, ref: 'User'}], default: undefined},
  comments: {type: [{type: Types.ObjectId, ref: 'Comment'}], default: undefined},
  attachments: {type: [{type: Types.ObjectId, ref: 'Attachment'}], default: undefined},
  tags: {type: [{_id: String, color: String, name: String}], default: undefined},
  todoGroup: {type: [{title: String, list: [{type: Types.ObjectId, ref: 'Todo'}]}], default: undefined},
  archived: Boolean,
  desc: String,
  createdAt: {type: Date, default: Date.now}
});

export default model('Task', TaskSchema);
