const express = require('express');
const router = express.Router();
const db = require('../database')


router.get('/', async (req, res) => {
    try {
        const list_cunas = await db.query("SELECT *FROM productos where id_categoria = 8");
        res.render('cunas/cunas',{list_cunas});
    } catch (e) {
        console.log(e)
    }    
});


router.get('/detalle_cunas/:id', async (req, res) => {
    const { id } = req.params;    
    try {
        const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        const idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_bebe ON productos.id = descripcion_bebe.id_producto WHERE productos.id = '" + id + "'")
        res.render('cunas/detalle_cunas', {idProducto: idProducto.recordset[0],idDetalleProducto: idDetalleProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;