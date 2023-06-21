const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const {body} = require('express-validator')

router.post('/sign-up',
    body('email').isEmail(),
    body('password').isLength({min:6,max:32}),
    authController.registration)
router.post('/sign-in', authController.login)
router.get('/refresh', authController.refresh)

module.exports = router