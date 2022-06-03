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
}


const crearEtiquetasMensaje = (mensaje) => {
    const {
        author,
        text,
        time
      
    } = mensaje;
    return `
    
    <div>
        <strong>${author}</strong>
        <em>${text}</em>
        <em>${time}</em>
       
    </div>
    `;
}



const agregarMensajes = (mensajes) => {
    const mensajesFinal = mensajes.map(mensaje => crearEtiquetasMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
}

socket.on('messages', (messages) => agregarMensajes(messages));