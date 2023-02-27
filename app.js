    
let carrito = [];
let btn_compra = document.querySelectorAll(".botonCompra");
for(let boton of btn_compra){
    boton.addEventListener("click", agregar_producto);
}

function agregar_producto(e){
    let nombre_producto = e.target.parentNode.querySelector("h5").textContent;
    let precio_producto = e.target.parentNode.querySelector("span").textContent;
    let img_producto = e.target.parentNode.parentNode.querySelector("img").src;
    let producto = {
        nombre: nombre_producto,
        precio: precio_producto,
        img: img_producto,
        cantidad:1
    };
    agregar_carrito(producto);
}

function agregar_carrito(producto){
    let cantidad_producto = parseInt(producto.cantidad);
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].nombre == producto.nombre){
            carrito[i].cantidad++;
            set_data();
            let valor_cantidad = cantidad_producto[i];
            valor_cantidad++;
            total_carrito();
            mostrar_carrito();
            return 
        }  
    }
    carrito.push(producto);
    set_data();
    mostrar_carrito(producto);  
}

function set_data(){
    let carrito_json = JSON.stringify(carrito);
    localStorage.setItem("carrito", carrito_json);
}

function local_storage(producto){
    let recuperando_carrito = localStorage.getItem("carrito");
    recuperando_carrito = JSON.parse(recuperando_carrito);
    if(recuperando_carrito){
        carrito = recuperando_carrito;
        mostrar_carrito(producto);
    }
}

local_storage();

function mostrar_carrito(producto){
    if(carrito.length > 0){
        let carro = document.getElementById("carro");
        carro.style.display = "block";
    }
    let tabla = document.getElementById("tbody");
    tbody.innerHTML = ''
    carrito.map((producto, index) => {
        const precio = parseInt(producto.precio.replace("$", ''));
        let cantidad =parseInt(producto.cantidad);
        let subtotal = precio * cantidad;
        let fila = document.createElement("tr");
        fila.innerHTML = `
                        <td><img src="${producto.img}" width=80px></td>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${producto.precio}</td>
                        <td id="subtotal">$${subtotal}</td>
                        <td><button class="btn btn-danger borrar_elemento" id=${index}>Borrar</button></td>
                        `;
        tabla.append(fila);
        total_carrito();
        let btn_borrar = document.querySelectorAll(".borrar_elemento");
        for(let boton of btn_borrar){
            boton.addEventListener("click", borrar_producto);
        }
    });
}

function total_carrito(){
    let total = 0;
    const itemTotal = document.getElementById("itemTotal");
    let nuevo_subtotal = document.getElementById("subtotal").innerHTML;
    carrito.forEach((producto) => {
        const precio = parseInt(producto.precio.replace("$", ''));
        let cantidad =parseInt(producto.cantidad);
        subtotal = subtotal + precio * cantidad;
        total = total + precio * cantidad;
        itemTotal.innerHTML = `Total: $${total}`;
        nuevo_subtotal.innerHTML = `$${subtotal}`;
    })
}

function borrar_producto(e){
    const nuevo_carrito = carrito.filter((producto, index) => index != e.target.id)
    carrito = nuevo_carrito
    e.target.parentNode.parentNode.remove();
    set_data();
    mostrar_carrito();
    if(carrito.length == 0){
        let carro = document.getElementById("carro");
        carro.style.display = "none";
    }
}