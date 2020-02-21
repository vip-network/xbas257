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
                                                    <td colspan="6" align="right"style="text-align:right;padding:5px;font-weight:bold">
                                                        <b>Total Final (IVA incluido) </b></td>
                                                    <td style="text-align:center;padding:5px"><b>$ ${prefioFinal}</b></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                        <table border="0" cellpadding="0" cellspacing="0"
                                            style="width:100%;color:#686868">
                                            <tbody>
                                                <tr style="font-size:12px;color:#ffffff;background-color:#008dff">
                                                    <th style="padding:5px;text-align:left" colspan="4">DATOS DE
                                                        DESPACHO</th>
                                                </tr>
                                                <tr>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Método </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">Despacho a
                                                        Domicilio</td>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Modalidad de despacho </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">Completo
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Courier </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">Chilexpress
                                                    </td>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Tipo de Servicio </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">Día hábil
                                                        siguiente, despacho a domicilio</td>
                                                </tr>
                                                <tr>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Costo </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">$6.929</td>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                    </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" style="width:100%;color:#686868;margin-top:10px">
                                            <tbody>
                                                <tr style="font-size:12px;color:#ffffff;background-color:#008dff">
                                                    <th style="padding:3px;text-align:left" colspan="4">DATOS DE
                                                        FACTURACIÓN Y PAGO</th>
                                                </tr>
                                                <tr>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Método </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd">Webpay /
                                                        Mercado Pago / Onepay</td>
                                                    <td valign="middle"
                                                        style="width:110px;padding:5px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                    </td>
                                                    <td valign="middle"
                                                        style="padding:5px;border-bottom:1px solid #ddd"></td>
                                                </tr>
                                                <tr>
                                                    <td valign="middle"
                                                        style="width:110px;padding:10px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                        Documento </td>
                                                    <td valign="middle"
                                                        style="padding:10px;border-bottom:1px solid #ddd">Boleta
                                                    </td>
                                                    <td valign="middle"
                                                        style="width:110px;padding:10px;border-bottom:1px solid #ddd;text-align:left;text-transform:uppercase;font-weight:bold">
                                                    </td>
                                                    <td valign="middle"
                                                        style="padding:10px;border-bottom:1px solid #ddd"></td>
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