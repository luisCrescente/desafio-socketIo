const {options} = require('../database/mysqlite3/config')
const knex = require('knex')(options);
const uuidv4 = require('uuid').v4;

class chat {
    constructor(){
        this.table = 'messages',
        this.database = knex(options)
    }
    async messageSave(message) {
        try {
            if(!message || typeof message !== 'object') {
                throw Error('data invalid');
            }
            if(Object.keys(message).length === 0){
                throw Error("Data vacia");
            }
            const newMessage = {
                id: uuidv4(),
                ...message,
            }
            await this.database.from(this.table).insert(newMessage);
            return newMessage;
        }catch (err){
            throw Error(error.message);
        }
    };

    async getAllMessages (){
        try{
            const data = await this.database.from(this.table).select('*');
            return data;
        }catch (err){
            throw Error(error.message);
        }
    }
}

module.exports = chat;