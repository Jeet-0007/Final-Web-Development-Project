/* ============================================================
   ShopEase — Main Application JavaScript
   Features: Product data, rendering, search, filter, sort,
             cart management, dark mode, animations
   Technologies: ES6+, DOM Manipulation, Events, Arrays, Objects
   ============================================================ */

"use strict";

// ===== PRODUCT DATA (Array of Objects) =====
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 2999,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 234,
        badge: "sale",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Smart Watch Pro Max",
        category: "electronics",
        price: 12999,
        originalPrice: 19999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 456,
        badge: "hot",
        description: "Advanced smartwatch with health monitoring, GPS, and AMOLED display."
    },
    {
        id: 3,
        name: "Classic Denim Jacket",
        category: "clothing",
        price: 1899,
        originalPrice: 3499,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 189,
        badge: "sale",
        description: "Timeless denim jacket crafted from premium cotton with a comfortable fit."
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        category: "accessories",
        price: 2499,
        originalPrice: 4499,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 312,
        badge: "new",
        description: "Genuine leather crossbody bag with adjustable strap and multiple compartments."
    },
    {
        id: 5,
        name: "Running Sneakers Ultra",
        category: "footwear",
        price: 3999,
        originalPrice: 6999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 567,
        badge: "hot",
        description: "Ultra-lightweight running sneakers with responsive cushioning technology."
    },
    {
        id: 6,
        name: "Wireless Bluetooth Speaker",
        category: "electronics",
        price: 1499,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 198,
        badge: "sale",
        description: "Portable Bluetooth speaker with 360° sound and waterproof design."
    },
    {
        id: 7,
        name: "Casual Cotton T-Shirt",
        category: "clothing",
        price: 799,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        rating: 4.1,
        reviews: 423,
        badge: null,
        description: "Soft cotton t-shirt with a relaxed fit, available in multiple colors."
    },
    {
        id: 8,
        name: "Aviator Sunglasses",
        category: "accessories",
        price: 1299,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 276,
        badge: "sale",
        description: "Classic aviator sunglasses with UV400 protection and polarized lenses."
    },
    {
        id: 9,
        name: "Canvas Slip-On Shoes",
        category: "footwear",
        price: 1599,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop",
        rating: 4.0,
        reviews: 145,
        badge: null,
        description: "Comfortable canvas slip-on shoes perfect for everyday casual wear."
    },
    {
        id: 10,
        name: "Mechanical Gaming Keyboard",
        category: "electronics",
        price: 4599,
        originalPrice: 7999,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 678,
        badge: "hot",
        description: "RGB mechanical keyboard with cherry switches and customizable macros."
    },
    {
        id: 11,
        name: "Slim Fit Chino Pants",
        category: "clothing",
        price: 1499,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 201,
        badge: "new",
        description: "Modern slim-fit chino pants crafted from stretch cotton blend."
    },
    {
        id: 12,
        name: "Minimalist Wrist Watch",
        category: "accessories",
        price: 3299,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 389,
        badge: "sale",
        description: "Elegant minimalist watch with Japanese quartz movement and leather strap."
    }
];

// ===== APPLICATION STATE =====
const state = {
    cart: JSON.parse(localStorage.getItem("shopease_cart")) || [],
    theme: localStorage.getItem("shopease_theme") || "light",
    currentCategory: "all",
    currentSort: "default",
    searchQuery: "",
    wishlist: JSON.parse(localStorage.getItem("shopease_wishlist")) || []
};

