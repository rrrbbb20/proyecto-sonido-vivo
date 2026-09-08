// ===== CONTADOR DEL CARRITO =====

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


// ===== MANEJO DE LA SESIÓN =====

function obtenerUsuarioActual() {
    const usuarioGuardado =
        sessionStorage.getItem(
            "usuarioActivoSonidoVivo"
        );

    if (!usuarioGuardado) {
        return null;
    }

    try {
        return JSON.parse(usuarioGuardado);
    } catch (error) {
        sessionStorage.removeItem(
            "usuarioActivoSonidoVivo"
        );

        return null;
    }
}

function establecerUsuarioActual(usuario) {
    const usuarioSeguro = {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo
    };

    sessionStorage.setItem(
        "usuarioActivoSonidoVivo",
        JSON.stringify(usuarioSeguro)
    );
}

function cerrarSesion() {
    sessionStorage.removeItem(
        "usuarioActivoSonidoVivo"
    );

    window.location.href = "index.html";
}

function actualizarInterfazSesion() {
    const usuario = obtenerUsuarioActual();

    if (!usuario) {
        return;
    }

    const enlacesLogin =
        document.querySelectorAll(
            'a[href="login.html"]'
        );

    enlacesLogin.forEach(function (enlace) {
        const estaEnEncabezado =
            enlace.closest(".site-header");

        enlace.textContent = estaEnEncabezado
            ? `Hola, ${usuario.nombre}`
            : "Cerrar sesión";

        enlace.href = "#";
        enlace.title = "Cerrar sesión";
        enlace.removeAttribute("aria-current");

        enlace.addEventListener(
            "click",
            function (evento) {
                evento.preventDefault();

                const confirmarCierre =
                    confirm("¿Quieres cerrar sesión?");

                if (confirmarCierre) {
                    cerrarSesion();
                }
            }
        );
    });
}


// ===== EJECUCIÓN INICIAL =====

actualizarContadorCarrito();
actualizarInterfazSesion();