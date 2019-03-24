// STATIC CONSTANT
import { Router } from 'express';

const todoRoutes = Router();
import { createTodo, deleteToDo, getTodo, updateTodo } from './todoController';

todoRoutes.get('/test', (req, res) => { res.send('Welcome to ToDo Routes'); });

/**
 * @api {post} /api/user/todo/create Create a Todo
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
 * @api {post} /api/user/todo/read Get a Todo
 * @apiGroup Todo
 * @apiParam {string} [id] optional Id of Todo
 * @apiParam {string} [name] Optional if id is not provided. Name of Todo
 * @apiParam {string} [note] Optional if id is not provided. Note of Todo
 * @apiParam {ISODate} [startDate] Optional if id is not provided. Starting Date
 * @apiParam {ISODate} [endDate] Optional if id is not provided. Ending of Date
 */
todoRoutes.post('/read', getTodo);

/**
 * @api {put} /api/user/todo/update Update a Todo
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
 * @api {delete} /api/user/todo/delete Delete a Todo
 * @apiDescription Delete the id in Todo, ToDoList, and User simultaneously
 * @apiGroup Todo
 * @apiParam {string} id Id of Todo
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c9164ab1af5a46d38b3899b"
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
