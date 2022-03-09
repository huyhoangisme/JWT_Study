import express from "express";
import userController from "../../controller/userController";
const router = express.Router();

let initRouteApi = (app) => {

    router.post('/user/login', userController.handleLogin);
    router.get('/user/get-all-user', userController.handleGetAllUser)
    router.post('/user/create-user', userController.handleCreateUser)
    router.delete('/user/delete-user', userController.handleDeleteUser)
    router.put('/user/update-user', userController.handleUpdateUser)
    app.use('/api/v1', router);
}

module.exports = initRouteApi;