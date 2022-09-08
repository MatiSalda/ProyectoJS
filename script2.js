const contenedorProductos = document.getElementById("contenedorProductos")
const contenedorCarrito = document.getElementById("carritoDom")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const precioTotal = document.getElementById("total")
const botonFinalizarCompra = document.getElementById('finalizarCompra')
const botonLogin = document.getElementById('botonLogin');
const nombreUsuario = document.getElementById('nombreUsuario')
const formUsuario = document.getElementById('formUsuario')

let arrayCarrito = []


//Funcion para llamar a todos los productos
async function verProductos(){
    const response = await fetch('./json/listaProductos.json')
    const productos = await response.json()
    return productos
}

//Funcion para pintar los productos
const mostrarProductos = async () => {
    const productos =  await verProductos()
    productos.forEach(producto => { 
        contenedorProductos.innerHTML +=    
        `<div class="caja divProducto" id="producto${producto.id}">
          <h4 class=" nombreProducto">${producto.nombre}</h4>
          <div  class="divImgProducto">
            <img src=${producto.img} alt="buzo herito">
          </div>
          <div  class="divPrecio">
            <p>$${producto.precio} </p>
          </div>  
          <div  class="divBotonComprar">
            <button class="btnAgregar" id="${producto.id}">Comprar</button>
          </div>
      </div>`;
        
        let botonesAgregarProducto = document.querySelectorAll('.btnAgregar');
        botonesAgregarProducto.forEach( boton => {
            boton.addEventListener('click', agregarProductoCarrito)
        });
    });
}

//Funcion para pushear al Array del Carrito
const agregarProductoCarrito =  (evento) => {
    let id = evento.target.getAttribute('id')

    if(arrayCarrito.length != 0 && arrayCarrito.includes(id)){
        //slerta 1 solo producto
        Swal.fire({
            title: 'Lo sentimos :c',
            text: 'Solo puedes seleccionar un producto por el momento',
            icon: 'error',
            iconColor: "#000",
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#000",
            
          })
         mostrarCarrito()
        return null
    }
    arrayCarrito.push(id)    
     mostrarCarrito()
}

//Funcion para mostrar los productos en el carrito
const mostrarCarrito = async () => {
    const productos = await verProductos()
    
    contenedorCarrito.innerHTML = ''
    arrayCarrito.forEach(productoCarrito => {
        const productoFiltrado = productos.filter((producto) => {
            return producto.id == productoCarrito 
        }) 
        contenedorCarrito.innerHTML += 
                `<div class="cajaCarrito productoCarrito">
                <div class="botonBorrar" id=${productoFiltrado[0].id}>X</div>
                    <div class="prodCarritoNombre">${productoFiltrado[0].nombre}</div>
                    <div class="prodCarritoImage">
                    <img src=${productoFiltrado[0].img} alt="buzo herito">
                    </div>
                  
                    <div class="prodCarritoPrecio">$${productoFiltrado[0].precio}</div>
                </div>`
            
        let botonesBorrarCarrito = document.querySelectorAll('.botonBorrar')
        botonesBorrarCarrito.forEach(boton => {
            boton.addEventListener('click', borrarDelCarrito)
        }) 
    });

    precioTotal.innerHTML = await calcularTotal()
}

//Funcion para 
const borrarDelCarrito = (evento) => {
    const id = evento.target.id
    arrayCarrito = arrayCarrito.filter((productoCarrito) => {
        return productoCarrito != id
    })
    mostrarCarrito()
} 

//Calcula el total del precio de los productos que estan en el carrito
const calcularTotal = async () => {
    const productos =  await verProductos()
    return arrayCarrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem =  productos.filter((itemBaseDatos) => {
            return itemBaseDatos.id == item;
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0)
}

//Bprrar los productos del carrito (Vacia el array y lo muestra en el dom)

const borrarTodoElCarrito = () => {
    arrayCarrito = []

    mostrarCarrito()
}
vaciarCarrito.addEventListener('click', borrarTodoElCarrito)

//Muestra alerta si el usuario finaliza compra y limpia el carrito

const finalizarCompra = () => {
    Swal.fire({
        title: 'Gracias por tu compra :D',
        text: 'Tu compra fue realizada con exito.',
        icon: 'success',
        iconColor: "#000",
        confirmButtonText: 'Aceptar',
        confirmButtonColor: "#000",
        
      })
   borrarTodoElCarrito()
}
botonFinalizarCompra.addEventListener('click', finalizarCompra) 


/// --------------------
//Login usuario (Abrir y Cerrar)

 
let login = document.getElementById('login');
let loginContainer = document.getElementById('loginContainer');
let cerrarLogin = document.getElementById('cerrarLogin');

botonLogin.addEventListener('click', (e) => {
    login.classList.add('open');
    loginContainer.classList.add('open');
    loginContainer.style.transform = 'translateY(0%)'
    
})

cerrarLogin.addEventListener('click', () => {
    loginContainer.style.transform = 'translateY(-100%)'
    setTimeout(() => {
        login.classList.remove('open');
        loginContainer.classList.remove('open');
    }, 600);
})
//Guarda usuario en el LocalStorage y lo llama para pintarlo en el Dom
const guardarUsuario = () => {
  localStorage.setItem('usuario', nombreUsuario.value)
  llamarUsuario()
}

const llamarUsuario = () => {
    const usuario = localStorage.getItem('usuario')
    
    if(usuario) {
        botonLogin.innerHTML = usuario;
    }else{
        botonLogin.innerHTML = 'login'
    }
}

// Form para el Login del nombre del usuario
formUsuario.addEventListener('submit', () =>{
    guardarUsuario()
    loginContainer.style.transform = 'translateY(-100%)'
    setTimeout(() => {
        login.classList.remove('open');
        loginContainer.classList.remove('open');
    }, 600);
    nombreUsuario.value = ''
})




mostrarCarrito()
mostrarProductos()
llamarUsuario()

