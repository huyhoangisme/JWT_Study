import express from "express";
import homeController from "../controller/homeController"
const router = express.Router();
const initRouterWebs = (app) => {
    router.get('/', homeController.getHomePage);
    return app.use('/', router);
}
export default initRouterWebs;