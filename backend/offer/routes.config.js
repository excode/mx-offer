const OfferModel = require('./offer.model');
const VCache = require('../lib/cache');
exports.routesConfig = function (app) {
    app.post('/offer', [
        OfferModel.insert
    ]);
    app.get('/offer', [
        VCache.setListName('offer_list'),
        VCache.verifyCache,
        OfferModel.list
    ]);
    app.patch('/offer/:offerId', [

        OfferModel.patch
    ]);
    app.delete('/offer/:offerId', [
        OfferModel.removeById
    ]);
};

  