**Simple RestAPI with CRUD Impelementation**

### What case to be used ?
Calculator and Saving its histories. This simple api with get your request in three parameters. Basically those are *NumberOne, NumberTwo, Operator*. Then the request will be calculated by internal function `mult.ts`

### Table of Contents
- Read
- Create
- Update
- Delete 

### Structure of Directory
- controllers: define specified functions based on request
- meeting: library `calculator.ts` there
- models: define Schema and Interface for History
- routes: define routes with the same path `/history` with the differentiated of routing method

### Examples
This is the examples of histories data in json
```json
[
  {
    "_id": "5c703257be10422efbc0640a",
    "numberOne": 3,
    "numberTwo": 12,
    "operator": "plus",
    "result": 15,
    "createdIn": "2019-02-22T17:33:11.090Z",
    "__v": 0
  },
  {
    "_id": "5c7033b9de43a331ff389ae9",
    "numberOne": 5,
    "numberTwo": 12,
    "operator": "minus",
    "result": -7,
    "createdIn": "2019-02-22T17:39:05.689Z",
    "__v": 0
  },
  {
    "_id": "5c7036e9f5359a327de204dc",
    "numberOne": 6,
    "numberTwo": 6,
    "operator": "multiply",
    "result": 36,
    "createdIn": "2019-02-22T17:52:41.572Z",
    "__v": 0
  },
  {
    "_id": "5c7036f4f5359a327de204dd",
    "numberOne": 18,
    "numberTwo": 2,
    "operator": "divide",
    "result": 9,
    "createdIn": "2019-02-22T17:52:52.777Z",
    "__v": 0
  }
]
```
For the next parts, we just gonna make use of these variabels: *_id, numberOne, numberTwo, operator, result*. <br />
The path route is : `http:localhost:${YOUR_PORT}/history`

### Read

Get responding history based on requested parameters
- **parameters**: (id: string, numberOne: number, numberTwo: number, operator: string, result: number)
<br />
- **HTTP request method**: `get`
<br />
- **Types of request**: `req.query`
<br />
- **examples**: <br />

*Using one parameter [id]*<br />
`localhost:8080/history?id=5c703257be10422efbc0640a` <br />

**Result**<br />
```json
{
    "message": "History found",
    "body": [
        {
            "_id": "5c703257be10422efbc0640a",
            "numberOne": 3,
            "numberTwo": 12,
            "operator": "plus",
            "result": 15,
            "createdIn": "2019-02-22T17:33:11.090Z",
            "__v": 0
        }
    ]
}
```
*Using two parameters [a, b]*<br />
`localhost:8080/history?a=3&operator=plus` <br />

**Result**<br />
```json
{
    "message": "History found",
    "body": [
        {
            "_id": "5c703257be10422efbc0640a",
            "numberOne": 3,
            "numberTwo": 12,
            "operator": "plus",
            "result": 15,
            "createdIn": "2019-02-22T17:33:11.090Z",
            "__v": 0
        }
    ]
}
```

### Create

Create the new history while doing calculation. Date value is automatically assigned as `Date.now()`
- **parameters**: (numberOne: number!, numberTwo: number!, operator: string!)
<br />
- **HTTP request method**: `post`
<br />
- **Types of request**: `req.body`
<br />
- **examples**: <br />
`localhost:8080/history` <br />
`
{
	"a": 8,
	"b": 20,
	"operator": "plus"
}
`<br />

*Must use three parameters [a, b, operator]*<br />

**Result**<br />
```json
{
    "message": "History has been saved",
    "body": {
        "_id": "5c703c23f5359a327de204de",
        "numberOne": 8,
        "numberTwo": 20,
        "operator": "plus",
        "result": 28,
        "createdIn": "2019-02-22T18:14:59.188Z",
        "__v": 0
    }
}
```

### Update

Modify history with new operator and change the result synchronously
- **parameters**: (operator: string!, operatorChanged: string!)
<br />
- **HTTP request method**: `put`
<br />
- **Types of request**: `req.query`
<br />
- **examples**: <br />
`localhost:8080/history?operator=multiply&operatorChanged=plus` <br />


**Result**<br />
```json
{
    "message": "History updated",
    "body": [
        {
            "_id": "5c7036e9f5359a327de204dc",
            "numberOne": 6,
            "numberTwo": 6,
            "operator": "plus",
            "result": 12,
            "createdIn": "2019-02-22T17:52:41.572Z",
            "__v": 0
        }
    ]
}
```

### Delete

Delete single or multiple histories based on the request parameters
- **parameters**: (id: string, numberOne: number, numberTwo: number, operator: string, result: number)
<br />
- **HTTP request method**: `get`
<br />
- **Types of request**: `req.query`
<br />
- **examples**: <br />

*Using one parameter [id]*<br />
`localhost:8080/history?id=5c703257be10422efbc0640a` <br />

**Result**<br />
```json
{
    "message": "History deleted"
}
```
*Using two parameters [a, b]*<br />
`localhost:8080/history?b=12&operator=minus` <br />

**Result**<br />
```json
{
    "message": "History deleted"
}
```

#### Credits

This is the result of **Code Challenge** in *Glints Academy* and *Binar* for week one


