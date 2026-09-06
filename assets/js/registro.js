
// FORMULARIO DE REGISTRO (assets/js/registro.js)


const formularioRegistro = document.querySelector("#register-form");

if (formularioRegistro) {

    // 1. ELEMENTOS DEL DOM
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const correo = document.querySelector("#correo");
    const rut = document.querySelector("#rut");
    const telefono = document.querySelector("#telefono");
    const direccion = document.querySelector("#direccion");
    const contrasena = document.querySelector("#contrasena");
    const terminos = document.querySelector("#terminos");

    // 2. MENSAJES DE ERROR

    const errorNombre = document.querySelector("#error-nombre");
    const errorApellido = document.querySelector("#error-apellido");
    const errorCorreo = document.querySelector("#error-correo");
    const errorRut = document.querySelector("#error-rut");
    const errorTelefono = document.querySelector("#error-telefono");
    const errorDireccion = document.querySelector("#error-direccion");
    const errorContrasena = document.querySelector("#error-contrasena");
    const errorTerminos = document.querySelector("#error-terminos");
    // 3. MOSTRAR ERROR (ACCESIBILIDAD Y ESTADO)
    function mostrarError(campo, contenedorError, mensaje) {
        contenedorError.textContent = mensaje;
        campo.classList.add("campo-invalido");
        campo.setAttribute("aria-invalid", "true");
    }
    // 4. LIMPIAR ERROR
    function limpiarError(campo, contenedorError) {
        contenedorError.textContent = "";
        campo.classList.remove("campo-invalido");
        campo.removeAttribute("aria-invalid");
    }
    // 5. LIMPIAR TODOS LOS ERRORES
    function limpiarErrores() {
        limpiarError(nombre, errorNombre);
        limpiarError(apellido, errorApellido);
        limpiarError(correo, errorCorreo);
        limpiarError(rut, errorRut);
        limpiarError(telefono, errorTelefono);
        limpiarError(direccion, errorDireccion);
        limpiarError(contrasena, errorContrasena);
        limpiarError(terminos, errorTerminos);
    }
    // 6. VALIDAR NOMBRE
    function validarNombre(valor) {
        if (valor === "") {
            return "El nombre es obligatorio.";
        }
        return "";
    }
    // 7. VALIDAR APELLIDO
    function validarApellido(valor) {
        if (valor === "") {
            return "El apellido es obligatorio.";
        }
        return "";
    }
    // 8. VALIDAR CORREO
    function validarCorreo(valor) {
        if (valor === "") {
            return "El correo electrónico es obligatorio.";
        }

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formatoCorreo.test(valor)) {
            return "Ingresa un correo electrónico válido.";
        }
        return "";
    }
    // 9. VALIDAR RUT
    function validarRut(valor) {
        if (valor === "") {
            return "El RUT es obligatorio.";
        }

        const formatoRut = /^\d{7,8}-[\dkK]$/;
        if (!formatoRut.test(valor)) {
            return "Ingresa el RUT en formato 12345678-9.";
        }

        const partes = valor.split("-");
        const cuerpo = partes[0];
        const digitoVerificador = partes[1].toUpperCase();

        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += Number(cuerpo[i]) * multiplicador;
            multiplicador++;
            if (multiplicador > 7) {
                multiplicador = 2;
            }
        }

        const resto = 11 - (suma % 11);
        let digitoCalculado;

        if (resto === 11) {
            digitoCalculado = "0";
        } else if (resto === 10) {
            digitoCalculado = "K";
        } else {
            digitoCalculado = String(resto);
        }

        if (digitoCalculado !== digitoVerificador) {
            return "El RUT ingresado no es válido.";
        }

        return "";
    }
    // 10. VALIDAR TELÉFONO
    function validarTelefono(valor) {
        if (valor === "") {
            return "El celular es obligatorio.";
        }

        const formatoTelefono = /^[0-9]{9}$/;
        if (!formatoTelefono.test(valor)) {
            return "El celular debe tener 9 números.";
        }
        return "";
    }
    // 11. VALIDAR DIRECCIÓN
    function validarDireccion(valor) {
        if (valor === "") {
            return "La dirección es obligatoria.";
        }
        if (valor.length < 5) {
            return "La dirección debe tener al menos 5 caracteres.";
        }
        return "";
    }
    // 12. VALIDAR CONTRASEÑA
    function validarContrasena(valor) {
        if (valor === "") {
            return "La contraseña es obligatoria.";
        }
        if (valor.length < 8 || valor.length > 12) {
            return "La contraseña debe tener entre 8 y 12 caracteres.";
        }

        return "";
    }
    // 13. VALIDAR TÉRMINOS
    function validarTerminos() {
        if (!terminos.checked) {
            return "Debes aceptar los Términos y Condiciones.";
        }
        return "";
    }
    // 14. ENVÍO DEL FORMULARIO
    formularioRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();
        limpiarErrores();
        // Obtener valores
        const valorNombre = nombre.value.trim();
        const valorApellido = apellido.value.trim();
        const valorCorreo = correo.value.trim().toLowerCase();
        const valorRut = rut.value.trim();
        const valorTelefono = telefono.value.trim();
        const valorDireccion = direccion.value.trim();
        const valorContrasena = contrasena.value;
        // Evaluar reglas
        const mensajeNombre = validarNombre(valorNombre);
        const mensajeApellido = validarApellido(valorApellido);
        const mensajeCorreo = validarCorreo(valorCorreo);
        const mensajeRut = validarRut(valorRut);
        const mensajeTelefono = validarTelefono(valorTelefono);
        const mensajeDireccion = validarDireccion(valorDireccion);
        const mensajeContrasena = validarContrasena(valorContrasena);
        const mensajeTerminos = validarTerminos();
        // Mostrar errores si existen
        if (mensajeNombre) mostrarError(nombre, errorNombre, mensajeNombre);
        if (mensajeApellido) mostrarError(apellido, errorApellido, mensajeApellido);
        if (mensajeCorreo) mostrarError(correo, errorCorreo, mensajeCorreo);
        if (mensajeRut) mostrarError(rut, errorRut, mensajeRut);
        if (mensajeTelefono) mostrarError(telefono, errorTelefono, mensajeTelefono);
        if (mensajeDireccion) mostrarError(direccion, errorDireccion, mensajeDireccion);
        if (mensajeContrasena) mostrarError(contrasena, errorContrasena, mensajeContrasena);
        if (mensajeTerminos) mostrarError(terminos, errorTerminos, mensajeTerminos);
        // Llevar el foco al primer campo inválido
        const primerCampoInvalido = formularioRegistro.querySelector('[aria-invalid="true"]');
        if (primerCampoInvalido) {
            primerCampoInvalido.focus();
            return;
        }
        // Obtener usuarios guardados
        const usuariosGuardados = JSON.parse(
            localStorage.getItem("usuariosSonidoVivo")
        ) || [];
        // Comprobar duplicados
        const correoExiste = usuariosGuardados.some(
            usuario => usuario.correo.toLowerCase() === valorCorreo
        );
        if (correoExiste) {
            mostrarError(
                correo,
                errorCorreo,
                "Este correo ya está registrado."
            );
            correo.focus();
            return;
        }
        const rutExiste = usuariosGuardados.some(
            usuario => usuario.rut.toLowerCase() === valorRut.toLowerCase()
        );
        if (rutExiste) {
            mostrarError(
                rut,
                errorRut,
                "Este RUT ya está registrado."
            );
            rut.focus();
            return;
        }
        // Crear y guardar el nuevo usuario
        const nuevoUsuario = {
            nombre: valorNombre,
            apellido: valorApellido,
            correo: valorCorreo,
            rut: valorRut,
            telefono: valorTelefono,
            direccion: valorDireccion,
            contrasena: valorContrasena
        };
        usuariosGuardados.push(nuevoUsuario);
        localStorage.setItem(
            "usuariosSonidoVivo",
            JSON.stringify(usuariosGuardados)
        );
        alert("Registro completado con éxito. Ahora puedes iniciar sesión.");
        formularioRegistro.reset();
        window.location.href = "login.html";
    });
    // 15. VALIDACIÓN EN TIEMPO REAL (BLUR E INPUT)
    const camposConValidacion = [
        {
            campo: nombre,
            error: errorNombre,
            validar: (v) => validarNombre(v.trim())
        },
        {
            campo: apellido,
            error: errorApellido,
            validar: (v) => validarApellido(v.trim())
        },
        {
            campo: correo,
            error: errorCorreo,
            validar: (v) => validarCorreo(v.trim().toLowerCase())
        },
        {
            campo: rut,
            error: errorRut,
            validar: (v) => validarRut(v.trim())
        },
        {
            campo: telefono,
            error: errorTelefono,
            validar: (v) => validarTelefono(v.trim())
        },
        {
            campo: direccion,
            error: errorDireccion,
            validar: (v) => validarDireccion(v.trim())
        },
        {
            campo: contrasena,
            error: errorContrasena,
            validar: (v) => validarContrasena(v)
        }
    ];
    camposConValidacion.forEach(function (elemento) {
        // Validar al salir de la casilla (blur)
        elemento.campo.addEventListener("blur", function () {
            const mensaje = elemento.validar(elemento.campo.value);
            if (mensaje) {
                mostrarError(elemento.campo, elemento.error, mensaje);
            } else {
                limpiarError(elemento.campo, elemento.error);
            }
        });
        // Limpiar error en tiempo real al escribir (input)
        elemento.campo.addEventListener("input", function () {
            limpiarError(elemento.campo, elemento.error);
        });
    });
    // Evento para el checkbox de términos
    terminos.addEventListener("change", function () {
        if (terminos.checked) {
            limpiarError(terminos, errorTerminos);
        } else {
            mostrarError(terminos, errorTerminos, "Debes aceptar los Términos y Condiciones.");
        }
    });

}