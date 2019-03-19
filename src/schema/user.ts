import * as mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

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
  username: { type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'] },
  email: {
    type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'],
    match: [/\S+@\S+\.\S+/, 'is invalid'], index: true
  },
  password: {
    type: String, required: [true, 'can\'t be blank']
  },
  name: { type: String, lowercase: true, required: [true, 'can\'t be blank'] },
  isActived: { type: Boolean, default: true },
  userOriginalProfile: { required: false, type: String, default: null },
  todoList: [{ type: mongoose.Schema.Types.ObjectId, ref:'TodoList' }]
});

userSchema.plugin(mongooseUniqueValidator, { message: 'is already taken' });

const userModel = mongoose.model('User', userSchema);

export { IUser };
