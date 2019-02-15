"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 8080; // default port to listen
// courses
const mult_1 = require("./meeting/three/mult");
// define a route handler for the default home page
app.get("/", (req, res) => {
    const input = [4, 2];
    const [first, second] = input;
    res.send(`Multiply of ${first} & ${second} : ${mult_1.multiply(first, second)} <br>
        Divide of ${first} & ${second} : ${mult_1.divide(first, second)}`);
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map