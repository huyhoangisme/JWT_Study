import express from "express";
import SpecialityController from "../../controller/specialityController";
const router = express.Router();

let initRouteApiSpeciality = (app) => {
    router.get('/get-speciality', SpecialityController.getSpeciality)
    router.post('/create-speciality', SpecialityController.createSpeciality);
    router.put('/update-speciality', SpecialityController.updateSpeciality)
    app.use('/api/v1', router);
}

module.exports = initRouteApiSpeciality;