// STATIC CONSTANT
import { Router } from 'express';

const SUCCESS_RESPONSE = 200;
const FAILED_RESPONSE = 400;

const todoListRoutes = Router();
import { createTodoList, deleteTodoList, readTodoList, updateTodoList } from './todoListController';

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

/**
 * @api {get} /user/todoList/read Get list of TodoList
 * @apiGroup TodoList
 * @apiParam {string} name Category of Todo (case insensitive)
 * @apiParam {string} [id] optional if name is not provided, Id of TodoList
 * @apiParamExample {json} Input
 *    {
 *      "name": "family"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "message": "TodoList found",
 *      "todoList": [
 *      {
 *        "name": "family"
 *        "user": [
 *          {
 *            "_id": "5c910f036f43302e80088042",
 *            "name": "dito",
 *            "username": "dito",
 *            "email": "ditohafizh@gmail.com",
 *          }
 *        ],
 *        "_id": "5c912e3aee5fcf5f39536a8a"
 *      }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify the name or id"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Id is not valid"
 *    }
 * @apiErrorExample {json} Empty TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No ToDoList found"
 *    }
 */
todoListRoutes.get('/read', readTodoList);

/**
 * @api {put} /user/todoList/update Update the name of TodoList
 * @apiGroup TodoList
 * @apiParam {string} id Id of TodoList
 * @apiParam {string} name new name of TodoList
 * @apiParamExample {json} Input
 *    {
 *      "name": "family first",
 *      "id": "5c912e3aee5fcf5f39536a8a"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "message": "TodoList updated",
 *      "todoList": [
 *      {
 *        "name": "family first"
 *        "user": [
 *          {
 *            "_id": "5c910f036f43302e80088042",
 *            "name": "dito",
 *            "username": "dito",
 *            "email": "ditohafizh@gmail.com",
 *          }
 *        ],
 *        "_id": "5c912e3aee5fcf5f39536a8a"
 *      }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify id"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify any new name"
 *    }
 * @apiErrorExample {json} Inputted Id is Invalid
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Empty TodoList
 *    HTTP/1.1 400 FAILED {
 *      "message" : "No ToDoList found"
 *    }
 * @apiErrorExample {json} Update TodoList failed
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Failed to update TodoList"
 *    }
 */
todoListRoutes.put('/update', updateTodoList);

/**
 * @api {delete} /user/todoList/delete Delete a TodoList
 * @apiDescription Delete the id in TodoList and User simultaneously
 * @apiGroup TodoList
 * @apiParam {string} id Id of TodoList
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c9145246c364b1b8ba73b00"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK {
 *      "user": {
 *        "isActived": true,
 *        "userOriginalProfile": null,
 *        "todoList": [],
 *        "_id": "5c91447dfb84481adf4d4443",
 *        "name": "dito",
 *        "username": "dito",
 *        "email": "ditohafizh@gmail.com",
 *        "password": "$2b$10$CdqRcZtBi0Nw1qETPjkXl.CSiZOZpG/mVA5/pnPKh5MauYwQ9wdC6",
 *       },
 *      "message": "TodoList and User updated"
 *    }
 * @apiErrorExample {json} Form not completed
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Please specify id"
 *    }
 * @apiErrorExample {json} Inputted Id is Invalid
 *    HTTP/1.1 406 FAILED {
 *      "message" : "Invalid Id type"
 *    }
 * @apiErrorExample {json} Uncorrelated TodoList and User
 *    HTTP/1.1 400 FAILED {
 *      "message" : "TodoList does not have any correlation with the user"
 *    }
 * @apiErrorExample {json} TodoList not deleted
 *    HTTP/1.1 400 FAILED {
 *      "message" : "Nothing deleted"
 *    }
 */
todoListRoutes.delete('/delete', deleteTodoList);

export default todoListRoutes;
