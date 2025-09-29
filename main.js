// ============================
// VARIABLES GLOBALES
// ============================

const form = document.getElementById("vehiculo-form");
const fotoInput = document.getElementById("foto");
const nombreInput = document.getElementById("nombre");
const marcaInput = document.getElementById("marca");
const modeloInput = document.getElementById("modelo");
const kilometrajeInput = document.getElementById("kilometraje");
const precioInput = document.getElementById("precio");
const vehiculosList = document.getElementById("vehiculos-list");

const panelCart = document.getElementById("panel-lateral")

const btnCartShow = document.getElementById("show-panel");

const listadoCarrito = document.getElementById("listado-carrito");


// Imagen por defecto
const defaultImg = "https://www.shutterstock.com/image-photo/silver-car-standing-parking-lot-600nw-2462850863.jpg";


function createVehiculoCard(foto, nombre, marca, modelo, kilometraje, precio) {
    // Nodo padre o contenedor padre
    const col = document.createElement("div");
    col.classList.add("col-md-6", "item-vehiculo");

    // Card o tarjeta
    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    // Imagenn
    const img = document.createElement("img");
    img.src = foto || defaultImg;
    img.classList.add("card-img-top", "w-100");
    img.alt = "Foto vehículo";

    // Cuerpo de la tarjeta
    const body = document.createElement("div");
    body.classList.add("card-body");

    const h3 = document.createElement("h3");
    h3.classList.add("card-title");
    h3.textContent = nombre;

    const h4Marca = document.createElement("h4");
    h4Marca.classList.add("card-subtitle", "text-muted");
    h4Marca.textContent = marca;

    const h4Modelo = document.createElement("h4");
    h4Modelo.classList.add("card-text");
    h4Modelo.textContent = "Modelo :" + modelo;

    const h4Km = document.createElement("h4");
    h4Km.classList.add("card-text");
    h4Km.textContent = "Kilometraje " + kilometraje + " km ";

    const h2Precio = document.createElement("h2");
    h2Precio.classList.add("text-success");
    h2Precio.textContent = "$ " + precio;

    // Botones
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("d-flex", "justify-content-between", "mt-3");

    const btnComprar = document.createElement("button");
    btnComprar.classList.add("btn", "btn-success");
    btnComprar.textContent = "Comprar";

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.textContent = "Eliminar";

    btnGroup.appendChild(btnComprar);
    btnGroup.appendChild(btnEliminar);

    // Ensamblamos el body
    body.appendChild(h3);
    body.appendChild(h4Marca);
    body.appendChild(h4Modelo);
    body.appendChild(h4Km);
    body.appendChild(h2Precio);
    body.appendChild(btnGroup);

    // Ensamblamos la card
    card.appendChild(img);
    card.appendChild(body);

    col.appendChild(card);

    // Eventos de la tarjeta
    eventsToVehiculo(col, btnComprar, btnEliminar, nombre, foto, marca, precio);

    return col;
}


function eventsToVehiculo(card, btnComprar, btnEliminar, nombre,foto, marca,precio) {
    btnComprar.addEventListener("click", () => {
        const cartCard = createCartCard(foto, nombre, marca, precio);
        listadoCarrito.appendChild(cartCard);
    });

    btnEliminar.addEventListener("click", () => {
        card.remove();
    });
}



form.addEventListener("submit", (e) => {
    e.preventDefault();

    const foto = fotoInput.value.trim();
    const nombre = nombreInput.value.trim();
    const marca = marcaInput.value.trim();
    const modelo = modeloInput.value.trim();
    const kilometraje = kilometrajeInput.value.trim();
    const precio = precioInput.value.trim();

    // Validación
    if (!nombre || !marca || !modelo || !kilometraje || !precio) {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Crear tarjeta
    const newCard = createVehiculoCard(
        foto,
        nombre,
        marca,
        modelo,
        kilometraje,
        precio
    );

    vehiculosList.appendChild(newCard);

    // Resetear form
    form.reset();
});


btnCartShow.addEventListener("click", () => {

    panelCart.classList.toggle("active")

})


// ============================
// CREAR TARJETA DEL CARRITO
// ============================
function createCartCard(foto, nombre, marca, precio) {
    const cartCard = document.createElement("div");
    cartCard.classList.add("card-vehiculo-cart", "mb-2");

    const row = document.createElement("div");
    row.classList.add("row");

    const colImg = document.createElement("div");
    colImg.classList.add("col-4");

    const img = document.createElement("img");
    img.src = foto || defaultImg;
    img.classList.add("card-img-top", "w-100");
    img.alt = "Foto vehículo";

    colImg.appendChild(img);

    const colInfo = document.createElement("div");
    colInfo.classList.add("col-8");

    const h2 = document.createElement("h2");
    h2.textContent = nombre;

    const h3 = document.createElement("h3");
    h3.textContent = marca;

    const h4 = document.createElement("h4");
    h4.textContent = `$${Number(precio).toLocaleString()}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "mt-2");
    btnEliminar.textContent = "Eliminar";

    btnEliminar.addEventListener("click", () => {
        cartCard.remove();
    });

    colInfo.appendChild(h2);
    colInfo.appendChild(h3);
    colInfo.appendChild(h4);
    colInfo.appendChild(btnEliminar);

    row.appendChild(colImg);
    row.appendChild(colInfo);

    cartCard.appendChild(row);

    return cartCard;
}