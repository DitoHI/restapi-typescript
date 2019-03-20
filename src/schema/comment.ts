import * as mongoose from 'mongoose';

interface IComment {
  _id: string;
  name: string;
  user: string;
  todo: string;
}

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Empty ToDo'
  },
  note: {
    type: String,
    default: 'Empty Note'
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  todo: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const commentModel = mongoose.model('Comment', commentSchema);

export { IComment };
