import express from "express";
import viewEngine from "../src/config/viewEngine";
import bodyParser from "body-parser";
import initRouteWeb from "../src/router/web";
import connectDB from "../src/config/connectDB"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// connect database
connectDB();
// config viewEngine
viewEngine(app);
// init routerWeb
initRouteWeb(app);
// start server
app.listen(port, () => {
    console.log(`Server on:http://localhost:${port}`);
});



