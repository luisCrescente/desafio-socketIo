const socket = io()

const enviarMensaje = () => {
    const author = document.getElementById("author").value;
    const text = document.getElementById("text").value;
    const time = new Date()

    const mensaje = {
        author,
        text,
        time
    };
    socket.emit('new_message', mensaje);
    return false;
};


const crearEtiquetasMensaje = (mensaje) => {
    const {
        author,
        text,
        time
    } = mensaje;

    return `
    <div>
        <strong style="color:blue">${author}  </strong>
        <sm style="color:brown">${time}  :  </sm>
        <em style="color:green">${text}    </em>
    </div>
    `;
};

const sendProducts  = () =>{
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const img = document.getElementById('img').value;

    const product = {
        title,
        price,
        img
    };

    socket.emit('new_products', product);
    return false
};

const createProducts = (product) =>{
    const {
        title,
        price,
        img
    } = product;
    console.log(product);

    return `
    
    <tr>
    <td>${title}</td>
    <td>${price}</td>
    <td>
        
        <img src=${img} alt="imageName">
    </td>
    </tr>
    `;
}


const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
};

const addProducts = (products) => {
    const totalProducts = products.map(product => createProducts(product)).join(" ");
    document.getElementById("tableProducts").innerHTML = totalProducts;
};

socket.on('messages', (messages) => agregarMensajes(messages));
socket.on('products', (products) => addProducts(products));