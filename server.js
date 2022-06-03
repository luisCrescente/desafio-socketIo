const express = require('express');
const handlebars = require('express-handlebars');
const {Server:HttpServer}=require('http');
const {Server: IOServer}=require('socket.io');

const messages =[];
const products =[];

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IOServer(httpServer);

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


ioServer.on('connection',(socket)=>{
    
    socket.emit('messages',messages);
    socket.emit('products',products);
    
    socket.on('new_message',(mensaje)=>{
        messages.push(mensaje);
        ioServer.sockets.emit('messages',messages);
    });

    socket.on('new_products',(produc)=>{
        messages.push(produc);
        ioServer.sockets.emit('productos',products);
    });
    
});

httpServer.listen(8080, ()=>console.log("servidor corriendo en puerto 8080"));