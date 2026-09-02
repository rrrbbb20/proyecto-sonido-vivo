/* Para almacenar los productos y poder mostrar su detalle  */ 
const productos = [
    {
        id: 1,
        nombre: "Guitarra Eléctrica Epiphone SG Standard",
        precio: 319990,
        imagen: "assets/img/guitarra-electrica-epiphone-sg.jpg",
        descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers",
        stock: 3,
        categoria: "guitarras-electricas",
        video_demostrativo:""
    },
    {
        id: 2,
        nombre: "Batería Acústica Pearl",
        precio: 599990,
        imagen: "assets/img/bateria-pearl-roadshow.webp",
        descripcion: "Batería Acústica 5 piezas Incluye stands, platillos y pedal de bombo.",
        stock : 2,
        categoria: "baterias",
        video_demostrativo:""
    },
    {
        id: 3,
        nombre: "Micrófono Condensador Audio-Tech AT2020",
        precio: 199990,
        imagen: "assets/img/microfono-atech-at2020.jpg",
        descripcion: "Cardioide, XLR, ideal para grabación en estudio.",
        stock : 4,
        categoria: "microfonos",
        video_demostrativo:""
    },

];

//para mostrar productos recomendados en producto
//va a buscar solo en donde esta el id nombre producto.html asi no entra a los otros .html
const nombreProducto = document.querySelector("#nombre");

if (nombreProducto) {
    //recien ahi va a obtener la url que esta despues del ?
    const parametros = new URLSearchParams(window.location.search);
    const id = Number(parametros.get("id"));
    // va a hacer la comparacion de que p que va a ser cada producto durante la iteracion 
    //y si p coincide con el id obtenido antes va a ser el producto que buscamos
    const producto = productos.find(p => p.id === id);

    const imagen = document.querySelector("#imagen");
    const precio = document.querySelector("#precio");
    const descripcion = document.querySelector("#descripcion");

    if (producto) {
        nombreProducto.textContent = producto.nombre;

        if (imagen) {
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            imagen.style.display = "block";
        }

        if (precio) {
            precio.textContent = `$${producto.precio.toLocaleString("es-CL")}`;
        }

        if (descripcion) {
            descripcion.textContent = producto.descripcion;
        }
    } else {
        nombreProducto.textContent = "Producto no encontrado";

        if (imagen) {
            imagen.style.display = "none";
        }

        if (precio) {
            precio.textContent = "";
        }

        if (descripcion) {
            descripcion.textContent = "El producto solicitado no existe.";
        }
    }
}