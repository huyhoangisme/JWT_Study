import _ from "lodash";
import db from "../models/index";
let handleCreateSpeciality = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll({
                raw: true,
                attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            })
            let result = [];
            result.push(data);
            data = _.differenceWith(result, specialties, (a, b) => {
                return a.nameSpeciality === b.name;
            });
            if (_.isEmpty(data)) return;
            data = result.map((item) => {
                return {
                    name: item.nameSpeciality,
                    contentHTML: item.contentHTML,
                    contentMarkdown: item.contentMarkdown,
                    image: item.avatar
                }
            })
            let response = await db.Specialty.bulkCreate(data);
            resolve(response)
        } catch (e) {
            reject(e)
        }
    })

}
let handleGetSpeciality = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL') {
                let response = await db.Specialty.findAll({
                    raw: true
                })
                resolve(response)
            } else {
                let response = await db.Specialty.findOne({
                    where: { id: id },
                    raw: true
                })
                resolve(response)
            }

        } catch (err) {
            reject(err);
        }
    })
}
let handleUpdateSpeciality = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let speciality = await db.Specialty.findOne({
                where: { id: id }
            })
            if (speciality) {
                speciality.contentMarkdown = data.contentMarkdown;
                speciality.contentHTML = data.contentHTML;
                speciality.image = data.avatar;
                await speciality.save();
                resolve(speciality);
            }
            resolve(speciality)
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    handleCreateSpeciality,
    handleGetSpeciality,
    handleUpdateSpeciality
}