// ===== DOM ELEMENTS =====
const DOM = {
    // Navbar
    navbar: document.getElementById("navbar"),
    searchInput: document.getElementById("search-input"),
    searchBtn: document.getElementById("search-btn"),
    themeToggle: document.getElementById("theme-toggle"),
    cartCount: document.getElementById("cart-count"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    navSearch: document.getElementById("nav-search"),

    // Products
    productsGrid: document.getElementById("products-grid"),
    productsCount: document.getElementById("products-count"),
    filterBtns: document.querySelectorAll(".filter-btn"),
    sortSelect: document.getElementById("sort-select"),
    noResults: document.getElementById("no-results"),
    resetFiltersBtn: document.getElementById("reset-filters-btn"),

    // Toast
    toastContainer: document.getElementById("toast-container"),

    // Newsletter
    newsletterForm: document.getElementById("newsletter-form"),

    // Back to Top
    backToTop: document.getElementById("back-to-top"),

    // Hero Stats
    statNumbers: document.querySelectorAll(".stat-number")
};

// ===== UTILITY FUNCTIONS =====

/**
 * Format price to Indian Rupee currency string
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string
 */
function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}

/**
 * Generate star rating HTML string
 * @param {number} rating - Rating value (0-5)
 * @returns {string} Star emoji string
 */
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = "★".repeat(fullStars);
    if (halfStar) stars += "½";
    stars += "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));
    return stars;
}

/**
 * Calculate discount percentage
 * @param {number} original - Original price
 * @param {number} current - Current price
 * @returns {number} Discount percentage
 */
function calcDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
}

/**
 * Save cart data to localStorage
 */
function saveCart() {
    localStorage.setItem("shopease_cart", JSON.stringify(state.cart));
    updateCartCount();
}

/**
 * Save wishlist to localStorage
 */
function saveWishlist() {
    localStorage.setItem("shopease_wishlist", JSON.stringify(state.wishlist));
}

// ===== TOAST NOTIFICATION SYSTEM =====

/**
 * Show a toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type: success, error, info, warning
 * @param {number} duration - Duration in ms (default 3000)
 */
function showToast(message, type = "info", duration = 3000) {
    if (!DOM.toastContainer) return;

    const icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
        warning: "⚠️"
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    // Close button event
    toast.querySelector(".toast-close").addEventListener("click", () => {
        removeToast(toast);
    });

    DOM.toastContainer.appendChild(toast);

    // Auto-remove after duration
    setTimeout(() => removeToast(toast), duration);
}

/**
 * Remove a toast with exit animation
 * @param {HTMLElement} toast - Toast element to remove
 */
function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add("toast-exit");
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
}

// ===== THEME MANAGEMENT =====

/**
 * Apply the current theme to the document
 */
function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    localStorage.setItem("shopease_theme", state.theme);
}

/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    showToast(
        `Switched to ${state.theme} mode`,
        "info",
        2000
    );
}

// ===== CART MANAGEMENT =====

/**
 * Update the cart count badge in the navbar
 */
function updateCartCount() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEls = document.querySelectorAll("#cart-count");
    cartCountEls.forEach(el => {
        el.textContent = totalItems;
        el.classList.add("bump");
        setTimeout(() => el.classList.remove("bump"), 400);
    });
}

/**
 * Add a product to the cart
 * @param {number} productId - The product ID to add
 */
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = state.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`Updated "${product.name}" quantity to ${existingItem.quantity}`, "success");
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showToast(`"${product.name}" added to cart!`, "success");
    }

    saveCart();

    // Animate the add-to-cart button
    const btn = document.querySelector(`[data-product-id="${productId}"]`);
    if (btn) {
        btn.classList.add("added");
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Added
        `;
        setTimeout(() => {
            btn.classList.remove("added");
            btn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add to Cart
            `;
        }, 1500);
    }
}

/**
 * Toggle wishlist status for a product
 * @param {number} productId - The product ID to toggle
 */
function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);

    if (index > -1) {
        state.wishlist.splice(index, 1);
        showToast(`Removed from wishlist`, "info", 2000);
    } else {
        state.wishlist.push(productId);
        showToast(`"${product.name}" added to wishlist!`, "success", 2000);
    }

    saveWishlist();

    // Update heart icon
    const btn = document.querySelector(`.product-wishlist[data-wishlist-id="${productId}"]`);
    if (btn) {
        btn.classList.toggle("liked");
        btn.textContent = btn.classList.contains("liked") ? "❤️" : "🤍";
    }
}

