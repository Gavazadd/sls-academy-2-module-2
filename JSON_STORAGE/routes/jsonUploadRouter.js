const Router = require('express')
const router = new Router()
const jsonUploadController = require('../controllers/jsonUploadController')


router.get('/:bucket_name/:key', jsonUploadController.getJsonData)
router.post('/:bucket_name/:key', jsonUploadController.createJsonData)


module.exports = router