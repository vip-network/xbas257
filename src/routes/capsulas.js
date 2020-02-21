const express = require('express');
const router = express.Router();
const db = require('../database')

router.get('/', async (req, res) => {
    try {
        const list_Capsulas = await db.query("SELECT *FROM productos where id_categoria = 12");
        res.render('capsulas/capsulas',{list_Capsulas});
    } catch (e) {
        console.log(e)
    }
    
});

router.get('/detalle_capsulas/:id', async (req, res) => {
    const { id } = req.params;    
    try {
        const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        const idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_capsulas ON productos.id = descripcion_capsulas.id_producto WHERE productos.id = '" + id + "'")
        res.render('capsulas/detalle_capsulas', {idProducto: idProducto.recordset[0], idDetalleProducto: idDetalleProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;