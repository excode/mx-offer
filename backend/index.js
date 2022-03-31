const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const UserRoute = require("./user/routes.config");
const OfferRoute = require("./offer/routes.config");
const Transactionoute = require("./transaction/routes.config");


//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(postTrimmer);

function postTrimmer(req, res, next) {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof(value) === 'string')
                req.body[key] = value.trim();
        }
    }
    next();
}
//ROUTES//
UserRoute.routesConfig(app);
Transactionoute.routesConfig(app);
OfferRoute.routesConfig(app);
//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server has started on port 5000");
});
