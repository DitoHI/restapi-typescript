import * as mongoose from 'mongoose';

interface ITodoList {
  _id: string;
  name: string;
  user: any[];
  todo: any[];
  createdBy: string;
}

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Empty ToDoList'
  },
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const todoListModel = mongoose.model('TodoList', todoListSchema);

export { ITodoList };
