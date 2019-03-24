// STATIC CONSTANT
import { Router } from 'express';

const todoListRoutes = Router();
import {
  addAccessTodoList,
  createTodoList,
  deleteTodoList,
  readTodoList,
  updateTodoList,
} from './todoListController';

todoListRoutes.get('/test', (req, res) => {
  res.send('Welcome to ToDoList Routes');
});

/**
 * @api {post} /user/todoList/create Create a TodoList
 * @apiGroup TodoList
 * @apiParam {string} name Category of Todo
 * @apiParamExample {json} Input
 *    {
 *      "name": "college"
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
 * @api {post} /user/todoList/read Get list of TodoList
 * @apiGroup TodoList
 * @apiParam {string} [name] optional Category of Todo (case insensitive)
 * @apiParam {string} [id] optional Id of TodoList
 * @apiParamExample {json} Input
 *    {
 *      "name": "family"
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
todoListRoutes.post('/read', readTodoList);

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

/**
 * @api {post} /user/todoList/addUserAccess Add user access to TodoList
 * @apiGroup TodoList
 * @apiParam {string[]} userId Array of userId
 * @apiParamExample {json} Input
 *    {
 *      "id": "5c91fe27c25ae422b43e842f",
 *      "userId": [
 *        "5c91ac442175b7002c1db1dc"
 *      ]
 *    }
 * "message": "TodoList updated"
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
todoListRoutes.post('/addUserAccess', addAccessTodoList);

export default todoListRoutes;
