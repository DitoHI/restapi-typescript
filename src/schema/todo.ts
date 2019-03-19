import * as mongoose from 'mongoose';

interface ITodo {
  _id: string;
  name: string;
  note: string;
  comments: string[];
  todoList: string;
}

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Empty ToDo'
  },
  note: {
    type: String,
    default: 'Empty Note'
  },
  comment: [{
    type: String,
    default: 'Empty Comment'
  }],
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList'
  }
});

const todoListModel = mongoose.model('Todo', todoListSchema);

export { ITodo };
