const express = require('express');
const router = express.Router();
const db = require('../database')


router.get('/', async (req, res) => {
    try {
        const list_Seg_Auto = await db.query("SELECT *FROM productos where id_categoria = 10");
        res.render('seguridad_automotriz/seguridad_automotriz',{list_Seg_Auto});
    } catch (e) {
        console.log(e)
    }    
});


router.get('/detalle_seguridad_automotriz/:id', async (req, res) => {
    const { id } = req.params;    
    try {
        const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        res.render('seguridad_automotriz/detalle_seguridad_automotriz', {idProducto: idProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;