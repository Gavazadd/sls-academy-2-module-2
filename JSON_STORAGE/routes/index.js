const Router = require('express')
const router = new Router()
const jsonUploadRouter = require('./jsonUploadRouter')



router.use('/', jsonUploadRouter)


module.exports = router