
function mostrarCampoPago() {
  const medio = document.getElementById("MedioPago").value;
  const contenedor = document.getElementById("campo-extra");

  contenedor.innerHTML = ""; // Limpia el contenido anterior

  if (medio === "nequi") {
    contenedor.innerHTML = `
      <div class="input-box">
        <label for="telefono">Número de teléfono (Nequi):</label>
        <input type="tel" id="telefono" class="input-field" placeholder="Ej: 3001234567" required
               oninput="mostrarBoton(this.value)">
      </div>
      <div id="botonPago"></div>
    `;
  } else if (medio === "tarjetaCredito" || medio === "tarjetaDebito") {
    contenedor.innerHTML = `
      <div class="input-box">
        <label for="tarjeta">Número de tarjeta:</label>
        <input type="text" id="tarjeta" class="input-field" placeholder="Ej: 1234 5678 9012 3456" required
               oninput="mostrarBoton(this.value)">
      </div>
      <div id="botonPago"></div>
    `;
  }
}

function mostrarBoton(valor) {
  const botonContenedor = document.getElementById("botonPago");
  botonContenedor.innerHTML = ""; // limpia

  // Mostrar el botón solo si hay algo escrito
  if (valor.trim().length >= 5) {
    botonContenedor.innerHTML = `
      <a href="../mostrarQR/index.html" class="qr-btn" style="color: aliceblue; text-decoration: none;">
        <button class="qr-btn" onclick="confirmarPago()" style="color: aliceblue;">Mostrar QR</button>
      </a>
      
    `;
  }
}
