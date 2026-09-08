// 1. Constante global (accesible para todo el script)
const estadosSecuencia = [
    "Confirmado",
    "En preparación",
    "Despachado",
    "Entregado"
];

const contenedorPedidos = document.querySelector("#contenedor-pedidos");

if (contenedorPedidos) {

    const pedidosIniciales = [
        {
            codigo: "SV-2026",
            fecha: "06/09/2026",
            estado: "En preparación",
            direccion: "1 Norte 123, Depto 402, Viña del Mar, Región Valparaíso (CP: 2520000)",
            telefono: "912345678",
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
            telefono: "987654321",
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

    // 2. Obtener datos de localStorage
    let listaPedidos = null;
    try {
        listaPedidos = JSON.parse(localStorage.getItem("pedidosSonidoVivo"));
    } catch (e) {
        listaPedidos = null;
    }

    if (!Array.isArray(listaPedidos) || listaPedidos.length === 0) {
        listaPedidos = pedidosIniciales;
        localStorage.setItem("pedidosSonidoVivo", JSON.stringify(listaPedidos));
    }

    // 3. Generar la barra de progreso (Stepper)
    function crearStepper(estadoActual) {
        const indiceActual = estadosSecuencia.indexOf(estadoActual);
        let pasosHTML = "";

        estadosSecuencia.forEach((estado, index) => {
            let clasePaso = "pendiente";
            let iconoPaso = index + 1;
            let ariaCurrent = "";

            if (index < indiceActual) {
                clasePaso = "completado";
                iconoPaso = "&#10003;";
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

    // 4. Renderizar tarjetas de pedidos
    if (listaPedidos.length === 0) {
        contenedorPedidos.innerHTML = `
            <div class="tarjeta-pedido">
                <p>No tienes pedidos registrados en este momento.</p>
                <a href="catalogo.html" class="button button_primary">Ir al catálogo</a>
            </div>
        `;
    } else {
        let contenidoHTML = "";
        const pedidosOrdenados = [...listaPedidos].reverse();

        pedidosOrdenados.forEach((pedido) => {
            const estadoSeguro = estadosSecuencia.includes(pedido.estado) ? pedido.estado : "Confirmado";
            const claseEstado = estadoSeguro.toLowerCase().replace(/\s+/g, "-");

            let totalCompra = 0;
            let itemsHTML = "";
            const articulos = Array.isArray(pedido.articulos) ? pedido.articulos : [];

            articulos.forEach((item) => {
                const subtotal = Number(item.precio) * Number(item.cantidad);
                totalCompra += subtotal;

                itemsHTML += `
                    <li class="articulo-item">
                        <img 
                            src="${item.imagen || 'assets/img/guitarra-electrica-epiphone-sg.jpg'}" 
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
                        <span class="badge badge-${claseEstado}">${estadoSeguro}</span>
                    </header>

                    ${crearStepper(estadoSeguro)}

                    <section class="pedido-articulos" aria-label="Lista de artículos">
                        <h3>Productos incluidos (${articulos.length})</h3>
                        <ul class="lista-articulos">
                            ${itemsHTML}
                        </ul>
                    </section>

                    <footer class="pedido-resumen">
                        <div class="datos-entrega">
                            <h3>Datos de Entrega</h3>
                            <p><strong>Dirección:</strong> ${pedido.direccion || "Retiro en tienda"}</p>
                            ${pedido.telefono ? `<p><strong>Teléfono:</strong> ${pedido.telefono}</p>` : ""}
                            <p><strong>Modalidad:</strong> ${pedido.metodoEntrega || "Despacho a domicilio"}</p>
                        </div>

                        <div class="total-pedido">
                            <p class="etiqueta-total"><strong>Total Pagado:</strong></p>
                            <p class="monto-total">$${totalCompra.toLocaleString("es-CL")}</p>
                        </div>
                    </footer>
                </article>
            `;
        });

        contenedorPedidos.innerHTML = contenidoHTML;
    }
}