var sumatoriaTotal = 0;
let menu = document.querySelector("#icono-menu");
let navegacion = document.querySelector(".navegacion");

// Menú hamburguesa
menu.addEventListener("click", function () {
  navegacion.classList.toggle("active");
});

// --- Cálculo de totales individuales ---
function calcularTotal(idCantidad, precio, idTotal) {
  var cantidad = parseInt(document.getElementById(idCantidad).value);
  var total = verificar(cantidad * precio);
  document.getElementById(idTotal)?.textContent = "Total: $" + total.toFixed(2);
  calcularSumatoria(total);
  return total;
}

function verificar(dato) {
  if (isNaN(dato)) {
    return 0;
  } else {
    return dato;
  }
}

function calcularSumatoria(total) {
  sumatoriaTotal += total;
  if (isNaN(sumatoriaTotal)) sumatoriaTotal = 0;
  document.getElementById("resultadoTotal").textContent =
    "Sumatoria Total: $" + sumatoriaTotal.toFixed(2);
}

// === VARIABLES GLOBALES ===
let carrito = [];

menu.addEventListener("click", function() {
  navegacion.classList.toggle("active");
});

// === FUNCIONES ===

// Agregar producto al carrito
function agregarAlCarrito(nombre, cantidad, precio) {
  console.log("Entró a agregarAlCarrito:", nombre, cantidad, precio);

  if (!cantidad || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  // Ejemplo de simulación de carrito
  alert(`Producto agregado: ${nombre} (${cantidad}) - Total: $${cantidad * precio}`);
}


// Mostrar carrito (panel lateral)
function abrirCarrito() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("cartPanel").style.right = "0";
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
  contenedor.innerHTML = "";

  let total = 0;
  carrito.forEach((p, index) => {
    total += p.subtotal;

    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
      <p><strong>${p.nombre}</strong> x${p.cantidad} - $${p.subtotal.toLocaleString()}</p>
      <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">🗑️</button>
    `;
    contenedor.appendChild(item);
  });

  document.getElementById("cartTotal").textContent = "Total: $" + total.toLocaleString();
}

// Eliminar producto del carrito
function eliminarProducto(indice) {
  carrito.splice(indice, 1);
  actualizarCarrito();
}
