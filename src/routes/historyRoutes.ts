import { Express } from 'express';
import mongoose from 'mongoose';
import * as historyController from '../controllers/historyController';
import { historyModel, IHistory } from "../schema/history";
import { calculator } from "../meeting/three/mult";

const historyRoutes = (app: Express) => {

  app.route('/history')

    .post((req, res) => {
      if (!req.body.a || !req.body.b || !req.body.operator) {
        console.log('Testing');
        res.status(400).json({
          message: 'No request found',
          body: null,
        });
      }

      if (req.body.a && req.body.b && req.body.operator) {
        const a = parseInt(req.body.a, 10);
        const b = parseInt(req.body.b, 10);
        const operator = req.body.operator;
        return historyController
          .addHistory(a, b, operator).then(([statusCode, messageLog, history]) => {
            console.log(messageLog);
            return res.status(statusCode).json({
              message: messageLog,
              body: history,
            });
          });
      }
    })

    .get((req, res) => {
      const a = req.query.a !== undefined ? parseInt(req.query.a, 10) : null;
      const b = req.query.b !== undefined ? parseInt(req.query.b, 10) : null;
      const operator = req.query.operator;
      const result = req.query.result !== undefined ? parseInt(req.query.result, 10) : null;
      return historyController
        .getHistory(a, b, operator, result).then(([statusCode, messageLog, histories]) => {
          const historyParsed = histories as IHistory[];
          return res.status(statusCode).json({
            message: messageLog,
            body: historyParsed.length !== 0 ? historyParsed : null,
          });
        });
    })

    .put((req, res) => {
      const { operator, operatorChanged } = req.query;
      return historyController
        .updateHistory(operator, operatorChanged)
        .then(async ([statusCode, messageLog, histories]) => {
          const historyParsed = histories as IHistory[];
          return res.status(statusCode).json({
            message: messageLog,
            body: historyParsed.length !== 0 ? histories : null,
          });
        });
    });
};

export { historyRoutes };
