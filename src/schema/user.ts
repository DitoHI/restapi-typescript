import * as mongoose from 'mongoose';

interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  isActived: boolean;
  userOriginalProfile: string;
}

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  isActived: { type: Boolean, default: true },
  userOriginalProfile: { required: false, type: String, default: null }
});

const userModel = mongoose.model('Users', userSchema);

export { IUser, userModel };
