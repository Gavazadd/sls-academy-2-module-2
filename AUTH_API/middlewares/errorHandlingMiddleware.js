const ErrorApi = require('../error/errorApi');

module.exports = function (err, req, res, next) {
    if (err instanceof ErrorApi) {
        return res.status(err.status).json({success: false, error: `${err.message}`},)
    }
    return res.status(500).json({message: "Непередбачувана помилка!"})
}