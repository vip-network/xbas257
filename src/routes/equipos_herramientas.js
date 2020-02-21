const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/', async (req, res) => {
    try {
        // const list_multiuso = await db.query("SELECT *FROM productos where id_categoria = (crear la categoria multiuso)");
        res.render('equipos_herramientas/equipos_herramientas');
    } catch (e) {
        console.log(e);
    }
    
});

router.get('/detalle_equipos_herramientas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        // const idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_accesorio_automotriz ON productos.id = descripcion_multiuso.id_producto WHERE productos.id = '" + id + "'")
        res.render('equipos_herramientas/detalle_equipos_herramientas');
    } catch (e) {
        console.log(e);
    }
});


module.exports = router;