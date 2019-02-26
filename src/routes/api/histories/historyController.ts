import { calculator } from '../../../meeting/three/mult';
import { historyModel, IHistory } from '../../../schema';

const addHistory = (req: any, res: any) => {
  if (!req.body.a || !req.body.b || !req.body.operator) {
    return res.status(400).json({
      message: 'No request found'
    });
  }

  const a = parseInt(req.body.a, 10);
  const b = parseInt(req.body.b, 10);
  const operator = req.body.operator;

  const result = calculator(a, b, operator);

  const newHistory = new historyModel({
    operator,
    result,
    numberOne: a,
    numberTwo: b,
    createdIn: Date.now(),
  });
  newHistory.save((err, history) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      statusCode = 400;
      messageLog = 'Failed saving to MongoDB';
      return res.status(statusCode).json({
        message: messageLog
      });
    }

    statusCode = 200;
    messageLog = 'History has been saved';
    return res.status(statusCode).json({
      message: messageLog,
      body: history,
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
        message: messageLog
      });
    }

    const histories = output as IHistory[];
    if (histories.length === 0) {
      statusCode = 404;
      messageLog = 'No history found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
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

const updateHistory = (req: any, res: any) => {
  const { operator, operatorChanged } = req.query;
  const query = { operator };

  historyModel.find(query, (err, output: any) => {
    let statusCode: number = 0;
    let messageLog: string = '';
    if (err) {
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
    const histories = (output as IHistory[]).slice();
    if (histories.length === 0) {
      statusCode = 404;
      messageLog = 'No history found. Check out your operator';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }
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
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: historiesModified
    });

  });
};

const deleteHistory = (req: any, res: any) => {
  let statusCode: number = 0;
  let messageLog: string = '';

  if (req.query.a == null
    && req.query.b == null
    && req.query.operator == null
    && req.query.result == null) {
    statusCode = 400;
    messageLog = 'No request found';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog
    });
  }

  const id = req.query.id;

  const a = req.query.a != null
    ? parseInt(req.query.a, 10)
    : null;

  const b = req.query.b != null
    ? parseInt(req.query.b, 10)
    : null;

  const operator = req.query.operator;

  const result = req.query.result != null
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
    const histories = output as IHistory[];
    if (histories.length === 0) {
      statusCode = 400;
      messageLog = 'No history found';
      return res.status(statusCode).json({
        status: statusCode,
        message: messageLog
      });
    }

    const historiesClone = histories.slice();
    historiesClone.map(async (history) => {
      historyModel.deleteOne({ _id: history._id }, (errChild) => {
        if (errChild) {
          statusCode = 400;
          messageLog = 'Failed deleting at MongoDB';
          return res.status(statusCode).json({
            status: statusCode,
            message: messageLog
          });
        }
      });
    });

    statusCode = 200;
    messageLog = 'History deleted';
    return res.status(statusCode).json({
      status: statusCode,
      message: messageLog,
      body: historiesClone
    });
  });
};

export { addHistory, getHistory, updateHistory, deleteHistory };
