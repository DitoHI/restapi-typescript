"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// courses
const four_1 = require("./meeting/four");
const mult_1 = require("./meeting/three/mult");
// define a route handler for the default home page
app.get("/", (req, res) => {
    // print all the persons
    let words = "";
    // push new person
    const newPerson = {
        username: "Sinichi",
        age: 20
    };
    four_1.persons.push(newPerson);
    for (const person of four_1.persons) {
        words += `Namaku adalah ${person.username}, umurku ${person.age} tahun</br>`;
    }
    res.send(words);
});
app.get("/:operator/:a/:b", (req, res) => {
    const a = parseInt(req.params.a, 10);
    const b = parseInt(req.params.b, 10);
    const operator = req.params.operator;
    const result = mult_1.calculator(a, b, operator);
    res.send(`Result of ${a} ${operator} ${b} : ${result}`);
});
app.get("/kalkulator", (req, res) => {
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    const operator = req.query.operator;
    const result = mult_1.calculator(a, b, operator);
    res.send(`Result of ${a} ${operator} ${b} : ${result}`);
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map