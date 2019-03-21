// STATIC CONSTANT
import { Router } from 'express';

const commentRouter = Router();
import { createComment, deleteComment, getComment } from './commentController';

commentRouter.get('/test', (req, res) => { res.send('Welcome to Comment Routes'); });

/**
 * @api {post} /user/comment/create Create a comment
 * @apiGroup Comment
 * @apiParam {string} todo Id of Todo
 * @apiParam {string} [name] Optional Name of Comment
 * @apiParamExample {json} Input
 *    {
 *      "todo": "5c920e969dbbe53eb7368f92",
 *      "name" : "Yes, I love it two"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "todo": {
 *        "name": "Love in unlimited",
 *        "note": "Love Testing",
 *        "comment": [
 *          {
 *            "name": "Yes, I love it two",
 *            "_id": "5c920f50cdd88440784419f7",
 *            "createdAt": "2019-03-20T10:00:48.407Z"
 *          }
 *         ],
 *         "_id": "5c9152034916d83aee01790e",
 *         "todoList": { 5c91fe27c25ae422b43e842f }
 *      },
 *      "message": "Check out your new comments inside this Todo"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please input the Todo Id"
 *    }
 * @apiErrorExample {json} Saving comment failed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed of saving comment"
 *    }
 * @apiErrorExample {json} Updating Todo failed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to update Todo inside Comment"
 *    }
 * @apiErrorExample {json} Updating Todo failed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "There is no Todo which is updated"
 *    }
 */
commentRouter.post('/create', createComment);

/**
 * @api {post} /user/comment/read Get comments
 * @apiGroup Comment
 * @apiParam {string} [id] Optimal Id of Comment
 * @apiParam {string} [name] Optional Name of Comment
 * @apiParam {string} [todo] Optional Id of Todo
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c920f50cdd88440784419f7",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "comment": [
 *          {
 *            "name": "Yes, I love it two",
 *          "_id": "5c920f50cdd88440784419f7",
 *            "createdAt": "2019-03-20T10:00:48.407Z"
 *          }
 *        ],
 *       "_id": "5c9152034916d83aee01790e",
 *       "todoList": { 5c91fe27c25ae422b43e842f }
 *       "message": "Check out your new comments inside this Todo"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify the parameters"
 *    }
 * @apiErrorExample {json} Failed to find commment
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error in finding comment"
 *    }
 * @apiErrorExample {json} Comment is empty
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No comment found"
 *    }
 */
commentRouter.post('/read', getComment);

/**
 * @api {delete} /user/comment/delete Delete a comment
 * @apiGroup Comment
 * @apiParam {string} [id] Optimal Id of Comment
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c920f50cdd88440784419f7",
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "comment": [
 *          {
 *            "name": "Yes, I love it two",
 *          "_id": "5c920f50cdd88440784419f7",
 *            "createdAt": "2019-03-20T10:00:48.407Z"
 *          }
 *        ],
 *       "_id": "5c9152034916d83aee01790e",
 *       "todoList": { 5c91fe27c25ae422b43e842f }
 *       "message": "Comment deleted and Todo updated"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify the Comment Id"
 *    }
 * @apiErrorExample {json} Failed to delete commment
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to remove comment"
 *    }
 */
commentRouter.delete('/delete', deleteComment);

export default commentRouter;