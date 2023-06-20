const mariadb = require('mariadb')

const db = mariadb.createPool({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: 'root',
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME
})

module.exports = db