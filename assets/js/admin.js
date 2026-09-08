// ======================================================
// FORMULARIO PARA REGISTRAR TRABAJADORES
// ======================================================

// Obtenemos el formulario.
const formularioTrabajador =
    document.querySelector("#worker-form");

// Obtenemos los campos del formulario.
const campoNombre =
    document.querySelector("#worker-name");

const campoApellido =
    document.querySelector("#worker-lastname");

const campoCorreo =
    document.querySelector("#worker-email");

const campoDireccion =
    document.querySelector("#worker-address");

const campoRol =
    document.querySelector("#worker-role");

const campoContrasena =
    document.querySelector("#worker-password");

// Obtenemos los elementos donde mostraremos los errores.
const errorNombre =
    document.querySelector("#worker-name-error");

const errorApellido =
    document.querySelector("#worker-lastname-error");

const errorCorreo =
    document.querySelector("#worker-email-error");

const errorDireccion =
    document.querySelector("#worker-address-error");

const errorRol =
    document.querySelector("#worker-role-error");

const errorContrasena =
    document.querySelector("#worker-password-error");

// Elemento utilizado para mostrar el registro exitoso.
const mensajeExito =
    document.querySelector("#worker-success");


// ======================================================
// FUNCIONES PARA MANEJAR LOS TRABAJADORES
// ======================================================

// Obtiene los trabajadores almacenados en localStorage.
function obtenerTrabajadores() {
    const trabajadoresGuardados =
        localStorage.getItem("trabajadoresSonidoVivo");

    // Si no existen trabajadores, devolvemos un arreglo vacío.
    if (!trabajadoresGuardados) {
        return [];
    }

    try {
        const trabajadores =
            JSON.parse(trabajadoresGuardados);

        // Comprobamos que el contenido sea un arreglo.
        return Array.isArray(trabajadores)
            ? trabajadores
            : [];
    } catch (error) {
        // Evita que la página falle si los datos están dañados.
        return [];
    }
}

// Obtiene los clientes para evitar correos repetidos.
function obtenerClientes() {
    const clientesGuardados =
        localStorage.getItem("usuariosSonidoVivo");

    if (!clientesGuardados) {
        return [];
    }

    try {
        const clientes =
            JSON.parse(clientesGuardados);

        return Array.isArray(clientes)
            ? clientes
            : [];
    } catch (error) {
        return [];
    }
}

// Guarda exclusivamente las cuentas de los trabajadores.
function guardarTrabajadores(trabajadores) {
    localStorage.setItem(
        "trabajadoresSonidoVivo",
        JSON.stringify(trabajadores)
    );
}


// ======================================================
// FUNCIONES PARA MOSTRAR Y LIMPIAR ERRORES
// ======================================================

// Muestra un mensaje y marca el campo como inválido.
function mostrarError(campo, contenedor, mensaje) {
    contenedor.textContent = mensaje;
    campo.setAttribute("aria-invalid", "true");
}

// Elimina el mensaje y la marca de campo inválido.
function limpiarError(campo, contenedor) {
    contenedor.textContent = "";
    campo.removeAttribute("aria-invalid");
}

// Limpia todos los errores antes de validar nuevamente.
function limpiarTodosLosErrores() {
    limpiarError(campoNombre, errorNombre);
    limpiarError(campoApellido, errorApellido);
    limpiarError(campoCorreo, errorCorreo);
    limpiarError(campoDireccion, errorDireccion);
    limpiarError(campoRol, errorRol);
    limpiarError(campoContrasena, errorContrasena);
}


// ======================================================
// ENVÍO Y VALIDACIÓN DEL FORMULARIO
// ======================================================

