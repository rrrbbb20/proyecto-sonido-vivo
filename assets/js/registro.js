
// FORMULARIO DE REGISTRO (registro.js)

const formularioRegistro = document.querySelector("#register-form");

if (formularioRegistro) {


// 1. OBTENER ELEMENTOS DEL DOM (Inputs)

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const correo = document.querySelector("#correo");
const rut = document.querySelector("#rut");
const telefono = document.querySelector("#telefono");
const contrasena = document.querySelector("#contrasena");
const terminos = document.querySelector("#terminos");
const direccion = document.querySelector("#direccion");

// 2. OBTENER CONTENEDORES DE ERROR

const errorNombre = document.querySelector("#error-nombre");
const errorApellido = document.querySelector("#error-apellido");
const errorCorreo = document.querySelector("#error-correo");
const errorRut = document.querySelector("#error-rut");
const errorTelefono = document.querySelector("#error-telefono");
const errorContrasena = document.querySelector("#error-contrasena");
const errorTerminos = document.querySelector("#error-terminos");
const errorDireccion = document.querySelector("#error-direccion");

// 3. FUNCIÓN PARA LIMPIAR ERRORES

function limpiarErrores() {
    errorNombre.textContent = "";
    errorApellido.textContent = "";
    errorCorreo.textContent = "";
    errorRut.textContent = "";
    errorTelefono.textContent = "";
    errorContrasena.textContent = "";
    errorTerminos.textContent = "";
    errorDireccion.textContent = "";
}


function validarRut(rutIngresado) {
    // solo se valida que tenga 7 u 8 digitos un guion y un digito o la letra k
    const formatoRut = /^\d{7,8}-[\dkK]$/;
    return formatoRut.test(rutIngresado);
}

// ----------------------------------------------
// 5. PROCESAMIENTO Y VALIDACIÓN EN SUBMIT
// ----------------------------------------------
formularioRegistro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limpiarErrores();

    let formularioValido = true;

    // Validar Correo
    const valorCorreo = correo.value.trim().toLowerCase();
    const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valorCorreo === "") {
        errorCorreo.textContent = "Debes ingresar tu correo electrónico.";
        formularioValido = false;
    } else if (!formatoCorreo.test(valorCorreo)) {
        errorCorreo.textContent = "Ingresa un correo electrónico válido.";
        formularioValido = false;
    }

    // Validar Nombre
    const valorNombre = nombre.value.trim();
    if (valorNombre === "") {
        errorNombre.textContent = "Debes ingresar tu nombre.";
        formularioValido = false;
    } else if (valorNombre.length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        formularioValido = false;
    }

    // Validar Apellido
    const valorApellido = apellido.value.trim();
    if (valorApellido === "") {
        errorApellido.textContent = "Debes ingresar tu apellido.";
        formularioValido = false;
    } else if (valorApellido.length < 3) {
        errorApellido.textContent = "El apellido debe tener al menos 3 caracteres.";
        formularioValido = false;
    }

    // Validar RUT
    const valorRut = rut.value.trim();
    if (valorRut === "") {
        errorRut.textContent = "Debes ingresar tu RUT.";
        formularioValido = false;
    } else if (!validarRut(valorRut)) {
        errorRut.textContent = "El RUT ingresado no es válido (ej: 12345678-9).";
        formularioValido = false;
    }

    // Validar Celular (9 dígitos)
    const valorTelefono = telefono.value.trim();
    if (valorTelefono === "") {
        errorTelefono.textContent = "Debes ingresar tu número de celular.";
        formularioValido = false;
    } else if (!/^[0-9]{9}$/.test(valorTelefono)) {
        errorTelefono.textContent = "El celular debe contener exactamente 9 dígitos.";
        formularioValido = false;
    }
    const valorDireccion = direccion.value.trim();

    //validar direccion
    if (valorDireccion === "") {
        errorDireccion.textContent =
            "Debes ingresar tu dirección.";
        formularioValido = false;

    } else if (valorDireccion.length < 5) {
        errorDireccion.textContent =
            "La dirección debe tener al menos 5 caracteres.";
        formularioValido = false;
    }

    // Validar Contraseña (8 a 12 caracteres)
    const valorContrasena = contrasena.value;
    if (valorContrasena === "") {
        errorContrasena.textContent = "Debes ingresar una contraseña.";
        formularioValido = false;
    } else if (valorContrasena.length < 8 || valorContrasena.length > 12) {
        errorContrasena.textContent = "La contraseña debe tener entre 8 y 12 caracteres.";
        formularioValido = false;
    }

    // Validar Terminos y Condiciones
    if (!terminos.checked) {
        errorTerminos.textContent = "Debes aceptar los términos y condiciones.";
        formularioValido = false;
    }


    // 6. COMPROBAR DUPLICADOS Y GUARDAR USUARIO

    if (formularioValido) {
        const usuariosGuardados = JSON.parse(
            localStorage.getItem("usuariosSonidoVivo")
        ) || [];

        // Comprobar duplicados
        const correoExiste = usuariosGuardados.some(
            usuario => usuario.correo === valorCorreo
        );

        const rutExiste = usuariosGuardados.some(
            usuario => usuario.rut === valorRut
        );

        if (correoExiste) {
            errorCorreo.textContent = "Ya existe una cuenta registrada con este correo.";
            formularioValido = false;
        }

        if (rutExiste) {
            errorRut.textContent = "Ya existe una cuenta registrada con este RUT.";
            formularioValido = false;
        }

        // Guardar si no hubo duplicados
        if (formularioValido) {
            const usuario = {
                nombre: valorNombre,
                apellido: valorApellido,
                correo: valorCorreo,
                rut: valorRut,
                telefono: valorTelefono,
                direccion: valorDireccion,
                contrasena: valorContrasena
            };

            usuariosGuardados.push(usuario);

            localStorage.setItem(
                "usuariosSonidoVivo",
                JSON.stringify(usuariosGuardados)
            );

            alert("Registro completado con éxito. Ahora puedes iniciar sesión.");
            formularioRegistro.reset();

            window.location.href = "login.html";
        }
    }
}); // Cierre de addEventListener
} // Cierre de if formularioRegistro