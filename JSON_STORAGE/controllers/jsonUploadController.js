const jsonUloadService = require('../services/jsonUploadService')
class jsonUploadController {

    async createJsonData(req, res,next) {
        try {
            const {bucket_name, key} = req.params
            const json= req.body
            const jsonString = JSON.stringify(json)
            const result = await jsonUloadService.create(bucket_name, key, jsonString)
            res.json(result)
        }catch (e) {
            next(e)
        }
    }

    async getJsonData(req, res, next) {
        try {
            const {bucket_name, key} = req.params
            const result = await jsonUloadService.get(bucket_name, key)
            res.json(result)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new jsonUploadController()