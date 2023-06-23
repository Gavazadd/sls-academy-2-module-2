const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.PSQL_HOST || "localhost",
        port: process.env.DB_PORT
    }
)