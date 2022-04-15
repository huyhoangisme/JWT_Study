import db from "../models/index";
import _ from 'lodash';
let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                limit: limit,
                where: { roleId: 'R2' },
                attributes: { exclude: ['password'] },
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueVi', 'valueEn'] }
                ],
                raw: true,
                nest: true
            })
            if (data)
                resolve(data);
            else resolve();

        } catch (err) {
            reject(err);
        }
    })
}
let handleGetAllDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL') {
                let data = await db.User.findAll({
                    where: { roleId: 'R2' },
                    attributes: { exclude: ['password', 'image'] },
                    raw: true
                })
                if (data) {
                    resolve(data);
                }
                resolve();
            } else {
                let data = await db.User.findOne({
                    where: { id: id, roleId: 'R2' },
                    attributes: { exclude: ['password', 'image'] },
                    raw: true
                })
                if (data) {
                    resolve(data);
                }
                resolve();
            }
        } catch (err) {
            reject(err);
        }
    })
}
let handleUpdateDoctor = (markdown) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!markdown.doctorId || !markdown.contentHtml || !markdown.contentMarkdown) {
                resolve();
            }
            if (markdown.isHaveMarkdown === 'CREATE') {
                let doctor = await db.Markdown.create({
                    doctorId: markdown.doctorId,
                    description: markdown.description,
                    contentHtml: markdown.contentHtml,
                    contentMarkdown: markdown.contentMarkdown
                })
                resolve(doctor);
            }
            else if (markdown.isHaveMarkdown === 'EDIT') {
                let infoDoctor = await db.Markdown.findOne({
                    where: { doctorId: markdown.doctorId },
                    raw: false
                })
                infoDoctor.description = markdown.description;
                infoDoctor.contentHtml = markdown.contentHtml
                infoDoctor.contentMarkdown = markdown.contentMarkdown
                infoDoctor.save();
            }
            else { }

        } catch (err) {
            reject(err);
        }
    })
}
let handleGetDetailDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: { exclude: ['password'] },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueVi', 'valueEn'] },
                    { model: db.Markdown, attributes: ['contentHtml', 'contentMarkdown', 'description'] },
                ],
                raw: true,
                nest: true
            })
            resolve(data)
        } catch (err) {
            reject(err);
        }
    })
}
let handleScheduleDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = [];
            let allScheduleRecord = await db.Schedule.findAll({
                raw: true,
                attributes: { exclude: ['id', 'maxNumber', 'createdAt', 'updatedAt'] },
            })
            // xu li khi trung data
            data = _.differenceWith(data, allScheduleRecord, (a, b) => {
                return a.timeType === b.timeType && a.date === b.date;
            });
            if (_.isEmpty(data)) return;
            console.log("check difference", data);
            if (data && data.length > 0) {
                data.forEach((item) => {
                    result.push({
                        maxNumber: 10,
                        date: item.date,
                        timeType: item.timeType,
                        doctorId: item.doctorId
                    })
                })
            }
            let response = await db.Schedule.bulkCreate(result, {
                order: [['date', 'DESC']],
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    getTopDoctor,
    handleGetAllDoctor,
    handleUpdateDoctor,
    handleGetDetailDoctor,
    handleScheduleDoctor
}