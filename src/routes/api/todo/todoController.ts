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
            .populate({ path: 'todo', select: 'name note createdAt' })
            .populate({ path: 'createdBy', select: 'name username email' })
            .then((todoListUpdatedResult: any) => {
              return res.status(STATUS_CREATED).json({
                todoList: todoListUpdatedResult,
                message: 'Check out new Todo inside your TodoList'
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

export const getTodo = (req: any, res: any) => {
  if (req.body.id) {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
    if (!isValidObjectId) {
      return res.status(STATUS_NOT_ACCEPTABLE).json({
        message: 'Invalid Id type'
      });
    }
  }

  const findTodo: { [k: string]: any } = {};
  req.body.id
    ? findTodo._id = new mongoose.Types.ObjectId(req.body.id)
    : null;
  req.body.name
    ? findTodo.name = new RegExp(`^${req.body.name}$`, 'i')
    : null;
  req.body.note
    ? findTodo.note = new RegExp(`^${req.body.note}$`, 'i')
    : null;
  req.body.startAt && req.body.endAt
    ? findTodo.createdAt = {
      $gte: new Date(req.body.startAt),
      $lt: new Date(req.body.endAt)
    }
    : null;

  todoMongooseModel
    .find(findTodo)
    .populate({ path: 'todoList', select: '_id name user' })
    .populate({ path: 'comment', select: '_id name' })
    .then((todoResult: any) => {
      if (todoResult.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No Todo found'
        });
      }

      // filter by ToDoList from user
      const todoFilter = todoResult.filter((todoResultFilter: any) => {
        if (todoResultFilter.todoList) {
          const indexOfUserinTodoList = todoResultFilter.todoList.user.indexOf(req.user._id);
          if (indexOfUserinTodoList >= 0) {
            return todoResultFilter;
          }
        }
      });

      if (todoFilter.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No Todo found'
        });
      }

      return res.status(STATUS_OK).json({
        todo: todoFilter,
        message: 'ToDo found'
      });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Not getting any ToDo'
      });
    });
};

export const updateTodo = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the id'
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type'
    });
  }

  const updatedTodo: { [k: string]: any } = {};
  req.body.name
    ? updatedTodo.name = req.body.name
    : null;
  req.body.note
    ? updatedTodo.note = req.body.note
    : null;

  todoMongooseModel
    .findByIdAndUpdate(req.body.id, updatedTodo, { new: true })
    .populate({ path: 'todoList', select: '_id name' })
    .exec()
    .then((todoResult: any) => {
      if (!todoResult) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'ToDo not found'
        });
      }

      return res.status(STATUS_OK).json({
        todo: todoResult,
        message: 'ToDo updated'
      });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Error in updating ToDo'
      });
    });
};

export const deleteToDo = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the id'
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type'
    });
  }

  todoMongooseModel
    .findByIdAndRemove(req.body.id)
    .populate({ path: 'todoList', select: '_id todo' })
    .then((todoDeleted: any) => {
      if (!todoDeleted) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'ToDo not found'
        });
      }

      // deleting todo in todoList
      const indexOfTodoinTodoList = todoDeleted.todoList.todo.indexOf(todoDeleted._id);
      if (indexOfTodoinTodoList < 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'Finding Todo inside TodoList failed'
        });
      }
      todoDeleted.todoList.todo.splice(indexOfTodoinTodoList, 1);
      todoListMongooseModel
        .findByIdAndUpdate(todoDeleted.todoList._id, { todo: todoDeleted.todoList.todo },
                           { new: true })
        .select('_id name')
        .then((todoListResult) => {

          return res.status(STATUS_OK).json({
            todo: todoDeleted,
            todoList: todoListResult,
            message: 'Todo deleted'
          });
        })
        .catch((err) => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Error updating TodoList inside ToDO'
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Error in deleting ToDO'
      });
    });
};
