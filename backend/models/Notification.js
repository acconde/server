import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  title: String,
  seen: Boolean,
  createdAt: {type: Date, default: Date.now}
});

export default model('Notification', NotificationSchema);
