import * as mongoose from 'mongoose';

interface IComment {
  _id: string;
  name: string;
  user: string;
  todo: string;
  createdAt: Date;
}

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Empty Comment'
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  todo: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const commentModel = mongoose.model('Comment', commentSchema);

export { IComment };
