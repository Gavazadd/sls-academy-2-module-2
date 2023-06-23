const Router = require('express')
const router = new Router()
const shortlinkerController = require('../controllers/jsonUploadController')

router.post('/', shortlinkerController.createShortUrl)
router.get('/:url', shortlinkerController.getUrl)


module.exports = router