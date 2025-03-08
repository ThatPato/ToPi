let total = 0;
let numOrden = Math.floor(1000 + Math.random() * 9000); // Número de orden aleatorio inicial

function agregarPedido(nombre, precio) {
    let lista = document.getElementById("pedido-lista");
    let nuevoItem = document.createElement("li");

    nuevoItem.innerHTML = `
        <span>${nombre} - $${precio.toFixed(2)}</span>
        <button class="eliminar" onclick="eliminarPedido(this, ${precio})">❌</button>
    `;

    lista.appendChild(nuevoItem);

    total += precio;
    document.getElementById("total").innerText = total.toFixed(2);
}

function eliminarPedido(elemento, precio) {
    elemento.parentElement.remove();
    total -= precio;
    document.getElementById("total").innerText = total.toFixed(2);
}

function confirmarPedido() {
    if (total === 0) {
        alert("Tu pedido está vacío");
        return;
    }

    let mensaje = document.getElementById("mensaje-confirmacion");
    mensaje.innerText = `¡Pedido confirmado! Tu número de orden es: #${numOrden}`;
    mensaje.style.display = "block";

    // Restablecer número de orden para el próximo pedido
    numOrden = Math.floor(1000 + Math.random() * 9000);

    setTimeout(() => {
        mensaje.style.display = "none";
        document.getElementById("pedido-lista").innerHTML = "";
        document.getElementById("total").innerText = "0.00";
        total = 0;
    }, 3000);
}
