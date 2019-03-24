import mongoose from 'mongoose';
import { IComment, ITodo, ITodoList, IUser } from '../../../schema';

// use case
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;

const commentMongooseModel = mongoose.model('Comment');
const todoMongooseModel = mongoose.model('Todo');
const todoListMongooseModel = mongoose.model('TodoList');
const userModelMongooseModel = mongoose.model('User');

export const createTodoList = (req: any, res: any) => {
  if (!req.body.name) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please input the name of your list',
      success: false,
    });
  }

  req.body.user = [];
  req.body.user.push(req.user._id);
  req.body.createdBy = req.user._id;
  const todoListModel = new todoListMongooseModel(req.body);
  todoListModel
    .save()
    .then((todoListResult: any) => {

      const todoList = todoListResult as ITodoList;
      // update todoList ref in user
      return userModelMongooseModel
        .findById(req.user._id)
        .then((userResult: any) => {

          const user = userResult as IUser;

          if (!userResult) {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'Requesting user from TodoList failed',
              success: false,
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
                data: {
                  todoList,
                  user: userUpdated,
                },
                success: true,
              });
            })
            .catch((err) => {
              return res.status(STATUS_BAD_REQUEST).json({
                message: 'Error in updating new ToDoList in User',
                success: false,
              });
            });

        })
        .catch((err) => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Error in updating new ToDoList in User',
            success: false,
          });
        });
    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Error saving TodoList',
        success: false,
      });
    });
};

export const readTodoList = (req: any, res: any) => {
  if (req.body.id) {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
    if (!isValidObjectId) {
      return res.status(STATUS_NOT_ACCEPTABLE).json({
        message: 'Id is not valid',
        success: false,
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
    .populate({ path: 'createdBy', select: 'name username email' })
    .populate({ path: 'user', select: '_id name username email' })
    .populate({ path: 'todo', select: '_id name' })
    // .populate('todo')
    .then(async (todoListResult: any) => {

      const todoListArray = todoListResult as ITodoList[];
      if (todoListArray.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No ToDoList found',
          success: false,
        });
      }

      // filter the result
      // just return todoList which has the user id
      const todoListArrayFiltered = todoListArray.filter((filtered: any) => {
        const userInTodoListArr = filtered.user.map((mapped: any) => mapped._id);
        let returnedTodoList = false;
        for (const userInTodoList of userInTodoListArr) {
          if (userInTodoList.equals(req.user._id)) {
            returnedTodoList = true;
          }
        }
        if (returnedTodoList) {
          return filtered;
        }
      });

      if (todoListArrayFiltered.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No ToDoList found',
          success: false,
        });
      }

      // testing
      return res.status(STATUS_OK).json({
        data: {
          todoList: todoListArrayFiltered,
        },
        success: true,
      });

    });
};

export const updateTodoList = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the id',
      success: false,
    });
  }

  if (!req.body.name) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify any new name',
      success: false,
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type',
      success: false,
    });
  }

  todoListMongooseModel
    .findByIdAndUpdate(req.body.id, { name: req.body.name }, { new: true })
    .select('_id name')
    .populate({ path: 'user', select: '_id name username email' })
    .then((todoListResult) => {
      if (!todoListResult) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'ToDoList not found',
          success: false,
        });
      }

      todoListMongooseModel
        .find()
        .populate({ path: 'user', select: '_id name email username' })
        .populate({ path: 'todo', select: '_id name' })
        .exec()
        .then((todoListAllResult) => {

          // filter the result
          // just return todoList which has the user id
          const todoListArrayFiltered = todoListAllResult.filter((filtered: any) => {
            const userInTodoListArr = filtered.user.map((mapped: any) => mapped._id);
            let returnedTodoList = false;
            for (const userInTodoList of userInTodoListArr) {
              if (userInTodoList.equals(req.user._id)) {
                returnedTodoList = true;
              }
            }
            if (returnedTodoList) {
              return filtered;
            }
          });

          if (todoListArrayFiltered.length === 0) {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'No ToDoList found',
              success: false,
            });
          }

          return res.status(STATUS_OK).json({
            data: {
              todoList: todoListArrayFiltered,
              todoListUpdated: todoListResult,
            },
            success: true,
          });
        });
    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Failed to update TodoList',
        success: false,
      });
    });
};

