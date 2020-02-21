// ***********************************************PAGINA PRINCIPAL*********************************************
const express = require('express');
const router = express.Router();
const Cart = require('../model/cart');
const nodemailer = require('nodemailer');
const db = require('../database');
const fetch = require("node-fetch");

//listas
router.get('/', async (req, res) => {
    try {
        // var lista_productos_peluches = await db.query("SELECT top 4 * FROM productos where id_categoria = 1"); //peluches
        var lista_productos_bicicletas = await db.query("SELECT top 4 * FROM productos where id_categoria = 2"); //bicicletas
        var lista_productos_rodados = await db.query("SELECT top 4 * FROM productos where id_categoria = 3"); //rodados

        res.render('../views/index', {lista_productos_rodados, lista_productos_bicicletas})
    } catch (e) {
        console.log(e)
    }    
});

// detalle de bicicletas pagina principal
router.get('/detalle_bicicletas/:id', async (req, res) => {
    var { id } = req.params;
    try {
        var idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        var idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_bicicletas ON productos.id = descripcion_bicicletas.id_producto WHERE productos.id = '" + id + "'")
        res.render('bicicletas/detalle_bicicletas', {idProducto: idProducto.recordset[0], idDetalleProducto: idDetalleProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

// detalle de rodados pagina principal
router.get('/detalle_rodados/:id', async (req, res) => {
    var { id } = req.params;    
    try {
        var idProducto = await db.query("SELECT id, nombre, descripcion, FORMAT(precio, '#,###') as precio, stock FROM productos WHERE id = '" + id + "'")
        var idDetalleProducto = await db.query("SELECT * FROM productos INNER JOIN descripcion_rodados ON productos.id = descripcion_rodados.id_producto WHERE productos.id = '" + id + "'")
        res.render('rodados/detalle_rodados', {idProducto: idProducto.recordset[0], idDetalleProducto: idDetalleProducto.recordset[0]});
    } catch (e) {
        console.log(e);
    }
});

// ------------------------------carrito----------------------------------//

// agrega item al carro
router.get('/add/:id', async (req, res) =>{
    var productId = req.params.id;
    try {
        var ProductoBase = await db.query("SELECT * FROM productos WHERE id = '"+ productId +"' ");
        var Productof = ProductoBase.recordsets[0]        
        var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
        var product = await Productof.filter( (item) => { return item.id == productId; });
        cart.add(product[0], await productId);
        req.session.cart = cart;   

        res.redirect('/');

    } catch (e) {
        console.log(e);
    } 
});

const addProducto = productId => { 
    fetch('/add/' + productId).then(response =>{
        if (response.ok) {  
            window.location.reload()
        }
    })
};

//--------------------------------                      ------------------------//
router.get('/carrito/carrito_productos', (req, res, next) => {
    try {
        if (!req.session.cart) {
            return res.render('/index', {
              products: null
            });
          }
          var cart = new Cart(req.session.cart);
          res.render('/index', {
            title: 'Carro',
            products: cart.getItems(),
            totalPrice: cart.totalPrice
          });

    } catch (e) {
        console.log(e)
    }
});

//--------------------------------eliminar item carrito------------------------//
router.get('/remove/:id',async (req, res, next) => {
    try {
        var productId = req.params.id;
        var cart = await new Cart(req.session.cart ? req.session.cart : {});

        cart.remove(productId);
        req.session.cart = cart;
        res.redirect('/carrito_productos');
    } catch (e) {
        console.log(e)
    }
});
// ------------------------------fin carrito----------------------------------//


// ------------------------------email---------------------------------------//
router.post('/enviar', async (req, res, next) => {
	var datosCliente = req.user //datos del cliente
    console.log(datosCliente)
    
	try {
        var itemsCarro = req.session.cart.items //datos del carrito
        var Total = req.session.cart.totalPrice //precio total productos	
        var envio = 5000; //valor del envio
        var prefioFinal = (Total + envio) //total de la compra

        //diseño y estructura del correo
        var contentHTML = 
            
        `
        <div class="">
        <div class="aHl"></div>
        <div id=":3dv" tabindex="-1"></div>
        <div id=":43x" class="ii gt">
            <div id=":43w" class="a3s aXjCH "><u></u>
                    <table width="695" style="border:0;border-collapse:collapse;margin:0">
                        <tbody>
                            <tr>
                                <td style="background-color:#ddd">
                                    <div style="background-color:#fff;border:1px solid #ccc;margin:10px;padding:10px">
                                        <h2 style="color: #0c0c0c;">
                                            COTIZACION FINALIZADA!</h2>
                                        <p style="color: #0c0c0c;">
                                            Hola! , ${datosCliente.nombre}  ${datosCliente.apellido} este correo es para informar que tu cotizacion ha finalizado exitosamente. 
                                            Muchas gracias por tu preferencia.</p>
                                        <h2>
                                            <span style="font-size:12px">
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    style="width:100%;color:#686868">
                                                    <tbody>
                                                        <tr>
                                                            <td valign="middle"
                                                                style="width:110px;padding:10px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                                Nro. de Orden </td>
                                                            <td valign="middle"
                                                                style="padding:10px;border-bottom:1px solid #ddd;font-size:20px">
                                                                <b>232820</b></td>
                                                            <td valign="middle"
                                                                style="width:110px;padding:10px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                                Estado </td>
                                                            <td valign="middle"
                                                                style="padding:10px;border-bottom:1px solid #ddd">Finalizada
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    style="margin-bottom:5px;width:100%;color:#686868">
                                                    <tbody>
                                                        <tr style="font-size:12px;color:#ffffff;background-color:#008dff">
                                                            <th style="padding:3px;text-align:left">ID</th>
                                                            <th style="padding:3px;text-align:left">NOMBRE</th>
                                                            <th style="width:100px;padding:3px;text-align:left">VALOR NETO</th>
                                                            <th style="padding:3px;text-align:center">CANTIDAD</th>
                                                            <th style="width:100px;padding:3px;text-align:left">SUBTOTAL</th>
                                                        </tr>`;
                                                        for (var key in itemsCarro) {
                                                            var {item , quantity, precio} = itemsCarro[key];
                                                            contentHTML += 
                                                            `<tr>
                                                                <td valign="middle"style="padding:10px;border-bottom:1px solid #ddd">${item.id}</td>
                                                                <td valign="middle"style="padding:10px;border-bottom:1px solid #ddd">${item.nombre}</td>
                                                                <td valign="middle"style="padding:10px;border-bottom:1px solid #ddd;text-align:center">$ ${item.precio}</td>
                                                                <td valign="middle"style="padding:10px;border-bottom:1px solid #ddd;text-align:center">${quantity}</td>
                                                                <td valign="middle"style="padding:10px;border-bottom:1px solid #ddd;text-align:center">$ ${precio}</td>
                                                            </tr>`;
                                                            }
                                                        contentHTML += 
                                                        `<tr style="font-size:14px">
                                                            <td colspan="6" align="right" style="text-align:right;padding:4px;font-weight:bold">
                                                                <b>Total (IVA incluido) </b></td>
                                                            <td style="text-align:center;padding:4px"><b>$ ${Total}</b></td>
                                                        </tr>
                                                        
                                                        <tr style="font-size:14px">
                                                            <td colspan="6" align="right" style="text-align:right;padding:5px;font-weight:bold">Costo de Despacho</td>
                                                            <td style="text-align:center;padding:5px"><b>$ ${envio}</b></td>
                                                        </tr>
                                                        <tr style="font-size:14px">
                                                            <td colspan="6" align="right"style="text-align:right;padding:5px;font-weight:bold"><b>Total Final (IVA incluido) </b></td>
                                                            <td style="text-align:center;padding:5px"><b>$ ${prefioFinal}</b></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                
                                                <table border="0" cellpadding="0" cellspacing="0"
                                                    style="width:100%;color:#686868">
                                                    <tbody>
                                                        <tr style="font-size:12px;color:#ffffff;background-color:#008dff">
                                                            <th style="padding:5px;text-align:left" colspan="4">DATOS DEL CLIENTE</th>
                                                        </tr>
                                                        <tr>
                                                            <td valign="middle" style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold"> Nombre </td>
                                                            <td valign="middle" style="padding:5px;border-bottom:1px solid #ddd"> ${datosCliente.nombre} ${datosCliente.apellido}</td>
                                                            <td valign="middle" style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold"> Correo </td>
                                                            <td valign="middle" style="padding:5px;border-bottom:1px solid #ddd"> ${datosCliente.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <td valign="middle" style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold"> Direccion </td>
                                                            <td valign="middle" style="padding:5px;border-bottom:1px solid #ddd">${datosCliente.direccion}</td>
                                                            <td valign="middle" style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold"> Telefono </td>
                                                            <td valign="middle" style="padding:5px;border-bottom:1px solid #ddd">${datosCliente.telefono}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                
                                            </span>
                                        </h2>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="yj6qo"></div>
                <div class="adL"></div>
            </div>
            <div id=":3en" class="ii gt" style="display:none">
                <div id=":3a4" class="a3s aXjCH undefined"></div>
            </div>
            <div class="hi"></div>
        </div>

        `;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vipnetwork.informatica@gmail.com',
                pass: 'a44afb0b6808d662'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // const data = await fs.readFileSync("src/views/carrito/voucher_carro.hbs");    

        var mainOptions = {
            from: 'Vip-Network <vipnetwork.informatica@gmail.com>', 
            to: datosCliente.email,
            subject: 'Comprobante de Cotizacion',
            html: contentHTML
        };
        
        transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Mensaje Enviado: ' + info.response);
            res.redirect('/carrito_productos');
        }
        });
    } catch (e) {
        console.log(e)
    }
});
// ------------------------------fin email----------------------------------//


module.exports = router;
