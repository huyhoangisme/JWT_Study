import db from "../models/index";
const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll();
        return res.render('home.ejs', { data: JSON.stringify(data) })
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    getHomePage
}