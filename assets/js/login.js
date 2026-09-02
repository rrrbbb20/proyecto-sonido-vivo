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

function mostrarError(campo, contenedorError, mensaje) {
    contenedorError.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
}

function limpiarError(campo, contenedorError) {
    contenedorError.textContent = "";
    campo.removeAttribute("aria-invalid");
}

if (
    formularioLogin &&
    campoCorreo &&
    campoContrasena &&
    errorCorreo &&
    errorContrasena
) {
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let formularioValido = true;

        const correo = campoCorreo.value.trim();
        const contrasena = campoContrasena.value;

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
            const primerCampoInvalido =
                formularioLogin.querySelector(
                    '[aria-invalid="true"]'
                );

            if (primerCampoInvalido) {
                primerCampoInvalido.focus();
            }
        }
    });
}