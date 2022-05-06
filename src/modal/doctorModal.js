import db from "../models/index";
import _ from "lodash";
let getTopDoctor = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                limit: limit,
                where: { roleId: "R2" },
                attributes: { exclude: ["password", "DoctorInfoId"] },
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Allcode,
                        as: "genderData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.DoctorInfo,
                        as: "DoctorInfo",
                        attributes: { exclude: ["id", "doctorId", "DoctorInfoId"] },
                        include: [
                            {
                                model: db.Allcode,
                                as: "priceData",
                                attributes: ["valueVi", "valueEn"],
                            },
                            {
                                model: db.Allcode,
                                as: "paymentData",
                                attributes: ["valueVi", "valueEn"],
                            },
                            {
                                model: db.Specialty,
                                as: "specialityData",
                                attributes: ["name"],
                            },
                            {
                                model: db.Clinic,
                                attributes: ["name", "address"],
                            },
                        ]
                    },
                ],
                raw: true,
                nest: true,
            });
            if (data) resolve(data);
            else resolve();
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetAllDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === "ALL") {
                let data = await db.User.findAll({
                    where: { roleId: "R2" },
                    attributes: { exclude: ["password", "image", "DoctorInfoId"] },
                    include: [
                        {
                            model: db.DoctorInfo,
                            as: "DoctorInfo",
                            attributes: { exclude: ["id", "doctorId", "DoctorInfoId"] },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "priceData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "paymentData",
                                    attributes: ["valueVi", "valueEn"],
                                },
                                {
                                    model: db.Specialty,
                                    as: "specialityData",
                                    attributes: ["name"],
                                },
                                {
                                    model: db.Clinic,
                                    attributes: ["name", "address"],
                                },
                            ]
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                if (data) {
                    resolve(data);
                }
                resolve();
            } else {
                let data = await db.User.findOne({
                    where: { id: id, roleId: "R2" },
                    attributes: { exclude: ["password", "image"] },
                    raw: true,
                });
                if (data) {
                    resolve(data);
                }
                resolve();
            }
        } catch (err) {
            reject(err);
        }
    });
};
let handleUpdateDoctor = (markdown) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (markdown.isHaveMarkdown === "CREATE") {
                await db.Markdown.create({
                    doctorId: markdown.doctorId,
                    description: markdown.description,
                    contentHtml: markdown.contentHtml,
                    contentMarkdown: markdown.contentMarkdown,
                });
            } else if (markdown.isHaveMarkdown === "EDIT") {
                let infoDoctor = await db.Markdown.findOne({
                    where: { doctorId: markdown.doctorId },
                    raw: false,
                });
                infoDoctor.description = markdown.description;
                infoDoctor.contentHtml = markdown.contentHtml;
                infoDoctor.contentMarkdown = markdown.contentMarkdown;
                infoDoctor.save();
            }
            let doctorInfo = await db.DoctorInfo.findOne({
                where: {
                    doctorId: markdown.doctorId,
                },
                raw: false,
            });
            if (doctorInfo) {
                // implement update
                // doctorInfo.doctorId = markdown.doctorId;
                doctorInfo.price = markdown.priceId;
                doctorInfo.address = markdown.addressId;
                doctorInfo.clinicID = markdown.clinicId;
                doctorInfo.specialityID = markdown.specialityId;
                doctorInfo.paycash = markdown.paymentId;
                await doctorInfo.save();
            } else {
                // implement create
                await db.DoctorInfo.create({
                    doctorId: markdown.doctorId,
                    price: markdown.priceId,
                    address: markdown.addressId,
                    clinicID: markdown.clinicId,
                    specialityID: markdown.specialityId,
                    paycash: markdown.paymentId,
                });
            }
            resolve(doctorInfo);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetDetailDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findOne({
                where: { id: id },
                attributes: { exclude: ["password"] },
                include: [
                    {
                        model: db.Allcode,
                        as: "positionData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Markdown,
                        attributes: ["contentHtml", "contentMarkdown", "description"],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};
let handleScheduleDoctor = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = [];
            let allScheduleRecord = await db.Schedule.findAll({
                raw: true,
                attributes: { exclude: ["id", "maxNumber", "createdAt", "updatedAt"] },
            });
            // xu li khi trung data
            data = _.differenceWith(data, allScheduleRecord, (a, b) => {
                return a.timeType === b.timeType && a.date === b.date;
            });
            if (_.isEmpty(data)) return;
            if (data && data.length > 0) {
                data.forEach((item) => {
                    result.push({
                        maxNumber: 10,
                        date: item.date,
                        timeType: item.timeType,
                        doctorId: item.doctorId,
                    });
                });
            }
            let response = await db.Schedule.bulkCreate(result, {
                order: [["date", "DESC"]],
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetScheduleDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date,
                },
                raw: true,
            });
            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetDoctorInfoByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.DoctorInfo.findOne({
                where: { doctorId: id },
                attributes: { exclude: ["id", "createdAt", "updatedAt"] },
                raw: true,
            });
            if (!data) data = {};
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};
let handleGetSpecialClinicByID = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.DoctorInfo.findOne({
                where: { doctorId: id },
                attributes: {
                    exclude: [
                        "id",
                        "createdAt",
                        "updatedAt",
                        "price",
                        "address",
                        "clinicID",
                        "doctorId",
                        "specialityID",
                        "paycash",
                    ],
                },
                include: [
                    {
                        model: db.Allcode,
                        as: "priceData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Specialty,
                        as: "specialityData",
                        attributes: ["name"],
                    },
                    {
                        model: db.Allcode,
                        as: "paymentData",
                        attributes: ["valueVi", "valueEn"],
                    },
                    {
                        model: db.Clinic,
                        attributes: ["name", "address"],
                    },
                ],
                raw: true,
                nest: true,
            });
            if (!data) data = {};
            resolve(data);
        } catch (err) {
            reject(err);
        }
    });
};
module.exports = {
    getTopDoctor,
    handleGetAllDoctor,
    handleUpdateDoctor,
    handleGetDetailDoctor,
    handleScheduleDoctor,
    handleGetScheduleDoctor,
    handleGetDoctorInfoByID,
    handleGetSpecialClinicByID,
};
