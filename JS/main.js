

const hamburguerIcon = document.querySelector('.nav__hamburguer');
const navOverlay = document.querySelector('.nav__overlay');
let currentDropdown = navOverlay;

hamburguerIcon.addEventListener('click', ()=>{
    hamburguerIcon.classList.toggle('nav__hamburguer--open');

    navOverlay.classList.toggle('nav__overlay--show');
});

navOverlay.addEventListener('click', (e)=>{
    e.preventDefault();
    const currentElement = e.target;
    // console.log(e.target.classList.value);

    if( isActive(currentElement, 'nav__parent') ){

        const subMenu = currentElement.parentElement.children[1];
     

        if(window.innerWidth < 768){

            let height = (subMenu.clientHeight == 0) 
                        ? subMenu.scrollHeight : 0;
            // console.log(subMenu.clientHeight);

            subMenu.style.height = `${height}px`;
        }else{

            if( !isActive(subMenu, 'nav__inner--show') ){
                closeDropdown(currentDropdown);
            }
            subMenu.classList.toggle('nav__inner--show');

            currentDropdown = subMenu;

        }

    }

});

function isActive(element, string){
    return element.classList.value.includes(string);
}

function closeDropdown(currentDropdown){
    if( isActive(currentDropdown, 'nav__inner--show')){
        currentDropdown.classList.remove('nav__inner--show');
    }
}

window.addEventListener('resize', ()=>{
    closeDropdown(currentDropdown);

    if(window.innerWidth > 768){
        const navInners = document.querySelectorAll('.nav__inner');

        navInners.forEach(navInner =>{
            navInner.style.height = '';
        });
    }
});
 // Objeto global para almacenar productos
 const productos = [
    { id: 1, nombre: 'Zapatos night', precio: 20 },
    { id: 2, nombre: 'Chaqueta', precio: 30 },
    { id: 3, nombre: 'Camiseta Rojas', precio: 25 },
    { id: 4, nombre: 'Pantalones', precio: 40 },
    { id: 5, nombre: 'Sombrero', precio: 15 }
];
function cargarProductosEnLista() {
    const listaProductosElement = document.getElementById('listaProductos');

    productos.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('producto');
        nuevoProducto.setAttribute('data-id', producto.id);

        // Verificar si la imagen ya ha sido cargada
        if (producto.imagen && !imagenCargada(producto.imagen)) {
            // Si no ha sido cargada, la cargamos
            cargarImagen(producto.imagen);
        }

        const imagenProducto = new Image();
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;
        imagenProducto.classList.add('imagen-producto');

        nuevoProducto.appendChild(imagenProducto);
        nuevoProducto.innerHTML += `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarritoDesdeLista(${producto.id})">Agregar al Carrito</button>
        `;

        listaProductosElement.appendChild(nuevoProducto);
    });
}

// Función para verificar si la imagen ya ha sido cargada
function imagenCargada(src) {
    const imagenesCargadas = Array.from(document.images).map(img => img.src);
    return imagenesCargadas.includes(src);
}

// Función para cargar una imagen
function cargarImagen(src) {
    const imagen = new Image();
    imagen.src = src;
}


let cuponDescuento = 0;

// Configuración inicial del botón de PayPal
const initialPayPalButton = paypal.Buttons({
    createOrder: function(data, actions) {
        // Configura la transacción de PayPal
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalConDescuento.toFixed(2) // Precio total con descuento
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        // Captura la transacción de PayPal
        return actions.order.capture().then(function(details) {
            // Muestra un mensaje de agradecimiento al usuario
            alert('Pago completado. ¡Gracias por su compra!');
            // Cierra el modal
            cerrarModal();
        });
    }
});

// Renderiza el botón de PayPal inicial
initialPayPalButton.render('#paypal-button-container');


const MAX_PRODUCTOS_EN_CARRITO = 5; // Define el límite máximo de productos en el carrito

