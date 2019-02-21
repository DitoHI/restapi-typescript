"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = process.env.PORT; // default port to listen
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// courses
const hello_1 = require("./meeting/six/hello");
// define a route handler for the default home page
app.get('/', (req, res) => {
    hello_1.helloEs5('HelloEs5 Binar');
    hello_1.helloEs6('HelloEs6 Binar');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map