export const deleteTodoList = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the id',
      success: false,
    });
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
  if (!isValidObjectId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Invalid Id type',
      success: false,
    });
  }

  todoListMongooseModel
    .findByIdAndRemove(req.body.id)
    .populate({ path: 'user', select: '_id name username email todoList' })
    .populate({ path: 'createdBy', select: '_id name username email' })
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
          message: 'TodoList does not have any correlation with the user',
          success: false,
        });
      }

      // delete todo & comment
      todoListDeleted.todo.forEach((todoChild: any) => {
        todoMongooseModel
          .findById(todoChild._id)
          .exec()
          .then((todoInChild: any) => {
            const todo = todoInChild as ITodo;
            todo.comment.forEach((todoComment: any) => {
              commentMongooseModel
                .findByIdAndDelete(todoComment)
                .exec()
                .catch(() => {
                  return res.status(STATUS_BAD_REQUEST).json({
                    message: 'Error in deleting comments',
                    success: false,
                  });
                });
            });
          })
          .catch(() => {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'Error deleting comments',
              success: false,
            });
          });

        todoMongooseModel
          .findByIdAndDelete(todoChild._id)
          .exec()
          .catch(() => {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'Error in deleting todos',
              success: false,
            });
          });
      });

      const indexOfTodoInUser = userIdArray[0].todoList.indexOf(todoListDeleted._id);
      userIdArray[0].todoList.splice(indexOfTodoInUser, 1);

      userModelMongooseModel
        .findByIdAndUpdate(req.user._id, { todoList: userIdArray[0].todoList }, { new: true })
        .populate('todoList')
        .exec()
        .then((userResult: any) => {
          return res.status(STATUS_OK).json({
            data: {
              user: userResult,
            },
            success: true,
          });
        })
        .catch((err) => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: err,
            success: false,
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Nothing deleted',
        success: false,
      });
    });
};

export const addAccessTodoList = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify your TodoList Id',
      success: false,
    });
  }

  if (!req.body.userId) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify at least one user Id',
      success: false,
    });
  }

  if (req.body.userId instanceof Array) {
    (req.body.userId).forEach((item: any) => {
      if (typeof item !== 'string') {
        return res.status(STATUS_NOT_ACCEPTABLE).json({
          message: 'One of userId is not string',
          success: false,
        });
      }
      if (req.user._id.equals(item)) {
        return res.status(STATUS_NOT_ACCEPTABLE).json({
          message: 'Inputted userId is already an admin',
          success: false,
        });
      }
    });
  } else {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'UserId must be array type',
      success: false,
    });
  }

  // check if userId is valid ObjectId
  for (const userId of req.body.userId) {
    const valid = mongoose.Types.ObjectId.isValid(userId);
    if (!valid) {
      return res.status(STATUS_NOT_ACCEPTABLE).json({
        message: 'One of your user Id is not valid type',
        success: false,
      });
    }
  }

  todoListMongooseModel
    .findById(req.body.id)
    .exec()
    .then((todoListResult: any) => {
      if (!todoListResult) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'TodoList not found',
          success: false,
        });
      }

      const todoList = todoListResult as ITodoList;
      todoList.user.push(req.body.userId);

      // filter userIdArray to be unique
      const todoListUniqueUsers = todoList.user.filter((v, i, a) => a.indexOf(v) === i);

      todoListMongooseModel
        .findByIdAndUpdate(req.body.id, { user: todoListUniqueUsers }, { new: true })
        .populate({ path: 'user', select: '_id username email' })
        .populate({ path: 'createdBy', select: 'username email' })
        .exec()
        .then((todoListUpdatedResult) => {
          if (!todoListUpdatedResult) {
            return res.status(STATUS_BAD_REQUEST).json({
              message: 'No TodoList is updated',
              success: false,
            });
          }

          return res.status(STATUS_OK).json({
            data: {
              todoList: todoListUpdatedResult,
              message: 'TodoList updated',
            },
            success: true,
          });
        })
        .catch(() => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Failed in updating TodoList',
            success: false,
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Failed in finding TodoList',
        success: false,
      });
    });

};
