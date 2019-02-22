"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mult_1 = require("../meeting/three/mult");
const history_1 = require("../schema/history");
class HistoryController {
    constructor(historyDao) {
        this.historyDao = historyDao;
    }
}
const addHistory = (numberOne, numberTwo, operator) => {
    const result = mult_1.calculator(numberOne, numberOne, operator);
    return new Promise((resolve) => {
        // save to history of calculation
        const newHistory = new history_1.historyModel({
            numberOne,
            numberTwo,
            operator,
            result,
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
                messageLog = 'Successfully saving to MongoDB';
            }
            resolve([statusCode, messageLog, history]);
        });
    });
};
exports.addHistory = addHistory;
const getHistory = (numberOne, numberTwo, operator, result) => {
    const findHistory = {};
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
                statusCode = 200;
                messageLog = 'Successfully finding at MongoDB';
            }
            resolve([statusCode, messageLog, output]);
        });
    });
};
exports.getHistory = getHistory;
//# sourceMappingURL=historyController.js.map