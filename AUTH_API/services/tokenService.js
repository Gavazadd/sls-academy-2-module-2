const jwt = require('jsonwebtoken')
const pool = require('../db/db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: `${process.env.TTL}`})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET)
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await pool.query('SELECT * FROM tokens where user_id = $1', [userId])
        if (tokenData.rows.length) {
            const updateRefreshToken = await pool.query('UPDATE tokens SET refreshtoken = $1 WHERE user_id = $2', [refreshToken, userId])
            return updateRefreshToken.rows[0]
        }
        const token = await pool.query('INSERT INTO tokens (user_id, refreshToken) VALUES ($1, $2) RETURNING *', [userId, refreshToken])
        return token.rows[0];
    }


    async findToken(refreshToken) {
        const tokenData = await pool.query('SELECT * FROM tokens where refreshtoken = $1', [refreshToken])
        return tokenData.rows[0]
    }
}

module.exports = new TokenService()