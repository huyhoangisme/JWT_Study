// import res from 'express/lib/response';
import specialityModal from '../modal/specialityModal';
let createSpeciality = async (req, res) => {
    try {
        await specialityModal.handleCreateSpeciality(req.body);
        return res.status(200).json({
            errCode: 0,
            message: "OK"
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
let getSpeciality = async (req, res) => {
    try {
        let response = await specialityModal.handleGetSpeciality(req.query.id);
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
        console.log("err: ", err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
let updateSpeciality = async (req, res) => {
    try {
        if (!req.query.id) return res.status(200).json({
            errCode: 1,
            message: "Missing input parameters"
        })
        else {
            await specialityModal.handleUpdateSpeciality(req.query.id, req.body);
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
    createSpeciality,
    getSpeciality,
    updateSpeciality
}