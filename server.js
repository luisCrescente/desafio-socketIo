const express = require('express');
const handlebars = require('express-handlebars');

//configuracion MySQL-maria db
// const {mariaDBOptions} = require('./options/mariaDB');
// const knex = require('knex')(mariaDBOptions);

//configuracion SQLITE3
const {sqliteOptions} = require('./options/sqlite3');
const knex = require('knex')(sqliteOptions);

const {Server:HttpServer}=require('http');
const {Server: IOServer}=require('socket.io');


//***** creacion tabla MySQL *****//

// knex.schema.createTable('products',(table)=>{
//     table.increments('id');
//     table.string('title', 30);
//     table.integer('price');
// }).then(()=>{
//     console.log('tabla creada');
// }).catch((err) =>console.log('Error:', err));


    // knex.schema.createTable("mensajes", (table) => {
    //     table.increments('id').primary()
    //     table.string('mensaje').notNullable()
    //     table.integer('autor')
    //     table.string('fecha').notNullable()
    // })
    // .then(() => {
    //     console.log("table created");
    //     }).catch((err) =>console.log('Error:', err));



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

    socket.on('new_products',(product)=>{
        products.push(product);
        ioServer.sockets.emit('products',products);
    });
    
});

httpServer.listen(8080, ()=>console.log("servidor corriendo en puerto 8080"));