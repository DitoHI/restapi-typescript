import { SqlQuerySpec } from '@azure/cosmos';
import { HistoryDao } from '../models/history/historyDao';

class HistoryController {
  public historyDao: HistoryDao;

  constructor(historyDao: HistoryDao) {
    this.historyDao = historyDao;
  }

  public async showHistory(req: any, res: any) {
    const querySpec: SqlQuerySpec = {
      query: 'SELECT * from root r',
    };
  }

}
