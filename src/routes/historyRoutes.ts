import { Express } from 'express';
import mongoose from 'mongoose';
import * as historyController from '../controllers/historyController';

const historyRoutes = (app: Express) => {

  app.route('/history')

    .post((req, res) => {
      const a = parseInt(req.body.a, 10);
      const b = parseInt(req.body.b, 10);
      const operator = req.body.operator;

      return historyController
        .addHistory(a, b, operator).then(([statusCode, messageLog, history]) => {
          return res.status(statusCode).send(history);
        });
    })

    .get((req, res) => {
      const a = req.query.a !== undefined ? parseInt(req.query.a, 10) : null;
      const b = req.query.b !== undefined ? parseInt(req.query.b, 10) : null;
      const operator = req.query.operator;
      const result = req.query.result !== undefined ? parseInt(req.query.result, 10) : null;
      return historyController
        .getHistory(a, b, operator, result).then(([statusCode, messageLog, history]) => {
          return res.status(statusCode).send(history);
        });
    });
};

export { historyRoutes };
