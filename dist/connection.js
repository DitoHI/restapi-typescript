"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// connect to mongo
mongoose_1.default.connect(process.env.MONGODB_ATLAS, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
exports.db = db;
const dbInit = () => {
    db.on('error', () => {
        console.log('Error connecting mongoose');
    });
    db.once('open', () => {
        console.log('We are connected');
    });
};
exports.dbInit = dbInit;
//# sourceMappingURL=connection.js.map