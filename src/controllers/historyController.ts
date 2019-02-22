import { SqlQuerySpec } from '@azure/cosmos';
import { model } from 'mongoose';
import { calculator } from '../meeting/three/mult';
import { HistoryDao } from '../models/history/historyDao';
import { historyModel, IHistory } from '../schema/history';

class HistoryController {
  public historyDao: HistoryDao;

  constructor(historyDao: HistoryDao) {
    this.historyDao = historyDao;
  }
}

const addHistory = (numberOne: number, numberTwo: number, operator: string) => {
  const result = calculator(numberOne, numberOne, operator);
  return new Promise((resolve) => {
    // save to history of calculation
    const newHistory = new historyModel({
      numberOne,
      numberTwo,
      operator,
      result,
      createdIn: Date.now(),
    });
    newHistory.save((err, history) => {
      let statusCode: number = 0;
      let messageLog: string = '';
      if (err) {
        statusCode = 400;
        messageLog = 'Failed saving to MongoDB';
      } else {
        statusCode = 200;
        messageLog = 'Successfully saving to MongoDB';
      }
      resolve([statusCode, messageLog, history]);
    });
  });
};

const getHistory = (numberOne: number, numberTwo: number, operator: string, result: number) => {
  const findHistory: { [k: string]: any } = {};
  numberOne != null ? findHistory.numberOne = numberOne : null;
  numberTwo != null ? findHistory.numberTwo = numberTwo : null;
  operator != null ? findHistory.operator = operator : null;
  result != null ? findHistory.result = result : null;
  return new Promise((resolve) => {
    historyModel.find(findHistory, (err, output: any) => {
      let statusCode: number = 0;
      let messageLog: string = '';
      if (err) {
        statusCode = 400;
        messageLog = 'Failed finding at MongoDB';
      } else {
        statusCode = 200;
        messageLog = 'Successfully finding at MongoDB';
      }
      resolve([statusCode, messageLog, output]);
    });
  });
};

export { addHistory, getHistory };
