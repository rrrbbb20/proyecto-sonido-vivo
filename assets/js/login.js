const formularioLogin =
    document.querySelector("#login-form");

const campoCorreo =
    document.querySelector("#login-email");

const campoContrasena =
    document.querySelector("#login-password");

const errorCorreo =
    document.querySelector("#login-email-error");

const errorContrasena =
    document.querySelector("#login-password-error");

const mensajeLogin =
    document.querySelector("#login-success");

function mostrarError(campo, contenedorError, mensaje) {
    contenedorError.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo, contenedorError) {
    contenedorError.textContent = "";
    campo.removeAttribute("aria-invalid");
}

function obtenerUsuariosRegistrados() {
    const usuariosGuardados =
        localStorage.getItem("usuariosSonidoVivo");

    if (!usuariosGuardados) {
        return [];
    }

    try {
        const usuarios = JSON.parse(usuariosGuardados);

        if (Array.isArray(usuarios)) {
            return usuarios;
        }

        return [];
    } catch (error) {
        return [];
    }
}

if (
    formularioLogin &&
    campoCorreo &&
    campoContrasena &&
    errorCorreo &&
    errorContrasena &&
    mensajeLogin
) {
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let formularioValido = true;

        const correo =
            campoCorreo.value.trim().toLowerCase();

        const contrasena =
            campoContrasena.value;

        if (correo === "") {
            mostrarError(
                campoCorreo,
                errorCorreo,
                "Ingresa tu correo electrónico."
            );

            formularioValido = false;
        } else if (!campoCorreo.validity.valid) {
            mostrarError(
                campoCorreo,
                errorCorreo,
                "Ingresa un correo electrónico válido."
            );

            formularioValido = false;
        } else {
            limpiarError(campoCorreo, errorCorreo);
        }

        if (contrasena === "") {
            mostrarError(
                campoContrasena,
                errorContrasena,
                "Ingresa tu contraseña."
            );

            formularioValido = false;
        } else if (contrasena.length < 8) {
            mostrarError(
                campoContrasena,
                errorContrasena,
                "La contraseña debe tener al menos 8 caracteres."
            );

            formularioValido = false;
        } else {
            limpiarError(
                campoContrasena,
                errorContrasena
            );
        }

        if (!formularioValido) {
            mensajeLogin.hidden = true;
            mensajeLogin.textContent = "";

            const primerCampoInvalido =
                formularioLogin.querySelector(
                    '[aria-invalid="true"]'
                );

            if (primerCampoInvalido) {
                primerCampoInvalido.focus();
            }

            return;
        }

        const usuarios =
            obtenerUsuariosRegistrados();

        const usuarioEncontrado = usuarios.find(
            function (usuario) {
                return (
                    usuario.correo === correo &&
                    usuario.contrasena === contrasena
                );
            }
        );

        if (!usuarioEncontrado) {
            mostrarError(
                campoCorreo,
                errorCorreo,
                "Correo o contraseña incorrectos."
            );

            campoContrasena.setAttribute(
                "aria-invalid",
                "true"
            );

            mensajeLogin.hidden = true;
            mensajeLogin.textContent = "";

            campoCorreo.focus();

            return;
        }

        limpiarError(campoCorreo, errorCorreo);
        limpiarError(
            campoContrasena,
            errorContrasena
        );

        mensajeLogin.textContent =
            `Bienvenido, ${usuarioEncontrado.nombre}.`;

        mensajeLogin.hidden = false;
    });
}