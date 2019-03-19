// STATIC CONSTANT
import { Router } from 'express';

const SUCCESS_RESPONSE = 200;
const FAILED_RESPONSE = 400;

const todoListRoutes = Router();
import { createTodoList } from './todoListController';

todoListRoutes.get('/test', (req, res) => { res.send('Welcome to ToDoList Routes'); });

/**
 * @api {post} /user/todoList/create Create a TodoList
 * @apiGroup TodoList
 * @apiParam {string} name Category of Todo
 * @apiParamExample {json} Input
 *    {
 *      "name": "college"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "user": {
 *        "name": "dito",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "$2b$10$1xMZGhBRcrQUHTHg55Xr8O2Dl1BN5bgDXkBi3KW3wzykGfgDRzoSe",
 *        "todoList": [
 *          "5c911b3540addc3b569c6338"
 *        ],
 *        "isActived": true
 *      },
 *      "todoList" : {
 *        "name": "College",
 *        "user": [
 *          "5c910f036f43302e80088042"
 *        ]
 *      },
 *      "message": "TodoList Created"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please input the name of your list"
 *    }
 * @apiErrorExample {json} Failed to request user from todoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Requesting user from TodoList failed"
 *    }
 * @apiErrorExample {json} Failed to update new TodoList from User
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error in updating new ToDoList in User"
 *    }
 * @apiErrorExample {json} Failed to save TodoList in Database
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Error saving TodoList"
 *    }
 */
todoListRoutes.post('/create', createTodoList);

todoListRoutes.get('/read');

export default todoListRoutes;
