// === VARIABLES GLOBALES ===

// Recupera el carrito almacenado en localStorage (si existe), o lo inicializa vacío.
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Objeto que almacena el stock disponible para cada producto.
// La clave es el nombre del producto y el valor es la cantidad en inventario.
let productos = {
  Camarones: 17,
  Spaghetti: 20,
  Tagliatelle: 15,
  Lasagna: 10,
  SpaghettiCarbonara: 12,
  PenneArrabbiata: 8,
  Parmigiana: 10,
  Pizza: 25,
  chocolatePanna: 22,
  napolitano: 30,
  cannoli: 10,
  tiramisu: 24,
  cappuccino: 39,
  espresso: 30,
  Acqua: 29,
  limonata: 22
};


// === FUNCIONES ===

/**
 * Agrega un producto al carrito de compras.
 * - Verifica cantidad válida.
 * - Controla el stock disponible.
 * - Actualiza el carrito y lo guarda en localStorage.
 * - Muestra mensajes en pantalla (sin usar alertas).
 */
function agregarAlCarrito(nombre, cantidad, precio, imagenRuta) {
  // Obtiene el elemento donde se mostrará el mensaje (debajo del producto)
  const mensajeElemento = document.getElementById("mensaje-" + nombre);
  mensajeElemento.textContent = ""; // Limpia cualquier mensaje previo.

  // Verifica que la cantidad ingresada sea válida.
  if (!cantidad || cantidad <= 0) {
    mensajeElemento.textContent = "Por favor, ingresa una cantidad válida.";
    mensajeElemento.style.color = "red";
    return;
  }

  // Verifica que el producto exista en el objeto de stock.
  if (!productos.hasOwnProperty(nombre)) {
    mensajeElemento.textContent = "El producto no existe en el inventario.";
    mensajeElemento.style.color = "red";
    return;
  }

  // Calcula cuántas unidades de ese producto ya están en el carrito.
  const cantidadActual = carrito.find(p => p.nombre === nombre)?.cantidad || 0;

  // Calcula el stock disponible restando lo ya agregado.
  const stockDisponible = productos[nombre] - cantidadActual;

  // Si la cantidad solicitada supera el stock disponible, muestra mensaje de error.
  if (cantidad > stockDisponible) {
    mensajeElemento.textContent = `Solo hay ${stockDisponible} unidades disponibles de ${nombre}.`;
    mensajeElemento.style.color = "red";
    return;
  }

  // Si el producto ya está en el carrito, solo se actualiza la cantidad y el subtotal.
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
    productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
  } else {
    // Si no está, se agrega como un nuevo producto al carrito.
    carrito.push({
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      subtotal: cantidad * precio,
      imagen: imagenRuta
    });
  }

  // Guarda el carrito actualizado en localStorage (para mantener los datos al recargar la página).
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualiza el contenido visible del carrito.
  actualizarCarrito();

  // Muestra un mensaje de éxito en color verde.
  mensajeElemento.textContent = `¡${cantidad} ${nombre}(s) agregado(s) al carrito!`;
  mensajeElemento.style.color = "green";

  // Hace que el mensaje desaparezca automáticamente después de 3 segundos.
  setTimeout(() => {
    mensajeElemento.textContent = "";
  }, 3000);
}


/**
 * Muestra el carrito lateral en pantalla.
 * - Hace visible el overlay y desplaza el panel del carrito.
 * - Carga los datos guardados en localStorage.
 */
function abrirCarrito() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cartPanel").style.right = "0";

  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();
}


/**
 * Cierra el carrito lateral.
 * - Oculta el overlay y devuelve el panel a su posición original.
 */
function cerrarCarrito() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("cartPanel").style.right = "-400px";
}


/**
 * Actualiza visualmente el contenido del carrito.
 * - Crea dinámicamente los elementos HTML de cada producto.
 * - Calcula el total general de la compra.
 */
function actualizarCarrito() {
  const contenedor = document.getElementById("cartItems");
  if (!contenedor) return; // Si no existe el contenedor, no hace nada.

  contenedor.innerHTML = ""; // Limpia el contenido anterior.

  let total = 0; // Acumulador del valor total del carrito.

  // Recorre los productos del carrito y los dibuja uno por uno.
  carrito.forEach((p, index) => {
    total += p.subtotal;

    const item = document.createElement("div");
    item.classList.add("cart-item");

    // Estructura HTML de cada producto dentro del carrito.
    item.innerHTML = `
      <div class="cart-item-content">
        <img src="${p.imagen || 'img/default.png'}" alt="${p.nombre}" class="cart-item-img">
        <div class="cart-item-info">
          <strong>${p.nombre}</strong><br>
          Cantidad: ${p.cantidad}<br>
          Precio: $${p.precio.toLocaleString()}<br>
          Subtotal: $${p.subtotal.toLocaleString()}
        </div>
      </div>
      <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">🗑️</button>
    `;

    // Agrega el producto al contenedor principal del carrito.
    contenedor.appendChild(item);
  });

  // Muestra el total general del carrito (si el elemento existe en el HTML).
  const totalElemento = document.getElementById("cartTotal");
  if (totalElemento) {
    totalElemento.textContent = "Total: $" + total.toLocaleString();
  }
}


/**
 * Elimina un producto del carrito según su índice.
 * - Quita el producto del arreglo.
 * - Actualiza localStorage.
 * - Refresca el contenido visual del carrito.
 */
function eliminarProducto(indice) {
  carrito.splice(indice, 1); // Elimina el producto del arreglo.
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza almacenamiento.
  actualizarCarrito(); // Refresca la vista.
}


/**
 * Evento que se ejecuta automáticamente cuando carga la página.
 * - Recupera el carrito guardado y actualiza la interfaz.
 */
window.onload = function() {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();
};
