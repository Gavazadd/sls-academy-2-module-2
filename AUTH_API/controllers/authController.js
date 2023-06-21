const authService = require('../services/authServer')
const {validationResult} = require('express-validator');
const ErrorApi = require('../error/errorApi');

class AuthController {
    async registration(req, res, next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ErrorApi.badRequest('Помилка при валідації! Уведіть коректний email та пароль розміром від 6 до 32 символів'))
            }
            const {email, password} = req.body
            const userData = await authService.registration(email, password)
            res.cookie('refreshToken', userData.data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(201).json(userData)
        }catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try{
            const {email, password} = req.body
            const userData = await authService.login(email, password)
            res.cookie('refreshToken', userData.data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData)
        }catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try{
            const {refreshToken} = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie('refreshToken', userData.data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData)
        }catch (e) {
            next(e)
        }
    }

}


module.exports = new AuthController();