import * as mongoose from 'mongoose';

interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  isActived: { type: Boolean, default: true },
});

const userModel = mongoose.model('Users', userSchema);

export { IUser, userModel };
