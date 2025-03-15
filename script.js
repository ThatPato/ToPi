let cart = [];
let orderNumber = 1;

function toggleSection(id) {
    let section = document.getElementById(id);
    if (section.style.maxHeight) {
        section.style.maxHeight = null;
    } else {
        section.style.maxHeight = section.scrollHeight + "px";
    }
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

function updateCart() {
    let cartList = document.getElementById("cart-list");
    let totalElement = document.getElementById("total");
    let orderNumberElement = document.getElementById("order-number");
    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
        total += item.price;
    });

    totalElement.textContent = total;
    orderNumberElement.textContent = orderNumber;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function confirmOrder() {
    if (cart.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let order = {
        orderNumber: orderNumber,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.price, 0),
        timestamp: Date.now()
    };

    firebase.database().ref("orders").push(order)
        .then(() => {
            alert("Pedido confirmado: " + orderNumber);
            orderNumber++;
            cart = [];
            updateCart();
        })
        .catch(error => console.error("Error al enviar pedido: ", error));
}
