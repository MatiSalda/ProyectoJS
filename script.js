const divProductos = document.getElementById("contenedorProductos")
const carritoDom = document.getElementById("carritoDom")
const
let p = document.getElementById("vista")

async function verProductos(){
    const response = await fetch('./json/listaProductos.json')
    const productos = await response.json
    return productos
}

const carrito = JSON.parse(localStorage.getItem('carrito')) ?? []

let prouctosArray = [];

const botonCarrito = document.getElementById("botonCarrito")


fetch('./json/listaProductos.json')
.then(response => response.json())
.then(productos => {
    productos.forEach((producto) => {
      
      divProductos.innerHTML += `
        
        <div class="caja d-flex row align-content-center justify-content-center" id="producto${producto.id}">
    
          <h4 class=" text-center align-top">${producto.nombre}</h4>

          <div  class="row justify-content-center">
            <img src=${producto.img} alt="buzo herito">
          </div>
          
          <div  class=" justify-content-center d-flex">
            <p class="margin-right:10px me-md-3">Stock: ${producto.stock}</p>
            <p>$${producto.precio}</p>
          </div>   
          
          <div  class="row justify-content-center">
            <button class="btn btn-dark" id="agregar${producto.id}">comprar</button>
          </div>
      </div>
        `
    });

    productos.forEach ((producto) => {
      const cardProducto = document.getElementById(`producto${producto.id}`)
      cardProducto.children[3].children[0].addEventListener('click',() => {

      prouctosArray.push(producto);
      console.log(prouctosArray)
   })
 
    
        
      let prod = JSON.parse(localStorage.getItem('producto'))

      console.log(prod)

      let index = carrito.findIndex((prod => prod.id == producto.id))  
      if(index !=1) {
        if(carrito[producto.id].cantidad < producto.stock) {
          carrito[producto.id].cantidad++
        } 
      } else {
        const prodCarrito = {id: producto.id, cantidad: 1}
        carrito.push(prodCarrito)
      }

        localStorage.setItem('carrito', JSON.stringify(carrrito))
      })
   })


botonCarrito.addEventListener('click', async () => {



//  await prouctosArray.forEach(producto => {
//      p.innerHTML += `<li>${producto.nombre}</li>`
//    })
 
  const prodCarrito = JSON.parse(localStorage.getItem('carrito'))
  
  if(prodCarrito.length == 0) {
    console.log("Carrito vacio")
  } else {
    const productosBDD = await verProductos()
    console.log(productosBDD)
    prodCarrito.forEach((producto) => {
    carritoDom.innerHTML += `
  
    <h1> ${producto.nombre}</h1>

    `
      
    })
  }
})
