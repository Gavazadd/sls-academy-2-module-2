const findCountryService = require('../services/findCountryService');

class FindCountryController {
    async getCountry(req, res, next) {
        try {
            const { ip } = req.body;
            const country = await findCountryService.getCountry(ip);
            return res.json(country);
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = new FindCountryController();
