const {options} = require('../database/mysql/config');
const knex = require('knex')(options);
const uuidv4 = require('uuid').v4;


class product {
    constructor (){
        this.table = 'products';
        this.databese = knex(options);
    }
    async productSave (product){
        try {
            if(!product || typeof product !== 'object'){
                throw Error('debes agregar un objeto');
            }
            if( Object.keys(product).length === 0){
                throw Error("No puedes agregar un objeto vacio");
            }
            const newPrduct = {
                id: uuidv4(),
                ...product,
            };
            await this.databese.from(this.table).insert(newPrduct);
            return newPrduct;
        }catch (err) {
            throw Error(error.product);
        }
    };

    async getAll() {
        try {
            let data = await this.databese.from(this.table).select('*');
            data = JSON.parse(JSON.stringify(data));
            return data;
        } catch (error) {
        throw Error(error.product);
    }
    }
}

module.exports = product