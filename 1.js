const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2299,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Running Shoes",
        category: "Fashion",
        price: 1899,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Modern Backpack",
        category: "Accessories",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Sunglasses",
        category: "Accessories",
        price: 499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Desk Lamp",
        category: "Home",
        price: 799,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Coffee Mug",
        category: "Home",
        price: 299,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];
let activeCategory = "All";

const productGrid = document.getElementById("productGrid");

function displayProducts(items) {
    productGrid.innerHTML = "";

    if (items.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    items.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}"
                     onerror="this.src='https://placehold.co/400x300?text=Product'">
                <div class="product-info">
                    <p class="category-name">${product.category}</p>
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function filterProducts(category) {
    activeCategory = category;

    const filtered = category === "All"
        ? products
        : products.filter(product => product.category === category);

    displayProducts(filtered);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
}

function searchProducts() {
    const query = document.getElementById("searchInput")
        .value.trim().toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    displayProducts(filtered);
}

document.getElementById("searchInput").addEventListener("keydown", event => {
    if (event.key === "Enter") {
        searchProducts();
    }
});

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById("cartCount").textContent = count;

    const cartItems = document.getElementById("cartItems");

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty">Your cart is empty.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join("");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cartTotal").textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function showCart() {
    updateCart();
    document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Demo checkout successful! Connect a payment gateway for real payments.");
}

function subscribe(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    document.getElementById("subscribeMessage").textContent =
        `Thank you for subscribing, ${email}!`;

    event.target.reset();
}

displayProducts(products);
updateCart();