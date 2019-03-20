// STATIC CONSTANT
import { Router } from 'express';

const todoRoutes = Router();
import { createTodo, deleteToDo, getTodo, updateTodo } from './todoController';

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
 *        "note": "Love Testing"
 *      },
 *      "_id": "5c91fe27c25ae422b43e842f",
 *      "createdBy": {
 *        "name": "dito"
 *      }
 *      "message": "Check out new Todo inside your TodoList"
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

/**
 * @api {post} /user/todo/read Get a Todo
 * @apiGroup Todo
 * @apiParam {string} [id] optional Id of Todo
 * @apiParam {string} [name] Optional if id is not provided. Name of Todo
 * @apiParam {string} [note] Optional if id is not provided. Note of Todo
 * @apiParamExample {json} Input
 *    {
 *      "name" : "Love is eternal"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "todo": {
 *         "name": "Love is eternal",
 *         "note": "Love Testing",
 *         "_id": "5c9152034916d83aee01790e",
 *         "todoList": {
 *           "name": "Love",
 *           "user": [
 *             "5c91447dfb84481adf4d4443"
 *           ]
 *         }
 *      },
 *      "message": "Todo Found"
 *    }
 * @apiErrorExample {json} Id of TodoList does not match
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Not matching Id of TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No Todo found"
 *    }
 */
todoRoutes.post('/read', getTodo);

/**
 * @api {put} /user/todo/update Update a Todo
 * @apiGroup Todo
 * @apiParam {string} id Id of Todo
 * @apiParam {string} [name] Optional New Name of Todo
 * @apiParam {string} [note] Optional New Note of Todo
 * @apiParam {string[]} [comment] Optional New Comments of Todo
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c9152034916d83aee01790e",
 *      "name" : "Love in unlimited"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "todo": {
 *        "name": "Love in unlimited",
 *        "note": "Love Testing",
 *        "comment": [
 *          "Check",
 *          "It",
 *          "Out"
 *         ],
 *         "_id": "5c9152034916d83aee01790e",
 *         "todoList": {
 *           "name": "Love",
 *           "user": [
 *             "5c91447dfb84481adf4d4443"
 *           ]
 *         }
 *      },
 *      "message": "Todo updated"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify id"
 *    }
 * @apiErrorExample {json} Id of Todo does not match
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Not matching Id of TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "ToDo not found"
 *    }
 * @apiErrorExample {json} Updating ToDo error
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error in updating ToDo"
 *    }
 */
todoRoutes.put('/update', updateTodo);

/**
 * @api {delete} /user/todo/delete Delete a Todo
 * @apiDescription Delete the id in Todo, ToDoList, and User simultaneously
 * @apiGroup Todo
 * @apiParam {string} id Id of Todo
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c9164ab1af5a46d38b3899b"
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
 *         "_id": "5c9164ab1af5a46d38b3899b",
 *         "todoList": {
 *           "todo": [],
 *           "_id": "5c9164971af5a46d38b3899a"
 *         }
 *      },
 *      "todoList": {
 *        "name": "Love",
 *        "_id": "5c9164971af5a46d38b3899a"
 *      },
 *      "message": "Todo deleted"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify id"
 *    }
 * @apiErrorExample {json} Id of Todo does not match
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Not matching Id of TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "ToDo not found"
 *    }
 * @apiErrorExample {json} Failed to update ToDo in ToDoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error updating TodoList inside ToDO"
 *    }
 * @apiErrorExample {json} Deleting ToDo error
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error in deleting ToDo"
 *    }
 */
todoRoutes.delete('/delete', deleteToDo);

export default todoRoutes;
