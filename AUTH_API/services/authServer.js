const pool = require('../db/db')
const bcrypt = require('bcrypt')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/user-dto')
const {dataAuthLog} = require('../dataLog/dataLog')
const ErrorApi = require('../error/errorApi')
class AuthService {
    async registration (email, password){
        let candidate = await pool.query('SELECT * FROM users where email = $1', [email])
        if (candidate.rows.length){
            throw ErrorApi.badRequest(`Користувач з почтовою адресою ${email} вже існує`)
        }
        const hashPassword = await bcrypt.hash(password, 5)
        let user = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hashPassword])
        return this.makeTokens(user)
    }
    async login(email, password) {
        let user = await pool.query('SELECT * FROM users where email = $1', [email])
        if (!user.rows.length){
            throw ErrorApi.badRequest(`Користувача з таким email: ${email} не знайдено`)
        }
        const isPasswordEquals = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordEquals) {
            throw ErrorApi.badRequest('Невірний пароль');
        }
        return this.makeTokens(user)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ErrorApi.unAuthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ErrorApi.unAuthorizedError();
        }
        let user = await pool.query('SELECT * FROM users where id = $1', [userData.id])
        return this.makeTokens(user)
    }

    async makeTokens(user) {
        const userDto = new UserDto(user.rows[0])
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return dataAuthLog(user.rows[0].id, tokens)
    }
}

module.exports = new AuthService()