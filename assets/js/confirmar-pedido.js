// 1. Leer el carrito desde localStorage
const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
const productosCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// 2. Diccionario de productos actualizado (Añadidas imágenes y precios exactos de pedido.js)
const catalogoProductos = {
    1: { 
        nombre: "Guitarra Eléctrica Epiphone SG Standard", 
        precio: 319990, 
        imagen: "assets/img/guitarra-electrica-epiphone-sg.jpg" 
    },
    2: { 
        nombre: "Batería Acústica Pearl Roadshow", 
        precio: 599990, 
        imagen: "assets/img/bateria-pearl-roadshow.webp" 
    },
    3: { 
        nombre: "Micrófono Condensador Audio-Tech AT2020", 
        precio: 199990, 
        imagen: "assets/img/microfono-atech-at2020.jpg" 
    }
};

// 3. Seleccionar elementos del DOM
const contenedorLista = document.querySelector("#lista-productos");
const elementoTotal = document.querySelector("#total-pedido");
const botonConfirmar = document.querySelector("#boton-confirmar");
const inputDireccion = document.querySelector("#direccion");

// 4. Función para renderizar el resumen
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

// 5. Procesar la compra final y guardar en pedidos
function procesarCompra() {
    if (inputDireccion.value === "") {
        alert("Por favor, ingresa una dirección de entrega.");
        return; // Detiene la función si no hay dirección
    }

    // PASO A: Preparar los artículos en el formato que pide pedido.js
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

    // PASO B: Crear el objeto del nuevo pedido
    const fechaActual = new Date();
    // Esto generará la fecha en formato chileno (ej: 07/09/2026)
    const fechaFormateada = fechaActual.toLocaleDateString("es-CL"); 
    
    // Generamos un código aleatorio de 4 dígitos para simular un sistema real
    const codigoAleatorio = Math.floor(Math.random() * 9000 + 1000);

    const nuevoPedido = {
        codigo: `SV-${codigoAleatorio}`,
        fecha: fechaFormateada,
        estado: "Confirmado", // Inicia en el primer paso del stepper
        direccion: inputDireccion.value,
        metodoEntrega: "Despacho a domicilio",
        articulos: articulosParaHistorial
    };

    // PASO C: Obtener el historial guardado, agregar el nuevo y volver a guardar
    const pedidosGuardados = localStorage.getItem("pedidosSonidoVivo");
    let listaPedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    
    listaPedidos.push(nuevoPedido); // Exactamente como la lógica de tu foto
    
    localStorage.setItem("pedidosSonidoVivo", JSON.stringify(listaPedidos));

    // PASO D: Limpieza y redirección
    alert("¡Pedido confirmado con éxito! Redirigiendo a tus pedidos...");
    localStorage.removeItem("carritoSonidoVivo"); 
    window.location.href = "pedido.html"; 
}

// 6. Ejecutar
mostrarResumen();
botonConfirmar.addEventListener("click", procesarCompra);