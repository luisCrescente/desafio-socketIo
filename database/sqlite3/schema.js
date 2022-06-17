const { options } = require('./config');
const knex = require('knex')(options);

const createTablesSqlite3 = async () => {
    try {
        const exisTableMessages = await knex.schema.hasTable('message');
        if(exisTableMessages) {
            await knex.schema.dropTable('messages');
        }
        await knex.schema.createTable('messages', (table) =>{
            table.increments('id');
            table.string('email', 40);
            table.string('message', 300);
            table.string('fecha', 100)
        })
        await knex.destroy();
    } catch (err) {
        console.log(err);
    }
}

createTablesSqlite3();