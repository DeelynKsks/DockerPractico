const express = require('express');
const router = express.Router();

const { getProducts, postProducts } = require('../controllers/products.controllers')

router.get('/product', async (req, res) => {
    try {
        const productos = await getProducts();
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error });
    }
});

// Insertar un nuevo producto
router.post('/product', async (req, res) => {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    } else {
        try {
            const resultado = await postProducts(nombre, precio);
            return res.json(resultado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor: '+error.message });
        }
    }
});

module.exports = router