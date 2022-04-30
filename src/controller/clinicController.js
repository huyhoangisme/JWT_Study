// import res from 'express/lib/response';
import clinicModal from '../modal/clinicModal';
let createClinic = async (req, res) => {
    try {
        await clinicModal.handleCreateClinic(req.body);
        return res.status(200).json({
            errCode: 0,
            message: "OK"
        });
    } catch (e) {
        console.log("Erorr create: ", e);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
let getClinic = async (req, res) => {
    try {
        let response = await clinicModal.handleGetClinic(req.query.id);
        if (response) {
            return res.status(200).json({
                errCode: 0,
                message: "OK",
                data: response
            })
        } else {
            return res.status(500).json({
                errCode: 1,
                message: "Can't fetch data"
            })
        }
    } catch (err) {
        console.log("get Clinic error: ", err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
let updateClinic = async (req, res) => {
    try {
        if (!req.query.id) return res.status(200).json({
            errCode: 1,
            message: "Missing input parameters"
        })
        else {
            await clinicModal.handleUpdateClinic(req.query.id, req.body);
            return res.status(200).json({
                errCode: 0,
                message: "OK"
            })
        }
    } catch (err) {
        console.log("Error update: ", err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
module.exports = {
    createClinic,
    getClinic,
    updateClinic
}