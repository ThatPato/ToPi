// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0TcCSmj6L-tKEp1LjxX6XTOmMpw",
    authDomain: "topi-2a6aa.firebaseapp.com",
    databaseURL: "https://topi-2a6aa-default-rtdb.firebaseio.com/", // Asegúrate de que Realtime Database está habilitada
    projectId: "topi-2a6aa",
    storageBucket: "topi-2a6aa.appspot.com",
    messagingSenderId: "507573337677",
    appId: "1:507573337677:web:83637974c940e1a1dee604",
    measurementId: "G-1007T26KF8"
};

// Inicializar Firebase (ahora sí funciona correctamente)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let pedido = [];
let total = 0;
let numeroOrden = 1;

function agregarPedido(item, precio) {
    pedido.push({ item, precio });
    total += precio;
    actualizarPedido();
}

function actualizarPedido() {
    const lista = document.getElementById("pedido-lista");
    const totalElemento = document.getElementById("total");
    lista.innerHTML = "";
    
    pedido.forEach((p, index) => {
        let li = document.createElement("li");
        li.textContent = `${p.item} - $${p.precio.toFixed(2)}`;
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.style.marginLeft = "10px";
        btnEliminar.onclick = () => eliminarPedido(index);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    });
    totalElemento.textContent = total.toFixed(2);
}

function eliminarPedido(index) {
    total -= pedido[index].precio;
    pedido.splice(index, 1);
    actualizarPedido();
}

function confirmarPedido() {
    if (pedido.length === 0) {
        alert("No hay productos en el pedido.");
        return;
    }
    
    const nuevoPedido = {
        numeroOrden: numeroOrden,
        pedido: pedido,
        total: total.toFixed(2),
        timestamp: new Date().toISOString()
    };

    // Guardar el pedido en Firebase
    database.ref("pedidos/" + numeroOrden).set(nuevoPedido)
        .then(() => {
            alert(`Pedido confirmado. Número de orden: ${numeroOrden}. Total: $${total.toFixed(2)}`);
            numeroOrden++;
            pedido = [];
            total = 0;
            actualizarPedido();
        })
        .catch((error) => {
            alert("Error al enviar el pedido: " + error.message);
        });
}
