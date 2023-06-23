const {Bucket, BucketData} = require("../models/models");
const ApiError = require('../error/ApiError')

class jsonUploadService {
    async create(bucket_name, key, jsonData) {
        let bucket = await Bucket.findOne({where:{name:bucket_name}})
        if (!bucket) {
            bucket = await Bucket.create({name: bucket_name})
        }
        const probableJson = await BucketData.findOne({where:{key, bucketId: bucket.id}})
        if (probableJson){
            throw ApiError.badRequest('Json об\'єкт з таким ключем вже існує в даній корзині. Преіменуйте ключ або корзину' )
        }
        const json = await BucketData.create({key, jsonData, bucketId: bucket.id })
        return json
    }

    async get(bucket_name, key){
        const bucket = await Bucket.findOne({where:{name:bucket_name}})
        if (bucket) {
            const json = await BucketData.findOne({where:{key, bucketId: bucket.id}})
            if (json){
                return json
            }
            throw ApiError.badRequest('Не вдалося знайти JSON за даним ключем! Перевірьте правильність написання ключа.')
        }
        throw ApiError.badRequest('Не вдалося знайти дану корзину! Перевірьте правильність написання корзини.')
    }
}

module.exports = new jsonUploadService()