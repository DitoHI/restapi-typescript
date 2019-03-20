define({ "api": [
  {
    "type": "delete",
    "url": "/user/todo/delete",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"todo\": {\n    \"name\": \"Love is eternal\",\n    \"note\": \"Love Testing\",\n    \"comment\": [\n      \"Check\",\n      \"It\",\n      \"Out\"\n     ],\n     \"_id\": \"5c9164ab1af5a46d38b3899b\",\n     \"todoList\": {\n       \"todo\": [],\n       \"_id\": \"5c9164971af5a46d38b3899a\"\n     }\n  },\n  \"todoList\": {\n    \"name\": \"Love\",\n    \"_id\": \"5c9164971af5a46d38b3899a\"\n  },\n  \"message\": \"Todo deleted\"\n}",
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
    "name": "DeleteUserTodoDelete"
  },
  {
    "type": "delete",
    "url": "/user/todoList/delete",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"user\": {\n    \"isActived\": true,\n    \"userOriginalProfile\": null,\n    \"todoList\": [],\n    \"_id\": \"5c91447dfb84481adf4d4443\",\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh@gmail.com\",\n    \"password\": \"$2b$10$CdqRcZtBi0Nw1qETPjkXl.CSiZOZpG/mVA5/pnPKh5MauYwQ9wdC6\",\n   },\n  \"message\": \"TodoList deleted and User updated\"\n}",
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
    "name": "DeleteUserTodolistDelete"
  },
  {
    "type": "post",
    "url": "/user/todoList/addUserAccess",
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
          "content": "{\n  \"id\": \"5c91fe27c25ae422b43e842f\",\n  \"userId\": [\n    \"5c91ac442175b7002c1db1dc\"\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK {\n     \"todoList\": {\n     \"name\": \"Love\",\n     \"user\": [\n     {\n       \"_id\": \"5c91cc8b2005211a6c4911c6\",\n       \"username\": \"dito\",\n       \"email\": \"ditohafizh@gmail.com\"\n     },\n     {\n       \"_id\": \"5c91a3a52175b7002c1db1cd\",\n       \"username\": \"anwar\",\n       \"email\": \"anwarabdullan28@gmail.com\"\n     },\n     {\n       \"_id\": \"5c91ac442175b7002c1db1dc\",\n       \"username\": \"anwar2019\",\n       \"email\": \"anwar@example.com\"\n     }\n   ],\n   \"todo\": [],\n   \"_id\": \"5c91fe27c25ae422b43e842f\",\n   \"createdBy\": {\n     \"_id\": \"5c91cc8b2005211a6c4911c6\",\n     \"username\": \"dito\",\n     \"email\": \"ditohafizh@gmail.com\"\n    },\n     \"__v\": 0\n   },\n\"message\": \"TodoList updated\"\n   }",
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
    "name": "PostUserTodolistAdduseraccess"
  },
  {
    "type": "post",
    "url": "/user/todoList/create",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"user\": {\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh@gmail.com\",\n    \"password\": \"$2b$10$1xMZGhBRcrQUHTHg55Xr8O2Dl1BN5bgDXkBi3KW3wzykGfgDRzoSe\",\n    \"todoList\": [\n      \"5c911b3540addc3b569c6338\"\n    ],\n    \"isActived\": true\n  },\n  \"todoList\" : {\n    \"name\": \"College\",\n    \"user\": [\n      \"5c910f036f43302e80088042\"\n    ]\n  },\n  \"message\": \"TodoList Created\"\n}",
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
    "name": "PostUserTodolistCreate"
  },
  {
    "type": "post",
    "url": "/user/todoList/read",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"message\": \"TodoList found\",\n  \"todoList\": [\n  {\n    \"name\": \"family\"\n    \"user\": [\n      {\n        \"_id\": \"5c910f036f43302e80088042\",\n        \"name\": \"dito\",\n        \"username\": \"dito\",\n        \"email\": \"ditohafizh@gmail.com\",\n      }\n    ],\n    \"_id\": \"5c912e3aee5fcf5f39536a8a\"\n  }",
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
    "name": "PostUserTodolistRead"
  },
  {
    "type": "put",
    "url": "/user/todoList/update",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"message\": \"TodoList updated\",\n  \"todoList\": [\n  {\n    \"name\": \"family first\"\n    \"user\": [\n      {\n        \"_id\": \"5c910f036f43302e80088042\",\n        \"name\": \"dito\",\n        \"username\": \"dito\",\n        \"email\": \"ditohafizh@gmail.com\",\n      }\n    ],\n    \"_id\": \"5c912e3aee5fcf5f39536a8a\"\n  }",
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
    "name": "PutUserTodolistUpdate"
  },
  {
    "type": "post",
    "url": "/user/todo/create",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"todo\": {\n    \"name\": \"Love is eternal\",\n    \"note\": \"Love Testing\",\n    \"comment\": [\n      \"Check\",\n      \"It\",\n      \"Out\"\n     ],\n  },\n  \"message\": \"Todo Created\"\n}",
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
    "name": "PostUserTodoCreate"
  },
  {
    "type": "post",
    "url": "/user/todo/read",
    "title": "Get a Todo",
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
            "description": "<p>Optional if id is not provided. Name of Todo</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "note",
            "description": "<p>Optional if id is not provided. Note of Todo</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\" : \"Love is eternal\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"todo\": {\n    \"name\": \"Love is eternal\",\n    \"note\": \"Love Testing\",\n    \"comment\": [\n      \"Check\",\n      \"It\",\n      \"Out\"\n     ],\n     \"_id\": \"5c9152034916d83aee01790e\",\n     \"todoList\": {\n       \"name\": \"Love\",\n       \"user\": [\n         \"5c91447dfb84481adf4d4443\"\n       ]\n     }\n  },\n  \"message\": \"Todo Found\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Form not completed",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Please specify any parameters\"\n}",
          "type": "json"
        },
        {
          "title": "Id of TodoList does not match",
          "content": "HTTP/1.1 406 FAILED {\n  \"message\" : \"Invalid Id type\"\n}",
          "type": "json"
        },
        {
          "title": "Not matching Id of TodoList",
          "content": "HTTP/1.1 400 FAILED {\n  \"message\" : \"Not getting any ToDo\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/todo/todoRoutes.ts",
    "groupTitle": "Todo",
    "name": "PostUserTodoRead"
  },
  {
    "type": "put",
    "url": "/user/todo/update",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"todo\": {\n    \"name\": \"Love in unlimited\",\n    \"note\": \"Love Testing\",\n    \"comment\": [\n      \"Check\",\n      \"It\",\n      \"Out\"\n     ],\n     \"_id\": \"5c9152034916d83aee01790e\",\n     \"todoList\": {\n       \"name\": \"Love\",\n       \"user\": [\n         \"5c91447dfb84481adf4d4443\"\n       ]\n     }\n  },\n  \"message\": \"Todo updated\"\n}",
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
    "name": "PutUserTodoUpdate"
  },
  {
    "type": "delete",
    "url": "/user/delete",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": {\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh__baru@gmail.com\",\n    \"password\": \"$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq\",\n    \"userOriginalProfile\": \"public/user/photos/new/dito/dito_1553009709342.png\"\n  }\n  \"message\" : \"User deleted\"\n}",
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
    "name": "DeleteUserDelete"
  },
  {
    "type": "get",
    "url": "/user/me",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": {\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh@gmail.com\",\n    \"password\": \"$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq\",\n  }\n  \"message\" : \"Authenticate success\"\n}",
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
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/api/users/userRoutes.ts",
    "groupTitle": "User",
    "name": "GetUserMe"
  },
  {
    "type": "post",
    "url": "/user/create",
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
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"name\": \"dito\",\n  \"username\": \"dito\",\n  \"email\": \"ditohafizh@gmail.com\",\n  \"password\": \"dito\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": {\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh@gmail.com\",\n    \"password\": \"$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq\",\n    \"userOriginalProfile\": null\n  }\n  \"message\" : \"User has been saved\",\n  \"token\" : \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTBkYTRkMmUzNj\n  VlNDIwMjczMTE1ZiIsIm5hbWUiOiJkaXRvIiwiaWF0IjoxNTUyOTk2OTQyLCJleHAiOjE1NTMw\n  ODMzNDJ9.8wNFi061cTzOx7IH811urfFa9ME_7AQaQ8LaMxbKsuw\"\n}",
          "type": "json"
        }
      ]
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
    "name": "PostUserCreate"
  },
  {
    "type": "post",
    "url": "/user/login",
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
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"email\": \"ditohafizh@gmail.com\",\n  \"password\": \"dito\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": {\n    \"name\": \"dito\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh@gmail.com\",\n    \"password\": \"$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq\",\n  },\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTBkYTRkMmUzNjVlN\n  DIwMjczMTE1ZiIsIm5hbWUiOiJkaXRvIiwiaWF0IjoxNTUyOTk4OTQwLCJleHAiOjE1NTMwODUzNDB9.\n  qCpME4gseNaz5eupZCq4gGPHabvE8fE5TimuDh0Rohg\",\n  \"message\" : \"Successfully login\"\n}",
          "type": "json"
        }
      ]
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
    "name": "PostUserLogin"
  },
  {
    "type": "post",
    "url": "/user/upload",
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
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": \"public/user/photos/new/dito/dito_1553009709342.png\",\n  \"message\" : \"Profile image updated successfully\"\n}",
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
    "name": "PostUserUpload"
  },
  {
    "type": "put",
    "url": "/user/update",
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
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"newEmail\": \"ditohafizh__baru@gmail.com\",\n  \"password\": \"dito\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK {\n  \"body\": {\n    \"name\": \"Dito Hafizh\",\n    \"username\": \"dito\",\n    \"email\": \"ditohafizh__baru@gmail.com\",\n    \"password\": \"$2b$10$mWcBjk6cbpTD99LrZa//lu2Bsv1Uox/sCbCx7TI9NZsA.HzVyhREq\"\n  }\n  \"message\" : \"User updated\"\n}",
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
    "name": "PutUserUpdate"
  }
] });
