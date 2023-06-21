const userService = require('../services/userService')

class UserController {
    async getUser(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const user = await userService.getUser(refreshToken);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();