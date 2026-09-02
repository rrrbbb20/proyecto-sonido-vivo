const mensajeCarritoVacio =
    document.querySelector("#cart-empty");

const listaCarrito =
    document.querySelector("#cart-list");

const resumenCarrito =
    document.querySelector("#cart-summary");

const nombresProductos = {
    1: "Guitarra Eléctrica Epiphone SG Standard",
    2: "Batería Acústica Pearl Roadshow",
    3: "Micrófono Condensador Audio-Tech AT2020"
};

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
    listaCarrito &&
    resumenCarrito
) {
    mensajeCarritoVacio.hidden = true;
    listaCarrito.hidden = false;
    resumenCarrito.hidden = false;

    carrito.forEach(function (producto) {
        const elementoProducto =
            document.createElement("li");

        const nombreProducto =
            nombresProductos[producto.id] || "Producto";

        elementoProducto.textContent =
            `${nombreProducto} - Cantidad: ${producto.cantidad}`;

        listaCarrito.appendChild(elementoProducto);
    });

    resumenCarrito.textContent =
        `Tienes ${cantidadProductos} productos en tu carrito.`;
}