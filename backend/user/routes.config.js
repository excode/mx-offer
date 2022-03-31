const UsersModel = require('./users.model');
const VCache = require('../lib/cache');
exports.routesConfig = function (app) {
    app.post('/user', [
        UsersModel.insert
    ]);
    app.get('/user', [
        VCache.setListName('user_list'),
        VCache.verifyCache,
        UsersModel.list
    ]);
    app.patch('/user/:userId', [

        UsersModel.patch
    ]);
    app.delete('/user/:userId', [
        UsersModel.removeById
    ]);
    app.patch('/user/random/:email', [

        UsersModel.randomOffer
    ]);
};

  