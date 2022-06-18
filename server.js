const express = require('express');
const {options_mdb} = require('./options/mariaDB.js');
const {options} = require('./options/sqlite3.js');
const createTables = require('./createTables.js')
let modulo = require('./Contenedor.js');

const { defaultConfiguration } = require('express/lib/application');
const { Server: HttpServer } = require('http');       
const { Server: SocketServer } = require('socket.io');



const app = express();
app.use(express.static('public')); 

let contenedor_prod = new modulo.Contenedor('productos', options_mdb);
let contenedor_mnsjs = new modulo.Contenedor('mensajes', options);

const httpServer = new HttpServer(app);             
const socketServer = new SocketServer(httpServer);   

socketServer.on('connection', (socket) => {

    async function init(){
        await createTables();
        messages = await contenedor_mnsjs.getAll();
        producto = await contenedor_prod.getAll();
        socket.emit('new_event', producto, messages);      
    }
    init();


    socket.on('nuevo_prod', (obj) => {

        async function ejecutarSaveShow(argObj) {
            await contenedor_prod.save(argObj);
            const result = await contenedor_prod.getAll();
            producto = result;
            socketServer.sockets.emit('new_event', producto, messages);
        }
        ejecutarSaveShow(obj);
    });
    socket.on('new_message', (mensaje) => {
        async function ejecutarSaveShowMnsjs(mnsj) {
            await contenedor_mnsjs.save(mnsj);
            const result = await contenedor_mnsjs.getAll();
            messages = result;
            socketServer.sockets.emit('new_event', producto, messages);
        }
        ejecutarSaveShowMnsjs(mensaje);
    });
});

httpServer.listen(8080, () => {
  console.log('Estoy escuchando en el puerto 8080');
});
