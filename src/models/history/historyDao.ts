import { SqlQuerySpec } from '@azure/cosmos';
import { Client } from '../../client/cosmosClient';

class HistoryDao extends Client {
  public async saveHistory(item: any) {
    const history: any = {};
    history.date = Date.now();
    const { body: doc } = await this.container.items.create(history);
    return doc;
  }

  public async find(querySpec: SqlQuerySpec) {
    if (!this.container) {
      throw new Error('Collection is not Initialized');
    }
    const { result: results } = await this.container.items
            .query(querySpec)
            .toArray();
    return results;
  }
}

export { HistoryDao };
