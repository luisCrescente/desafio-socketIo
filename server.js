const express = require('express');
const {options_mdb} = require('./options/mariaDB.js');
const {options} = require('./options/SQLite3.js');
const session = require('express-session');
const expbs = require('express-handlebars');
const path = require('path');
const createTables = require('./createTables.js');
const routes = require('./routes/index');
let modulo = require('./Contenedor.js');

const { defaultConfiguration } = require('express/lib/application');
const { Server: HttpServer } = require('http');       
const { Server: SocketServer } = require('socket.io');



const app = express();
app.use(express.static('public')); 


const MongoStore = require('connect-mongo');
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://luis:8986cc7cc5@cluster0.6wsge.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: adavancedOptions,
        }),
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public')) ;
app.use(express.static("./views/layouts"));
app.use('/', routes);

app.engine(
    'hbs',
    expbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(__dirname, 'public/partials'),
        extname: '.hbs',
    })
);
app.set('views', './public');
app.set('views engine', 'hbs');

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