function agregarAlCarrito(producto, contenedor) {
    const carritoElement = document.getElementById(contenedor);

    if (carritoElement.children.length >= MAX_PRODUCTOS_EN_CARRITO) {
        // Si ya se alcanzó el límite máximo, no agregar más productos y mostrar el scroll
        swal.fire('Límite máximo de productos alcanzado');
        return;
    }

    const nuevoProducto = document.createElement('div');
    nuevoProducto.classList.add('producto');
    nuevoProducto.setAttribute('data-id', producto.id);

    nuevoProducto.innerHTML = `
        <span>${producto.nombre} - $${producto.precio}</span>
        <button onclick="eliminarDelCarrito(${producto.id}, '${contenedor}')">Eliminar</button>
    `;

    carritoElement.appendChild(nuevoProducto);
    actualizarLocalStorage(contenedor);
    actualizarTotal(contenedor);

    // Verificar si la cantidad de productos en el carrito ha alcanzado el límite máximo
    if (carritoElement.children.length >= MAX_PRODUCTOS_EN_CARRITO) {
        carritoElement.style.overflowY = 'auto';
    }
}
function abrirModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Limpiar el carrito en el modal
    document.getElementById('carritoModal').innerHTML = '';

    // Agregar productos al carrito en el modal desde el almacenamiento local
    const productosCarrito = obtenerProductosLocalStorage('carritoModal');
    productosCarrito.forEach(producto => agregarAlCarrito(producto, 'carritoModal'));
    actualizarTotal('carritoModal');
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function cargarProductosEnLista() {
    const listaProductosElement = document.getElementById('listaProductos');

    productos.forEach(producto => {
        const nuevoProducto = document.createElement('div');
        nuevoProducto.classList.add('producto');
        nuevoProducto.setAttribute('data-id', producto.id);

        nuevoProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span>${producto.nombre} - $${producto.precio}</span>
            <button onclick="agregarAlCarritoDesdeLista(${producto.id})">Agregar al Carrito</button>
        `;

        listaProductosElement.appendChild(nuevoProducto);
    });
}


function agregarAlCarritoDesdeLista(id) {
    const productoSeleccionado = productos.find(producto => producto.id === id);
    agregarAlCarrito(productoSeleccionado, 'carritoModal');
}

function eliminarDelCarrito(id, contenedor) {
    const carritoElement = document.getElementById(contenedor);

    // Encuentra el índice del producto en el array de productos en el modal
    const productosCarrito = obtenerProductosLocalStorage(contenedor);
    const index = productosCarrito.findIndex(producto => producto.id === id);

    // Verificar si el elemento existe antes de intentar eliminarlo
    if (index !== -1) {
        // Eliminar el elemento del array
        productosCarrito.splice(index, 1);

        // Limpiar el contenido del carrito
        limpiarCarrito(contenedor);

        // Reconstruir el contenido del carrito
        productosCarrito.forEach(producto => agregarAlCarrito(producto, contenedor));
        actualizarTotal(contenedor);
    }
}

function obtenerProductosLocalStorage(contenedor) {
    const productosGuardados = localStorage.getItem(contenedor);
    return productosGuardados ? JSON.parse(productosGuardados) : [];
}

function actualizarLocalStorage(contenedor) {
    const carritoElement = document.getElementById(contenedor);
    const productosCarrito = Array.from(carritoElement.children).map(productoElement => {
        const id = productoElement.getAttribute('data-id');
        const nombrePrecio = productoElement.querySelector('span').innerText.split(' - $');
        return { id: Number(id), nombre: nombrePrecio[0], precio: Number(nombrePrecio[1]) };
    });

    localStorage.setItem(contenedor, JSON.stringify(productosCarrito));
    console.log(`Productos en ${contenedor} actualizados:`, productosCarrito);
}

function limpiarCarrito(contenedor) {
    const carritoElement = document.getElementById(contenedor);
    carritoElement.innerHTML = '';
    actualizarLocalStorage(contenedor);
}

function actualizarTotal(contenedor) {
    const carritoElement = document.getElementById(contenedor);
    const productosCarrito = Array.from(carritoElement.children).map(productoElement => {
        const id = productoElement.getAttribute('data-id');
        const nombrePrecio = productoElement.querySelector('span').innerText.split(' - $');
        return { id: Number(id), nombre: nombrePrecio[0], precio: Number(nombrePrecio[1]) };
    });

    const total = productosCarrito.reduce((sum, producto) => sum + producto.precio, 0);
    const totalConDescuento = total - cuponDescuento;

    // Agregar o actualizar el elemento del total en el DOM
    let totalElement = document.getElementById('total');
    if (!totalElement) {
        totalElement = document.createElement('div');
        totalElement.id = 'total';
        carritoElement.appendChild(totalElement);
    }

    totalElement.innerHTML = `Total: $${totalConDescuento.toFixed(2)}`;

    // Actualizar el valor del botón de PayPal
    updatePayPalButtonAmount(totalConDescuento);
}

function aplicarDescuento(contenedor) {
    const cuponInput = document.getElementById('cupon');
    const cuponIngresado = cuponInput.value;

    // Aquí puedes verificar el cupón y calcular el descuento
    // En este ejemplo, simplemente aplicamos un descuento fijo de 5
    if (cuponIngresado === 'SOLID') {
        cuponDescuento = 5;
        actualizarTotal(contenedor);
        alert('Descuento aplicado!');
    } else {
        alert('Cupón inválido');
    }
}

function updatePayPalButtonAmount(totalConDescuento) {
    // Destruye el botón de PayPal existente
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    paypalButtonContainer.innerHTML = '';

    // Configura el nuevo botón de PayPal con el monto actualizado
    const newPayPalButton = paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalConDescuento.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Pago completado. ¡Gracias por su compra!');
                cerrarModal();
            });
        }
    });

    // Renderiza el nuevo botón de PayPal
    newPayPalButton.render('#paypal-button-container');
}

cargarProductosEnLista();