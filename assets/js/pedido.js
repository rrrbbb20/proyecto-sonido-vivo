
const contenedorPedidos = document.querySelector("#contenedor-pedidos");

if (contenedorPedidos) {

    const estadosSecuencia = [
        "Confirmado",
        "En preparación",
        "Despachado",
        "Entregado"
    ];

    const pedidosIniciales = [
        {
            codigo: "SV-2026",
            fecha: "06/09/2026",
            estado: "En preparación",
            direccion: "1 Norte 123, Depto 402, Viña del Mar",
            metodoEntrega: "Despacho a domicilio",
            articulos: [
                {
                    nombre: "Guitarra Eléctrica Epiphone SG Standard",
                    precio: 319990,
                    cantidad: 1,
                    imagen: "assets/img/guitarra-electrica-epiphone-sg.jpg"
                },
                {
                    nombre: "Batería Acústica Pearl Roadshow",
                    precio: 599990,
                    cantidad: 1,
                    imagen: "assets/img/bateria-pearl-roadshow.webp"
                },
                {
                    nombre: "Micrófono Condensador Audio-Tech AT2020",
                    precio: 199990,
                    cantidad: 1,
                    imagen: "assets/img/microfono-atech-at2020.jpg"
                }
            ]
        },
        {
            codigo: "SV-1845",
            fecha: "28/08/2026",
            estado: "Entregado",
            direccion: "Álvares 456, Viña del Mar",
            metodoEntrega: "Retiro en tienda",
            articulos: [
                {
                    nombre: "Micrófono Condensador Audio-Tech AT2020",
                    precio: 199990,
                    cantidad: 2,
                    imagen: "assets/img/microfono-atech-at2020.jpg"
                }
            ]
        }
    ];

    // 3. Obtener pedidos de localStorage o precargar los simulados
    let listaPedidos = JSON.parse(localStorage.getItem("pedidosSonidoVivo"));

    if (!listaPedidos || listaPedidos.length === 0) {
        listaPedidos = pedidosIniciales;
        localStorage.setItem("pedidosSonidoVivo", JSON.stringify(listaPedidos));
    }

    // 4. Función constructora de la barra de estado (Stepper)
    function crearStepper(estadoActual) {
        const indiceActual = estadosSecuencia.indexOf(estadoActual);

        let pasosHTML = "";

        estadosSecuencia.forEach((estado, index) => {
            let clasePaso = "pendiente";
            let iconoPaso = index + 1;
            let ariaCurrent = "";

            if (index < indiceActual) {
                clasePaso = "completado";
                iconoPaso = "&#10003;"; // Símbolo de visto bueno
            } else if (index === indiceActual) {
                clasePaso = "activo";
                ariaCurrent = ' aria-current="step"';
            }

            pasosHTML += `
                <li class="stepper-paso ${clasePaso}"${ariaCurrent}>
                    <span class="paso-icono" aria-hidden="true">${iconoPaso}</span>
                    <span class="paso-titulo">${estado}</span>
                </li>
            `;
        });

        return `
            <div class="stepper-contenedor" aria-label="Progreso de entrega">
                <ol class="stepper">
                    ${pasosHTML}
                </ol>
            </div>
        `;
    }

    // 5. Renderizar los artículos de cada pedido en el DOM
    if (listaPedidos.length === 0) {
        contenedorPedidos.innerHTML = `
            <div class="tarjeta-pedido">
                <p>No tienes pedidos registrados en este momento.</p>
                <a href="catalogo.html" class="button button_primary">Ir al catálogo</a>
            </div>
        `;
    } else {
        let contenidoHTML = "";

        listaPedidos.forEach((pedido) => {
            const claseEstado = pedido.estado.toLowerCase().replace(/\s+/g, "-");

            let totalCompra = 0;
            let itemsHTML = "";

            pedido.articulos.forEach((item) => {
                const subtotal = item.precio * item.cantidad;
                totalCompra += subtotal;

                itemsHTML += `
                    <li class="articulo-item">
                        <img 
                            src="${item.imagen}" 
                            alt="${item.nombre}" 
                            class="articulo-img"
                        >
                        <div class="articulo-detalles">
                            <h4>${item.nombre}</h4>
                            <p>Cantidad: ${item.cantidad}</p>
                            <p class="articulo-precio">$${subtotal.toLocaleString("es-CL")}</p>
                        </div>
                    </li>
                `;
            });

            contenidoHTML += `
                <article class="tarjeta-pedido" aria-labelledby="codigo-${pedido.codigo}">
                    <header class="tarjeta-pedido_header">
                        <div>
                            <h2 id="codigo-${pedido.codigo}">Pedido #${pedido.codigo}</h2>
                            <p class="fecha-pedido">Fecha de compra: ${pedido.fecha}</p>
                        </div>
                        <span class="badge badge-${claseEstado}">${pedido.estado}</span>
                    </header>

                    ${crearStepper(pedido.estado)}

                    <section class="pedido-articulos" aria-label="Lista de artículos">
                        <h3>Productos incluidos (${pedido.articulos.length})</h3>
                        <ul class="lista-articulos">
                            ${itemsHTML}
                        </ul>
                    </section>

                    <footer class="pedido-resumen">
                        <div class="datos-entrega">
                            <h3>Datos de Entrega</h3>
                            <p><strong>Dirección:</strong> ${pedido.direccion || "Retiro en tienda"}</p>
                            <p><strong>Modalidad:</strong> ${pedido.metodoEntrega || "Despacho a domicilio"}</p>
                        </div>

                        <div class="total-pedido">
                            <p class="etiqueta-total">Total Pagado:</p>
                            <p class="monto-total">$${totalCompra.toLocaleString("es-CL")}</p>
                        </div>
                    </footer>
                </article>
            `;
        });

        contenedorPedidos.innerHTML = contenidoHTML;
    }
}