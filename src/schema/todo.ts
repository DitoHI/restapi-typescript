import * as mongoose from 'mongoose';

interface ITodo {
  _id: string;
  name: string;
  note: string;
  comments: string[];
  todoList: string;
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
  comment: [{
    type: String,
  }],
  todoList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TodoList'
  }
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
