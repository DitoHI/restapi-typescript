define({ "api": [
  {
    "type": "delete",
    "url": "/api/user/comment/delete",
    "title": "Delete a comment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "id",
            "description": "<p>Optimal Id of Comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c920f50cdd88440784419f7\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify the Comment Id\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to delete commment",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to remove comment\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/comment/commentRoutes.ts",
    "groupTitle": "Comment",
    "name": "DeleteApiUserCommentDelete"
  },
  {
    "type": "post",
    "url": "/api/user/comment/create",
    "title": "Create a comment",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todo",
            "description": "<p>Id of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>Optional Name of Comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"todo\": \"5c920e969dbbe53eb7368f92\",\n  \"name\" : \"Yes, I love it two\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please input the Todo Id\"\n}",
          "type": "json"
        },
        {
          "title": "Saving comment failed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed of saving comment\"\n}",
          "type": "json"
        },
        {
          "title": "Updating Todo failed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to update Todo inside Comment\"\n}",
          "type": "json"
        },
        {
          "title": "Updating Todo failed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"There is no Todo which is updated\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/comment/commentRoutes.ts",
    "groupTitle": "Comment",
    "name": "PostApiUserCommentCreate"
  },
  {
    "type": "post",
    "url": "/api/user/comment/read",
    "title": "Get comments",
    "group": "Comment",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "id",
            "description": "<p>Optimal Id of Comment</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>Optional Name of Comment</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "todo",
            "description": "<p>Optional Id of Todo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c920f50cdd88440784419f7\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify the parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to find commment",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error in finding comment\"\n}",
          "type": "json"
        },
        {
          "title": "Comment is empty",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No comment found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/comment/commentRoutes.ts",
    "groupTitle": "Comment",
    "name": "PostApiUserCommentRead"
  },
  {
    "type": "delete",
    "url": "/api/user/todo/delete",
    "title": "Delete a Todo",
    "description": "<p>Delete the id in Todo, ToDoList, and User simultaneously</p>",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of Todo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c9164ab1af5a46d38b3899b\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify id\"\n}",
          "type": "json"
        },
        {
          "title": "Id of Todo does not match",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Not matching Id of TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"ToDo not found\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to update ToDo in ToDoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error updating TodoList inside ToDO\"\n}",
          "type": "json"
        },
        {
          "title": "Deleting ToDo error",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error in deleting ToDo\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todo/todoRoutes.ts",
    "groupTitle": "Todo",
    "name": "DeleteApiUserTodoDelete"
  },
  {
    "type": "delete",
    "url": "/api/user/todoList/delete",
    "title": "Delete a TodoList",
    "description": "<p>Delete the id in TodoList and User simultaneously</p>",
    "group": "TodoList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of TodoList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c9145246c364b1b8ba73b00\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify id\"\n}",
          "type": "json"
        },
        {
          "title": "Inputted Id is Invalid",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Uncorrelated TodoList and User",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"TodoList does not have any correlation with the user\"\n}",
          "type": "json"
        },
        {
          "title": "TodoList not deleted",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Nothing deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todoList/todoListRoutes.ts",
    "groupTitle": "TodoList",
    "name": "DeleteApiUserTodolistDelete"
  },
  {
    "type": "post",
    "url": "/api/user/todoList/addUserAccess",
    "title": "Add user access to TodoList",
    "group": "TodoList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "userId",
            "description": "<p>Array of userId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"id\": \"5c91fe27c25ae422b43e842f\",\n     \"userId\": [\n       \"5c91ac442175b7002c1db1dc\"\n     ]\n   }\n\"message\": \"TodoList updated\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify id\"\n}",
          "type": "json"
        },
        {
          "title": "Inputted Id is Invalid",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Uncorrelated TodoList and User",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"TodoList does not have any correlation with the user\"\n}",
          "type": "json"
        },
        {
          "title": "TodoList not deleted",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Nothing deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todoList/todoListRoutes.ts",
    "groupTitle": "TodoList",
    "name": "PostApiUserTodolistAdduseraccess"
  },
  {
    "type": "post",
    "url": "/api/user/todoList/create",
    "title": "Create a TodoList",
    "group": "TodoList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Category of Todo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"college\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please input the name of your list\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to request user from todoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Requesting user from TodoList failed\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to update new TodoList from User",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error in updating new ToDoList in User\"\n}",
          "type": "json"
        },
        {
          "title": "Failed to save TodoList in Database",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error saving TodoList\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todoList/todoListRoutes.ts",
    "groupTitle": "TodoList",
    "name": "PostApiUserTodolistCreate"
  },
  {
    "type": "post",
    "url": "/api/user/todoList/read",
    "title": "Get list of TodoList",
    "group": "TodoList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>optional Category of Todo (case insensitive)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "id",
            "description": "<p>optional Id of TodoList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"family\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Id is not valid\"\n}",
          "type": "json"
        },
        {
          "title": "Empty TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No ToDoList found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todoList/todoListRoutes.ts",
    "groupTitle": "TodoList",
    "name": "PostApiUserTodolistRead"
  },
  {
    "type": "put",
    "url": "/api/user/todoList/update",
    "title": "Update the name of TodoList",
    "group": "TodoList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of TodoList</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>new name of TodoList</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"family first\",\n  \"id\": \"5c912e3aee5fcf5f39536a8a\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify id\"\n}",
          "type": "json"
        },
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify any new name\"\n}",
          "type": "json"
        },
        {
          "title": "Inputted Id is Invalid",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Empty TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No ToDoList found\"\n}",
          "type": "json"
        },
        {
          "title": "Update TodoList failed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to update TodoList\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todoList/todoListRoutes.ts",
    "groupTitle": "TodoList",
    "name": "PutApiUserTodolistUpdate"
  },
  {
    "type": "post",
    "url": "/api/user/todo/create",
    "title": "Create a Todo",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "todoList",
            "description": "<p>Id of TodoList</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "defaultValue": "Empty ToDo",
            "description": "<p>Optional Name of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "note",
            "defaultValue": "Empty Note",
            "description": "<p>Optional Note of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "comment",
            "description": "<p>Array of Comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "   {\n     \"todoList\": \"5c914ec607787034e3637c4c\",\n\t    \"name\": \"Love is eternal\",\n\t    \"note\": \"Love Testing\",\n\t    \"comment\": [\n\t\t    \"Check\",\n\t\t    \"It\",\n\t\t    \"Out\"\n\t    ]\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please input the name of your Todo\"\n}",
          "type": "json"
        },
        {
          "title": "Id of TodoList is missing",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please input the id of your TodoList\"\n}",
          "type": "json"
        },
        {
          "title": "Id of TodoList does not match",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Not matching Id of TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"TodoList not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todo/todoRoutes.ts",
    "groupTitle": "Todo",
    "name": "PostApiUserTodoCreate"
  },
  {
    "type": "post",
    "url": "/api/user/todo/read",
    "title": "Get a Todo",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "id",
            "description": "<p>optional Id of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>Optional if id is not provided. Name of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "note",
            "description": "<p>Optional if id is not provided. Note of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "ISODate",
            "optional": true,
            "field": "startDate",
            "description": "<p>Optional if id is not provided. Starting Date</p>"
          },
          {
            "group": "Parameter",
            "type": "ISODate",
            "optional": true,
            "field": "endDate",
            "description": "<p>Optional if id is not provided. Ending of Date</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todo/todoRoutes.ts",
    "groupTitle": "Todo",
    "name": "PostApiUserTodoRead"
  },
  {
    "type": "put",
    "url": "/api/user/todo/update",
    "title": "Update a Todo",
    "group": "Todo",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Id of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "name",
            "description": "<p>Optional New Name of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "note",
            "description": "<p>Optional New Note of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": true,
            "field": "comment",
            "description": "<p>Optional New Comments of Todo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"id\": \"5c9152034916d83aee01790e\",\n  \"name\" : \"Love in unlimited\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify id\"\n}",
          "type": "json"
        },
        {
          "title": "Id of Todo does not match",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Not matching Id of TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"ToDo not found\"\n}",
          "type": "json"
        },
        {
          "title": "Updating ToDo error",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Error in updating ToDo\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todo/todoRoutes.ts",
    "groupTitle": "Todo",
    "name": "PutApiUserTodoUpdate"
  },
  {
    "type": "delete",
    "url": "/api/user/delete",
    "title": "Delete User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer</p>"
          }
        ]
      }
    },
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password (if not provided then will return error)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"password\": \"dito\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "No token provided",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No token provided\"\n}",
          "type": "json"
        },
        {
          "title": "Error in Authenticating Token",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to authenticate token\"\n}",
          "type": "json"
        },
        {
          "title": "User not found",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Expired Token",
          "content": "HTTP/1.1 401 FAILED {\n  \"message\" : \"Token expired\"\n}",
          "type": "json"
        },
        {
          "title": "No password inputed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please input your password\"\n}",
          "type": "json"
        },
        {
          "title": "Failed Updating User",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed deleting user\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "DeleteApiUserDelete"
  },
  {
    "type": "get",
    "url": "/api/user/me",
    "title": "Get LoggedIn User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer</p>"
          }
        ]
      }
    },
    "group": "User",
    "error": {
      "examples": [
        {
          "title": "No token provided",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No token provided\"\n}",
          "type": "json"
        },
        {
          "title": "Error in Authenticating Token",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to authenticate token\"\n}",
          "type": "json"
        },
        {
          "title": "User not found",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Expired Token",
          "content": "HTTP/1.1 401 FAILED {\n  \"message\" : \"Token expired\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "GetApiUserMe"
  },
  {
    "type": "get",
    "url": "/user/readAll",
    "title": "Get all Users",
    "group": "User",
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "GetUserReadall"
  },
  {
    "type": "post",
    "url": "/api/user/create",
    "title": "Create an User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userOriginalProfile",
            "description": "<p>Optional Image Profile</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please fill the form\"\n}",
          "type": "json"
        },
        {
          "title": "Error in Saving to Database",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed saving to MongoDB\"\n}",
          "type": "json"
        },
        {
          "title": "Just support for file (jpg|jpeg|png|gif)",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"File that you upload is not supported\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "PostApiUserCreate"
  },
  {
    "type": "post",
    "url": "/api/user/login",
    "title": "Login User",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "username",
            "description": "<p>Optional if email is not provided</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "Form not filled",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please specify name, username, or password\"\n}",
          "type": "json"
        },
        {
          "title": "Form not filled",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please specify name, username, or password\"\n}",
          "type": "json"
        },
        {
          "title": "User not found",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No user found\"\n}",
          "type": "json"
        },
        {
          "title": "Password not match",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please check your password\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "PostApiUserLogin"
  },
  {
    "type": "post",
    "url": "/api/user/upload",
    "title": "Upload Photo Profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer</p>"
          }
        ]
      }
    },
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userOriginalProfile",
            "description": "<p>Image Profile</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"userOriginalProfile\": \"Nicho_SmartCard.jpg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "No token provided",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No token provided\"\n}",
          "type": "json"
        },
        {
          "title": "Error in Authenticating Token",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to authenticate token\"\n}",
          "type": "json"
        },
        {
          "title": "User not found",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Expired Token",
          "content": "HTTP/1.1 401 FAILED {\n  \"message\" : \"Token expired\"\n}",
          "type": "json"
        },
        {
          "title": "Error Updating Profile",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to update profile\"\n}",
          "type": "json"
        },
        {
          "title": "Just support for file (jpg|jpeg|png|gif)",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"File that you upload is not supported\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "PostApiUserUpload"
  },
  {
    "type": "put",
    "url": "/api/user/update",
    "title": "Update User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer</p>"
          }
        ]
      }
    },
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "newUsername",
            "description": "<p>Optional New username to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "newEmail",
            "description": "<p>Optional New email to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "newPassword",
            "description": "<p>Optional New password to update</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>Password (if not provided then will return error)</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "No token provided",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"No token provided\"\n}",
          "type": "json"
        },
        {
          "title": "Error in Authenticating Token",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed to authenticate token\"\n}",
          "type": "json"
        },
        {
          "title": "User not found",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Expired Token",
          "content": "HTTP/1.1 401 FAILED {\n  \"message\" : \"Token expired\"\n}",
          "type": "json"
        },
        {
          "title": "No password inputed",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please input your password\"\n}",
          "type": "json"
        },
        {
          "title": "Password not match",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Please check your password\"\n}",
          "type": "json"
        },
        {
          "title": "Failed Updating User",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Failed updating user[_id:]\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "PutApiUserUpdate"
  }
] });
