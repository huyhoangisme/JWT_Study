
import db from '../models/index';
import bcrypt from "bcryptjs";
const getAllUsers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll({
                raw: true
            });
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
}
const createUser = async (user) => {
    const password = hashPassword(user.password);
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.create({
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                password: password,
                address: user.address,
                phonenumber: user.phone,
                gender: user.gender,
                roleId: user.roleid,
            })
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
    console.log(password);
    // const data = await db.User.create()
}
let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
const deleteUser = async (id) => {
    return await db.User.destroy({
        where: { id: id },
    });
}
const getInforUser = (id) => {
    return new Promise(async (resolve, reject) => {
        let data = await db.User.findOne({
            where: { id: id },
            raw: true,
        })
        if (data) {
            resolve(data);
        } else { resolve([]) }
    })
}
const updateUser = (user) => {

    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findOne({
                where: { id: user.id },
            })
            if (data) {
                data.firstName = user.firstname;
                data.lastName = user.lastname;
                data.email = user.email;
                data.address = user.address;
                data.phonenumber = user.phone;
                await data.save()
                resolve(data);
            } else {
                resolve();
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    getInforUser,
    updateUser
}