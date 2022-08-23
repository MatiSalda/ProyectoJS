const divProductos = document.getElementById("contenedorProductos")


async function verProductos(){
    const response = await fetch('./json/listaProductos.json')
    const productos = await response.json
    return productos
}


fetch('./json/listaProductos.json')
.then(response => response.json())
.then(productos => {
    productos.forEach((producto , indice) => {
        divProductos.innerHTML += `
        
        <div class="caja d-flex row align-content-center justify-content-center id= producto${indice} ">
    
        <h4 class=" text-center align-top">${producto.nombre}</h4>
      
      <div  class="row justify-content-center">
        <img src=${producto.img} alt="buzo herito">
      </div>
      
      <div  class=" justify-content-center d-flex">
        <p class="margin-right:10px me-md-3">Stock: ${producto.stock}</p>
        <p>$${producto.precio}</p>
      </div>   
      
      <div  class="row justify-content-center">
        <button class="btn btn-dark" id="agregarCarrito">comprar</button>
      </div>
      </div>
        `
    });
})





