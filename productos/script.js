var sumatoriaTotal = 0;



let menu= document.querySelector("#icono-menu");
let navegcion=document.querySelector(".navegacion");

menu.addEventListener("click",function(){
    navegcion.classList.toggle("active");
});


function calcularTotal(idCantidad,precio,idTotal) {
  console.log(idCantidad,precio,idTotal )
  var cantidad = parseInt(document.getElementById(idCantidad).value);
  console.log(idCantidad)
  var precioCafe = precio; // Precio de cada café
  var total = cantidad * precioCafe;
  total = verificar(total)
  document.getElementById(idTotal).textContent = "Total: $" + total.toFixed(2);
  calcularSumatoria(total)
  return total
}


function verificar(dato){
  if (isNaN(dato)) {
      return  0;
  }else
  {return  dato}
}

function calcularSumatoria(total) {
  sumatoriaTotal+=total
console.log(sumatoriaTotal)
if (isNaN(sumatoriaTotal)) {
    sumatoriaTotal = 0;
}
    // Muestra el resultado de la sumatoria total
    document.getElementById("resultadoTotal").textContent =  "Sumatoria Total: $" + sumatoriaTotal.toFixed(2);
}


function mostrarAlerta() {
  // Muestra el fondo oscuro y el cuadro modal
  document.getElementById('modalOverlay').style.display = 'block';
  document.getElementById('myModal').style.display = 'block';
}

function cerrarAlerta() {
  // Oculta el fondo oscuro y el cuadro modal
  document.getElementById('modalOverlay').style.display = 'none';
  document.getElementById('myModal').style.display = 'none';
}





  