import db from "../models/index";
let getAllcode = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allcode = {};
            let data = await db.Allcode.findAll({
                where: { type: input },
                raw: true
            })
            allcode.errCode = 0;
            allcode.message = "OK";
            allcode.data = data;
            resolve(allcode);
        }
        catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getAllcode,
}