"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const historySchema = new mongoose_1.default.Schema({
    numberOne: Number,
    numberTwo: Number,
    operator: String,
    result: Number,
    createdIn: Date,
});
const historyModel = mongoose_1.default.model('History', historySchema);
exports.historyModel = historyModel;
//# sourceMappingURL=history.js.map