// 1. Leer el carrito
const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
const productosCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// 2. Catálogo base
const catalogoProductos = {
    1: { nombre: "Guitarra Eléctrica Epiphone SG Standard", precio: 319990, imagen: "assets/img/guitarra-electrica-epiphone-sg.jpg" },
    2: { nombre: "Batería Acústica Pearl Roadshow", precio: 599990, imagen: "assets/img/bateria-pearl-roadshow.webp" },
    3: { nombre: "Micrófono Condensador Audio-Tech AT2020", precio: 199990, imagen: "assets/img/microfono-atech-at2020.jpg" }
};

// 3. Seleccionar elementos del DOM
const contenedorLista = document.querySelector("#lista-productos");
const elementoTotal = document.querySelector("#total-pedido");
const botonConfirmar = document.querySelector("#boton-confirmar");
const inputDireccion = document.querySelector("#direccion");
const inputRegion = document.querySelector("#region"); // NUEVO
const inputComuna = document.querySelector("#comuna");
const inputCodigoPostal = document.querySelector("#codigoPostal"); 
const inputTelefono = document.querySelector("#telefono");

// 4. Renderizar el resumen
function mostrarResumen() {
    let totalCalculado = 0;
    contenedorLista.replaceChildren();

    if (productosCarrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "No hay productos para confirmar.";
        contenedorLista.appendChild(mensajeVacio);
        elementoTotal.textContent = "Total a pagar: $0";
        return;
    }

    for (const producto of productosCarrito) {
        const infoProducto = catalogoProductos[producto.id]; 
        if (infoProducto) {
            const subtotal = infoProducto.precio * producto.cantidad;
            totalCalculado += subtotal; 
            
            const parrafoProducto = document.createElement("p");
            parrafoProducto.textContent = `${producto.cantidad}x ${infoProducto.nombre} - $${subtotal.toLocaleString("es-CL")}`;
            contenedorLista.appendChild(parrafoProducto);
        }
    }
    elementoTotal.textContent = `Total a pagar: $${totalCalculado.toLocaleString("es-CL")}`;
}

// 5. Validar y procesar la compra
function procesarCompra() {
    let formularioValido = true;

    // Validación 1: Dirección
    const errorDireccion = document.querySelector("#error-direccion");
    if (inputDireccion.value.trim() === "") {
        errorDireccion.textContent = "Sugerencia: Debes ingresar el nombre de la calle y el número.";
        formularioValido = false;
    } else {
        errorDireccion.textContent = ""; 
    }

    // Validación 2: Región (NUEVO)
    const errorRegion = document.querySelector("#error-region");
    if (inputRegion.value === "") {
        errorRegion.textContent = "Por favor, selecciona una región de la lista.";
        formularioValido = false;
    } else {
        errorRegion.textContent = "";
    }

    // Validación 3: Comuna
    const errorComuna = document.querySelector("#error-comuna");
    if (inputComuna.value.trim() === "") {
        errorComuna.textContent = "Por favor, indícanos tu comuna para calcular el despacho.";
        formularioValido = false;
    } else {
        errorComuna.textContent = "";
    }

    // Validación 4: Código Postal
    const errorCodigoPostal = document.querySelector("#error-codigoPostal");
    const valorCodigoPostal = inputCodigoPostal.value.trim();
    
    if (valorCodigoPostal === "") {
        errorCodigoPostal.textContent = "El código postal es obligatorio.";
        formularioValido = false;
    } else if (isNaN(valorCodigoPostal)) {
        errorCodigoPostal.textContent = "Error: El código postal solo debe contener números, sin letras ni espacios.";
        formularioValido = false;
    } else if (valorCodigoPostal.length > 7) {
        errorCodigoPostal.textContent = `Ingresaste ${valorCodigoPostal.length} números. El máximo permitido es de 7 dígitos.`;
        formularioValido = false;
    } else {
        errorCodigoPostal.textContent = "";
    }

    // Validación 5: Teléfono
    const errorTelefono = document.querySelector("#error-telefono");
    const valorTelefono = inputTelefono.value.trim();
    if (valorTelefono === "") {
        errorTelefono.textContent = "El teléfono es obligatorio para contactarte en la entrega.";
        formularioValido = false;
    } else if (valorTelefono.length !== 9) {
        errorTelefono.textContent = `Ingresaste ${valorTelefono.length} dígitos. El teléfono debe tener exactamente 9 números (Ej: 912345678).`;
        formularioValido = false;
    } else {
        errorTelefono.textContent = "";
    }

    // Si hay errores, detenemos la ejecución
    if (formularioValido === false) {
        return; 
    }

    // Construcción del pedido
    const articulosParaHistorial = [];
    for (const producto of productosCarrito) {
        const info = catalogoProductos[producto.id];
        if (info) {
            articulosParaHistorial.push({
                nombre: info.nombre,
                precio: info.precio,
                cantidad: producto.cantidad,
                imagen: info.imagen
            });
        }
    }

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-CL"); 
    const codigoAleatorio = Math.floor(Math.random() * 9000 + 1000);

    const nuevoPedido = {
        codigo: `SV-${codigoAleatorio}`,
        fecha: fechaFormateada,
        estado: "Confirmado",
        direccion: `${inputDireccion.value}, ${inputComuna.value}, Región ${inputRegion.value} (CP: ${valorCodigoPostal})`, 
        telefono: valorTelefono, // <-- ¡Aquí agregamos el teléfono!
        metodoEntrega: "Despacho a domicilio",
        articulos: articulosParaHistorial
    };

    const pedidosGuardados = localStorage.getItem("pedidosSonidoVivo");
    let listaPedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    
    listaPedidos.push(nuevoPedido); 
    localStorage.setItem("pedidosSonidoVivo", JSON.stringify(listaPedidos));

    alert("¡Pedido confirmado con éxito! Redirigiendo a tus pedidos...");
    localStorage.removeItem("carritoSonidoVivo"); 
    window.location.href = "pedido.html"; 
}

// 6. Ejecución
mostrarResumen();
botonConfirmar.addEventListener("click", procesarCompra);