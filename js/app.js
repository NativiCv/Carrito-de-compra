const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listarCurso = document.querySelector("#lista-cursos")
let articulosCarrito = [];





cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionanado "Agregar al Carrito"
  listarCurso.addEventListener( 'click',agregarCurso);
  // Limpiar carrito
  vaciarCarritoBtn.addEventListener('click', limpiar);
  // Elimina cursos del carrito
  carrito.addEventListener('click', eliminarCurso)

}

// Funciones

// Elimina un curso del carrito
function eliminarCurso(e) {
  console.log(e.target.classList);
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    // Elimina del arreglo de acticulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
    carritoHTML(); // Iteramos sobre el carrito y mostrar su HTML

  }
}

// Limpiar carrito completo
function limpiar(e) {
  e.preventDefault();
  articulosCarrito = []; // Reseteamos el arrelgo
  limpiarHTML(); // Eliminamos todo el HTML
}

 function agregarCurso(e) {
  e.preventDefault();
  if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
 }

 // Lee el contenido del HTML al que le dimos click y extrae la informacio del curso
 function leerDatosCursos(curso) {
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  }

  // Revisa si un elemento ya existe en el carrito
  // .some Permite iterar sobre un arreglo de objetos y verificar si un elemento existe en el
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe){
    // Actualizamos la cantidad
    // .Map los vas a crear un nuevo arreglo, y .map se debe retormar el valor
    const cursos = articulosCarrito.map( curso => {
      if (curso.id === infoCurso.id) {
        curso.cantidad ++;

        return curso; // Retorna el objeto actulizado la cantidad
      }else{
        return curso; // Retorno los objetos que no son los duplicados
      }
    } );
    articulosCarrito = [...cursos];
  }else{
    articulosCarrito = [...articulosCarrito, infoCurso];

  }

  // Agrega elementos al arreglo de carrito
  console.log(articulosCarrito);
  carritoHTML();

  //console.log(infoCurso);
 }

 // Muestra el carrito de compras en el HTML

 function carritoHTML() {

  // Limpiar el HTML
  limpiarHTML();


  // Genera el carrito y genera el HTML

  articulosCarrito.forEach( curso => {
    // Usar destruntion, extrae el valor y crea la variable
    const {imagen, titulo} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
        <img src="${imagen}" width="100">
       </td>
       <td>
        ${titulo}
       </td> 
       <td>
        ${curso.precio}
       </td>
       <td>
        ${curso.cantidad}
       </td>
       <td>
          <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
       </td>
    
    `;
    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);

  } )

  
 }
// Eliminar los cursos del tbody
 function limpiarHTML() {
  // Forma lenta de eliminar HTML
  //contenedorCarrito.innerHTML = '';

  // firstChild, es decir si ese contenedor carrito tiene al menos un elemento dentro este bucle se seguira ejecutando
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }


 }
