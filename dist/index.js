"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
// courses
// import {divide, multiply} from "./meeting/three/mult";
const four_1 = require("./meeting/four");
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send(`Namaku adalah ${four_1.persons[0].username}, umurku ${four_1.persons[0].age} tahun`);
    // const input: number[] = [4, 2];
    // const [first, second] = input;
    // res.send(`Multiply of ${first} & ${second} : ${multiply(first, second)} <br>
    //     Divide of ${first} & ${second} : ${divide(first, second)}`);
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map