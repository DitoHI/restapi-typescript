import { find } from 'tslint/lib/utils';
import { calculator } from '../meeting/three/mult';
import { historyModel, IHistory } from '../schema/history';

const addHistory = (numberOne: number, numberTwo: number, operator: string) => {
  const result = calculator(numberOne, numberTwo, operator);
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
        messageLog = 'History has been saved';
      }
      resolve([statusCode, messageLog, history]);
    });
  });
};

const getHistory = (req: any, res: any) => {

  const id = req.query.id;

  const a = req.query.a !== undefined
    ? parseInt(req.query.a, 10)
    : null;

  const b = req.query.b !== undefined
    ? parseInt(req.query.b, 10)
    : null;

  const operator = req.query.operator;

  const result = req.query.result !== undefined
    ? parseInt(req.query.result, 10)
    : null;

  const findHistory: { [k: string]: any } = {};

  id != null
    ? findHistory._id = id
    : null;

  a != null
    ? findHistory.numberOne = a
    : null;

  b != null
    ? findHistory.numberTwo = b
    : null;

  operator != null
    ? findHistory.operator = operator
    : null;

  result != null
    ? findHistory.result = result
    : null;

  historyModel.find(findHistory, (err, output: any) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      statusCode = 400;
      messageLog = 'Failed finding at MongoDB';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog,
        body: null,
      });
    }

    const histories = output as IHistory[];
    if (histories.length === 0) {
      statusCode = 404;
      messageLog = 'No history found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog,
        body: null,
      });
    }

    statusCode = 200;
    messageLog = 'History found';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: histories,
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
          messageLog = 'History updated';
          const historiesModified: IHistory[] = [];
          const historiesIdChanged = histories.map((history) => history._id);
          histories.forEach(async (history) => {
            history.result = calculator(history.numberOne, history.numberTwo, operatorChanged);
            history.operator = operatorChanged;
            historiesModified.push(history);
            historyModel
              .findByIdAndUpdate(history._id, history, (errChild, outputChild: any) => {
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

const deleteHistory =
  (id: number, numberOne: number, numberTwo: number, operator: string, result: number) => {
    const findHistory: { [k: string]: any } = {};
    id != null ? findHistory._id = id : null;
    numberOne != null ? findHistory.numberOne = numberOne : null;
    numberTwo != null ? findHistory.numberTwo = numberTwo : null;
    operator != null ? findHistory.operator = operator : null;
    result != null ? findHistory.result = result : null;
    return new Promise((resolve) => {
      historyModel.deleteMany(findHistory, (err) => {
        let statusCode: number = 0;
        let messageLog: string = '';
        if (err) {
          statusCode = 400;
          messageLog = 'Failed deleting at MongoDB';
        } else {
          statusCode = 200;
          messageLog = 'History deleted';
        }
        resolve([statusCode, messageLog]);
      });
    });
  };

export { addHistory, getHistory, updateHistory, deleteHistory };
