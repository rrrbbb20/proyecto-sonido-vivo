const formularioCatalogo = document.querySelector(".catalog_search");
const campoBusqueda = document.querySelector("#product-search");
const filtroCategoria = document.querySelector("#category-filter");

const productosCatalogo =
    document.querySelectorAll("[data-producto]");

const resultadoCatalogo =
    document.querySelector(".product-list_results");

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
}

if (
    formularioCatalogo &&
    campoBusqueda &&
    filtroCategoria &&
    resultadoCatalogo
) {
    formularioCatalogo.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const busqueda = normalizarTexto(
            campoBusqueda.value
        );

        const categoriaSeleccionada =
            filtroCategoria.value;

        let cantidadVisible = 0;

        productosCatalogo.forEach(function (producto) {
            const contenidoProducto = normalizarTexto(
                `${producto.dataset.name} ${producto.dataset.category}`
            );

            const categoriaProducto =
                producto.dataset.category;

            const coincideBusqueda =
                contenidoProducto.includes(busqueda);

            const coincideCategoria =
                categoriaSeleccionada === "" ||
                categoriaProducto === categoriaSeleccionada;

            const mostrarProducto =
                coincideBusqueda && coincideCategoria;

            producto.hidden = !mostrarProducto;

            if (mostrarProducto) {
                cantidadVisible++;
            }
        });

        if (cantidadVisible === 0) {
            resultadoCatalogo.textContent =
                "No se encontraron productos.";
        } else if (cantidadVisible === 1) {
            resultadoCatalogo.textContent =
                "Mostrando 1 producto.";
        } else {
            resultadoCatalogo.textContent =
                `Mostrando ${cantidadVisible} productos.`;
        }
    });
}