const sql = require('mssql');

// servidor
// const database ={
//     user: 'sa',
//     password: 'A44afb0b6808d662',
//     server: 'basepagina.ddns.net',
//     port: 1433, 
//     database: 'Pagina_Web'
// };

// nube azure
// const database ={
//     user: 'vipnetwork',
//     password: 'A44afb0b6808d662',
//     server: 'vipnetwork.database.windows.net',
//     port: 1433, 
//     database: 'Pagina_Web',
//     options: {
//         encrypt: true
//       }
// };

// local
const database = {
    user: 'sa',
    password: 'A44afb0b6808d662',
    server: '192.168.0.123',
    port: 1433, 
    database: 'Pagina_Web'
};


//en caso de error
var connection = new sql.ConnectionPool(database, function(err, connection){
    try {
        if (err){
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('DATABASE CONNECTION WAS CLOSED')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.log('DATABASE HAS TO MANY CONNECTION')
            }
            if (err.code === 'ENCONNREFUSED') {
                console.log('DATABASE CONNECTION WAS REFUSED')
            }
        }
        if(connection)connection.relese();    
            console.log("CONECTADO CORRECTAMENTE A LA BASE DE DATOS DE SQL SERVER")
        return;
    } catch (e) {
        console.log(e)
    }
     
});

module.exports = connection;