let prendasEnCarrito = (localStorage.getItem("prendas-en-carrito"));
prendasEnCarrito = JSON.parse(prendasEnCarrito);

const contCarritoVacio = document.querySelector("#carritoVacio");
const contCarritoProductos = document.querySelector("#carritoProductos");
const contCarritoFinal = document.querySelector("#carritoFinal");
const contCarritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".CarritoEliminar");
const botonVaciar = document.querySelector(".CarritoVaciar");
const total = document.querySelector("#total");
const botonComprar = document.querySelector(".CarritoComprar");

function cargarPrendasCarrito(){

    if(prendasEnCarrito && prendasEnCarrito.length > 0) {

        contCarritoVacio.classList.add("disabled");
        contCarritoProductos.classList.remove("disabled");
        contCarritoFinal.classList.remove("disabled");
        contCarritoComprado.classList.add("disabled");

        contCarritoProductos.innerHTML = "";//para vaciar de entrada las prendas
        //traigo parte del html al js.
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
            contCarritoProductos.append(div);
    })
    } else{
        contCarritoVacio.classList.remove("disabled");
        contCarritoProductos.classList.add("disabled");
        contCarritoFinal.classList.add("disabled");
        contCarritoComprado.classList.add("disabled");
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

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton);

    prendasEnCarrito.splice(index, 1);
    cargarPrendasCarrito();
    localStorage.setItem("prendas-en-carrito", JSON.stringify (prendasEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){
    
    Swal.fire({
        title: '¿Estas Segurx?',
        icon: 'question',
        html: `Se te van a borrar del carrito ${prendasEnCarrito.reduce((acc, prenda) => acc + prenda.cantidad, 0)} prendas.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si.',
        cancelButtonText: 'No.',
        }).then((result) => {
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

    Swal.fire(
        'Muchas Gracias por tu compra!',
        'Espero que Disfrutes tu prenda.',
        )
    
    prendasEnCarrito.length = 0;
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito));
    contCarritoVacio.classList.add("disabled");
    contCarritoProductos.classList.add("disabled");
    contCarritoFinal.classList.add("disabled");
    contCarritoComprado.classList.remove("disabled");
}