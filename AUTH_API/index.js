require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errorHandlingMiddleware')
const { createTables } = require('./db/createTables');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await createTables()
        app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}`))
    }catch (e){
        console.log(e)
    }
}

start()
