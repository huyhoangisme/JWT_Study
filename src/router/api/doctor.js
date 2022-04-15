import express from "express";
import doctorController from "../../controller/doctorController";
const router = express.Router();

let initRouteDoctorApi = (app) => {

    router.get('/get-top-doctor', doctorController.getTopDoctor);
    router.get('/get-all-doctor', doctorController.getAllDoctor);
    router.post('/update-detail-doctor', doctorController.updateDetailDoctor);
    router.get('/get-detail-doctor', doctorController.getDetailDoctor);
    router.post('/create-schedule-doctor', doctorController.scheduleDoctor);
    app.use('/api/v1', router);
}

module.exports = initRouteDoctorApi;