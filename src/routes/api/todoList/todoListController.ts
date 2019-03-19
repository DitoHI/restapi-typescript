import * as mongoose from 'mongoose';
import { ITodoList, IUser } from '../../../schema';

// use case
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;
const todoListMongooseModel = mongoose.model('TodoList');
const userModelMongooseModel = mongoose.model('User');

export const createTodoList = (req: any, res: any) => {
  if (!req.body.name) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please input the name of your list'
    });
  }

  req.body.user = req.user._id;
  const todoListModel = new todoListMongooseModel(req.body);
  todoListModel
    .save()
    .then((todoListResult: any) => {

      const todoList = todoListResult as ITodoList;
      // update todoList ref in user
      userModelMongooseModel
        .findById(todoList.user)
        .then((userResult: any) => {

          const user = userResult as IUser;

          if (!userResult) {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'Requesting user from TodoList failed'
            });
          }

          if (user.todoList.length === 0) {
            user.todoList = [];
          }
          user.todoList.push(todoList._id);
          userModelMongooseModel
            .findByIdAndUpdate(user._id, { todoList: user.todoList }, { new: true })
            .then((userUpdatedResult: any) => {

              const userUpdated = userUpdatedResult as IUser;

              return res.status(STATUS_CREATED).json({
                todoList,
                user: userUpdated,
                message: 'TodoList Created'
              });
            })
            .catch((err) => {
              return res.status(STATUS_BAD_REQUEST).json({
                message: 'Error in updating new ToDoList in User'
              });
            });

        })
        .catch((err) => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Error in updating new ToDoList in User'
          });
        });
    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Error saving TodoList'
      });
    });
};

export const readTodoList = (req: any, res: any) => {
  if (!req.body.id && !req.body.name) {
    return res.status(STATUS_BAD_REQUEST).json({
      message: 'Please specify the name or id'
    })
  }
};
