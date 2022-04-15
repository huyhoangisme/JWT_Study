import db from "../models/index";
import bcrypt from "bcryptjs";
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            const isExistEmail = await checkEmail(email);
            if (isExistEmail) {
                let user = await db.User.findOne({
                    attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                })
                const comparePassword = bcrypt.compareSync(password, user.password);
                if (comparePassword) {
                    userData.errorCode = 0;
                    userData.errMessage = "OK";
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errorCode = 2; // wrong password
                    userData.errMessage = "Mật khẩu không chính xác. Vui lòng nhập lại mật khẩu!";
                    userData.user = {};
                }
            }
            else {
                userData.errorCode = 1; // wrong email
                userData.errMessage = "Email chưa chính xác. Vui lòng nhập lại email!";
                userData.user = {};
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    })
}
let checkEmail = (emailLogin) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: emailLogin },
                raw: true,
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (error) {
            reject(error);
        }
    })
}
const getAllUsers = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === 'ALL') {
                let Users = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                    raw: true,
                })
                if (Users && Users.length > 0) {
                    resolve(Users);
                } else { resolve([]) }

            } else if (id !== 'ALL') {
                let User = await db.User.findOne({
                    where: { id: id },
                    attributes: { exclude: ['password'] },
                    raw: true,
                })
                if (User) {
                    resolve(User);
                }
                else { resolve([]) }
            }
        } catch (error) {
            reject(error);
        }
    })
}
let hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
const createUser = async (user) => {

    return new Promise(async (resolve, reject) => {

        try {
            let data = {};
            const password = hashPassword(user.password);
            const isExistEmail = await checkEmail(user.email);
            if (isExistEmail) {
                data.errCode = 2;
                data.errMessage = "Email đã tồn tại. Vui lòng nhập email khác";
                data.user = {};
            } else {
                let createData = await db.User.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: password,
                    address: user.address,
                    phonenumber: user.phone,
                    gender: user.gender,
                    roleId: user.roleId,
                    image: user.avatar,
                    positionId: user.position
                })
                // console.log("check", createData)
                data.errCode = 0;
                data.errMessage = "OK";
                data.user = createData;
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}
const deleteUser = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({
                where: { id: id },
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    })

}
const updateUser = async (id, user) => {
    // console.log("Check user update", user);
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.User.findOne({
                where: { id: id },
            })
            if (data) {
                data.firstName = user.firstName;
                data.lastName = user.lastName;
                data.email = user.email;
                data.gender = user.gender;
                data.phonenumber = user.phoneNumber;
                data.roleId = user.roleId;
                data.positionId = user.positionId;
                // data.password = user.password
                data.address = user.address;
                data.image = user.avatar;
                await data.save()
                resolve(data);
            } else {
                resolve({});
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleUserLogin,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}