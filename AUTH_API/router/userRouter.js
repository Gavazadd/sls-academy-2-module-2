const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/auth-middleware')

router.get('/me', authMiddleware,  userController.getUser)

module.exports = router