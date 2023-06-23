const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Bucket = sequelize.define('bucket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const BucketData = sequelize.define('bucket_data', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    key: {type: DataTypes.STRING, allowNull: false},
    jsonData: {type: DataTypes.STRING, allowNull: false },
})

Bucket.hasMany(BucketData)
BucketData.belongsTo(Bucket)

module.exports = {
    Bucket,
    BucketData
}