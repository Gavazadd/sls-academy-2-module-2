const express = require('express');
const findCountryController = require('./controllers/findCountryController')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.post('/location', findCountryController.getCountry)

const start = async () => {
    try {
        app.listen(PORT, () =>
            console.log(`Server has been started on PORT ${PORT}`)
        )
    } catch (error) {
        console.log(error)
    }
}

start();