const productsModels = require('../models/product');
const products = new productsModels();

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Client Connected ', socket.id);

        const sendProducts = async () => {
            const products = await Producto.getAll();
            io.emit('server:sendProducts', products);
        };

        sendProducts();

        socket.on('client:newProduct', async (data) => {
            await Producto.save(data);
            sendProducts();
        });

        const sendMessages = async () => {
            const messages = await Chat.getAllMessages();
            io.emit('server:sendMessages', messages);
          };
          sendMessages();

          socket.on('client:newMessage', async (data) => {
            await Chat.saveMessage(data);
            sendMessages()
          });
    });
};
