
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
        <span class="error" id="errorTelefonoPago"></span>
      </div>
      <div id="botonPago"></div>
    `;
  } else if (medio === "tarjetaCredito" || medio === "tarjetaDebito") {
    contenedor.innerHTML = `
      <div class="input-box">
        <label for="tarjeta">Número de tarjeta:</label>
        <input type="text" id="tarjeta" class="input-field" placeholder="Ej: 1234 5678 9012 3456" required
               oninput="mostrarBoton(this.value)">
        <span class="error" id="errorTarjetaPago"></span>
      </div>
      <div id="botonPago"></div>
    `;
  }
}

/* ¿Qué hace este bloque de código?
  - Espera al click del botón “Continuar”.
  - Limpia errores previos.
  - Muestra mensajes rojos debajo de los campos vacíos.
  - Si todo está completo, redirige.
*/
document.getElementById("btnContinuar").addEventListener("click", function () {
  const nombre = document.getElementById("nombreCliente");
  const apellido = document.getElementById("apellidoCliente");
  const telefono = document.getElementById("telefonoCliente");
  const cedula = document.getElementById("cedulaCliente");
  const medioPago = document.getElementById("MedioPago");

  const errorNombre = document.getElementById("errorNombre");
  const errorApellido = document.getElementById("errorApellido");
  const errorTelefono = document.getElementById("errorTelefono");
  const errorCedula = document.getElementById("errorCedula");
  const errorMedioPago = document.getElementById("errorMedioPago");

  let valido = true;

  // Limpiar errores anteriores
  errorNombre.textContent = "";
  errorApellido.textContent = "";
  errorTelefono.textContent = "";
  errorCedula.textContent = "";
  errorMedioPago.textContent = "";

  // Validar cada campo
  if (nombre.value.trim() === "") {
    errorNombre.textContent = "Por favor ingrese su nombre.";
    valido = false;
  }

  if (apellido.value.trim() === "") {
    errorApellido.textContent = "Por favor ingrese su apellido.";
    valido = false;
  }

  if (telefono.value.trim() === "") {
    errorTelefono.textContent = "Por favor ingrese su teléfono.";
    valido = false;
  }

  if (cedula.value.trim() === "") {
    errorCedula.textContent = "Por favor ingrese su número de documento.";
    valido = false;
  }

  if (medioPago.value === "") {
    errorMedioPago.textContent = "Seleccione un medio de pago antes de continuar.";
    valido = false;
  }

  // Validar campo dinámico (según el medio seleccionado)
  if (medioPago.value === "nequi") {
    // Capturamos el input dinámico del teléfono y su contenedor de error.
    const telefonoPago = document.getElementById("telefono");
    const errorTelefonoPago = document.getElementById("errorTelefonoPago");

    // Limpiamos cualquier mensaje previo, por si el usuario ya había intentado continuar antes.
    errorTelefonoPago.textContent = "";

    // Verificamos si el campo existe (por si aún no se ha generado) o si está vacío.
    if (!telefonoPago || telefonoPago.value.trim() === "") {
      // Si está vacío, mostramos el mensaje de error en rojo debajo del campo.
      errorTelefonoPago.textContent = "Por favor ingrese su número de teléfono de Nequi.";
      // Y marcamos la variable general de validación como falsa.
      valido = false;
    }
  }

  // Hacemos lo mismo para los casos de tarjeta crédito o débito.
  if (medioPago.value === "tarjetaCredito" || medioPago.value === "tarjetaDebito") {
    const tarjetaPago = document.getElementById("tarjeta");
    const errorTarjetaPago = document.getElementById("errorTarjetaPago");

    // Limpiamos errores anteriores.
    errorTarjetaPago.textContent = "";

    // Si el campo no existe o está vacío, mostramos el mensaje.
    if (!tarjetaPago || tarjetaPago.value.trim() === "") {
      errorTarjetaPago.textContent = "Por favor ingrese el número de su tarjeta.";
      valido = false;
    }
  }

  // Si todo está correcto, continuar
  if (valido) {
    // Ocultar el botón "Continuar"
    const btnContinuar = document.getElementById("btnContinuar");
    btnContinuar.style.display = "none";

    // Crear o mostrar el botón "Mostrar QR" inmediatamente
    const botonContenedor = document.getElementById("botonPago");

    // Si ya existe, solo lo mostramos
    if (botonContenedor.querySelector("button")) {
      botonContenedor.querySelector("button").style.display = "block";
    } else {
      // Si no existe (por ejemplo, si el usuario no escribió nada antes)
      botonContenedor.innerHTML = `
        <a href="../mostrarQR/index.html" class="qr-btn" style="color: aliceblue; text-decoration: none;">
          <button class="qr-btn" style="color: aliceblue;">Mostrar QR</button>
        </a>
      `;
    }

    console.log("Formulario completado. Mostrando botón QR.");
  }

});