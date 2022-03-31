const TransactionModel = require('./transaction.model');
const VCache = require('../lib/cache');
exports.routesConfig = function (app) {
    app.post('/transaction', [
        TransactionModel.insert
    ]);
    app.get('/transaction', [
        VCache.setListName('transaction_list'),
        VCache.verifyCache,
        TransactionModel.list
    ]);
    app.patch('/transaction/:transactionId', [

        TransactionModel.patch
    ]);
    app.delete('/transaction/:transactionId', [
        TransactionModel.removeById
    ]);
};

  