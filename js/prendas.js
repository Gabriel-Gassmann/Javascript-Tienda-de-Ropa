
let prendas = [];
//le agrego fetch al proyecto
fetch("./js/prendas.json")
    .then(Response => Response.json())
    .then(data => {
        prendas = data;
        cargarPrendas(prendas);
    })

//conecto el html con el js ( DOM )
const containerPrendas = document.querySelector("#contPrendas");
const botonesCategorias = document.querySelectorAll(".btn-categoria");
const tituloIndumentaria = document.querySelector("#tituloIndumentaria");
let botonesAgregar = document.querySelectorAll(".prendaAgregar");
const numCarrito = document.querySelector("#numCarrito");

//creo un div en index.html desde js
function cargarPrendas(prendasElegidas) {

    containerPrendas.innerHTML = "";//vacio el contenedor

    prendasElegidas.forEach(prenda => {

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

        containerPrendas.append(div);//agrego un nodo
    });
    actualizarBotonesAgregar();

}

//creo una funcion para filtrar el tipo de ropa por categoria.
botonesCategorias.forEach(boton => {
    boton.addEventListener("click",(e) => {
        if (e.currentTarget.id != "todos") {//si es diferente a "todos" cargame la categoria elegida
            const productosBoton = prendas.filter(prenda => prenda.categoria.id === e.currentTarget.id);//filtro las prendas
            cargarPrendas(productosBoton);
        } else {//sino no
            cargarPrendas(prendas);
        }
    })
});

//Cargo los Botones de cada prenda y las actualizo si cambio de categoria.
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".prendaAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
        });
}


let prendasEnCarrito;
//Local Storage
let prendasEnCarritoLS = localStorage.getItem("prendas-en-carrito");
    if(prendasEnCarritoLS){
        prendasEnCarrito = JSON.parse(prendasEnCarritoLS);
        actualizarNumCarrito();//mantengo el numero del carrito actualizado
    } else{
        prendasEnCarrito = [];
    }

//creo una funcion para agregar los elementos a un array
function agregarAlCarrito(e){
    const idBoton = e.currentTarget.id;
    const prendaAgregada = prendas.find(prenda => prenda.id === idBoton);//utilizo el .find con el idBoton para "encontrar" el array
    
    if(prendasEnCarrito.some(prenda => prenda.id === idBoton)){//si nos devuelve true, aumento la cantidad.
        const index = prendasEnCarrito.findIndex(prenda => prenda.id === idBoton);
        prendasEnCarrito[index].cantidad++;//aplico index.cantidad++, para que suba 1 en cantidad con cada click
        
    } else{
        prendaAgregada.cantidad = 1;
        prendasEnCarrito.push(prendaAgregada);
    }

    actualizarNumCarrito();
    localStorage.setItem("prendas-en-carrito", JSON.stringify(prendasEnCarrito));
}

function actualizarNumCarrito(){//para actualizar el numero del carrito en el navBar
    let nuevoNumCarrito = prendasEnCarrito.reduce((acc , prenda) => acc + prenda.cantidad, 0);//hacemos un acumulador para el carrito
    numCarrito.innerText = nuevoNumCarrito;
}