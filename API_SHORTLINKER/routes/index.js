const Router = require('express')
const router = new Router()
const shortlinkerRouter = require('./shortlinkerRouter')



router.use('/', shortlinkerRouter)


module.exports = router