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
const cosmosClient_1 = require("../../client/cosmosClient");
class HistoryDao extends cosmosClient_1.Client {
    saveHistory(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const history = {};
            history.date = Date.now();
            const { body: doc } = yield this.container.items.create(history);
            return doc;
        });
    }
    find(querySpec) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.container) {
                throw new Error('Collection is not Initialized');
            }
            const { result: results } = yield this.container.items
                .query(querySpec)
                .toArray();
            return results;
        });
    }
}
exports.HistoryDao = HistoryDao;
//# sourceMappingURL=historyDao.js.map