const express = require('express');
const router = express.Router();
const db = require('../database')


router.get('/', async (req, res) => {
    try {
        const list_Out = await db.query("SELECT *FROM productos where id_categoria = 7");
        res.render('outdoor/outdoor',{list_Out});
    } catch (e) {
        console.log(e)
    }    
});

router.get('/detalle_outdoor/:id', async (req, res) => {
    const { id } = req.params;    
    try {
        const idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        res.render('outdoor/detalle_outdoor', {idProducto: idProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;