const db = require('../../database');

const products = {}

products.getProducts = async () => {
    let dbConnection;
    try {
        dbConnection = await db.getConnection();
        const rows = await dbConnection.query('SELECT * FROM productos');
        return rows;
    } catch (error) {
        throw ('No se encuentran productos');
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

products.postProducts = async (nombre, precio) => {
    let dbConnection;
    try {
        dbConnection = await db.getConnection();
        await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL
      )
    `);
        await dbConnection.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
        return { mensaje: 'Producto insertado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

module.exports = products