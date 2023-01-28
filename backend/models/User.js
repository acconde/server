import { Schema, Types, model } from "mongoose";
import { hashSync, compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  avatar: String,
  email: String,
  password: String,
  contacts: [{type: Types.ObjectId, ref: 'User'}],
  notifications: [{type: Types.ObjectId, ref: 'Notification'}],
  createdAt: {type: Date, default: Date.now},
});

UserSchema.methods.setPassword = function (password) {
  this.password = hashSync(password, 8);
};

UserSchema.methods.validatePassword = function (password) {
  return compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function () {
  return sign(
    {
      id: this._id,
    },
    "secret"
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

export default model('User', UserSchema);
