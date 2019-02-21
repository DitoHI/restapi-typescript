const config: any = {};

config.host = process.env.HOST;
config.authKey = process.env.AUTH_KEY;
config.databaseId = process.env.DATABASE_ID;
config.colletionId = process.env.COLLECTION_ID;

export { config };
