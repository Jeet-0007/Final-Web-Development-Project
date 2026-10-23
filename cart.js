/* ============================================================
   ShopEase — Cart Page JavaScript
   Features: Cart rendering, quantity update, remove items,
             real-time total calculation, clear cart
   ============================================================ */

"use strict";

// ===== CART DOM ELEMENTS =====
const cartDOM = {
    itemsContainer: document.getElementById("cart-items-container"),
    emptyState: document.getElementById("cart-empty"),
    summary: document.getElementById("cart-summary"),
    summaryText: document.getElementById("cart-summary-text"),
    subtotal: document.getElementById("cart-subtotal"),
    shipping: document.getElementById("cart-shipping"),
    tax: document.getElementById("cart-tax"),
    total: document.getElementById("cart-total"),
    clearCartBtn: document.getElementById("clear-cart-btn"),
    checkoutBtn: document.getElementById("checkout-btn")
};

// ===== CART RENDERING =====

/**
 * Render all cart items and update the summary
 */
function renderCart() {
    if (!cartDOM.itemsContainer) return;

    const cart = state.cart;

    if (cart.length === 0) {
        // Show empty state
        if (cartDOM.emptyState) cartDOM.emptyState.style.display = "block";
        if (cartDOM.summary) cartDOM.summary.style.display = "none";
        if (cartDOM.summaryText) cartDOM.summaryText.textContent = "Your cart is empty";

        // Remove any existing cart item elements
        cartDOM.itemsContainer.querySelectorAll(".cart-item").forEach(el => el.remove());
        return;
    }

    // Hide empty state, show summary
    if (cartDOM.emptyState) cartDOM.emptyState.style.display = "none";
    if (cartDOM.summary) cartDOM.summary.style.display = "block";

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartDOM.summaryText) {
        cartDOM.summaryText.textContent = `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`;
    }

    // Render cart items
    const itemsHTML = cart.map(item => `
        <div class="cart-item" data-cart-id="${item.id}">
            <img class="cart-item-image" src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="cart-item-details">
                <span class="cart-item-category">${item.category}</span>
                <h3 class="cart-item-name">${item.name}</h3>
                <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                <div class="cart-item-actions">
                    <div class="qty-control">
                        <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    // Remove old cart items and insert new ones (keep empty state element)
    cartDOM.itemsContainer.querySelectorAll(".cart-item").forEach(el => el.remove());
    cartDOM.emptyState.insertAdjacentHTML("afterend", itemsHTML);

    // Update summary totals
    updateCartSummary();

    // Attach events to new elements
    attachCartEventListeners();
}

/**
 * Calculate and update the order summary totals
 */
function updateCartSummary() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;

    if (cartDOM.subtotal) cartDOM.subtotal.textContent = formatPrice(subtotal);
    if (cartDOM.shipping) cartDOM.shipping.textContent = shipping === 0 ? "FREE" : formatPrice(shipping);
    if (cartDOM.tax) cartDOM.tax.textContent = formatPrice(tax);
    if (cartDOM.total) cartDOM.total.textContent = formatPrice(total);
}

/**
 * Update the quantity of a cart item
 * @param {number} productId - Product ID
 * @param {number} change - Amount to change (+1 or -1)
 */
function updateQuantity(productId, change) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    renderCart();
}

/**
 * Remove a product from the cart
 * @param {number} productId - Product ID to remove
 */
function removeFromCart(productId) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart();
    renderCart();
    showToast(`"${item.name}" removed from cart`, "info");
}

/**
 * Clear all items from the cart
 */
function clearCart() {
    if (state.cart.length === 0) {
        showToast("Cart is already empty!", "warning");
        return;
    }

    // Confirm before clearing
    state.cart = [];
    saveCart();
    renderCart();
    showToast("Cart has been cleared", "info");
}

// ===== CART EVENT LISTENERS =====

/**
 * Attach event listeners to dynamically rendered cart elements
 */
function attachCartEventListeners() {
    // Increase quantity buttons
    document.querySelectorAll(".qty-increase").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            updateQuantity(id, 1);
        });
    });

    // Decrease quantity buttons
    document.querySelectorAll(".qty-decrease").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            updateQuantity(id, -1);
        });
    });

    // Remove item buttons
    document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            removeFromCart(id);
        });
    });
}

// ===== INITIALIZATION =====

document.addEventListener("DOMContentLoaded", () => {
    // Render cart on page load
    renderCart();

    // Clear cart button
    if (cartDOM.clearCartBtn) {
        cartDOM.clearCartBtn.addEventListener("click", clearCart);
    }
});
