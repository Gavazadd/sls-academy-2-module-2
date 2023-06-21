const { Pool } = require('pg');

// Создайте пул подключения к базе данных
const pool = new Pool({
    connectionString: 'postgresql://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@' + process.env.POSTGRES_HOST + ':' + process.env.POSTGRES_PORT + '/' + process.env.POSTGRES_DB,
});

const createUUIDExtension = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

const createUserTableQuery =
    `CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );`

const createTokenTableQuery = `
  CREATE TABLE IF NOT EXISTS tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    refreshtoken VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`;

// Функция для создания таблиц
async function createTables() {
    try {
        // Выполните SQL-запросы для создания таблиц
        await pool.query(createUUIDExtension)
        await pool.query(createUserTableQuery)
        await pool.query(createTokenTableQuery)
        console.log('Таблиці створено успішно.')
    } catch (error) {
        console.error('Помилка  при створенні таблиць:', error);
    }
}

module.exports = {
    pool,
    createTables,
};
