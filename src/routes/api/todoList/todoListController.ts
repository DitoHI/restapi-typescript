import mongoose from 'mongoose';
import { ITodoList, IUser } from '../../../schema';

// use case
const STATUS_OK = 200;
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
      return userModelMongooseModel
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
          return userModelMongooseModel
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
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the name or id'
    });
  }

  if (req.body.id) {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
    if (!isValidObjectId) {
      return res.status(STATUS_NOT_ACCEPTABLE).json({
        message: 'Id is not valid'
      });
    }
  }

  const findTodoList: { [k: string]: any } = {};
  req.body.id
    ? findTodoList._id = new mongoose.Types.ObjectId(req.body.id)
    : null;
  req.body.name
    ? findTodoList.name = new RegExp(`^${req.body.name}$`, 'i')
    : null;

  todoListMongooseModel
    .find(findTodoList)
    .populate({ path: 'user', select: '_id name username email' })
    // .populate('todo')
    .then(async (todoListResult: any) => {

      const todoListArray = todoListResult as ITodoList[];
      if (todoListArray.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No ToDoList found'
        });
      }

      // filter the result
      // just return todoList which has the user id
      const todoListArrayFiltered = await todoListArray.filter((filtered: any) => {
        return filtered.user.map((newFiltered: any) => {
          if (newFiltered._id === req.user._id) {
            return filtered;
          }
        });
      });

      if (todoListArrayFiltered.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No ToDoList found'
        });
      }

      // testing
      return res.status(STATUS_OK).json({
        message: 'TodoList found',
        todoList: todoListArrayFiltered,
      });

    });
};

export const updateTodoList = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the id'
    });
  }

  if (!req.body.name) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify any new name'
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type'
    });
  }

  todoListMongooseModel
    .findByIdAndUpdate(req.body.id, { name: req.body.name }, { new: true })
    .populate({ path: 'user', select: '_id name username email' })
    .then((todoListResult) => {
      if (!todoListResult) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'ToDoList not found'
        });
      }

      return res.status(STATUS_OK).json({
        message: 'TodoList updated',
        todoList: todoListResult
      });
    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Failed to update TodoList'
      });
    });
};

export const deleteTodoList = (req: any, res: any) => {
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

  todoListMongooseModel
    .findByIdAndRemove(req.body.id)
    .populate({ path: 'user', select: '_id name username email todoList' })
    .exec()
    .then(async (todoListDeleted: any) => {

      // find corresponding user
      const userIdArray = await todoListDeleted.user.filter((todoListMap: any) => {
        if (req.user._id.equals(todoListMap._id)) {
          return todoListMap;
        }
      });

      if (userIdArray.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'TodoList does not have any correlation with the user'
        });
      }

      const indexOfTodoInUser = userIdArray[0].todoList.indexOf(todoListDeleted._id);
      userIdArray[0].todoList.splice(indexOfTodoInUser, 1);

      userModelMongooseModel
        .findByIdAndUpdate(req.user._id, { todoList: userIdArray[0].todoList }, { new: true })
        .exec()
        .then((userResult) => {
          return res.status(STATUS_OK).json({
            user: userResult,
            message: 'TodoList deleted and User updated'
          });
        })
        .catch((err) => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: err
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Nothing deleted'
      });
    });
};
