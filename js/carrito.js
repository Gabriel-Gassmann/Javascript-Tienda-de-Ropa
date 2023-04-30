let prendasEnCarrito = (localStorage.getItem("prendas-en-carrito"));
prendasEnCarrito = JSON.parse(prendasEnCarrito);

//DOM
const containerCarritoVacio = document.querySelector("#carritoVacio");
const containerCarritoProductos = document.querySelector("#carritoProductos");
const containerCarritoFinal = document.querySelector("#carritoFinal");
const containerCarritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".CarritoEliminar");
const botonVaciar = document.querySelector(".CarritoVaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector(".CarritoComprar");

function cargarPrendasCarrito(){

    if(prendasEnCarrito && prendasEnCarrito.length > 0){//para que en el carrito cuando no haya prendas, aparezca en pantalla "el carrito esta vacio" 
    
        containerCarritoVacio.classList.add("disabled");
        containerCarritoProductos.classList.remove("disabled");
        containerCarritoFinal.classList.remove("disabled");
        containerCarritoComprado.classList.add("disabled");

        containerCarritoProductos.innerHTML = "";//vacio el contenedor por si queda guardado algo
        //creo un div en carrito.html desde js.
        prendasEnCarrito.forEach(prenda => {

            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="CarritoImagen" src="${prenda.imagen}" alt="${prenda.titulo}">
            <div class="carritoTitulo">
                    <small>Titulo</small>
                    <h3>${prenda.titulo}</h3>
                </div>
                <div class="CarritoCantidad">
                    <small>Cantidad</small>
                    <p>${prenda.cantidad}</p>
                </div>
                <div class="CarritoPrecio">
                    <small>Precio-</small>
                    <p>$${prenda.precio}</p>
                </div>
                <div class="CarritoSubtotal">
                    <small>Subtotal</small>
                <p>$${prenda.precio * prenda.cantidad}</p>
                </div>
                <button class="CarritoEliminar" id="${prenda.id}">BORRAR</button>
            `;
            containerCarritoProductos.append(div);//agrego un nodo
    })
    } else{
        containerCarritoVacio.classList.remove("disabled");
        containerCarritoProductos.classList.add("disabled");
        containerCarritoFinal.classList.add("disabled");
        containerCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarPrendasCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".CarritoEliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
}
//creo una funcion para borrar del carrito la prenda individualmente.
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton);

    prendasEnCarrito.splice(index, 1);//para que se borren del index, y solo 1 prenda
    cargarPrendasCarrito();
    localStorage.setItem("prendas-en-carrito", JSON.stringify (prendasEnCarrito));// para borrarlos del local storage
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    //Libreria de SweetAlert2 con un cartel de (si/no) para asegurar de si quieren o no vaciar por completo el carrito.
    Swal.fire({
        title: '¿Estas Segurx?',
        icon: 'question',
        html: `Se te van a borrar del carrito ${prendasEnCarrito.reduce((acc, prenda) => acc + prenda.cantidad, 0)} prendas.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si.',
        cancelButtonText: 'No.',
        }).then((result) => { //utilize parte de otro sweetalert asi si confirma que quieren vaciar el carrito, que se vacie.
            if (result.isConfirmed) {
                prendasEnCarrito.length = 0;//vaciamos el carrito
                localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito));
                cargarPrendasCarrito();
            }
        })


}
//calculamos el precio de las prendas
function actualizarTotal (){
    const totalCalculado = prendasEnCarrito.reduce((acc, prenda) => acc + (prenda.precio * prenda.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    //Libreria de SweetAlert2 para que salga un cartel al finalizar la compra.
    Swal.fire(
        'Muchas Gracias por tu compra!',
        'Espero que Disfrutes tu prenda.',
        )
    
    prendasEnCarrito.length = 0;
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito));
    //reutilizo parte del html para mostrar en pantalla un texto aparte.
    containerCarritoVacio.classList.add("disabled");
    containerCarritoProductos.classList.add("disabled");
    containerCarritoFinal.classList.add("disabled");
    containerCarritoComprado.classList.remove("disabled");
}