"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mult_1 = require("../meeting/three/mult");
const history_1 = require("../schema/history");
class HistoryController {
    constructor(historyDao) {
        this.historyDao = historyDao;
    }
}
const addHistory = (numberOne, numberTwo, operator) => {
    const result = mult_1.calculator(numberOne, numberTwo, operator);
    return new Promise((resolve) => {
        // save to history of calculation
        const newHistory = new history_1.historyModel({
            numberOne,
            numberTwo,
            operator,
            result: result,
            createdIn: Date.now(),
        });
        newHistory.save((err, history) => {
            let statusCode = 0;
            let messageLog = '';
            if (err) {
                statusCode = 400;
                messageLog = 'Failed saving to MongoDB';
            }
            else {
                statusCode = 200;
                messageLog = 'History has been saved';
            }
            resolve([statusCode, messageLog, history]);
        });
    });
};
exports.addHistory = addHistory;
const getHistory = (id, numberOne, numberTwo, operator, result) => {
    const findHistory = {};
    id != null ? findHistory._id = id : null;
    numberOne != null ? findHistory.numberOne = numberOne : null;
    numberTwo != null ? findHistory.numberTwo = numberTwo : null;
    operator != null ? findHistory.operator = operator : null;
    result != null ? findHistory.result = result : null;
    return new Promise((resolve) => {
        history_1.historyModel.find(findHistory, (err, output) => {
            let statusCode = 0;
            let messageLog = '';
            if (err) {
                statusCode = 400;
                messageLog = 'Failed finding at MongoDB';
            }
            else {
                const histories = output;
                if (histories.length === 0) {
                    statusCode = 404;
                    messageLog = 'No history found';
                }
                else {
                    statusCode = 200;
                    messageLog = 'History found';
                }
            }
            resolve([statusCode, messageLog, output]);
        });
    });
};
exports.getHistory = getHistory;
const updateHistory = (operatorBefore, operatorChanged) => {
    const query = { operator: operatorBefore };
    return new Promise((resolve) => {
        history_1.historyModel.find(query, (err, output) => {
            let statusCode = 0;
            let messageLog = '';
            if (err) {
                statusCode = 400;
                messageLog = 'Failed updating at MongoDB';
            }
            else {
                const histories = output.slice();
                if (histories.length === 0) {
                    statusCode = 404;
                    messageLog = 'No history found. Check out your operator';
                    resolve([statusCode, messageLog, output]);
                }
                else {
                    statusCode = 307;
                    messageLog = 'History updated';
                    const historiesModified = [];
                    const historiesIdChanged = histories.map((history) => history._id);
                    histories.forEach((history) => __awaiter(this, void 0, void 0, function* () {
                        history.result = mult_1.calculator(history.numberOne, history.numberTwo, operatorChanged);
                        history.operator = operatorChanged;
                        historiesModified.push(history);
                        history_1.historyModel
                            .findByIdAndUpdate(history._id, history, (errChild, outputChild) => {
                            if (errChild) {
                                const historyChanged = outputChild;
                                messageLog = `Failed updating history[_id: ${historyChanged._id}]`;
                            }
                        });
                    }));
                    return resolve([statusCode, messageLog, historiesModified]);
                }
            }
        });
    });
};
exports.updateHistory = updateHistory;
const deleteHistory = (id, numberOne, numberTwo, operator, result) => {
    const findHistory = {};
    id != null ? findHistory._id = id : null;
    numberOne != null ? findHistory.numberOne = numberOne : null;
    numberTwo != null ? findHistory.numberTwo = numberTwo : null;
    operator != null ? findHistory.operator = operator : null;
    result != null ? findHistory.result = result : null;
    return new Promise((resolve) => {
        history_1.historyModel.deleteMany(findHistory, (err) => {
            let statusCode = 0;
            let messageLog = '';
            if (err) {
                statusCode = 400;
                messageLog = 'Failed deleting at MongoDB';
            }
            else {
                statusCode = 200;
                messageLog = 'History deleted';
            }
            resolve([statusCode, messageLog]);
        });
    });
};
exports.deleteHistory = deleteHistory;
//# sourceMappingURL=historyController.js.map