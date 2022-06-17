const {options} = require('./config');
const knex = require('knex')(options);


const createTableProducts = async () =>{
    try {
        const existTableProducts = await knex.schema.hasTable('`products');
        if(existTableProducts){
            await knex.schema.dropTable('products');
        }
        await knex.schema.createTable('products',(table) =>{
            table.increments('id');
            table.string('name', 30);
            table.integer('price');
            table.string('url', 300);
        });
        await knex('products').insert(products);
        await knex.destroy();
    } catch (err) {
        console.log(err);
    }
}

createTableProducts()