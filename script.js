let total = 0;
let numOrden = 1;

function agregarPedido(nombre, precio) {
    let lista = document.getElementById("pedido-lista");
    let nuevoItem = document.createElement("li");

    nuevoItem.innerHTML = `
        <span>Orden #${numOrden}: ${nombre} - $${precio.toFixed(2)}</span>
        <button class="eliminar" onclick="eliminarPedido(this, ${precio})">❌</button>
    `;

    lista.appendChild(nuevoItem);

    total += precio;
    document.getElementById("total").innerText = total.toFixed(2);

    numOrden++;
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
    mensaje.innerText = `¡Pedido #${numOrden - 1} confirmado!`;
    mensaje.style.display = "block";

    setTimeout(() => {
        mensaje.style.display = "none";
        document.getElementById("pedido-lista").innerHTML = "";
        document.getElementById("total").innerText = "0.00";
        total = 0;
        numOrden = 1;
    }, 3000);
}
