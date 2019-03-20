import * as mongoose from 'mongoose';

interface ITodo {
  _id: string;
  name: string;
  note: string;
  comment: string[];
  todoList: string;
  isBookmarked: boolean;
  isCompleted: boolean;
  createdAt: Date;
}

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Empty ToDo'
  },
  note: {
    type: String,
    default: 'Empty Note'
  },
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList'
  },
  isBookmarked: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
});

todoSchema.methods.toJSONFor = () => {
  return {
    name: this.name,
    note: this.note,
    comment: this.comment,
  };
};

const todoListModel = mongoose.model('Todo', todoSchema);

export { ITodo };
