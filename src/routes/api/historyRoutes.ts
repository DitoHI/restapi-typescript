import { Express, Router } from 'express';
import * as historyController from '../../controllers/historyController';

const historyRouters = Router();

historyRouters.get('/read', (req, res) => {
  historyController.getHistory(req, res);
});

historyRouters.post('/create', (req, res) => {
  historyController.addHistory(req, res);
});

historyRouters.put('/update', (req, res) => {
  historyController.updateHistory(req, res);
});

historyRouters.delete('/delete', (req, res) => {
  historyController.deleteHistory(req, res);
});

const historyRoutes = (app: Express) => {

  app.route('/history')

    // .delete((req, res) => {
    //   const id = req.query.id;
    //   const a = req.query.a !== undefined ? parseInt(req.query.a, 10) : null;
    //   const b = req.query.b !== undefined ? parseInt(req.query.b, 10) : null;
    //   const operator = req.query.operator;
    //   const result = req.query.result !== undefined ? parseInt(req.query.result, 10) : null;
    //   historyController.deleteHistory(id, a, b, operator, result)
    //     .then(([statusCode, messageLog]) => {
    //       return res.status(statusCode).json({
    //         message: messageLog,
    //       });
    //     });
    // });
};

export { historyRoutes, historyRouters };
