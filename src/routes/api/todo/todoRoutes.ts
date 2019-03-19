// STATIC CONSTANT
import { Router } from 'express';

const todoRoutes = Router();
import { createTodo } from './todoController';

todoRoutes.get('/test', (req, res) => { res.send('Welcome to ToDo Routes'); });

/**
 * @api {post} /user/todo/create Create a Todo
 * @apiGroup Todo
 * @apiParam {string} todoList Id of TodoList
 * @apiParam {string} [name="Empty ToDo"] Optional Name of Todo
 * @apiParam {string} [note="Empty Note"] Optional Note of Todo
 * @apiParam {string[]} comment Array of Comment
 * @apiParamExample {json} Input
 *    {
 *      "todoList": "5c914ec607787034e3637c4c",
 *	    "name": "Love is eternal",
 *	    "note": "Love Testing",
 *	    "comment": [
 *		    "Check",
 *		    "It",
 *		    "Out"
 *	    ]
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "todo": {
 *        "name": "Love is eternal",
 *        "note": "Love Testing",
 *        "comment": [
 *          "Check",
 *          "It",
 *          "Out"
 *         ],
 *      },
 *      "message": "Todo Created"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please input the name of your Todo"
 *    }
 * @apiErrorExample {json} Id of TodoList is missing
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please input the id of your TodoList"
 *    }
 * @apiErrorExample {json} Id of TodoList does not match
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Not matching Id of TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "TodoList not found"
 *    }
 */
todoRoutes.post('/create', createTodo);

export default todoRoutes;
