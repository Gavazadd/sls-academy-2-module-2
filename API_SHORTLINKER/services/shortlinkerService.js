const nanoid = require('nanoid')
const {Url} = require("../models/models")
const ApiError = require('../error/ApiError')

class shortlinkerService {
    async create(origUrl) {
        const isOrigUrl = await this.isURL(origUrl)
        if (!isOrigUrl){
            throw ApiError.badRequest('Введений рядок не є посиланням або має неправильний формат.')
        }
        let urlInDB = await Url.findOne({where:{origUrl}});
        if (urlInDB) {
            return urlInDB.shortUrl
        }
        const urlId = nanoid(6);
        await Url.create({shortUrl:urlId, origUrl})
        return urlId
    }

    async get(shortUrl) {
        const url = await Url.findOne({where:{shortUrl}})
        if (url){
            return url.origUrl
        }
        throw ApiError.badRequest('Не вдалося перейти за даним посиланням. Скоріш за все його не існує.')
    }

    async isURL(input) {
        try {
            const parsedUrl = new URL(input);
            return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }
}

module.exports = new shortlinkerService()