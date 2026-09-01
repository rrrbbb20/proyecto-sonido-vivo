/* Para almacenar los productos y poder mostrar su detalle  */ 
const productos = [
    {
        id: 1,
        nombre: "Guitarra Eléctrica Epiphone SG Standard",
        precio: 319990,
        imagen: "assets/img/guitarra-electrica-epiphone-sg.jpg",
        descripcion: "Cuerpo caoba, mástil caoba, 2 humbuckers"
        
    },
    {
        id: 2,
        nombre: "Batería Acústica Pearl",
        precio: 389990,
        imagen: "assets/img/bateria-pearl-roadshow.webp",
        descripcion: "Batería Acústica 5 piezas Incluye stands, platillos y pedal de bombo."
    },
    {
        id: 3,
        nombre: "Micrófono Condensador Audio-Tech AT2020",
        precio: 199990,
        imagen: "assets/img/microfono-atech-at2020.jpg",
        descripcion: "Cardioide, XLR, ideal para grabación en estudio."
    },

];

const parametros = new URLSearchParams(window.location.search);

const id = Number(parametros.get("id"));

const producto = productos.find(p => p.id === id);

if (producto) {
    document.querySelector("#nombre").textContent = producto.nombre;

    document.querySelector("#imagen").src = producto.imagen;

    document.querySelector("#precio").textContent =
        `$${producto.precio.toLocaleString("es-CL")}`;

    document.querySelector("#descripcion").textContent =
        producto.descripcion;
}