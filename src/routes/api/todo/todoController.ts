import mongoose from 'mongoose';
import { ITodo, ITodoList } from '../../../schema';

// use case
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;

const todoMongooseModel = mongoose.model('Todo');
const todoListMongooseModel = mongoose.model('TodoList');

export const createTodo = (req: any, res: any) => {
  if (!req.body.name) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please input the name of your Todo'
    });
  }

  if (!req.body.todoList) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please input the id of your TodoList'
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.todoList);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type'
    });
  }

  const todoModel = new todoMongooseModel(req.body);
  todoModel
    .save()
    .then((todoResult: any) => {
      // update todoList too
      return todoListMongooseModel
        .findById(req.body.todoList)
        .exec()
        .then((todoListResult: any) => {

          if (!todoListResult) {
            // delete saved todo
            return todoMongooseModel
              .findByIdAndDelete(todoResult._id).exec().then(() => {
                return res.status(STATUS_BAD_REQUEST).json({
                  message: 'TodoList not found'
                });
              });
          }

          const todoList = todoListResult as ITodoList;
          if (todoList.todo.length === 0) {
            todoList.todo = [];
          }
          todoList.todo.push(todoResult._id);

          return todoListMongooseModel
            .findByIdAndUpdate(req.body.todoList, { todo: todoList.todo }, { new: true })
            .then((todoListUpdatedResult: any) => {
              return res.status(STATUS_CREATED).json({
                todo: todoModel,
                message: 'Todo created'
              });
            })
            .catch(() => {
              return res.status(STATUS_BAD_REQUEST).json({
                message: 'Error in updating todoList inside todo'
              });
            });
        })
        .catch(() => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Error in updating todoList inside todo'
          });
        });

    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: err
      });
    });
};
