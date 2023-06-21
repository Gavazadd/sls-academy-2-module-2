const ErrorApi = require('../error/errorApi');
const tokenService = require('../services/tokenService');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ErrorApi.unAuthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ErrorApi.unAuthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ErrorApi.unAuthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ErrorApi.unAuthorizedError());
    }
};