// Comprobamos que todos los elementos existan.
if (
    formularioTrabajador &&
    campoNombre &&
    campoApellido &&
    campoCorreo &&
    campoDireccion &&
    campoRol &&
    campoContrasena &&
    errorNombre &&
    errorApellido &&
    errorCorreo &&
    errorDireccion &&
    errorRol &&
    errorContrasena &&
    mensajeExito
) {
    formularioTrabajador.addEventListener(
        "submit",
        function (evento) {
            // Evita que el navegador recargue la página.
            evento.preventDefault();

            limpiarTodosLosErrores();

            // Ocultamos un mensaje exitoso anterior.
            mensajeExito.hidden = true;
            mensajeExito.textContent = "";

            let formularioValido = true;

            // Obtenemos y normalizamos los datos ingresados.
            const nombre =
                campoNombre.value.trim();

            const apellido =
                campoApellido.value.trim();

            const correo =
                campoCorreo.value.trim().toLowerCase();

            const direccion =
                campoDireccion.value.trim();

            const rol =
                campoRol.value;

            const contrasena =
                campoContrasena.value;


            // Validamos el nombre.
            if (nombre.length < 3) {
                mostrarError(
                    campoNombre,
                    errorNombre,
                    "El nombre debe tener al menos 3 caracteres."
                );

                formularioValido = false;
            }

            // Validamos el apellido.
            if (apellido.length < 3) {
                mostrarError(
                    campoApellido,
                    errorApellido,
                    "El apellido debe tener al menos 3 caracteres."
                );

                formularioValido = false;
            }

            // Validamos el formato del correo electrónico.
            if (
                correo === "" ||
                !campoCorreo.validity.valid
            ) {
                mostrarError(
                    campoCorreo,
                    errorCorreo,
                    "Ingresa un correo electrónico válido."
                );

                formularioValido = false;
            }

            // Validamos la extensión de la dirección.
            if (direccion.length < 5) {
                mostrarError(
                    campoDireccion,
                    errorDireccion,
                    "La dirección debe tener al menos 5 caracteres."
                );

                formularioValido = false;
            }

            // Definimos los únicos roles que se pueden registrar.
            const rolesPermitidos = [
                "vendedor",
                "administrador"
            ];

            // Comprobamos que el rol esté permitido.
            if (!rolesPermitidos.includes(rol)) {
                mostrarError(
                    campoRol,
                    errorRol,
                    "Selecciona un rol válido."
                );

                formularioValido = false;
            }

            // Validamos la extensión de la contraseña.
            if (
                contrasena.length < 8 ||
                contrasena.length > 12
            ) {
                mostrarError(
                    campoContrasena,
                    errorContrasena,
                    "La contraseña debe tener entre 8 y 12 caracteres."
                );

                formularioValido = false;
            }

            // Si existe algún error, detenemos el registro.
            if (!formularioValido) {
                const primerCampoInvalido =
                    formularioTrabajador.querySelector(
                        '[aria-invalid="true"]'
                    );

                if (primerCampoInvalido) {
                    primerCampoInvalido.focus();
                }

                return;
            }


            // ==================================================
            // COMPROBACIÓN DEL CORREO
            // ==================================================

            const trabajadores =
                obtenerTrabajadores();

            const clientes =
                obtenerClientes();

            // Unimos temporalmente ambos arreglos para comprobar
            // que el correo no pertenezca a otra cuenta.
            const todasLasCuentas = [
                ...clientes,
                ...trabajadores
            ];

            const correoExiste = todasLasCuentas.some(
                function (cuenta) {
                    const correoGuardado =
                        String(cuenta.correo || "")
                            .trim()
                            .toLowerCase();

                    return correoGuardado === correo;
                }
            );

            if (correoExiste) {
                mostrarError(
                    campoCorreo,
                    errorCorreo,
                    "Ya existe una cuenta con este correo."
                );

                campoCorreo.focus();
                return;
            }


            // ==================================================
            // ALMACENAMIENTO DEL TRABAJADOR
            // ==================================================

            // Creamos el objeto que representa al trabajador.
            const nuevoTrabajador = {
                id: Date.now(),
                nombre: nombre,
                apellido: apellido,
                correo: correo,
                direccion: direccion,
                rol: rol,
                contrasena: contrasena
            };

            // Agregamos la nueva cuenta al arreglo de trabajadores.
            trabajadores.push(nuevoTrabajador);

            // Guardamos el arreglo actualizado.
            guardarTrabajadores(trabajadores);

            // Mostramos el resultado exitoso.
            mensajeExito.textContent =
                `${nombre} fue registrado como ${rol}.`;

            mensajeExito.hidden = false;

            // Limpiamos los campos del formulario.
            formularioTrabajador.reset();
        }
    );
}