const tokenService = require("./tokenService");
const pool = require("../db/db");
const {dataUserLog} = require('../dataLog/dataLog')

class UserService {
    async getUser(refreshToken){
        const userData = tokenService.validateRefreshToken(refreshToken);
        let user = await pool.query('SELECT * FROM users where id = $1', [userData.id])
        return dataUserLog(user.rows[0])
    }
}

module.exports = new UserService()