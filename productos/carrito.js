// === VARIABLES GLOBALES ===
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// === FUNCIONES ===

// Agregar producto al carrito
function agregarAlCarrito(nombre, cantidad, precio, imagenRuta) {
  if (!cantidad || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad += cantidad;
    productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
  } else {

    carrito.push({
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      subtotal: cantidad * precio,
      imagen: imagenRuta 
    });
  }

  // Guardar en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

 
  actualizarCarrito();
}

// Mostrar carrito lateral
function abrirCarrito() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cartPanel").style.right = "0";

  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();
}

// Cerrar carrito
function cerrarCarrito() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("cartPanel").style.right = "-400px";
}
// Actualizar contenido del carrito
function actualizarCarrito() {
  const contenedor = document.getElementById("cartItems");
  if (!contenedor) return; // Evita errores si el carrito no está en la página

  contenedor.innerHTML = "";

  let total = 0;
  carrito.forEach((p, index) => {
    total += p.subtotal;

    const item = document.createElement("div");
    item.classList.add("cart-item");

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



    contenedor.appendChild(item);
  });

  const totalElemento = document.getElementById("cartTotal");
  if (totalElemento) {
    totalElemento.textContent = "Total: $" + total.toLocaleString();
  }
}


// Eliminar producto
function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

// Ejecutar al cargar la página
window.onload = function() {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();
};
