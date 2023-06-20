require ("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))



app.listen(port, () => console.log(
    `Servidor corriendo en http://localhost:${port}`
))