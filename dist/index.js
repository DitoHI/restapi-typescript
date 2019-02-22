"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connection_1 = require("./connection");
const historyRoutes_1 = require("./routes/historyRoutes");
const app = express_1.default();
const port = process.env.PORT; // default port to listen
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
connection_1.dbInit();
// courses
// define a route handler
historyRoutes_1.historyRoutes(app);
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map