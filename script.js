// 1. Product Data
const products = [
    { id: 1, name: "Wireless Headphones", price: 59.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smart Watch", price: 129.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gaming Mouse", price: 35.50, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Mechanical Keyboard", price: 89.99, image: "https://via.placeholder.com/150" }
];

let cart = [];

// 2. Render Products to DOM
const productList = document.getElementById("product-list");

function renderProducts() {
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

// 3. Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");

    // Update count
    cartCount.innerText = cart.length;

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.innerText = total.toFixed(2);

    // Render cart items
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <li>
                ${item.name} - $${item.price.toFixed(2)}
                <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:2px 5px; cursor:pointer;">X</button>
            </li>
        `).join("");
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// 4. Sidebar Toggle
function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("active");
}

function checkout() {
    if(cart.length > 0) {
        alert("Thank you for your purchase! Total: $" + document.getElementById("total-price").innerText);
        cart = [];
        updateCart();
        toggleCart();
    } else {
        alert("Your cart is empty!");
    }
}

// Initialize
renderProducts();