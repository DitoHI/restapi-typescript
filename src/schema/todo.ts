import * as mongoose from 'mongoose';

interface ITodo {
  _id: string;
  name: string;
  note: string;
  comments: string[];
  todoList: string;
  isBookmarked: boolean;
  isCompleted: boolean;
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
