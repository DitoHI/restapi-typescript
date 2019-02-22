"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mult_1 = require("../meeting/three/mult");
const history_1 = require("../schema/history");
const historyRoutes = (app) => {
    app.route('/calculateHistory')
        .post((req, res) => {
        const a = parseInt(req.body.a, 10);
        const b = parseInt(req.body.b, 10);
        const operator = req.body.operator;
        const result = mult_1.calculator(a, b, operator);
        // save to history of calculation
        const newHistory = new history_1.historyModel({
            createdIn: Date.now(),
            numberOne: a,
            numberTwo: b,
            operator: operator,
            result: result
        });
        newHistory.save((err, history) => {
            if (err) {
                res.status(408).json({
                    message: err,
                });
            }
            else {
                res.status(200).json({
                    message: 'Successful saving',
                    body: history,
                });
            }
        });
    })
        .get((req, res) => {
        let a = null;
        let b = null;
        let operator = null;
        let result = null;
        if (req.body.a != null) {
            a = parseInt(req.body.a, 10);
        }
        if (req.body.b != null) {
            b = parseInt(req.body.b, 10);
        }
        if (req.body.operator != null) {
            operator = req.body.operator;
        }
        if (req.body.result != null) {
            result = req.body.result;
        }
        const findHistory = {};
        a != null ? findHistory.numberOne = a : null;
        b != null ? findHistory.numberTwo = b : null;
        operator != null ? findHistory.operator = operator : null;
        result != null ? findHistory.result = a : null;
        history_1.historyModel.find(findHistory).exec((err, history) => {
            if (err) {
                res.status(408).json({
                    message: err,
                });
            }
            else {
                res.status(200).json({
                    message: 'Successful find',
                    body: history,
                });
            }
        });
    });
};
exports.historyRoutes = historyRoutes;
//# sourceMappingURL=historyRoutes.js.map