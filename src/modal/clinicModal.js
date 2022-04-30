import _ from "lodash";
import db from "../models/index";
let handleCreateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Clinic.findAll({
                raw: true,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            })
            let result = [];
            result.push(data);
            data = _.differenceWith(result, specialties, (a, b) => {
                return a.nameClinic === b.name;
            });
            if (_.isEmpty(data)) return;
            data = result.map((item) => {
                return {
                    name: item.nameClinic,
                    contentHTML: item.contentHTML,
                    contentMarkdown: item.contentMarkdown,
                    image: item.avatar,
                    address: item.address
                }
            })
            let response = await db.Clinic.bulkCreate(data);
            resolve(response)
        } catch (e) {
            reject(e)
        }
    })

}
let handleGetClinic = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL') {
                let response = await db.Clinic.findAll({
                    attributes: { exclude: ['DoctorInfoId', 'createdAt', 'updatedAt'] },
                    raw: true
                })
                resolve(response)
            } else {
                let response = await db.Clinic.findOne({
                    where: { id: id },
                    attributes: { exclude: ['DoctorInfoId', 'createdAt', 'updatedAt'] },
                    raw: true
                })
                resolve(response)
            }

        } catch (err) {
            reject(err);
        }
    })
}
let handleUpdateClinic = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinic = await db.Clinic.findOne({
                where: { id: id },
                attributes: { exclude: ['DoctorInfoId', 'createdAt', 'updatedAt'] }
            })
            if (clinic) {
                clinic.contentMarkdown = data.contentMarkdown;
                clinic.contentHTML = data.contentHTML;
                clinic.image = data.avatar;
                clinic.address = data.address
                await clinic.save();
                resolve(clinic);
            }
            resolve(clinic)
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    handleCreateClinic,
    handleGetClinic,
    handleUpdateClinic
}