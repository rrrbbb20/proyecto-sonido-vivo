const formularioRegistro = document.querySelector("#register-form");

if (formularioRegistro) {

    // 1. Obtener elementos del DOM
    const nombre = document.querySelector("#nombre");
    const apellido = document.querySelector("#apellido");
    const correo = document.querySelector("#correo");
    const rut = document.querySelector("#rut");
    const telefono = document.querySelector("#telefono");
    const contrasena = document.querySelector("#contrasena");
    const terminos = document.querySelector("#terminos");

    // 2. Obtener contenedores de error
    const errorNombre = document.querySelector("#error-nombre");
    const errorApellido = document.querySelector("#error-apellido");
    const errorCorreo = document.querySelector("#error-correo");
    const errorRut = document.querySelector("#error-rut");
    const errorTelefono = document.querySelector("#error-telefono");
    const errorContrasena = document.querySelector("#error-contrasena");
    const errorTerminos = document.querySelector("#error-terminos");

    // 3. Función para limpiar mensajes
    function limpiarErrores() {
        errorNombre.textContent = "";
        errorApellido.textContent = "";
        errorCorreo.textContent = "";
        errorRut.textContent = "";
        errorTelefono.textContent = "";
        errorContrasena.textContent = "";
        errorTerminos.textContent = "";
    }

    
    function validarRut(rutIngresado) {
        const formatoRut = /^\d{7,8}-[\dkK]$/;
        if (!formatoRut.test(rutIngresado)) return false;

        const partes = rutIngresado.split("-");
        const cuerpo = partes[0];
        const digitoIngresado = partes[1].toLowerCase();

        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += Number(cuerpo[i]) * multiplicador;
            multiplicador++;
            if (multiplicador > 7) multiplicador = 2;
        }

        const resto = 11 - (suma % 11);
        let digitoCalculado;

        if (resto === 11) digitoCalculado = "0";
        else if (resto === 10) digitoCalculado = "k";
        else digitoCalculado = String(resto);

        return digitoCalculado === digitoIngresado;
    }

    
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

        
        const valorNombre = nombre.value.trim();
        if (valorNombre === "") {
            errorNombre.textContent = "Debes ingresar tu nombre.";
            formularioValido = false;
        } else if (valorNombre.length < 3) {
            errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
            formularioValido = false;
        }

        
        const valorApellido = apellido.value.trim();
        if (valorApellido === "") {
            errorApellido.textContent = "Debes ingresar tu apellido.";
            formularioValido = false;
        } else if (valorApellido.length < 3) {
            errorApellido.textContent = "El apellido debe tener al menos 3 caracteres.";
            formularioValido = false;
        }

        
        const valorRut = rut.value.trim();
        if (valorRut === "") {
            errorRut.textContent = "Debes ingresar tu RUT.";
            formularioValido = false;
        } else if (!validarRut(valorRut)) {
            errorRut.textContent = "El RUT ingresado no es válido (ej: 12345678-9).";
            formularioValido = false;
        }

        
        const valorTelefono = telefono.value.trim();
        if (valorTelefono === "") {
            errorTelefono.textContent = "Debes ingresar tu número de celular.";
            formularioValido = false;
        } else if (!/^[0-9]{9}$/.test(valorTelefono)) {
            errorTelefono.textContent = "El celular debe contener exactamente 9 dígitos.";
            formularioValido = false;
        }

        
        const valorContrasena = contrasena.value;
        if (valorContrasena === "") {
            errorContrasena.textContent = "Debes ingresar una contraseña.";
            formularioValido = false;
        } else if (valorContrasena.length < 8 || valorContrasena.length > 12) {
            errorContrasena.textContent = "La contraseña debe tener entre 8 y 12 caracteres.";
            formularioValido = false;
        } else if (!/[A-Z]/.test(valorContrasena)) {
            errorContrasena.textContent = "La contraseña debe contener al menos una mayúscula.";
            formularioValido = false;
        } else if (!/[a-z]/.test(valorContrasena)) {
            errorContrasena.textContent = "La contraseña debe contener al menos una minúscula.";
            formularioValido = false;
        } else if (!/[0-9]/.test(valorContrasena)) {
            errorContrasena.textContent = "La contraseña debe contener al menos un número.";
            formularioValido = false;
        }

        // Validar Términos
        if (!terminos.checked) {
            errorTerminos.textContent = "Debes aceptar los términos y condiciones.";
            formularioValido = false;
        }
    });
}


// COMPROBAR DUPLICADOS Y GUARDAR USUARIO
        
if (formularioValido) {

    const usuariosGuardados = JSON.parse(
        localStorage.getItem("usuariosSonidoVivo")
    ) || [];

    // Comprobar si el correo ya existe
    const correoExiste = usuariosGuardados.some(
        usuario => usuario.correo === valorCorreo
    );

    // Comprobar si el RUT ya existe
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

    // Guardar solamente si no existen duplicados
    if (formularioValido) {
        const usuario = {
            nombre: valorNombre,
            apellido: valorApellido,
            correo: valorCorreo,
            rut: valorRut,
            telefono: valorTelefono,
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