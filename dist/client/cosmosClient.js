"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(cosmosClient, databaseId, collectionId) {
        this.client = cosmosClient;
        this.databaseId = databaseId;
        this.collectionId = collectionId;
        this.database = null;
        this.container = null;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbResponse = yield this.client.databases.createIfNotExists({
                id: this.databaseId
            });
            this.database = dbResponse.database;
            const coResponse = yield this.database.containers.createIfNotExists({
                id: this.collectionId
            });
            this.container = coResponse.container;
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=cosmosClient.js.map