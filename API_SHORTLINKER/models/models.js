const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Url = sequelize.define('url', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    origUrl: {type: DataTypes.STRING, unique: true, allowNull: false},
    shortUrl: {type: DataTypes.STRING, unique: true, allowNull: false}
})

module.exports = {
    Url,
}
