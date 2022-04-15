import express from "express";
import Allcode from '../../controller/allcodeController'
const router = express.Router();
let initRouteApiAllcode = (app) => {
    router.get('/allcode', Allcode.handleGetAllcode)
    app.use('/api/v1', router);
}

module.exports = initRouteApiAllcode;