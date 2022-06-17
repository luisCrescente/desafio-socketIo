const path = require('path');

const options = {
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname + './db/ecommerce.sqlite')
    },
    useNullAsDefault: true,
};

module.exports = { options }