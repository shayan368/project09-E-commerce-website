const API_URL = "https://fakestoreapi.com/products";
const productList = document.getElementById("product-list");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

let allProducts = [];
let categories = [];

// Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// Add to Cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === product.id);

  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.title} added to cart!`);
}

// Display Products
function displayProducts(products) {
  if (products.length === 0) {
    productList.innerHTML = `<p class="text-center fw-semibold text-danger mt-4">No products found.</p>`;
    return;
  }

  productList.innerHTML = products
    .map(
      (p) => `
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card h-100 animate__animated animate__fadeInUp">
        <img src="${p.image}" class="card-img-top p-3" height="200" alt="${p.title}">
        <div class="card-body">
          <h6 class="card-title">${p.title.slice(0, 40)}...</h6>
          <p class="card-text fw-bold text-primary">$${p.price}</p>
          <button class="btn btn-primary w-100" onclick='addToCart(${JSON.stringify(
            p
          )})'>Add to Cart</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

//  Apply Filters
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;
  const maxPrice = parseFloat(priceRange.value);

  let filtered = allProducts.filter(
    (p) =>
      p.price <= maxPrice &&
      p.title.toLowerCase().includes(searchTerm) &&
      (selectedCategory === "all" || p.category === selectedCategory)
  );

  displayProducts(filtered);
}

//  Populate Categories
function populateCategories() {
  const uniqueCats = [...new Set(allProducts.map((p) => p.category))];
  categorySelect.innerHTML =
    `<option value="all">All Categories</option>` +
    uniqueCats.map((c) => `<option value="${c}">${c}</option>`).join("");
}

// Event Listeners
priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
  applyFilters();
});
searchInput.addEventListener("input", applyFilters);
categorySelect.addEventListener("change", applyFilters);

// Fetch Products
async function fetchProducts() {
  productList.innerHTML = `<div class="text-center my-5"><div class="spinner-border text-primary"></div></div>`;
  const res = await fetch(API_URL);
  const data = await res.json();
  allProducts = data;
  populateCategories();
  displayProducts(allProducts);
}

fetchProducts();
updateCartCount();
