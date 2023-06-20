require ("dotenv").config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const port = process.env.PORT

const conexionDB = require('./database')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use(require('./src/routes/products.routes'))

app.listen(port, () => {
    (async()=>{
        let dbConnected;
        try {
            dbConnected = await conexionDB.getConnection()
            console.log("Conectado a la base de datos")
        } catch (error) {
            console.log("No se pudo conectar a la db: "+error.message)
        } finally{
            if(dbConnected) dbConnected.end()
        }
    })()
    console.log(`Servidor corriendo en http://localhost:${port}`)
})