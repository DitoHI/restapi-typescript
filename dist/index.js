"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
// courses
const four_1 = require("./meeting/four");
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
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map