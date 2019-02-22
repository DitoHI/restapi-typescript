import { Express } from "express";
import { calculator } from "../meeting/three/mult";
import { historyModel } from "../schema/history";

const historyRoutes = (app: Express) => {

  app.route('/history')

    .post((req, res) => {
      const a = parseInt(req.body.a, 10);
      const b = parseInt(req.body.b, 10);
      const operator = req.body.operator;
      const result = calculator(a, b, operator);

      // save to history of calculation
      const newHistory = new historyModel({
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
        } else {
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
        a = parseInt(req.body.a,10);
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
      const findHistory: { [k: string]: any } = {};
      a != null ? findHistory.numberOne = a : null;
      b != null ? findHistory.numberTwo = b : null;
      operator != null ? findHistory.operator = operator : null;
      result != null ? findHistory.result = a : null;
      
      historyModel.find(findHistory).exec((err, history) => {
        if (err) {
          res.status(408).json({
            message: err,
          });
        } else {
          res.status(200).json({
            message: 'Successful find',
            body: history,
          });
        }
      })
    })
};

export { historyRoutes };
