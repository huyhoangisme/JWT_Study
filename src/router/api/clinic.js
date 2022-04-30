import express from "express";
import clinicController from "../../controller/clinicController";
const router = express.Router();

let initRouteApiClinic = (app) => {
    router.get('/get-clinic', clinicController.getClinic)
    router.post('/create-clinic', clinicController.createClinic);
    router.put('/update-clinic', clinicController.updateClinic)
    app.use('/api/v1', router);
}

module.exports = initRouteApiClinic;