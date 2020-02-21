const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/', async (req, res) => {
    try {
        // const list_multiuso = await db.query("SELECT *FROM productos where id_categoria = (crear la categoria multiuso)");
        res.render('multiuso/multiuso');
    } catch (e) {
        console.log(e);
    }
    
});

router.get('/detalle_multiuso/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        // const idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_accesorio_automotriz ON productos.id = descripcion_multiuso.id_producto WHERE productos.id = '" + id + "'")
        res.render('multiuso/detalle_multiuso');
    } catch (e) {
        console.log(e);
    }
});


module.exports = router;