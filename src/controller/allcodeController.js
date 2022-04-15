// import res from 'express/lib/response';
import allcodeModal from '../modal/allcodeModal'
let handleGetAllcode = async (req, res) => {
    try {
        let input = req.query.type;
        if (!input) {
            return res.status(500).json({
                errCode: 1,
                message: 'Missing input parameters!'
            })
        } else {
            let data = await allcodeModal.getAllcode(input);
            if (!data) {
                return res.status(200).json({
                    errCode: 2,
                    message: 'Error'
                })
            } else {
                return res.status(200).json({
                    errCode: data.errCode,
                    message: data.message,
                    data: data.data
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            message: "Error from server"
        })
    }
}
module.exports = {
    handleGetAllcode
}