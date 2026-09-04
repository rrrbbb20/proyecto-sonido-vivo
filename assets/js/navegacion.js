function obtenerCantidadCarrito() {
    const carritoGuardado =
        localStorage.getItem("carritoSonidoVivo");

    if (!carritoGuardado) {
        return 0;
    }

    try {
        const carrito = JSON.parse(carritoGuardado);

        return carrito.reduce(function (total, producto) {
            return total + Number(producto.cantidad);
        }, 0);
    } catch (error) {
        return 0;
    }
}

function actualizarContadorCarrito() {
    const enlacesCarrito =
        document.querySelectorAll(
            'a[href="carrito.html"]'
        );

    const cantidad = obtenerCantidadCarrito();

    enlacesCarrito.forEach(function (enlace) {
        enlace.textContent = `Carrito (${cantidad})`;
    });
}

actualizarContadorCarrito();