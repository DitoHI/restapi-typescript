import { Express } from 'express';
import * as historyController from '../controllers/historyController';
import { IHistory } from '../schema/history';

const historyRoutes = (app: Express) => {

  app.route('/history')

    .post((req, res) => {
      if (!req.body.a || !req.body.b || !req.body.operator) {
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
            return res.status(statusCode).json({
              message: messageLog,
              body: history,
            });
          });
      }
    })

    .get((req, res) => {
      const id = req.query.id;
      const a = req.query.a !== undefined ? parseInt(req.query.a, 10) : null;
      const b = req.query.b !== undefined ? parseInt(req.query.b, 10) : null;
      const operator = req.query.operator;
      const result = req.query.result !== undefined ? parseInt(req.query.result, 10) : null;
      return historyController
        .getHistory(id, a, b, operator, result).then(([statusCode, messageLog, histories]) => {
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
        .then(([statusCode, messageLog, histories]) => {
          const historyParsed = histories as IHistory[];
          return res.status(statusCode).json({
            message: messageLog,
            body: historyParsed.length !== 0 ? histories : null,
          });
        });
    })

    .delete((req, res) => {
      const id = req.query.id;
      const a = req.query.a !== undefined ? parseInt(req.query.a, 10) : null;
      const b = req.query.b !== undefined ? parseInt(req.query.b, 10) : null;
      const operator = req.query.operator;
      const result = req.query.result !== undefined ? parseInt(req.query.result, 10) : null;
      historyController.deleteHistory(id, a, b, operator, result)
        .then(([statusCode, messageLog]) => {
          return res.status(statusCode).json({
            message: messageLog,
          });
        });
    });
};

export { historyRoutes };
