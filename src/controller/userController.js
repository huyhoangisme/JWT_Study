import userModal from "../modal/userModal"
const handleLogin = async (req, res) => {

    // check email exist,
    // compare pasword
    // return data of user except attribute password

    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 3,
            errorMessage: 'Email hoặc mật khẩu chưa được điền'
        })
    }
    const data = await userModal.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: data.errorCode,
        errorMessage: data.errMessage,
        data: data.user ? data.user : {},
    })

}
const handleGetAllUser = async (req, res) => {
    // get id  ALL or single
    const id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errorMessage: 'Missing input parameters',
        })
    }
    let user = await userModal.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        data: user ? user : [],
    })

}
const handleCreateUser = async (req, res) => {
    let dataUser = req.body;
    if (Object.keys(dataUser).length === 0) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameters',
            data: {}
        })
    } else {
        let data = await userModal.createUser(dataUser);
        return res.status(200).json({
            errCode: data.errCode,
            errMessage: data.errMessage,
            data: data.user ? data.user : {}
        })
    }

}
const handleDeleteUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameters',
        })
    } else {
        let data = await userModal.deleteUser(id);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
        })
    }
}
const handleUpdateUser = async (req, res) => {
    let dataUser = req.body;
    let id = req.query.id;
    if (!id || !dataUser) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing input parameters',
        })
    } else {
        let data = await userModal.updateUser(id, dataUser);
        return res.status(200).json({
            errCode: 0,
            errMessage: 'OK',
            data: data,
        })
    }
}
module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
}