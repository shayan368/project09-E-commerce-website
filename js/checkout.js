const checkoutItems = document.getElementById("checkout-items");
const totalEl = document.getElementById("total");
const form = document.getElementById("checkout-form");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCheckout() {
  if (!cart.length) {
    checkoutItems.innerHTML = `<div class="alert alert-info fade-in">No items to checkout.</div>`;
    totalEl.textContent = "0";
    return;
  }

  checkoutItems.innerHTML = cart.map(
    (item, i) => `
    <div class="d-flex justify-content-between border-bottom py-2 fade-in" style="animation-delay:${i * 0.1}s;">
      <span>${item.title} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>`
  ).join("");

  totalEl.textContent = cart.reduce((a, i) => a + i.price * i.quantity, 0).toFixed(2);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  alert("✅ Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

displayCheckout();
