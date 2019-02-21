import { Container, CosmosClient, Database, SqlQuerySpec } from '@azure/cosmos';

class Client {
  public client: CosmosClient;
  public databaseId: string;
  public collectionId: string;
  public database: Database;
  public container: Container;

  constructor(cosmosClient: CosmosClient, databaseId: string, collectionId: string) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = collectionId;

    this.database = null;
    this.container = null;
  }

  public async init() {
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;

    const coResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    });
    this.container = coResponse.container;
  }
}

export { Client };
