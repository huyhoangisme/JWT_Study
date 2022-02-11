import express from "express";
import path from "path";
const configViewEngine = (app) => {
    app.set('view engine', 'ejs');
    app.set('views', './src/view');
    app.use(express.static(path.join(__dirname, '/public/images')))
}
export default configViewEngine;