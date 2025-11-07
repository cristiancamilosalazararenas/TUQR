class Producto{
    constructor(codigo,descripcion,precio,color,tamaño,nombre,material,marca){
        this.codigo=codigo;
        this.descripcion=descripcion;
        this.precio=precio;
        this.color=color;
        this.tamaño=tamaño;
        this.nombre=nombre;
        this.material=material;
        this.marca=marca;
       
        this.empleados=new Array();
        this.invetarios=new Array();

         //agregacion
         this.papelerias=new Array();
         this.cocinas=new Array();
       
    }
   
    agregarCocina(cocinaNuevo){
        this.cocinas.push(cocinaNuevo);
    }
    eliminarCocina(){
        this.cocinas.unshift();
    }
    getCocinas(){
        return this.cocinas;
    }

    
    agregarPapeleria(papeleriaNuevo){
        this.papelerias.push(papeleriaNuevo);
    }

    eliminarPapeleria(){
        this.papelerias.unshift();
    }

    getPapelerias(){
        return this.papelerias;
    }

    //getters y setters
    getCodigo(){
        return this.codigo;
    }
    setCodigo(codigoNuevo){
        this.codigo=codigoNuevo;
    }

    getDescripcion(){
        return this.descripcion;
    }
    setDescripcion(descripcionNuevo){
        this.descripcion=descripcionNuevo;
    }

    getPrecio(){
        return this.precio;
    }
    setPrecio(precioNuevo){
        this.precio=precioNuevo;
    }

    getColor(){
        return this.color;
    }
    setColor(colorNuevo){
        this.color=colorNuevo;
    }

    getTamaño(){
        return this.tamaño;
    }
    setTamaño(tamañoNuevo){
        this.tamaño=tamañoNuevo;
    }

    //get-> devuelve informacion 
    getNombre(){
        return this.nombre;
    }
    //set-> cambiar informacion 
    setNombre(nombreNuevo){
        this.nombre=nombreNuevo;
    }

    getMaterial(){
        return this.material;
    }
    setMaterial(materialNuevo){
        this.material=materialNuevo;
    }

    getMarca(){
        return this.marca;
    }
    setMarca(marcaNuevo){
        this.marca=marcaNuevo;
    }

}



class Papeleria {
    constructor(tipo){
        this.tipo=tipo;
       
    }
    getTipo(){
        return this.tipo;
    }
    setTipo(tipoNuevo){
        this.tipo=tipoNuevo;
    }
   
 }


const productosRegistrados = [];


function registrarProducto() {
    const codigoProducto = document.getElementById('codigoProducto').value;
    const descripcionProducto  = document.getElementById('descripcionProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;
    const colorProducto = document.getElementById('colorProducto').value;
    const tamañoProducto = document.getElementById('tamañoProducto').value;
    const nombreProducto = document.getElementById('nombreProducto').value;
    const materialProducto = document.getElementById('materialProducto').value;
    const marcaProducto = document.getElementById('marcaProducto').value;
   
    
           

    const nuevoProducto = new Producto(codigoProducto, descripcionProducto, precioProducto, colorProducto, tamañoProducto,nombreProducto,materialProducto,marcaProducto);
    productosRegistrados.push(nuevoProducto);

    // Mostrar mensaje de éxito
    alert("¡Producto registrado con éxito!");

    // Mostrar los empleados registrados en la consola
    console.log("Producto registrados:", productosRegistrados);

    // Puedes realizar otras acciones aquí si es necesario
}

// Asignar la función al evento clic del botón después de que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrar').addEventListener('click', registrarProducto);
});
       

      