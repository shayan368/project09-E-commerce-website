const cartContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  if (!cart.length) {
    cartContainer.innerHTML = `<div class="alert alert-info text-center fade-in">Your cart is empty!</div>`;
    totalEl.textContent = "0";
    return;
  }

  cartContainer.innerHTML = cart.map((item, i) => `
    <div class="card mb-3 shadow-sm fade-in" style="animation-delay:${i * 0.1}s;">
      <div class="row g-0 align-items-center">
        <div class="col-3 col-sm-2">
          <img src="${item.image}" class="img-fluid p-2" alt="${item.title}">
        </div>
        <div class="col-6">
          <div class="card-body">
            <h6 class="fw-semibold">${item.title}</h6>
            <p class="text-success">$${item.price}</p>
          </div>
        </div>
        <div class="col-3 text-end pe-3">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-secondary" onclick="changeQty(${item.id}, -1)">-</button>
            <span class="btn btn-light disabled">${item.quantity}</span>
            <button class="btn btn-outline-secondary" onclick="changeQty(${item.id}, 1)">+</button>
          </div>
          <button class="btn btn-danger btn-sm mt-2" onclick="removeItem(${item.id})">🗑</button>
        </div>
      </div>
    </div>
  `).join("");

  totalEl.textContent = cart.reduce((a, i) => a + i.price * i.quantity, 0).toFixed(2);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
  updateCart();
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

displayCart();
