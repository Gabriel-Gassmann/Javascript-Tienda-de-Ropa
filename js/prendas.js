
let prendas = [];

fetch("./js/prendas.json")
    .then(Response => Response.json())
    .then(data => {
        prendas = data;
        cargarPrendas(prendas);
    })

const containerPrendas = document.querySelector("#containerProductos");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloIndumentaria = document.querySelector("#tituloIndumentaria");
let botonesAgregar = document.querySelectorAll(".prendaAgregar");
const numCarrito = document.querySelector("#numCarrito");

function cargarPrendas(prendasElegidas) {

    containerPrendas.innerHTML = "";

    prendasElegidas.forEach(prenda => { //el forEach Recorre el array de los elementos//

        const div = document.createElement("div");
        div.classList.add("prenda");
        div.innerHTML = `
            <img class="prendaImagen" src="${prenda.imagen}" alt="${prenda.titulo}">
            <div class="prendaInfo">
                <h3 class="prendaTitulo">${prenda.titulo}</h3>
                <p class="prendaPrecio">${prenda.precio}</p>
                <button class="prendaAgregar" id = "${prenda.id}">Agregar</button>
            </div> 
        `;

        containerPrendas.append(div);
    });
    actualizarBotonesAgregar();

}

// cargarPrendas(prendas);

botonesCategorias.forEach(boton => { //esta funcion es para filtrar el tipo de ropa cuando clickeas en alguna.
    boton.addEventListener("click",(e) => {
        if (e.currentTarget.id != "todos") {
            const productosBoton = prendas.filter(prenda => prenda.categoria.id === e.currentTarget.id);
            cargarPrendas(productosBoton);
        } else {
            cargarPrendas(prendas);
        }
    })
});

function actualizarBotonesAgregar() {//actualiza las prendas segun su categoria
    botonesAgregar = document.querySelectorAll(".prendaAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        });
}


let prendasEnCarrito;

let prendasEnCarritoLS = localStorage.getItem("prendas-en-carrito");
    if(prendasEnCarritoLS){
        prendasEnCarrito = JSON.parse(prendasEnCarritoLS);
        actualizarNumCarrito();//mantengo el numero del carrito actualizado
    } else{
        prendasEnCarrito = [];
    }


function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const prendaAgregada = prendas.find(prenda => prenda.id === idBoton);
    
    if(prendasEnCarrito.some(prenda => prenda.id === idBoton)){
        const index = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton);
        prendasEnCarrito[index].cantidad++;
        
    } else{
        prendaAgregada.cantidad = 1;
        prendasEnCarrito.push(prendaAgregada);
    }

    actualizarNumCarrito();
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito));
}

function actualizarNumCarrito(){//para actualizar el numero del carrito
    let nuevoNumCarrito = prendasEnCarrito.reduce((acc , prenda) => acc + prenda.cantidad, 0);//hacemos un acumulador para el carrito
    numCarrito.innerText = nuevoNumCarrito;
}