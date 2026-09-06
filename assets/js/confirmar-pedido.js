// 1. Leer el carrito desde localStorage 
const carritoGuardado = localStorage.getItem("carritoSonidoVivo");
const productosCarrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// 2. Diccionario de productos con sus precios reales
const catalogoProductos = {
    1: { nombre: "Guitarra Eléctrica Epiphone SG Standard", precio: 250000 },
    2: { nombre: "Batería Acústica Pearl Roadshow", precio: 450000 },
    3: { nombre: "Micrófono Condensador Audio-Tech AT2020", precio: 85000 }
};

// 3. Seleccionar elementos del DOM de confirmar-pedido.html
const contenedorLista = document.querySelector("#lista-productos");
const elementoTotal = document.querySelector("#total-pedido");
const botonConfirmar = document.querySelector("#boton-confirmar");
const inputDireccion = document.querySelector("#direccion");

// 4. Función para renderizar el resumen de compra
function mostrarResumen() {
    let totalCalculado = 0;
    
    // Limpiamos el contenedor
    contenedorLista.replaceChildren();

    // Si por alguna razón llegan aquí con el carrito vacío
    if (productosCarrito.length === 0) {
        const mensajeVacio = document.createElement("p");
        mensajeVacio.textContent = "No hay productos para confirmar.";
        contenedorLista.appendChild(mensajeVacio);
        elementoTotal.textContent = "Total a pagar: $0";
        return;
    }

    // Recorremos los productos que trajimos del localStorage
    for (const producto of productosCarrito) {
        const parrafoProducto = document.createElement("p");
        
        // Buscamos el nombre y precio usando el ID guardado
        const infoProducto = catalogoProductos[producto.id]; 
        
        if (infoProducto) {
            const subtotal = infoProducto.precio * producto.cantidad;
            totalCalculado += subtotal; // Sumamos al total final
            
            parrafoProducto.textContent = `${producto.cantidad}x ${infoProducto.nombre} - $${subtotal}`;
            contenedorLista.appendChild(parrafoProducto);
        }
    }

    // texto del total
    elementoTotal.textContent = `Total a pagar: $${totalCalculado}`;
}

// 5. Procesar la compra final
function procesarCompra() {
    if (inputDireccion.value === "") {
        alert("Por favor, ingresa una dirección de entrega.");
    } else {
        alert("¡Pedido confirmado con éxito! Gracias por tu compra.");
        // Vaciamos el carrito tras comprar
        localStorage.removeItem("carritoSonidoVivo"); 
        // Redirigimos al inicio
        window.location.href = "index.html"; 
    }
}

// 6. Ejecutar
mostrarResumen();
botonConfirmar.addEventListener("click", procesarCompra);