// ===== PRODUCT RENDERING =====

/**
 * Render product cards to the grid
 * @param {Array} productList - Array of product objects to render
 */
function renderProducts(productList) {
    if (!DOM.productsGrid) return;

    if (productList.length === 0) {
        DOM.productsGrid.innerHTML = "";
        DOM.productsGrid.style.display = "none";
        if (DOM.noResults) DOM.noResults.style.display = "block";
        if (DOM.productsCount) DOM.productsCount.textContent = "No products found";
        return;
    }

    DOM.productsGrid.style.display = "grid";
    if (DOM.noResults) DOM.noResults.style.display = "none";

    // Update count text
    if (DOM.productsCount) {
        const categoryText = state.currentCategory === "all" ? "all" : state.currentCategory;
        DOM.productsCount.textContent = `Showing ${productList.length} ${categoryText} product${productList.length !== 1 ? "s" : ""}`;
    }

    DOM.productsGrid.innerHTML = productList.map((product, index) => {
        const discount = calcDiscount(product.originalPrice, product.price);
        const isWishlisted = state.wishlist.includes(product.id);
        const badgeHTML = product.badge
            ? `<span class="product-badge badge-${product.badge}">${product.badge === "sale" ? `-${discount}%` : product.badge === "new" ? "NEW" : "🔥 HOT"}</span>`
            : "";

        return `
            <article class="product-card" style="animation-delay: ${index * 0.05}s" data-id="${product.id}">
                <div class="product-image-wrapper">
                    ${badgeHTML}
                    <button class="product-wishlist ${isWishlisted ? "liked" : ""}" data-wishlist-id="${product.id}" aria-label="Add to wishlist">
                        ${isWishlisted ? "❤️" : "🤍"}
                    </button>
                    <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${generateStars(product.rating)}</span>
                        <span class="rating-count">${product.rating} (${product.reviews})</span>
                    </div>
                    <div class="product-price-row">
                        <div class="product-price">
                            <span class="current-price">${formatPrice(product.price)}</span>
                            <span class="original-price">${formatPrice(product.originalPrice)}</span>
                        </div>
                        <button class="add-to-cart-btn" data-product-id="${product.id}" aria-label="Add ${product.name} to cart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    // Attach event listeners to new elements
    attachProductEventListeners();
}

/**
 * Attach click events to dynamically rendered product elements
 */
function attachProductEventListeners() {
    // Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute("data-product-id"));
            addToCart(id);
        });
    });

    // Wishlist buttons
    document.querySelectorAll(".product-wishlist").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const id = parseInt(btn.getAttribute("data-wishlist-id"));
            toggleWishlist(id);
        });
    });
}

// ===== FILTERING & SORTING =====

/**
 * Get the filtered and sorted list of products
 * @returns {Array} Filtered and sorted product array
 */
function getFilteredProducts() {
    let filtered = [...products];

    // Filter by category
    if (state.currentCategory !== "all") {
        filtered = filtered.filter(p => p.category === state.currentCategory);
    }

    // Filter by search query
    if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase().trim();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
    }

    // Sort
    switch (state.currentSort) {
        case "price-low":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filtered.sort((a, b) => b.price - a.price);
            break;
        case "name-az":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "name-za":
            filtered.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "rating":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break; // Keep original order
    }

    return filtered;
}

/**
 * Apply current filters and re-render products
 */
function applyFilters() {
    const filtered = getFilteredProducts();
    renderProducts(filtered);
}

// ===== SCROLL ANIMATIONS =====

/**
 * Animate hero stat numbers counting up
 */
function animateCounters() {
    if (!DOM.statNumbers || DOM.statNumbers.length === 0) return;

    DOM.statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

/**
 * Intersection Observer for scroll reveal animations
 */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".feature-card, .section-header").forEach(el => {
        el.classList.add("scroll-reveal");
        observer.observe(el);
    });
}

/**
 * Initialize counter animation when hero section is visible
 */
function initCounterAnimation() {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(hero);
}

// ===== EVENT LISTENERS =====

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Theme Toggle
    if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener("click", toggleTheme);
    }

    // Search — Live Search with debounce
    if (DOM.searchInput) {
        let searchTimeout;
        DOM.searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                state.searchQuery = e.target.value;
                applyFilters();
            }, 300);
        });

        DOM.searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                state.searchQuery = e.target.value;
                applyFilters();
            }
        });
    }

    if (DOM.searchBtn) {
        DOM.searchBtn.addEventListener("click", () => {
            if (DOM.searchInput) {
                state.searchQuery = DOM.searchInput.value;
                applyFilters();
            }
        });
    }

    // Category Filter Buttons
    if (DOM.filterBtns) {
        DOM.filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                DOM.filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                state.currentCategory = btn.getAttribute("data-category");
                applyFilters();
            });
        });
    }

    // Sort Select
    if (DOM.sortSelect) {
        DOM.sortSelect.addEventListener("change", (e) => {
            state.currentSort = e.target.value;
            applyFilters();
        });
    }

    // Reset Filters
    if (DOM.resetFiltersBtn) {
        DOM.resetFiltersBtn.addEventListener("click", () => {
            state.currentCategory = "all";
            state.currentSort = "default";
            state.searchQuery = "";

            if (DOM.searchInput) DOM.searchInput.value = "";
            if (DOM.sortSelect) DOM.sortSelect.value = "default";
            if (DOM.filterBtns) {
                DOM.filterBtns.forEach(b => b.classList.remove("active"));
                document.querySelector('.filter-btn[data-category="all"]')?.classList.add("active");
            }

            applyFilters();
        });
    }

    // Footer category links
    document.querySelectorAll("[data-footer-category]").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = link.getAttribute("data-footer-category");

            // Scroll to products section
            const productsSection = document.getElementById("products");
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: "smooth" });
            }

            // Set category filter
            setTimeout(() => {
                state.currentCategory = cat;
                if (DOM.filterBtns) {
                    DOM.filterBtns.forEach(b => b.classList.remove("active"));
                    document.querySelector(`.filter-btn[data-category="${cat}"]`)?.classList.add("active");
                }
                applyFilters();
            }, 500);
        });
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        if (DOM.navbar) {
            DOM.navbar.classList.toggle("scrolled", window.scrollY > 20);
        }

        // Back to Top button visibility
        if (DOM.backToTop) {
            DOM.backToTop.classList.toggle("visible", window.scrollY > 500);
        }
    });

    // Back to Top button
    if (DOM.backToTop) {
        DOM.backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Newsletter Form
    if (DOM.newsletterForm) {
        DOM.newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = document.getElementById("newsletter-email");
            const email = emailInput ? emailInput.value.trim() : "";

            if (!email) {
                showToast("Please enter your email address.", "warning");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Please enter a valid email address.", "error");
                return;
            }

            showToast("🎉 Successfully subscribed! Check your inbox for a welcome surprise.", "success", 4000);
            if (emailInput) emailInput.value = "";
        });
    }

    // Mobile Menu Toggle
    if (DOM.mobileMenuBtn && DOM.navSearch) {
        DOM.mobileMenuBtn.addEventListener("click", () => {
            DOM.navSearch.classList.toggle("mobile-open");
            DOM.mobileMenuBtn.classList.toggle("active");
        });
    }
}

// ===== INITIALIZATION =====

/**
 * Initialize the application
 */
function initApp() {
    // Apply saved theme
    applyTheme();

    // Update cart count
    updateCartCount();

    // Render products (only on homepage)
    if (DOM.productsGrid) {
        renderProducts(products);
    }

    // Initialize event listeners
    initEventListeners();

    // Initialize animations
    initScrollReveal();
    initCounterAnimation();

    console.log("🛒 ShopEase App Initialized Successfully!");
}

// Run on DOM ready
document.addEventListener("DOMContentLoaded", initApp);
