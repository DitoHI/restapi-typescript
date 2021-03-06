import mongoose from 'mongoose';
import { IComment, ITodo } from '../../../schema';

// use case
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_ACCEPTABLE = 406;

const todoMongooseModel = mongoose.model('Todo');
const commentMongooseModel = mongoose.model('Comment');

export const createComment = (req: any, res: any) => {
  if (!req.body.todo) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please input the Todo Id',
      success: false,
    });
  }

  req.body.user = req.user._id;
  const commentModel = new commentMongooseModel(req.body);
  commentModel
    .save()
    .then((commentResult: any) => {

      // update in Todo
      todoMongooseModel
        .findById(req.body.todo)
        .exec()
        .then((todoResult: any) => {
          const todo = todoResult as ITodo;
          if (todo.comment.length === 0) {
            todo.comment = [];
          }
          todo.comment.push(commentResult._id);

          todoMongooseModel
            .findByIdAndUpdate(req.body.todo, { comment: todo.comment }, { new: true })
            .populate({ path: 'comment', select: '_id name createdAt' })
            .exec()
            .then((todoUpdatedResult: any) => {
              if (!todoUpdatedResult) {
                return res.status(STATUS_BAD_REQUEST).json({
                  message: 'There is no Todo which is updated',
                  success: false,
                });
              }

              return res.status(STATUS_OK).json({
                data: {
                  todo: todoUpdatedResult,
                },
                success: true,
              });
            })
            .catch(() => {
              return res.status(STATUS_BAD_REQUEST).json({
                message: 'Failed to update Todo inside Comment',
                success: false,
              });
            });
        })
        .catch(() => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Failed to update Todo inside Comment',
            success: false,
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Failed of saving comment',
        success: false,
      });
    });
};

export const getComment = (req: any, res: any) => {
  const findComment: { [k: string]: any } = {};
  findComment.user = req.user._id;
  req.body.id
    ? findComment._id = new mongoose.Types.ObjectId(req.body.id)
    : null;
  req.body.name
    ? findComment.name = new RegExp(`^${req.body.name}$`, 'i')
    : null;

  commentMongooseModel
    .find(findComment)
    .populate({ path: 'todo', select: 'name' })
    .populate({ path: 'user', select: 'name username email' })
    .exec()
    .then((commentResult: any) => {
      if (!commentResult) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No comment found',
          success: false,
        });
      }

      if (commentResult.length === 0) {
        return res.status(STATUS_BAD_REQUEST).json({
          message: 'No comment found',
          success: false,
        });
      }

      if (req.body.todo) {
        const commentFilteredResult = commentResult.filter((filtered: any) => {
          if (filtered.todo) {
            if (filtered.todo._id.equals(req.body.todo)) {
              return filtered;
            }
          }
        });

        if (commentFilteredResult.length === 0) {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'No comment found',
            success: false,
          });
        }

        return res.status(STATUS_BAD_REQUEST).json({
          data: {
            comment: commentFilteredResult,
          },
          success: true,
        });
      }

      return res.status(STATUS_BAD_REQUEST).json({
        data: {
          comment: commentResult,
        },
        success: true,
      });
    })
    .catch((err) => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Error in finding comment',
        success: false,
      });
    });
};

export const deleteComment = (req: any, res: any) => {
  if (!req.body.id) {
    return res.status(STATUS_NOT_ACCEPTABLE).json({
      message: 'Please specify the Comment Id',
      success: false,
    });
  }

  commentMongooseModel
    .findByIdAndRemove(req.body.id)
    .exec()
    .then((commentResult: any) => {
      const comment = commentResult as IComment;

      // remove comment from todo
      todoMongooseModel
        .findById(comment.todo)
        .exec()
        .then((todoResult: any) => {
          const todo = todoResult as ITodo;
          const indexOfCommentInTodo = todo.comment.indexOf(comment._id);
          todo.comment.splice(indexOfCommentInTodo, 1);

          todoMongooseModel
            .findByIdAndUpdate(todo._id, { comment: todo.comment }, { new: true })
            .exec()
            .then((todoUpdatedResult: any) => {
              return res.status(STATUS_OK).json({
                data: {
                  comment: commentResult,
                  message: 'Comment deleted and Todo updated'
                },
                success: true,
              });
            })
            .catch(() => {
              return res.status(STATUS_BAD_REQUEST).json({
                message: 'Failed to update Todo inside Comment',
                success: false,
              });
            });
        }).catch(() => {
          return res.status(STATUS_BAD_REQUEST).json({
            message: 'Failed to find Todo inside Comment',
            success: false,
          });
        });
    })
    .catch(() => {
      return res.status(STATUS_BAD_REQUEST).json({
        message: 'Failed to remove comment',
        success: false,
      });
    });
};
