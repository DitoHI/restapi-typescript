import { Router } from 'express';
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

export { historyRouters };
