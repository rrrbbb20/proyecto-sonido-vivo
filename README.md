proyecto-sonido-vivo
Sonido Vivo - Tienda de Instrumentos y Audio
Proyecto web frontend para la tienda de instrumentos musicales y equipos de audio Sonido Vivo (Viña del Mar, Chile). Desarrollado bajo utilizando HTML5 , CSS y JavaScript


Equipo 
-Francisco Ramirez
-Rodrigo Baez
-Maximiliano Cordova


Estructura de Archivos

sonido-vivo/
├── index.html                  # Portada y productos destacados
├── catalogo.html               # Catálogo completo con buscador y filtros
├── producto.html               # Vista de detalle de producto
├── carrito.html                # Carrito de compras
├── confirmar-pedido.html       # Checkout y datos de despacho
├── pedido.html                 # Seguimiento de orden con stepper interactivo
├── login.html                  # Inicio de sesión de clientes
├── register.html               # Formulario de registro con validaciones
├── admin.html                  # Panel de gestión y registro de trabajadores
├── contacto.html               # Formulario de contacto y soporte
├── ubicacion.html              # Mapa e información de la tienda física
├── assets/
│   ├── css/
│   │   └── styles.css          # Hoja de estilos centralizada (Mobile-First)
│   ├── js/
│   │   ├── app.js              # Inicialización global
│   │   ├── navegacion.js       # Control del menú hamburguesa móvil
│   │   ├── catalogo.js         # Filtros y render de catálogo
│   │   ├── carrito.js          # Lógica de agregación y totales
│   │   ├── pedido.js           # Renderizado dinámico de pedidos y stepper
│   │   ├── registro.js         # Validación de RUT y datos de cliente
│   │   ├── confirmar-pedido.js # Resumen de compra y despacho
│   │   ├── login.js            # Validación de acceso
│   │   └── admin.js            # Registro de trabajadores
│   └── img/                    # Fotografías de productos y recursos visuales
└── README.md