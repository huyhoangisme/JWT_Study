import CRUDService from "../modal/CRUDModal"
import db from "../models/index";
const getHomePage = async (req, res) => {
    let data = await CRUDService.getAllUsers();
    // console.log(data)
    res.render('home.ejs', { dataUsers: data })
}
const getCRUD = (req, res) => {
    res.render('postUser.ejs')
}
const postUser = async (req, res) => {
    CRUDService.createUser(req.body);
    getHomePage(req, res);
    res.redirect('/')
}
const deleteUser = async (req, res) => {
    let id = req.query.id;
    if (id) {
        CRUDService.deleteUser(id);
    } else {
        res.send("Not Found!");
    }
    res.redirect('/')
}
const editUser = async (req, res) => {
    const id = req.query.id;
    let data = await CRUDService.getInforUser(id);
    res.render('displayUser.ejs', { dataUser: data });
}
const updateUser = async (req, res) => {

    let u = await CRUDService.updateUser(req.body);
    res.redirect('/')
}
module.exports = {
    getHomePage,
    postUser,
    getCRUD,
    deleteUser,
    editUser,
    updateUser
}