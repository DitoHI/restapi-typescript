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
  const result = calculator(numberOne, numberTwo, operator);
  return new Promise((resolve) => {
    // save to history of calculation
    const newHistory = new historyModel({
      numberOne,
      numberTwo,
      operator,
      result: result,
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
        messageLog = 'History has been saved';
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
        const histories = output as IHistory[];
        if (histories.length === 0) {
          statusCode = 404;
          messageLog = 'No history found';
        } else {
          statusCode = 200;
          messageLog = 'History has/have been found';
        }
      }
      resolve([statusCode, messageLog, output]);
    });
  });
};

const updateHistory = (operatorBefore: string, operatorChanged: string) => {
  const query = { operator: operatorBefore };
  return new Promise((resolve) => {
    historyModel.find(query, (err, output: any) => {
      let statusCode: number = 0;
      let messageLog: string = '';
      if (err) {
        statusCode = 400;
        messageLog = 'Failed updating at MongoDB';
      } else {
        const histories = (output as IHistory[]).slice();
        if (histories.length === 0) {
          statusCode = 404;
          messageLog = 'No history found. Check out your operator';
          resolve([statusCode, messageLog, output]);
        } else {
          statusCode = 307;
          messageLog = 'Successfully updating history';
          const historiesModified: IHistory[] = [];
          const historiesIdChanged = histories.map((history) => history._id);
          histories.forEach(async (history) => {
            history.result = calculator(history.numberOne, history.numberTwo, operatorChanged);
            history.operator = operatorChanged;
            historiesModified.push(history);
            historyModel
              .findByIdAndUpdate(history._id, history,  (errChild, outputChild: any) => {
                if (errChild) {
                  const historyChanged = outputChild as IHistory;
                  messageLog = `Failed updating history[_id: ${historyChanged._id}]`;
                }
              });
          });
          return resolve([statusCode, messageLog, historiesModified]);
        }
      }
    });
  });
};

export { addHistory, getHistory, updateHistory };
