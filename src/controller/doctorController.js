// import res from 'express/lib/response';
import doctorModal from "../modal/doctorModal";
let getTopDoctor = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorModal.getTopDoctor(+limit);
        if (response)
            return res.status(200).json({
                errCode: 0,
                message: "OK",
                data: response,
            });
        else
            return res.status(200).json({
                errCode: 1,
                message: "fetch data failed",
            });
    } catch (err) {
        console.log("Show error top doctor:", err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};
let getAllDoctor = async (req, res) => {
    try {
        let id = req.query.id;
        let data = await doctorModal.handleGetAllDoctor(id);
        if (data) {
            return res.status(200).json({
                errCode: 0,
                message: "OK",
                data: data,
            });
        } else {
            return res.status(200).json({
                errCode: 1,
                message: `Can't fetch data from database`,
            });
        }
    } catch (err) {
        console(err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};
let updateDetailDoctor = async (req, res) => {
    try {
        let respond = await doctorModal.handleUpdateDoctor(req.body);
        if (respond) {
            return res.status(200).json({
                errCode: 0,
                message: "OK",
            });
        } else
            return res.status(200).json({
                errCode: 1,
                message: `Can't update a doctor`,
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};
let getDetailDoctor = async (req, res) => {
    try {
        let id = req.query.id;
        if (!id) {
            return res.status(200).json({
                errCode: 1,
                message: "Missing parameters",
            });
        } else {
            let data = await doctorModal.handleGetDetailDoctor(id);
            return res.status(200).json({
                errCode: 0,
                message: "OK",
                data: data,
            });
        }
    } catch (err) {
        console.log("Show error detail doctor:", err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};
let scheduleDoctor = async (req, res) => {
    try {
        let respond = await doctorModal.handleScheduleDoctor(req.body);
        if (respond) {
            res.status(200).json({
                errCode: 0,
                message: "OK",
                data: respond
            });
        } else {
            return res.status(200).json({
                errCode: 1,
                message: "can't fetch from database"
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            errCode: -1,
            message: "Error from server",
        });
    }
};
module.exports = {
    getTopDoctor,
    getAllDoctor,
    updateDetailDoctor,
    getDetailDoctor,
    scheduleDoctor,
};
