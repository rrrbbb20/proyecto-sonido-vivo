const mensajeCarritoVacio =
    document.querySelector("#cart-empty");

const resumenCarrito =
    document.querySelector("#cart-summary");

const carritoGuardado =
    localStorage.getItem("carritoSonidoVivo");

const carrito = carritoGuardado
    ? JSON.parse(carritoGuardado)
    : [];

let cantidadProductos = 0;

carrito.forEach(function (producto) {
    cantidadProductos += producto.cantidad;
});

if (
    cantidadProductos > 0 &&
    mensajeCarritoVacio &&
    resumenCarrito
) {
    mensajeCarritoVacio.hidden = true;
    resumenCarrito.hidden = false;
    resumenCarrito.textContent =
        `Tienes ${cantidadProductos} productos en tu carrito.`;
}