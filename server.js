const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const {Server} = require('socket.io')
const router = require('./routes/products');
const sockets = require('./socket');
// const {Server:HttpServer, Server}=require('http');
// const {Server: IOServer}=require('socket.io');


// const messages =[];
// const products =[];

const app = express();
// const httpServer = new HttpServer(app);
// const ioServer = new IOServer(httpServer);

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.engine(
    "hbs",
    handlebars.engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir:__dirname+'/views/layouts'
    })

)

app.set('view engine','hbs');
app.set('views','./views');

app.get('/', (req, res) => {
    res.render('main');
});

app.use('/api', router);

// ioServer.on('connection', async (socket)=>{
    
//     socket.emit('messages',messages);
//     socket.emit('products',await products.getAll());
    
//     socket.on('new_message',(mensaje)=>{
//         messages.push(mensaje);
//         ioServer.sockets.emit('messages',messages);
//     });

//     socket.on('new_products',(product)=>{
//         products.guardar(product);
//         let products = products.getAll();
//         products.push(product);
//         ioServer.sockets.emit('products',products);
//     });
    
// });

const server = app.listen(app.get())

const io = new Server(server);
sockets(io);

httpServer.listen(8080, ()=>console.log("servidor corriendo en puerto 8080"));