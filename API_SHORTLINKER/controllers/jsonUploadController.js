const shortlinkerService = require('../services/shortlinkerService')
class shortlinkerController {

    async createShortUrl(req, res, next) {
        try {
            const {url} = req.body
            const shortUrl = await shortlinkerService.create(url)
            res.json(`${process.env.API_URL}/${shortUrl}`)
        }catch (e) {
            next(e)
        }
    }

    async getUrl(req, res, next) {
        try {
            const {url} = req.params
            const origUrl = await shortlinkerService.get(url)
            res.redirect(origUrl)
        }catch (e) {
            next(e)
        }
    }

}

module.exports = new shortlinkerController()