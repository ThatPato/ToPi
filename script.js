// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC0TcCSmj6dQCs6L-tKEp1LjxX6XTOmMpw",
    authDomain: "topi-2a6aa.firebaseapp.com",
    databaseURL: "https://topi-2a6aa-default-rtdb.firebaseio.com",
    projectId: "topi-2a6aa",
    storageBucket: "topi-2a6aa.appspot.com",
    messagingSenderId: "507573337677",
    appId: "1:507573337677:web:83637974c940e1a1dee604",
    measurementId: "G-1007T26KF8"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

let carrito = [];
let nombreCompleto = "";

function iniciarPedido() {
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    if (nombre && apellido) {
        nombreCompleto = nombre + " " + apellido;
        document.getElementById("clienteNombre").textContent = nombreCompleto;
        document.getElementById("login").classList.add("oculto");
        document.getElementById("pedido").classList.remove("oculto");
    } else {
        alert("Por favor, ingrese su nombre y apellido.");
    }
}

function toggleSection(id) {
    const section = document.getElementById(id);
    section.classList.toggle("oculto");
}

function addToCart(producto, precio) {
    carrito.push({ producto, precio });
    actualizarCarrito();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement("li");
        li.textContent = `${item.producto} - $${item.precio}`;
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.onclick = () => eliminarProducto(index);
        li.appendChild(btn);
        lista.appendChild(li);
    });
    document.getElementById("total").textContent = total;
}

function confirmarPedido() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const resumen = document.getElementById("resumen");
    let textoResumen = `Cliente: ${nombreCompleto}\n\nProductos:\n`;
    let total = 0;
    carrito.forEach(item => {
        textoResumen += `- ${item.producto}: $${item.precio}\n`;
        total += item.precio;
    });
    textoResumen += `\nTotal: $${total}`;
    resumen.textContent = textoResumen;

    // Guardar en Firebase
    db.ref("pedidos").push({
        cliente: nombreCompleto,
        productos: carrito,
        total: total,
        estado: "pendiente"
    });

    document.getElementById("pedido").classList.add("oculto");
    document.getElementById("confirmacion").classList.remove("oculto");
}

// ✅ FUNCION CORRECTAMENTE DEFINIDA FUERA
function volverAlMenu() {
    carrito = [];
    nombreCompleto = "";

    // Limpiar inputs
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";

    // Limpiar etiquetas
    document.getElementById("clienteNombre").textContent = "";
    document.getElementById("resumen").textContent = "";
    document.getElementById("listaCarrito").innerHTML = "";
    document.getElementById("total").textContent = "0";

    // Mostrar login, ocultar confirmación y menú
    document.getElementById("confirmacion").classList.add("oculto");
    document.getElementById("pedido").classList.add("oculto");
    document.getElementById("login").classList.remove("oculto");

    // Asegurar que las secciones del menú estén cerradas
    ['bebidas', 'burritos', 'comida'].forEach(id => {
        document.getElementById(id).classList.add("oculto");
    });
}
