import express from "express";
import homeController from "../controller/homeController"
const router = express.Router();
const initRouterWebs = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/create-user', homeController.getCRUD);
    router.post('/post-user', homeController.postUser);
    router.get('/delete-user', homeController.deleteUser);
    router.get('/edit-user', homeController.editUser);
    router.post('/update-user', homeController.updateUser);
    return app.use('/', router);
}
export default initRouterWebs;