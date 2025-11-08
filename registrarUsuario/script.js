document.getElementById("btnLogin").addEventListener("click", function () {
  const correo = document.getElementById("nombreCliente");
  const contrasena = document.getElementById("edadCliente");
  const errorCorreo = document.getElementById("errorCorreo");
  const errorContrasena = document.getElementById("errorContrasena");

  let valido = true;

  // Limpiar errores anteriores
  errorCorreo.textContent = "";
  errorContrasena.textContent = "";

  // Validar correo
  if (correo.value.trim() === "") {
    errorCorreo.textContent = "Por favor ingrese su correo o teléfono.";
    valido = false;
  }

  // Validar contraseña
  if (contrasena.value.trim() === "") {
    errorContrasena.textContent = "Por favor ingrese su contraseña.";
    valido = false;
  }

  // Si todo está correcto, redirige
  if (valido) {
    window.location.href = "../llenarCamposOrden/index.html";
  }
});