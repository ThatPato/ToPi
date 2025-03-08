// Importar Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0TcCSmj6dQCs6L-tKEp1LjxX6XTOmMpw",
  authDomain: "topi-2a6aa.firebaseapp.com",
  databaseURL: "https://topi-2a6aa-default-rtdb.firebaseio.com",
  projectId: "topi-2a6aa",
  storageBucket: "topi-2a6aa.firebasestorage.app",
  messagingSenderId: "507573337677",
  appId: "1:507573337677:web:83637974c940e1a1dee604",
  measurementId: "G-1007T26KF8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

let total = 0;
let numOrden = Math.floor(1000 + Math.random() * 9000); // Generar número de orden aleatorio
let pedidoActual = []; // Almacena los productos seleccionados

function agregarPedido(nombre, precio) {
    let lista = document.getElementById("pedido-lista");
    let nuevoItem = document.createElement("li");

    nuevoItem.innerHTML = `
        <span>${nombre} - $${precio.toFixed(2)}</span>
        <button class="eliminar" onclick="eliminarPedido(this, '${nombre}', ${precio})">❌</button>
    `;

    lista.appendChild(nuevoItem);

    total += precio;
    pedidoActual.push({ nombre, precio }); // Agregar producto al pedido

    document.getElementById("total").innerText = total.toFixed(2);
}

function eliminarPedido(elemento, nombre, precio) {
    elemento.parentElement.remove();
    total -= precio;
    
    // Eliminar del array de pedidoActual
    pedidoActual = pedidoActual.filter(item => item.nombre !== nombre || item.precio !== precio);
    
    document.getElementById("total").innerText = total.toFixed(2);
}

function confirmarPedido() {
    if (pedidoActual.length === 0) {
        alert("Tu pedido está vacío");
        return;
    }

    // Guardar pedido en Firebase
    const pedidoRef = ref(database, 'pedidos');
    const nuevoPedido = {
        numeroOrden: numOrden,
        productos: pedidoActual,
        total: total.toFixed(2),
        timestamp: Date.now()
    };

    push(pedidoRef, nuevoPedido)
        .then(() => {
            let mensaje = document.getElementById("mensaje-confirmacion");
            mensaje.innerText = `¡Pedido confirmado! Tu número de orden es: #${numOrden}`;
            mensaje.style.display = "block";

            setTimeout(() => {
                mensaje.style.display = "none";
                document.getElementById("pedido-lista").innerHTML = "";
                document.getElementById("total").innerText = "0.00";
                total = 0;
                numOrden = Math.floor(1000 + Math.random() * 9000); // Generar nueva orden
                pedidoActual = []; // Reiniciar pedido
            }, 3000);
        })
        .catch(error => {
            console.error("Error al enviar pedido:", error);
            alert("Hubo un problema al confirmar el pedido. Intenta de nuevo.");
        });
}
